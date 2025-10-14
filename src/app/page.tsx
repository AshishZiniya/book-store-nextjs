import React from 'react';
import BookGrid from '@/components/BookGrid';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import HeroSection from '@/components/HeroSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <SearchBar />
          <CategoryFilter />
        </div>

        {/* Books Grid */}
        <BookGrid />
      </div>
    </div>
  );
}
