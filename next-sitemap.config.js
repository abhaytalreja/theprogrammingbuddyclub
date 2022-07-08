const siteUrl = "https://theprogrammingbuddy.club"

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: ["/generateRss"],
  robotsTxtOptions: {
    additionalSitemaps: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/server-sitemap.xml`,
    ],
  },
}
