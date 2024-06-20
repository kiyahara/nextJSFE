/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    BASE_URL: process.env.BASE_URL,
    jwtSecretKey: process.env.jwtSecretKey,
  },
};

export default nextConfig;
