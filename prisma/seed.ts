import { PrismaClient } from '@prisma/client';
import booksData from '../src/data/books.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing books
  await prisma.book.deleteMany();

  // Insert books from JSON data
  for (const bookData of booksData) {
    // Handle the publishedDate format from the JSON
    let publishedDate = null;
    if (bookData.publishedDate && bookData.publishedDate.$date) {
      publishedDate = new Date(bookData.publishedDate.$date);
    }

    await prisma.book.create({
      data: {
        title: bookData.title,
        isbn: bookData.isbn,
        pageCount: bookData.pageCount || 0,
        publishedDate: publishedDate,
        thumbnailUrl: bookData.thumbnailUrl,
        shortDescription: bookData.shortDescription || '',
        longDescription: bookData.longDescription || '',
        status: bookData.status || 'PUBLISH',
        authors: JSON.stringify(bookData.authors || []),
        categories: JSON.stringify(bookData.categories || []),
        price: Math.floor(Math.random() * 50) + 10, // Generate random price between $10-60
        rating: Math.floor(Math.random() * 5) + 1, // Generate random rating 1-5
      },
    });
  }

  console.log(`Database seeded successfully with ${booksData.length} books!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
