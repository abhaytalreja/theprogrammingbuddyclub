import Link from "next/link"
import React from "react"

export default function CategoryTag({ title, title_cleaned }) {
  return (
    <Link
      href={`/category/${title_cleaned}`}
      title={`Free Udemy Courses for ${title} | The Programming Buddy Club`}
    >
      <a className="bg-theme px-2 py-1 text-white rounded-lg font-semibold mr-1 mt-1 text-xs hover:font-bold inline-block tracking-tight">
        {title}
      </a>
    </Link>
  )
}
