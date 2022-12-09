import React from "react"
import Image from "next/image"
import TimeAgo from "javascript-time-ago"
import Link from "next/link"
import CategoryTag from "../Categories/CategoryTag"
// English.
import en from "javascript-time-ago/locale/en"
import siteConfig from "@/config/siteConfig"
TimeAgo.addDefaultLocale(en)
// Create formatter (English).
const timeAgo = new TimeAgo("en-US")

export default function CoursePreview({ course, index, moreLike, id }) {
  const titleSuffix =
    course.discountPercent === 100
      ? "| Free Udemy Course"
      : " | Discount Coupon for Udemy Course"
  const hashtags = (str, char) => {
    return `${char}${str.replaceAll("&", "").replaceAll(" ", "")}`
  }
  const encodedTwitterUrl =
    !moreLike &&
    encodeURIComponent(
      `${course.title} ${titleSuffix} \n ${
        course.primary_category
          ? hashtags(course.primary_category.title, "#")
          : ""
      } ${
        course.primary_subcategory
          ? hashtags(course.primary_subcategory.title, "#")
          : ""
      } ${
        course.child_category ? hashtags(course.child_category.title, "#") : ""
      } \n Follow us @programminbuddy for more... \n\n #theProgrammingBuddyClub \n\n ${
        siteConfig.url
      }${course.url.replace(/.*\/\/[^\/]*/, "")}`
    )
  return (
    <div
      className={`md:w-1/2 w-full ${
        moreLike ? " lg:w-1/3 p-2" : " lg:w-1/4 p-4"
      }`}
      data-id={id}
    >
      {course.campaign ? (
        <div className="text-xs p-1 font-semibold bg-slate-50 text-gray-700 mb-1">
          Expiry {timeAgo.format(new Date(course.campaignEnd), "round")}
          {course.campaign.uses_remaining && (
            <span> or {course.campaign.uses_remaining} uses</span>
          )}
        </div>
      ) : (
        <div className="text-xs p-1 font-semibold bg-slate-50 text-gray-700 mb-1">
          {course.isPaid ? "New Udemy Course" : "New Free Udemy Course"}
        </div>
      )}
      <div className="block relative rounded overflow-hidden">
        <div className="relative w-full z-10">
          <div
            className={`origin-top float-left mt-8 w-24 text-center absolute -left-20 -top-4 text-lg md:text-md border border-gray-400 font-bold ${
              course.discountPercent == 100
                ? "bg-gray-600 text-white"
                : "bg-gray-600 text-white"
            }`}
            style={{ transform: "translateX(50%) rotate(-45deg)" }}
          >
            {course.discountPercent == 100 ? "Free" : "Deal"}
          </div>
        </div>
        <Link href={`${course.url.replace(/.*\/\/[^\/]*/, "")}`}>
          <a>
            <Image
              src={course.images.image_240x135}
              alt={course.title}
              width="480"
              height="270"
              layout="responsive"
              className="opacity-80"
              priority={
                index < 1 && course.discountPercent === 100 && !moreLike
              }
            />
          </a>
        </Link>
        <div className="text-xs p-1 text-gray-700 mb-1 text-right">
          Added {timeAgo.format(new Date(course.updateDate * 1000), "round")}
        </div>
      </div>
      <h3
        className={`text-gray-900 title-font font-medium mb-2 mt-2 ${
          moreLike ? " text-sm" : "text-font"
        }`}
      >
        <Link href={`${course.url.replace(/.*\/\/[^\/]*/, "")}`}>
          {course.title}
        </Link>
      </h3>
      {!moreLike && course.primary_category && (
        <CategoryTag
          title={course.primary_category.title}
          title_cleaned={course.primary_category.title_cleaned}
        />
      )}
      {!moreLike && course.primary_subcategory && (
        <CategoryTag
          title={course.primary_subcategory.title}
          title_cleaned={course.primary_subcategory.title_cleaned}
        />
      )}
      {!moreLike && course?.child_category?.title && (
        <CategoryTag
          title={course.child_category.title}
          title_cleaned={course.child_category.title_cleaned}
        />
      )}
      <div className="text-amber-700 font-bold flex justify-start py-1 mt-2">
        <Link href={`${course.url.replace(/.*\/\/[^\/]*/, "")}`}>
          <a className="inline-flex text-sm">
            <span>
              Rating {Math.round(course.avg_rating_recent * 100) / 100}
            </span>
            <span className="text-gray-600 text-xs font-normal ml-2">
              {"("}
              {course.num_subscribers}
              {")"}
            </span>
          </a>
        </Link>
      </div>
      <p className="text-gray-600 text-md font-bold inline-flex">
        {course.discountPrice}{" "}
        <span className="font-light line-through ml-1">{course.listPrice}</span>
        <span
          className={`font-semibold text-lg ${
            course.discountPercent == 100 ? "text-red-600" : "text-green-700"
          } ml-2`}
        >
          {course.discountPercent}% off
        </span>
        {!moreLike && (
          <a
            href={`https://twitter.com/intent/tweet?url=${encodedTwitterUrl}`}
            rel="noopener"
            target="_blank"
            title="Share on Twitter"
            className={`ml-2 text-gray-500 hover:text-theme-hover`}
          >
            <svg
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-6 h-6 pt-1"
              viewBox="0 0 24 24"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
            </svg>
          </a>
        )}
      </p>
    </div>
  )
}
