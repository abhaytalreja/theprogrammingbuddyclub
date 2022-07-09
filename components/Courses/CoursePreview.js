import React from "react"
import Rating from "../common/Rating"
import Image from "next/image"
import TimeAgo from "javascript-time-ago"
import Link from "next/link"
import CategoryTag from "../Categories/CategoryTag"
// English.
import en from "javascript-time-ago/locale/en"
TimeAgo.addDefaultLocale(en)
// Create formatter (English).
const timeAgo = new TimeAgo("en-US")

export default function CoursePreview({ course, index, moreLike }) {
  return (
    <div
      className={`md:w-1/2 p-4 w-full ${moreLike ? " lg:w-1/3" : " lg:w-1/4"}`}
    >
      <div className="text-xs p-1 font-semibold bg-slate-50 text-gray-700 mb-1">
        Expiry {timeAgo.format(new Date(course.campaignEnd), "round")}
        {course.campaign.uses_remaining && (
          <span> or {course.campaign.uses_remaining} uses</span>
        )}
      </div>
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
              priority={index < 1 && course.discountPercent === 100}
            />
          </a>
        </Link>
      </div>
      <div className="mt-2">
        <h3
          className={`text-gray-900 title-font font-medium mb-2 ${
            moreLike ? " text-sm" : "text-font"
          }`}
        >
          <Link href={`${course.url.replace(/.*\/\/[^\/]*/, "")}`}>
            {course.title}
          </Link>
        </h3>
        {!moreLike && (
          <CategoryTag
            title={course.primary_category.title}
            title_cleaned={course.primary_category.title_cleaned}
          />
        )}
        {!moreLike && (
          <CategoryTag
            title={course.primary_subcategory.title}
            title_cleaned={course.primary_subcategory.title_cleaned}
          />
        )}
        <div className="text-amber-500 font-bold flex justify-start py-1 mt-2">
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
        <p className="text-gray-600 text-md font-bold">
          {course.discountPrice}{" "}
          <span className="font-light line-through ml-1">
            {course.listPrice}
          </span>
          <span
            className={`font-semibold text-lg ${
              course.discountPercent == 100 ? "text-red-600" : "text-green-700"
            } ml-2`}
          >
            {course.discountPercent}% off
          </span>
        </p>
      </div>
    </div>
  )
}
