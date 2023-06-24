/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "lh3.googleusercontent.com",
        port: '',
      },
      {
        protocol: 'https',
        hostname: "shopperantics.s3.amazonaws.com",
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
