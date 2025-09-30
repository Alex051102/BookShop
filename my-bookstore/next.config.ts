/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'books.google.com',
      'covers.openlibrary.org', // если еще используешь OpenLibrary
      'via.placeholder.com', // для fallback изображений
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'books.google.com',
        pathname: '/books/content/**',
      },
      {
        protocol: 'https',
        hostname: 'covers.openlibrary.org',
        pathname: '/b/id/**',
      },
    ],
  },
};

module.exports = nextConfig;
