/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "fakeimg.pl",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "love-page-gift.s3.eu-north-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
