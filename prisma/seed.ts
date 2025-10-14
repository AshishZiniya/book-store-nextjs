import { PrismaClient } from '@prisma/client';
import booksData from '../src/data/books.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing books
  await prisma.book.deleteMany();

  // Insert books from JSON data
  for (const bookData of booksData) {
    await prisma.book.create({
      data: {
        title: bookData.title,
        isbn: bookData.isbn,
        pageCount: bookData.pageCount,
        publishedDate: new Date(bookData.publishedDate),
        thumbnailUrl: bookData.thumbnailUrl,
        shortDescription: bookData.shortDescription,
        longDescription: bookData.longDescription,
        status: bookData.status,
        authors: JSON.stringify(bookData.authors),
        categories: JSON.stringify(bookData.categories),
        price: bookData.price,
        rating: bookData.rating,
      },
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
