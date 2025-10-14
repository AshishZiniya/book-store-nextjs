'use client';

import React from 'react';
import { useGlobalContext } from '@/lib/GlobalProvider';

export default function CategoryFilter() {
  const { books, filterByCategory, selectedCategory } = useGlobalContext();

  // Get unique categories from books
  const categories = Array.from(
    new Set(books.flatMap(book => book.categories))
  ).sort();

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <button
        onClick={() => filterByCategory('')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedCategory === ''
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        All Categories
      </button>

      {categories.map(category => (
        <button
          key={category}
          onClick={() => filterByCategory(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === category
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
