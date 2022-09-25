import React from "react"
import Link from "next/link"

export default function ToolItem({ title, description, url, key }) {
  const items = [
    "bg-green-100",
    "bg-red-100",
    "bg-orange-100",
    "bg-amber-100",
    "bg-yellow-100",
    "bg-lime-100",
    "bg-emerald-100",
    "bg-teal-100",
    "bg-cyan-100",
    "bg-sky-100",
    "bg-blue-100",
    "bg-indigo-100",
    "bg-violet-100",
    "bg-purple-100",
    "bg-fuchsia-100",
    "bg-pink-100",
    "bg-rose-100",
    "bg-green-50",
    "bg-red-50",
    "bg-orange-50",
    "bg-amber-50",
    "bg-yellow-50",
    "bg-lime-50",
    "bg-emerald-50",
    "bg-teal-50",
    "bg-cyan-50",
    "bg-sky-50",
    "bg-blue-50",
    "bg-indigo-50",
    "bg-violet-50",
    "bg-purple-50",
    "bg-fuchsia-50",
    "bg-pink-50",
    "bg-rose-50",
  ]
  const bgColor = items[Math.floor(Math.random() * items.length)]
  return (
    <div className={`flex rounded-lg h-full ${bgColor} p-8 flex-col`}>
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
        </div>
        <h2 className="text-gray-900 text-lg title-font font-medium">
          {title}
        </h2>
      </div>
      <div className="flex-grow">
        <p className="leading-relaxed text-base">{description}</p>
        <Link href={`https://toolsconverters.xyz${url}`}>
          <a
            className="mt-3 text-indigo-700 inline-flex items-center"
            target="_blank"
          >
            Try it
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </Link>
      </div>
    </div>
  )
}
