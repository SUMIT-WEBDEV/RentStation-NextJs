/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
      "cdn.pixabay.com",
    ],
  },
  // reactStrictMode: false,
};

module.exports = nextConfig;
