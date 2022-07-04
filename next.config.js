/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["theprogrammingbuddy.club", "i.imgur.com"],
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    URI: "http://localhost:1337/api",
  },
}

module.exports = nextConfig
