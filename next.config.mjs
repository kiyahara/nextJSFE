/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        BASE_URL: process.env.BASE_URL,
        BASE_URL_LOCAL: process.env.BASE_URL_LOCAL,
      },
};


export default nextConfig;
