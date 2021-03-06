import React from "react"
import Social from "./Social"
import Image from "next/image"
import Link from "next/link"
export default function Header({ logoImage }) {
  return (
    <header className="text-gray-600 body-font container mx-auto bg-gray-100 flex flex-wrap flex-col sm:flex-row md:justify-between p-2">
      <Link href="/">
        <a className="flex md:inline-flex md:mx-0 mx-auto">
          <div className="w-10 h-10 mr-4 pt-2">
            <Image
              src="/theprogrammingbuddyclub.png"
              alt="The Programming Buddy Club Logo"
              width="64"
              height="64"
              layout="responsive"
            ></Image>
          </div>
          <div className="md:text-3xl text-lg font-bold py-2">
            The Programming Buddy Club
          </div>
        </a>
      </Link>
      <hr className="border mt-2 border-gray-200 visible md:invisible"></hr>
      <div className="py-2 md:py-4 flex justify-center  md:mx-0 mx-auto">
        <Social />
      </div>
    </header>
  )
}
