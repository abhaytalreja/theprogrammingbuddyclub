import React from "react"
import CourseContent from "@/components/Courses/CourseContent"
import siteConfig from "@/config/siteConfig"
import CustomHead from "@/components/common/CustomHead"
import DefaultErrorPage from "next/error"
import Head from "next/head"
import ErrorPage from "../404"
import FireStoreParser from "firestore-parser"

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
