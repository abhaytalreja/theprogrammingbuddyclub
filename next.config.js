/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  images: {
    domains: [
      "theprogrammingbuddy.club",
      "i.imgur.com",
      "img-a.udemycdn.com",
      "img-b.udemycdn.com",
      "img-c.udemycdn.com",
      "img-d.udemycdn.com",
    ],
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    URI: "http://localhost:1337/api",
  },
}

module.exports = nextConfig
