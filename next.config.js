/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    loader: 'custom',
    formats: ['image/avif', 'image/webp']
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false

    return config
  }
}
