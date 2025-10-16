import React from 'react';
import { notFound } from 'next/navigation';
import { Book } from '@/types';
import booksData from '@/data/books.json';
import BookDetailClient from '@/components/BookDetailClient';

interface BookDetailPageProps {
  params: {
    id: string;
  };
}

export default function BookDetailPage({ params }: BookDetailPageProps) {
  // Find book by index since JSON data doesn't have id field
  const bookIndex = parseInt(params.id) - 1; // Convert to 0-based index
  const book = booksData[bookIndex];

  if (!book || bookIndex < 0 || bookIndex >= booksData.length) {
    notFound();
  }

  // Add id field and transform data to match Book interface
  const bookWithId = {
    ...book,
    id: bookIndex + 1, // Add 1-based id
    price: 0, // Add default price
    publishedDate: typeof book.publishedDate === 'object' && book.publishedDate?.$date
      ? book.publishedDate.$date
      : book.publishedDate?.toString() || '',
  } as Book;

  return <BookDetailClient book={bookWithId} />;
}

export async function generateStaticParams() {
  return booksData.map((_, index) => ({
    id: (index + 1).toString(),
  }));
}

export async function generateMetadata({ params }: BookDetailPageProps) {
  const bookIndex = parseInt(params.id) - 1;
  const book = booksData[bookIndex];

  if (!book) {
    return {
      title: 'Book Not Found',
    };
  }

  return {
    title: `${book.title} | BookStore`,
    description: book.shortDescription || book.longDescription?.substring(0, 160) || 'Discover this amazing book at BookStore',
  };
}
