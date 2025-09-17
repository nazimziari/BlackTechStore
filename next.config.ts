import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // This is the configuration block for the Next.js Image component
  images: {
    // remotePatterns is the modern way to whitelist external image domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**', // This allows any path from the Cloudinary hostname
      },
    ],
  },
};

export default nextConfig;