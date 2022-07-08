import React from "react"
import Link from "next/link"
import generateRssFeed from "lib/generateRssFeed"

export default function index() {
  return (
    <div className="flex flex-col m-32">
      Generated RSS at <Link href="/rss/feed.xml">XML</Link>
      <Link href="/rss/feed.json">Json</Link>
      <Link href="/rss/feed.atom">Atom</Link>
    </div>
  )
}

export async function getServerSideProps() {
  console.log("Generating RSS Feed - Start")
  await generateRssFeed()
  console.log("Generating RSS Feed - Complete")
  return {
    props: {},
  }
}
