'use client';

import React, { useEffect } from 'react';
import { useGlobalContext } from '@/lib/GlobalProvider';
import BookGrid from '@/components/BookGrid';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';


export default function BooksPage() {
  const { searchBooks, filterByCategory } = useGlobalContext();

  // Initialize with all books when component mounts
  useEffect(() => {
    searchBooks('');
    filterByCategory('');
  }, [searchBooks, filterByCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Books</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our complete collection of programming and technical books
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <SearchBar />
            <CategoryFilter />
          </div>
        </div>

        {/* Books Grid */}
        <BookGrid />
      </div>
    </div>
  );
}
