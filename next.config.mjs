/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
  },
};

export default nextConfig;
