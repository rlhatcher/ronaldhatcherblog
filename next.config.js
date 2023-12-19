/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['estesrockets.com']
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false

    return config
  }
}
