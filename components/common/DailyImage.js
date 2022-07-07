import React from "react"
import * as htmlToImage from "html-to-image"
import { toPng } from "html-to-image"
import Image from "next/image"

export default function DailyImage({ savings }) {
  return (
    <div
      className="w-full h-156 bg-green-100 flex justify-center"
      id="today-image"
    >
      <div className="pt-4 px-12 text-center w-full">
        <div className="mt-16">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto mt-8 h-32 w-32 text-red-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg> */}
          <Image
            src="/programmingbuddyclub.png"
            alt="The Programming Buddy Club Logo"
            width={1080}
            height={240}
            layout="responsive"
            className="mx-auto"
          ></Image>
          <div className="text-2xl leading-loose">
            www.theprogrammingbuddy.club
          </div>
          <h1 className="my-12 text-center text-2xl font-bold text-red-600 border-4 p-4 border-red-400">
            <span className="text-3xl">${savings}</span> worth of savings!
          </h1>
        </div>
        <div className="text-4xl font-bold my-12 w-full">
          Free Udemy Courses
        </div>
        <div className="text-xl font-semibold my-8">
          <div>Just click, enroll and learn.</div>
        </div>
      </div>
    </div>
  )
}
