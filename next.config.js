/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['estesrockets.com']
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
