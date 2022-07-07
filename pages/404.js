import React from "react"
import Link from "next/link"

export default function Custom404() {
  return (
    <section className="text-gray-600 body-font h-156">
      <div className="container px-5 py-8 mx-auto flex flex-col">
        <div className="flex flex-grow -m-4 justify-center align-middle mt-40">
          404 | This page doesn't exist and could not be found.
        </div>
        <div className="flex flex-grow -m-4 justify-center align-middle mt-40">
          <Link href="/">
            <a className="text-blue-500 underline">Go Home!</a>
          </Link>
        </div>
      </div>
    </section>
  )
}
