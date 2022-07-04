import React from "react"
import Rating from "../common/Rating"

export default function CoursePreview({ course }) {
  console.log({ course })
  return (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
      <a className="block relative h-48 rounded overflow-hidden">
        <div className="relative w-full z-10">
          <div
            className={`origin-top float-left mt-8 w-24 text-center absolute -left-20 -top-4 text-sm md:text-md ${
              course.discountPercent == 100
                ? "bg-red-400"
                : "bg-gray-700 text-white"
            }`}
            style={{ transform: "translateX(50%) rotate(-45deg)" }}
          >
            <div className="font-bold">
              {course.discountPercent == 100 ? "Free" : "Paid"}
            </div>
          </div>
        </div>
        <img
          alt="ecommerce"
          className="object-cover object-center w-full h-full block"
          src="https://dummyimage.com/420x260"
        />
      </a>
      <div className="mt-2">
        <h3 className="text-gray-900 title-font font-medium">{course.title}</h3>
        <div className="text-amber-500 font-bold flex justify-start py-1">
          <Rating rating={course.avg_rating_recent} />{" "}
          <span className="text-gray-600 text-xs font-normal ml-2">
            {"("}
            {course.num_subscribers}
            {")"}
          </span>
        </div>
        <p className="text-gray-600 text-md font-bold">
          {course.discountPrice}{" "}
          <span className="font-light line-through ml-1">
            {course.listPrice}
          </span>
          <span
            className={`font-semibold ${
              course.discountPercent == 100 ? "text-red-500" : "text-amber-600"
            } ml-2`}
          >
            {course.discountPercent}% off
          </span>
        </p>
      </div>
    </div>
  )
}
