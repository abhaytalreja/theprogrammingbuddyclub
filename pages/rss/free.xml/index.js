import generateRssFeed from "lib/generateRssFreeDiscount"

export default function index({ feed }) {
  return feed
}

export async function getServerSideProps({ res }) {
  console.log("Generating RSS Feed for Free Courses - Start")
  const feed = await generateRssFeed(true)
  res.setHeader("content-type", "text/xml")
  res.write(feed) // NOTE: You can also use feed.atom1() or feed.json1() for other feed formats
  res.end()
  console.log("Generating RSS Feed for Free Courses - Complete")
  return {
    props: {},
  }
}
