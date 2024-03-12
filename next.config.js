/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
    serverActions: {
      allowedOrigins: ['ly-heating.td.masterpeak.cn', '*.td.masterpeak.cn'],
    },
  },
}

module.exports = nextConfig

