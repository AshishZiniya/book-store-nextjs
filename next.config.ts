import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        pathname: '/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/**',
      },
    ],
  },
};

export default nextConfig;
