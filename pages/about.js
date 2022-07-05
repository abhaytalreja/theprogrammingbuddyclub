import React from "react"
import Image from "next/image"

export default function About() {
  return (
    <div className="px-4 md:px-12 mt-8">
      <h1 className="flex flex-row md:inline-flex md:justify-between w-full">
        <div className="md:text-4xl text-xl font-bold py-2">
          The Programming Buddy Club
        </div>
        <div className="w-24 h-24">
          <Image
            src="/theprogrammingbuddyclub.png"
            alt="The Programming Buddy Club Logo"
            width={64}
            height={64}
          ></Image>
        </div>
      </h1>
      <h2 className="">
        The best place to find free Udemy Courses. Always updated, to save you
        the time.
      </h2>
    </div>
  )
}
