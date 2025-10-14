import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Book } from '@/types';
import booksData from '@/data/books.json';

export default function CategoriesPage() {
  // Get unique categories from books
  const categories = Array.from(
    new Set(booksData.flatMap(book => book.categories))
  ).sort();

  // Group books by category
  const booksByCategory = categories.reduce((acc, category) => {
    acc[category] = booksData.filter(book =>
      book.categories.includes(category)
    );
    return acc;
  }, {} as Record<string, Book[]>);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse by Category</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover books across all genres and find your next favorite read
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(category => (
            <div key={category} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                    category === 'Java' ? 'bg-blue-600' :
                    category === 'Mobile' ? 'bg-green-600' :
                    category === 'Web Development' ? 'bg-purple-600' :
                    category === 'Software Engineering' ? 'bg-orange-600' :
                    'bg-gray-600'
                  }`}>
                    {category.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900">{category}</h3>
                    <p className="text-gray-600">{booksByCategory[category].length} books</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {booksByCategory[category].slice(0, 3).map(book => (
                    <div key={book.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                      <div className="relative h-12 w-10 flex-shrink-0">
                        <Image
                          src={book.thumbnailUrl || "/images/placeholder-book.jpg"}
                          alt={book.title}
                          width={40}
                          height={48}
                          className="h-full w-full object-cover rounded"
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {book.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          by {book.authors.join(', ')}
                        </p>
                      </div>
                      <div className="text-sm font-semibold text-green-600">
                        ${book.price}
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/?category=${encodeURIComponent(category)}`}
                  className="w-full btn-primary text-white py-2 px-4 rounded-lg text-sm font-medium inline-block text-center"
                >
                  View All {category} Books
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/"
            className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-colors inline-block"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Categories | BookStore',
  description: 'Browse books by category - find your next favorite read',
};
