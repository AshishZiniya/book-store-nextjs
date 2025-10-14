import React from 'react';
import { notFound } from 'next/navigation';
import booksData from '@/data/books.json';
import BookDetailClient from '@/components/BookDetailClient';

interface BookDetailPageProps {
  params: {
    id: string;
  };
}

export default function BookDetailPage({ params }: BookDetailPageProps) {
  const book = booksData.find(b => b.id === parseInt(params.id));

  if (!book) {
    notFound();
  }

  return <BookDetailClient book={book} />;
}

export async function generateStaticParams() {
  return booksData.map(book => ({
    id: book.id.toString(),
  }));
}

export async function generateMetadata({ params }: BookDetailPageProps) {
  const book = booksData.find(b => b.id === parseInt(params.id));

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
