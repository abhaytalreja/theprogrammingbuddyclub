import React from "react"
import Link from "next/link"

export default function CategoryLinks({ categories, sectionTitle }) {
  return (
    <>
      <h3 className="text-2xl bg-slate-50 font-semibold p-4 mt-20">
        Free and Discount Udemy Courses {sectionTitle}
      </h3>
      <ul className="py-8 px-4 flex flex-wrap">
        {categories.map((category, index) => (
          <li
            className="p-1 m-2"
            key={`${sectionTitle.replaceAll(" ", "")}-category-${index}`}
          >
            <Link href={category.url}>
              <a
                className="p-2 cursor-pointer bg-slate-100 hover:bg-slate-200"
                title={`Free Udemy courses for ${category.title}`}
              >
                {category.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
