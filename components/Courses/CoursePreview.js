import React from "react"
import Rating from "../common/Rating"

export default function CoursePreview() {
  return (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
      <a className="block relative h-48 rounded overflow-hidden">
        <img
          alt="ecommerce"
          className="object-cover object-center w-full h-full block"
          src="https://dummyimage.com/420x260"
        />
      </a>
      <div className="mt-2">
        <h3 className="text-gray-900 title-font font-medium">The Catalyzer</h3>
        <p className="text-gray-600 text-xs">Instructor</p>
        <div className="text-amber-500 font-bold flex justify-start py-1">
          <Rating rating={2.8} />{" "}
          <span className="text-gray-600 text-xs font-normal ml-2">(123)</span>
        </div>
        <p className="text-gray-600 text-md font-bold">
          $16.00 <span className="font-light line-through">$32.22</span>
        </p>
      </div>
    </div>
  )
}
