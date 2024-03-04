/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:5254/api/:path*'
            : '/api/'
      },
      {
        source: '/app/api/auth:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:5254/api/:path*'
            : '/app/api/auth/'
      }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb'
    }
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false

    return config
  }
}

