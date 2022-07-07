import React, { useState } from "react"
import FireStoreParser from "firestore-parser"
import CourseList from "@/components/Courses/CourseList"
import Link from "next/link"

const courseFields = [
  { fieldPath: "discountPercent" },
  { fieldPath: "title" },
  { fieldPath: "avg_rating_recent" },
  { fieldPath: "num_subscribers" },
  { fieldPath: "listPrice" },
  { fieldPath: "discountPrice" },
  { fieldPath: "updateDate" },
  { fieldPath: "images.image_480x270" },
  { fieldPath: "campaign.end_time" },
  { fieldPath: "campaign.uses_remaining" },
  { fieldPath: "campaignEnd" },
  { fieldPath: "url" },
  { fieldPath: "primary_category.title_cleaned" },
  { fieldPath: "primary_category.title" },
  { fieldPath: "primary_subcategory.title_cleaned" },
  { fieldPath: "primary_subcategory.title" },
]

const firestoreQuery = {
  structuredQuery: {
    from: [{ collectionId: "courses" }],
    select: {
      fields: courseFields,
    },
    where: {
      compositeFilter: {
        filters: [
          {
            fieldFilter: {
              field: {
                fieldPath: "primary_category.title_cleaned",
              },
              op: "EQUAL",
              value: {
                stringValue: "",
              },
            },
            fieldFilter: {
              field: {
                fieldPath: "primary_subcategory.title_cleaned",
              },
              op: "EQUAL",
              value: {
                stringValue: "",
              },
            },
          },
        ],
        op: "AND",
      },
    },
    limit: 8,
  },
}

export default function Category({ courses, slug }) {
  const [showMoreCourses, setShowMoreCourses] = useState(
    courses.length > 0 && courses.length % 8 == 0
  )
  const [totalCourses, setTotalCourses] = useState(courses)

  const loadMoreFreeCourses = async () => {
    firestoreQuery.structuredQuery.offset = totalCourses.length
    firestoreQuery.structuredQuery.where.compositeFilter.filters[0].fieldFilter.value.stringValue =
      slug
    firestoreQuery.structuredQuery.where.compositeFilter.filters[0].fieldFilter.value.stringValue =
      slug

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
    const fetchedCourses = await FireStoreParser(freeResponseJson)
    fetchedCourses.shift()
    const newFetchedCourses = [...totalCourses, ...fetchedCourses]
    setTotalCourses(newFetchedCourses)
    setShowMoreCourses(newFetchedCourses.length % 8 == 0)
  }
  return (
    <div>
      <h3 className="text-2xl bg-slate-50 font-semibold p-4 mt-8">
        <Link href={`/category/${slug}`}>
          <a>
            Free Udemy Courses for{" "}
            <span className="uppercase">{slug.replace("-", " ")}</span>
          </a>
        </Link>
      </h3>
      <CourseList courses={totalCourses} />
      {showMoreCourses && (
        <div className="w-full flex justify-center mt-8">
          <button
            className="px-4 py-2 bg-theme hover:bg-theme text-white font-bold text-2xl w-2/3"
            onClick={() => loadMoreFreeCourses()}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  )
}

export async function getServerSideProps({ query: { slug } }) {
  firestoreQuery.structuredQuery.where.compositeFilter.filters[0].fieldFilter.value.stringValue =
    slug
  firestoreQuery.structuredQuery.where.compositeFilter.filters[0].fieldFilter.value.stringValue =
    slug

  const categoryResponse = await fetch(
    `https://firestore.googleapis.com/v1/projects/thepbcapp/databases/(default)/documents:runQuery`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...firestoreQuery }),
    }
  )
  const categoryResponseJson = await categoryResponse.json()
  const courses = await FireStoreParser(categoryResponseJson)

  return {
    props: {
      courses: courses && courses.length > 0 ? courses : [],
      slug,
    },
  }
}
