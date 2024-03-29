import React from "react"
import CoursePreview from "./CoursePreview"
import Link from "next/link"
import LearderBoardAd from "../Ads/LearderBoardAd"

export default function CourseList({ courses, moreLike = false }) {
  return (
    <section className="text-gray-600 body-font container px-5 py-4 mx-auto">
      {courses ? (
        <div className="flex flex-wrap -m-4">
          {courses.map((course, index) => (
            <>
              {course?.document ? (
                <CoursePreview
                  index={index}
                  moreLike={moreLike}
                  id={course.document.name.substring(
                    course.document.name.lastIndexOf("/") + 1
                  )}
                  key={`course-item-${course.document.name.substring(
                    course.document.name.lastIndexOf("/") + 1
                  )}-${index}`}
                  course={course.document.fields}
                />
              ) : (
                <div>
                  No courses in this category so far. Please try other
                  categories and check out our latest courses{" "}
                  <Link href="/">
                    <a className="text-blue-600 underline">here</a>
                  </Link>
                </div>
              )}
            </>
          ))}
        </div>
      ) : (
        <div>
          No courses in this category so far. Please try other categories and
          check out our latest courses{" "}
          <Link href="/">
            <a className="text-blue-600 underline">here</a>
          </Link>
        </div>
      )}
    </section>
  )
}
