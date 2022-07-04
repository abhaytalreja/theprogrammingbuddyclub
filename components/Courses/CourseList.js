import React from "react"
import CoursePreview from "./CoursePreview"

export default function CourseList({ courses }) {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {courses.map((course) => (
            <CoursePreview
              key={course.name.substring(course.name.lastIndexOf("/") + 1)}
              course={course.fields}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
