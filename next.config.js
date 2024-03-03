/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['estesrockets.com']
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:5000/api/:path*'
            : '/api/',
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
