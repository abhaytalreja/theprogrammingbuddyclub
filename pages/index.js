import Head from "next/head"
import Image from "next/image"
import CourseList from "@/components/Courses/CourseList"
import siteConfig from "config/siteConfig"
import FireStoreParser from "firestore-parser"

export default function Home({ freeCourses, discountCourses }) {
  return (
    <div className="px-4 md:px-12">
      <h1 className="flex flex-row md:inline-flex md:justify-between w-full">
        <div className="md:text-4xl text-xl font-bold py-2">
          The Programming Buddy Club
        </div>
        <div className="w-24 h-24">
          <Image
            src="/theprogrammingbuddyclub.png"
            alt="The Programming Buddy Club Logo"
            width={64}
            height={64}
          ></Image>
        </div>
      </h1>
      <h2 className="">
        The best place to find free Udemy Courses. Always updated, to save you
        the time.
      </h2>
      <h3 className="text-2xl bg-slate-50 font-semibold p-4 mt-8">
        Free Udemy Courses
      </h3>
      <CourseList courses={freeCourses} />
      <h3 className="text-2xl bg-slate-50 font-semibold p-4 mt-20">
        Discount Udemy Courses
      </h3>
      <CourseList courses={discountCourses} />
    </div>
  )
}

export async function getServerSideProps() {
  const pagination = {
    page: 1,
    pageSize: 6,
  }
  const courseFields = [
    { fieldPath: "discountPercent" },
    { fieldPath: "title" },
    { fieldPath: "avg_rating_recent" },
    { fieldPath: "num_subscribers" },
    { fieldPath: "listPrice" },
    { fieldPath: "discountPrice" },
    { fieldPath: "updateDate" },
    { fieldPath: "images" },
    { fieldPath: "campaign" },
  ]

  const firestoreQuery = {
    structuredQuery: {
      from: [{ collectionId: "courses" }],
      orderBy: [
        { field: { fieldPath: "updateDate" }, direction: "DESCENDING" },
      ],
      select: {
        fields: courseFields,
      },
      where: {
        compositeFilter: {
          filters: [
            {
              fieldFilter: {
                field: {
                  fieldPath: "discountPercent",
                },
                op: "EQUAL",
                value: {
                  integerValue: 100,
                },
              },
            },
          ],
          op: "AND",
        },
      },
      limit: 16,
    },
  }

  const discountQuery = {
    structuredQuery: {
      from: [{ collectionId: "courses" }],
      orderBy: [
        { field: { fieldPath: "discountPercent" }, direction: "ASCENDING" },
        { field: { fieldPath: "updateDate" }, direction: "DESCENDING" },
      ],
      select: {
        fields: courseFields,
      },
      where: {
        compositeFilter: {
          filters: [
            {
              fieldFilter: {
                field: {
                  fieldPath: "discountPercent",
                },
                op: "LESS_THAN",
                value: {
                  integerValue: 100,
                },
              },
            },
          ],
          op: "AND",
        },
      },
      limit: 16,
    },
  }

  // const response = await fetch(
  //   `https://firestore.googleapis.com/v1/projects/thepbcapp/databases/(default)/documents/courses?key=${siteConfig.FIRESTORE_KEY}`
  // )
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
  console.log("freeResponseJson", freeResponseJson)
  const freeCourses = await FireStoreParser(freeResponseJson)
  console.log("courses", freeCourses)

  const discountResponse = await fetch(
    `https://firestore.googleapis.com/v1/projects/thepbcapp/databases/(default)/documents:runQuery`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...discountQuery }),
    }
  )
  const discountResponseJson = await discountResponse.json()
  console.log("discountResponseJson", discountResponseJson)
  const discountCourses = await FireStoreParser(discountResponseJson)
  console.log("courses", discountCourses)

  return {
    props: {
      freeCourses,
      discountCourses,
      // posts,
      // templates,
    },
  }
}
