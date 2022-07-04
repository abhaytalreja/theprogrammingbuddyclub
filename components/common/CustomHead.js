import React from "react"
import Head from "next/head"

export default function CustomHead({
  title,
  imageUrl,
  keywords,
  description,
  website,
}) {
  return (
    <Head>
      <title>
        {title} | {description}
      </title>
      <meta name="title" content={`${title} | ${description}`}></meta>
      <meta name="keywords" content={keywords}></meta>
      <meta name="description" content={description}></meta>
      <meta property="og:type" content="website"></meta>
      <meta property="og:url" content={website}></meta>
      <meta property="og:title" content={`${title} | ${description}`}></meta>
      <meta property="og:description" content={description}></meta>
      <meta property="og:image" content={imageUrl}></meta>
      <meta property="twitter:card" content="summary_large_image"></meta>
      <meta property="twitter:url" content={website}></meta>
      <meta
        property="twitter:title"
        content={`${title} | ${description}`}
      ></meta>
      <meta property="fb:app_id" content="320785632611279"></meta>
      <meta
        property="twitter:description"
        content={`${title} | ${description}`}
      ></meta>
      <meta property="twitter:image" content={imageUrl}></meta>
      <meta name="p:domain_verify" content="65277291b8974992ad879e88a2101a0a" />
    </Head>
  )
}
