import React from "react"
import CoursePreview from "./CoursePreview"

export default function CourseList({ courses }) {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-4 mx-auto">
        <div className="flex flex-wrap -m-4">
          {courses.map((course, index) => (
            <CoursePreview
              index={index}
              key={course.document.name.substring(
                course.document.name.lastIndexOf("/") + 1
              )}
              course={course.document.fields}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
