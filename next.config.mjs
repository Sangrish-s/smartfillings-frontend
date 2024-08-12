/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
  },
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  webpack(config, { isServer }) {
    // Resolve modules from the src directory
    config.resolve.modules.push(__dirname + "/src");
    return config;
  },
};

export default nextConfig;
