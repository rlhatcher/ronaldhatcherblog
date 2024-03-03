/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['estesrockets.com']
  },
  async rewrites() {
    return [
      {
        source: '/xform/:path*',
        destination: '/api/xform/:path*', // Proxy to Backend
      },
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false

    return config
  }
}
