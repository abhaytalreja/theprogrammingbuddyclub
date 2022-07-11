import React from "react"
import Link from "next/link"
import Image from "next/image"
import Social from "./Social"

export default function Footer() {
  return (
    <footer className="text-gray-600 body-font border-t-2 border-gray-200 m-12">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 m-auto text-center md:text-left">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <div className="w-12 h-12">
              <Image
                src="/theprogrammingbuddyclub.png"
                alt="The Programming Buddy Club Logo"
                width={64}
                height={64}
                layout="responsive"
              ></Image>
            </div>
            <span className="ml-3 text-xl">The Programming Buddy Club</span>
          </a>
          <p className="mt-2 text-sm text-gray-500 hover:text-theme-hover">
            One destination for all the free only learning resources
          </p>
        </div>
        <div className="flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="w-full text-md md:text-lg">
            <div className="text-md font-bold">
              Free & Discounted Online courses
            </div>
            Welcome to <Link href="/">theprogrammingbuddy.club</Link>, where you
            will find ALL free & discounted courses based on the popularity from
            sources like Udemy in an easy and quick way. Udemy is the biggest
            online courses platform where you can find the widest variety of
            courses under video on demand. Udemy has a catalog of course
            categories that goes from web development or design and marketing,
            to languages ​​or personal development.{" "}
            <Link
              href="/"
              title="The Programming Buddy Club | Free Udemy Courses"
            >
              <a className="text-blue-500 underline">
                Theprogrammingbuddy.club
              </a>
            </Link>{" "}
            curates all of the free and discounted courses from across the
            internet so that you can start learning at the lowest possible cost.
            Many of our students used to download udemy courses or search for
            them all over the internet. The problem with that is piracy. We let
            udemy instructors promote udemy courses and in return we expect our
            students to give a genuine Feedback course review. This helps the
            instructors to make their online course better for all their
            students. It also helps prevents students to look for "download free
            udemy courses" or torrents, which leads to piracy issues for the
            instructors. Enrolling in a course at a discount or with a coupon
            gives you all the benefits of doing a course through Udemy. You also
            get your certificate from Udemy which you can use to find your next
            job.
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto py-8 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-800 text-lg text-center sm:text-left border-gray-100 border-b md:border-0 pb-2">
            © 2022 TheProgrammingBuddyClub
          </p>
          <Social />
        </div>
      </div>
    </footer>
  )
}
