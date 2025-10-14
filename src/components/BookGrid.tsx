'use client';

import React from 'react';
import { useGlobalContext } from '@/lib/GlobalProvider';
import BookCard from '@/components/BookCard';

export default function BookGrid() {
  const { filteredBooks, isLoading } = useGlobalContext();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="loading-spinner"></div>
        <span className="ml-3 text-lg text-gray-600">Loading books...</span>
      </div>
    );
  }

  if (filteredBooks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No books found</h3>
        <p className="text-gray-600">
          Try adjusting your search terms or browse different categories.
        </p>
      </div>
    );
  }

  return (
    <div id="books" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredBooks.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
