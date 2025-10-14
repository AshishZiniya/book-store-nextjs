// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Auth Configuration
export const AUTH_CONFIG = {
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development",
  jwt: {
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  session: {
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
} as const;

// App Configuration
export const APP_CONFIG = {
  name: "Book Store",
  description: "Your favorite online bookstore",
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
} as const;
