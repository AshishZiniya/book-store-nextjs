'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Book } from '@/types';
import { useGlobalContext } from '@/lib/GlobalProvider';
import { useToast } from '@/components/ToastProvider';

interface BookDetailClientProps {
  book: Book;
}

export default function BookDetailClient({ book }: BookDetailClientProps) {
  const { addToCart } = useGlobalContext();
  const { showToast } = useToast();

  const handleAddToCart = () => {
    addToCart(book);
    showToast(`"${book.title}" added to cart!`, 'success');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Books
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Book Image */}
            <div className="md:w-1/3 p-8">
              <div className="relative h-96 w-full">
                <Image
                  src={book.thumbnailUrl || "/images/placeholder-book.jpg"}
                  alt={book.title}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>

            {/* Book Details */}
            <div className="md:w-2/3 p-8">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {book.title}
                </h1>
                <p className="text-xl text-gray-600 mb-4">
                  by {book.authors.join(', ')}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(book.rating || 0)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-lg text-gray-600">
                    {book.rating} out of 5 stars
                  </span>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {book.categories.map(category => (
                    <span
                      key={category}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div className="text-4xl font-bold text-green-600 mb-6">
                  ${book.price}
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">Description</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {book.description || book.shortDescription || 'No description available for this book.'}
                  </p>
                </div>

                {/* Book Details */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div>
                    <span className="font-semibold text-gray-600">ISBN:</span>
                    <p className="text-gray-900">{book.isbn}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Pages:</span>
                    <p className="text-gray-900">{book.pages || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Published:</span>
                    <p className="text-gray-900">{book.publishedDate}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Language:</span>
                    <p className="text-gray-900">{book.language || 'N/A'}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    className="btn-primary text-white px-8 py-3 rounded-lg text-lg font-semibold flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5h13M12 18a2 2 0 100 4 2 2 0 000-4zm6 0a2 2 0 100 4 2 2 0 000-4z" />
                    </svg>
                    Add to Cart
                  </button>
                  <Link
                    href="/cart"
                    className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    View Cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
