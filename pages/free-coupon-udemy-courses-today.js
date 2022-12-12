import TodayCourse from "@/components/common/TodayCourse"
import React from "react"
import FireStoreParser from "firestore-parser"
import DailyImage from "@/components/common/DailyImage"
import * as htmlToImage from "html-to-image"
import siteConfig from "@/config/siteConfig"
import CustomHead from "@/components/common/CustomHead"

function getPreviousDay(date = new Date()) {
  const previous = new Date(date.getTime())
  previous.setDate(date.getDate() - 1)

  return previous
}

const startOfDay = getPreviousDay()
startOfDay.setUTCHours(0, 0, 0, 0)
const startTimestamp = +Date.parse(startOfDay)

const endOfDay = new Date()
endOfDay.setUTCHours(23, 59, 59, 999)
const endTimestamp = +Date.parse(endOfDay)

const courseFields = [
  { fieldPath: "discountPercent" },
  { fieldPath: "savingPrice" },
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
                fieldPath: "isFree",
              },
              op: "EQUAL",
              value: {
                booleanValue: true,
              },
            },
          },
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
    limit: 50,
  },
}

export default function Today({ courses }) {
  const sortedCourses =
    courses && courses.length > 0
      ? courses.sort((a, b) =>
          a.document.fields.discountPercent > b.document.fields.discountPercent
            ? -1
            : 1
        )
      : []
  const savings =
    courses && courses.length > 0
      ? sortedCourses.reduce((accumulator, course) => {
          const price = course.document?.fields.savingPrice
            .replace(/\s+/g, " ")
            .trim()
            .replace(" $US", "")
            .replace(" US$", "")
            .replace("US$", "")
            .replace(" USD", "")
            .replace(" US", "")
            .replace(",", ".")
            .replace("$", "")
            .replace("Free", 0)
            .replace("Gratis", 0)
            .replace("Gratuito", 0)
            .replace("Gratuit", 0)
            .replace("Kostenlos", 0)
            .replace("Ücretsiz", 0)
          console.log(course.document?.fields.savingPrice, price)
          return accumulator + +price
        }, 0)
      : 0

  // console.log("savings ----", savings)
  const downloadImage = () => {
    var node = document.getElementById("today-image")

    htmlToImage
      .toPng(node)
      .then(function (dataUrl) {
        var img = new Image()
        img.src = dataUrl
        document.body.appendChild(img)
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error)
      })
  }

  return (
    <>
      <CustomHead
        title="Free Udemy Coupons"
        imageUrl={siteConfig.imageUrl}
        keywords={siteConfig.keywords}
        description={siteConfig.description}
        website={siteConfig.url + "/free-coupon-udemy-courses-today"}
      />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="mx-auto w-1/2 mb-8">
            <DailyImage savings={Math.floor(savings)} />
            <h2 className="font-bold text-2xl my-4">
              Free & Discount Online Courses for Today
            </h2>
            <p className="">
              List of Free and Discounted Online Courses posted Every single
              day. This list of free Online courses get updated everyday. So
              bookmark this page and keep learning!
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
          <button onClick={downloadImage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-download text-gray-200"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
              <polyline points="7 11 12 16 17 11"></polyline>
              <line x1={12} y1={4} x2={12} y2={16}></line>
            </svg>
          </button>
        </div>
      </section>
    </>
  )
}

export async function getServerSideProps() {
  // const response = await fetch(
  //   `https://firestore.googleapis.com/v1/projects/thepbcapp/databases/(default)/documents/courses?key=${siteConfig.FIRESTORE_KEY}`
  // )
  // console.log("start", startTimestamp)
  // console.log("end", endTimestamp)
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
  // console.log("freeCourses", freeCourses)

  return {
    props: {
      courses: freeCourses,
    },
  }
}
