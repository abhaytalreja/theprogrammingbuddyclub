import React from "react"
import CoursePreview from "./CoursePreview"
import Link from "next/link"

export default function CourseList({ courses }) {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-4 mx-auto">
        {courses ? (
          <div className="flex flex-wrap -m-4">
            {courses.map((course, index) => (
              <>
                {course?.document ? (
                  <CoursePreview
                    index={index}
                    key={course.document.name.substring(
                      course.document.name.lastIndexOf("/") + 1
                    )}
                    course={course.document.fields}
                  />
                ) : (
                  <div>
                    No courses in this category so far. Please try other
                    categories and check out our latest courses{" "}
                    <Link href="/">
                      <a className="text-blue-500 underline">here</a>
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
              <a className="text-blue-500 underline">here</a>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
