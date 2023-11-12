/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.DOMAIN_URL || 'http://localhost:3000',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
}