import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Convert JSON strings back to arrays for the frontend
    const formattedBooks = books.map(book => ({
      id: book.id ? parseInt(book.id) : null, // Handle null ids gracefully
      title: book.title,
      isbn: book.isbn || '',
      pageCount: book.pageCount || 0,
      publishedDate: book.publishedDate?.toISOString() || '',
      thumbnailUrl: book.thumbnailUrl || '',
      shortDescription: book.shortDescription || '',
      longDescription: book.longDescription || '',
      status: book.status,
      authors: JSON.parse(book.authors || '[]'),
      categories: JSON.parse(book.categories || '[]'),
      price: book.price,
      rating: book.rating || 0,
    }));

    return NextResponse.json(formattedBooks);
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    );
  }
}
