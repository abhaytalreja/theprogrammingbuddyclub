import { Feed } from "feed"
import getCoursesForRss from "./getCoursesForRss"
import siteConfig from "@/config/siteConfig"
var escape = require("escape-html")
export default async function generateRssFeed(isFree) {
  const courses = isFree
    ? await getCoursesForRss(true, false)
    : await getCoursesForRss(false, true)
  const date = new Date()
  const author = {
    name: "The Programming Buddy Club",
    email: "programmingbuddyclub@gmail.com",
    link: "https://theprogrammingbuddy.club",
  }
  const feed = new Feed({
    title: siteConfig.title,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.imageUrl}`,
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, TheProgrammingBuddyClub`,
    updated: date, // today's date
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${siteConfig.url}/rss/feed.xml`, // xml format
      json: `${siteConfig.url}/rss/feed.json`, // json fromat
      atom: `${siteConfig.url}/rss/feed.atom`, // atom fromat
    },
    author,
  })

  courses.forEach((course) => {
    const url = siteConfig.url + course.document.fields.searchUrl
    const coupon = course.couponeCode
      ? course.couponeCode
      : "TheProgrammingBuddyClub"
    const titleSuffix =
      course.document.fields.discountPercent === 100
        ? "| Free Udemy Course"
        : " | Discount Coupon for Udemy Course"
    feed.addItem({
      title: `${course.document.fields.title} ${titleSuffix}`,
      id: url,
      link: url + "?couponCode=" + coupon,
      description: `${course.document.fields.description} ${titleSuffix}`,
      content: escape(
        course.document.fields.courseDescription.replace("Description", "")
      ),
      author: [author],
      contributor: [author],
      date: new Date(course.document.fields.updateDate),
      image: course.document.fields.images.image_480x270,
      published: new Date(course.document.createTime),
      // guid: course.document.name.substring(
      //   course.document.name.lastIndexOf("/") + 1
      // ),
    })
  })

  // fs.mkdirSync(siteConfig.rssFilePath, { recursive: true })
  // fs.writeFileSync(`${siteConfig.rssFilePath}/feed.xml`, feed.rss2())
  // fs.writeFileSync(`${siteConfig.rssFilePath}/feed.json`, feed.json1())
  // fs.writeFileSync(`${siteConfig.rssFilePath}/feed.atom`, feed.atom1())
  return feed.rss2()
}
