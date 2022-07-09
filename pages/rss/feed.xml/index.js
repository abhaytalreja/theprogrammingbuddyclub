import React from "react"
import Link from "next/link"
import generateRssFeed from "lib/generateRssFeed"

export default function index({ feed }) {
  return feed
}

export async function getServerSideProps({ res }) {
  console.log("Generating RSS Feed - Start")
  const feed = await generateRssFeed()
  res.setHeader("content-type", "text/xml")
  res.write(feed) // NOTE: You can also use feed.atom1() or feed.json1() for other feed formats
  res.end()
  console.log("Generating RSS Feed - Complete")
  return {
    props: {},
  }
}
