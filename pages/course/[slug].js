import React from "react"
import CourseContent from "@/components/Courses/CourseContent"
import siteConfig from "@/config/siteConfig"
import CustomHead from "@/components/common/CustomHead"
import DefaultErrorPage from "next/error"
import Head from "next/head"
import ErrorPage from "../404"
import FireStoreParser from "firestore-parser"

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
  { fieldPath: "slider_menu.data.num_reviews" },
  { fieldPath: "description" },
  { fieldPath: "slider_menu.data.badge_family" },
  { fieldPath: "slider_menu.data.num_reviews" },
  { fieldPath: "visible_instructors" },
  { fieldPath: "lastUpdated" },
  { fieldPath: "courseLocale" },
  { fieldPath: "caption" },
  { fieldPath: "curriculum_context" },
  { fieldPath: "incentives" },
  { fieldPath: "whatYouLearn" },
  { fieldPath: "courseDescription" },
  { fieldPath: "reviews_context" },
  { fieldPath: "link" },
]

export default function Course({ course }) {
  return (
    <>
      {course && course.title ? (
        <>
          <div id="content">
            <CourseContent course={course} />
          </div>
        </>
      ) : (
        <>
          <Head>
            <meta name="robots" content="noindex" />
          </Head>
          <ErrorPage statusCode={404} />
        </>
      )}
    </>
  )
}

export async function getServerSideProps({ query: { slug } }) {
  const searchUrl = `/course/${slug}/`

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
                  fieldPath: "searchUrl",
                },
                op: "EQUAL",
                value: {
                  stringValue: searchUrl,
                },
              },
            },
          ],
          op: "AND",
        },
      },
      limit: 1,
    },
  }

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
  const courses = await FireStoreParser(freeResponseJson)

  return {
    props: {
      course: courses && courses[0]?.document ? courses[0].document.fields : {},
    },
  }
}
