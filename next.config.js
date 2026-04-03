/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.decoupled.website',
      },
      {
        protocol: 'http',
        hostname: '**.decoupled.website',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.ddev.site',
      },
    ],
  },
}

module.exports = nextConfig
