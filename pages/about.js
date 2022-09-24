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
      <h2 className="text-2xl font-black">
        The best place to find free Udemy Courses. Always updated, to save you
        the time.
      </h2>
      <h3 className="my-8 text-xl font-black">Mission and Vision</h3>{" "}
      <p className="my-4">
        Our aim is to Provide Udemy Coupons and Discounted Coupon Codes for
        Udemy Courses and other relevant online products.
      </p>
      <h3 className="my-8 text-xl font-black">Our Activity</h3>
      <p className="my-4">
        The Programming Buddy Club provides best educational coupons including:
        Udemy Coupon Codes, 100% Off Udemy course coupons, Udemy Discount
        Coupons other Domain and Hosting related Coupons, ebook coupons and
        other deals. We updates the Coupons Daily.
      </p>{" "}
      <p className="my-4">
        We receive online courses coupons from teachers and instructors by
        allowing them to submit their Udemy coupons for FREE through Programming
        Buddy Club
      </p>{" "}
      We distribute the Udemy Courses with 100% Off Coupons at all our social
      channels/networks including{" "}
      <b>
        Twitter, Telegram, Facebook, Linkedin, Tumblr.com, scoop.it, pocket.com,
        paper.li, stumbleupon etc..
      </b>
    </div>
  )
}
