import React from "react"

export default function TodayCourse({ course, isLast }) {
  return (
    <div className="flex relative pb-12">
      {!isLast && (
        <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
          <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
        </div>
      )}
      {course.document && course.document.fields && (
        <>
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-theme inline-flex items-center justify-center text-white relative z-10">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
              <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
          </div>
          <div className="flex-grow pl-4">
            <p className="leading-relaxed flex flex-col">
              <span>{course.document.fields.title}</span>
              <pan>
                {course.document.fields.discountPercent === 100
                  ? "Free Online Course - Enroll Now"
                  : "Discount Online Coupon - Save Now"}
              </pan>
              <a
                href={`https://theprogrammingbuddy.club${course.document.fields.searchUrl}`}
                className="text-blue-600 underline cursor-pointer"
                target="_blank"
              >
                https://theprogrammingbuddy.club
                {course.document.fields.searchUrl}
              </a>
            </p>
          </div>
        </>
      )}
    </div>
  )
}
