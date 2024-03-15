/** @type {import('next').NextConfig} */
module.exports = {
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

