'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Book } from '@/types';
import { useGlobalContext } from '@/lib/GlobalProvider';
import { useToast } from '@/components/ToastProvider';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const { addToCart } = useGlobalContext();
  const { showToast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    addToCart(book);
    showToast(`"${book.title}" added to cart!`, 'success');
  };

  return (
    <div className="book-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/books/${book.id}`}>
        <div className="relative h-64 w-full">
          <Image
            src={book.thumbnailUrl || "/images/placeholder-book.jpg"}
            alt={book.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-900">
            {book.title}
          </h3>

          <p className="text-sm text-gray-600 mb-2">
            by {book.authors.join(', ')}
          </p>

          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
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
            <span className="ml-2 text-sm text-gray-600">
              ({book.rating})
            </span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-green-600">
              ${book.price}
            </span>
            <div className="flex flex-wrap gap-1">
              {book.categories.slice(0, 2).map(category => (
                <span
                  key={category}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          {book.shortDescription && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
              {book.shortDescription}
            </p>
          )}

          <div className="flex space-x-2">
            <Link
              href={`/books/${book.id}`}
              className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors text-center"
            >
              View Details
            </Link>
            <button
              onClick={handleAddToCart}
              className="btn-primary text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5h13M12 18a2 2 0 100 4 2 2 0 000-4zm6 0a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
