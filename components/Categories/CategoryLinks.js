import React from "react"
import Link from "next/link"

export default function CategoryLinks({ categories, sectionTitle }) {
  return (
    <>
      <h3 className="text-2xl bg-slate-50 font-semibold p-4 mt-20">
        Free and Discount Udemy Courses {sectionTitle}
      </h3>
      {categories.map((category, index) => (
        <Link
          href={category.url}
          key={`${sectionTitle.replaceAll(" ", "")}-category-${index}`}
        >
          <a
            className="cursor-pointer bg-slate-100 hover:bg-slate-200 inline-block p-2 m-2 leading-4"
            title={`Free Udemy courses for ${category.title}`}
          >
            {category.title}
          </a>
        </Link>
      ))}
    </>
  )
}
