import React from "react"
import Link from "next/link"
import Image from "next/image"
import Social from "./Social"

export default function Footer() {
  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 m-auto text-center md:text-left">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <div className="w-12 h-12">
              <Image
                src="/theprogrammingbuddyclub.png"
                alt="The Programming Buddy Club Logo"
                width={64}
                height={64}
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
            <div className="text-md font-bold">Free Udemy online courses</div>
            Welcome to <Link href="/">theprogrammingbuddy.club</Link>, where you
            will find ALL free courses of Udemy in an easy and quick way. Udemy
            is the biggest online courses platform where you can find the widest
            variety of courses under video on demand. Udemy has a catalog of
            course categories that goes from web development or design and
            marketing, to languages ​​or personal development.
            <Link href="/">theprogrammingbuddy.club</Link> curates all of the
            free and discounted courses from Udemy so that you can start
            learning at the lowest possible cost. Many of our students used to
            download udemy courses or search for them all over the internet. The
            problem with that is piracy. We let udemy instructors promote udemy
            courses and in return we expect our students to give a genuine Udemy
            course review. This helps the instructors to make their Udemy course
            better for all their students on Udemy. It also helps prevents
            students to look for "download free udemy courses". Enrolling in a
            course at a discount or with a coupon gives you all the benefits of
            doing a course through Udemy. You also get your certificate from
            Udemy which you can use to find your next job.
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto py-8 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-lg text-center sm:text-left border-gray-200 border-b pb-2">
            © 2022 TheProgrammingBuddyClub
          </p>
          <Social />
        </div>
      </div>
    </footer>
  )
}