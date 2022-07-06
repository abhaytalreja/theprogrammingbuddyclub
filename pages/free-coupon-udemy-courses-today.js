import TodayCourse from "@/components/common/TodayCourse"
import React from "react"
import FireStoreParser from "firestore-parser"
import DailyImage from "@/components/common/DailyImage"

const startOfDay = new Date()
startOfDay.setUTCHours(0, 0, 0, 0)
const startTimestamp = +Date.parse(startOfDay)

const endOfDay = new Date()
endOfDay.setUTCHours(23, 59, 59, 999)
const endTimestamp = +Date.parse(endOfDay)

const courseFields = [
  { fieldPath: "discountPercent" },
  { fieldPath: "title" },
  { fieldPath: "discountPrice" },
  { fieldPath: "updateDate" },
  { fieldPath: "searchUrl" },
]

const firestoreQuery = {
  structuredQuery: {
    from: [{ collectionId: "courses" }],
    orderBy: [{ field: { fieldPath: "updateDate" }, direction: "DESCENDING" }],
    select: {
      fields: courseFields,
    },
    where: {
      compositeFilter: {
        filters: [
          {
            fieldFilter: {
              field: {
                fieldPath: "updateDate",
              },
              op: "LESS_THAN",
              value: {
                integerValue: endTimestamp / 1000,
              },
            },
          },
          {
            fieldFilter: {
              field: {
                fieldPath: "updateDate",
              },
              op: "GREATER_THAN",
              value: {
                integerValue: startTimestamp / 1000,
              },
            },
          },
        ],
        op: "AND",
      },
    },
  },
}

export default function Today({ courses }) {
  const sortedCourses = courses.sort((a, b) =>
    a.document.fields.discountPercent > b.document.fields.discountPercent
      ? -1
      : 1
  )
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="mx-auto w-1/2 mb-8">
          <DailyImage />
          <h2 className="font-bold text-2xl my-4">
            Free & Discount Udemy Courses for Today
          </h2>
          <p className="">
            List of Free and Discounted Udemy Courses posted Every single day.
            This list of free udemy courses get updated everyday. So bookmark
            this page and keep learning!
          </p>
        </div>
        <div className="flex flex-wrap w-full justify-center">
          <div className="md:pr-10 md:py-6">
            {sortedCourses.map((course, index) => (
              <TodayCourse
                course={course}
                isLast={courses.length - 1 === index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps() {
  // const response = await fetch(
  //   `https://firestore.googleapis.com/v1/projects/thepbcapp/databases/(default)/documents/courses?key=${siteConfig.FIRESTORE_KEY}`
  // )
  console.log("start", startTimestamp)
  console.log("end", endTimestamp)
  const freeResponse = await fetch(
    `https://firestore.googleapis.com/v1/projects/thepbcapp/databases/(default)/documents:runQuery`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...firestoreQuery }),
    }
  )
  const freeResponseJson = await freeResponse.json()
  const freeCourses = await FireStoreParser(freeResponseJson)
  console.log("freeCourses", freeCourses)

  return {
    props: {
      courses: freeCourses,
    },
  }
}
