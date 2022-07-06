import CourseList from "@/components/Courses/CourseList"
import FireStoreParser from "firestore-parser"
import { useState } from "react"
// import dynamic from "next/dynamic"
// import { Suspense } from "react"
import Link from "next/link"

// const CategoriesList = dynamic(
//   () => import("@/components/Categories/CategoriesList"),
//   {
//     suspense: true,
//   }
// )

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
  { fieldPath: "campaignEnd" },
  { fieldPath: "url" },
]

const firestoreQuery = {
  structuredQuery: {
    from: [{ collectionId: "courses" }],
    orderBy: [{ field: { fieldPath: "updateDate" }, direction: "ASCENDING" }],
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
    limit: 8,
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
    limit: 8,
  },
}

const nowNumber = +Date.parse(new Date())
const expiredQuery = {
  structuredQuery: {
    from: [{ collectionId: "courses" }],
    orderBy: [{ field: { fieldPath: "campaignEnd" }, direction: "DESCENDING" }],
    select: {
      fields: courseFields,
    },
    where: {
      compositeFilter: {
        filters: [
          {
            fieldFilter: {
              field: {
                fieldPath: "campaignEnd",
              },
              op: "LESS_THAN_OR_EQUAL",
              value: {
                integerValue: nowNumber,
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

export default function Home({ freeCourses, discountCourses, expiredCourses }) {
  const [showMoreFreeCourses, setShowMoreFreeCourses] = useState(
    freeCourses.length > 0 && freeCourses.length % 8 == 0
  )
  const [showMoreDiscountCourses, setShowMoreDiscountCourses] = useState(
    discountCourses.length > 0 && discountCourses.length % 8 == 0
  )
  const [showMoreExpiredCourses, setShowMoreExpiredCourses] = useState(
    expiredCourses.length > 0 && expiredCourses.length % 8 == 0
  )

  const [totalFreeCourses, setTotalFreeCourses] = useState(freeCourses)
  const [totalDiscountCourses, setTotalDiscountCourses] =
    useState(discountCourses)
  const [totalExpiredCourses, setTotalExpiredCourses] = useState(expiredCourses)

  const loadMoreFreeCourses = async (type) => {
    if (type === "free") {
      firestoreQuery.structuredQuery.offset = totalFreeCourses.length

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
      const newFetchedCourses = [...totalFreeCourses, ...fetchedCourses]
      setTotalFreeCourses(newFetchedCourses)
      setShowMoreFreeCourses(newFetchedCourses.length % 8 == 0)
    } else if (type === "discount") {
      discountQuery.structuredQuery.offset = totalDiscountCourses.length

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
      const fetchedCourses = await FireStoreParser(discountResponseJson)
      fetchedCourses.shift()
      const newFetchedCourses = [...totalDiscountCourses, ...fetchedCourses]
      setTotalDiscountCourses(newFetchedCourses)
      setShowMoreDiscountCourses(newFetchedCourses.length % 8 == 0)
    } else if (type === "expired") {
      expiredQuery.structuredQuery.offset = totalExpiredCourses.length

      const expiredResponse = await fetch(
        `https://firestore.googleapis.com/v1/projects/thepbcapp/databases/(default)/documents:runQuery`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...expiredQuery }),
        }
      )
      const expiredResponseJson = await expiredResponse.json()
      const fetchedCourses = await FireStoreParser(expiredResponseJson)
      fetchedCourses.shift()
      const newFetchedCourses = [...totalExpiredCourses, ...fetchedCourses]
      setTotalExpiredCourses(newFetchedCourses)
      setShowMoreExpiredCourses(newFetchedCourses.length % 8 == 0)
    }
  }
  return (
    <div className="px-4 md:px-12 mt-8">
      <h1 className="flex flex-row md:inline-flex md:justify-between w-full">
        <div className="text-xl font-bold py-2">The Programming Buddy Club</div>
      </h1>
      <h2 className="">
        Learning Should be free. We at{" "}
        <Link href="/">theprogrammingbuddy.club</Link> make sure that you get
        the latest and the best Udemy courses for Free. The best Udemy Free
        Coupons website that is updated with the latest coupons and also gives
        you an idean on how much time you have to enroll in the Udemy course.
      </h2>
      <h3 className="text-2xl bg-slate-50 font-semibold p-4 mt-8">
        Free Udemy Courses
      </h3>
      <CourseList courses={totalFreeCourses} />
      {showMoreFreeCourses && (
        <div className="w-full flex justify-center mt-8">
          <button
            className="px-4 py-2 bg-theme hover:bg-theme text-white font-bold text-2xl w-2/3"
            onClick={() => loadMoreFreeCourses("free")}
          >
            Load More
          </button>
        </div>
      )}
      <h3 className="text-2xl bg-slate-50 font-semibold p-4 mt-20">
        Discount Udemy Courses
      </h3>
      <CourseList courses={totalDiscountCourses} />
      {showMoreDiscountCourses && (
        <div className="w-full flex justify-center mt-8">
          <button
            className="px-4 py-2 bg-theme hover:bg-theme text-white font-bold text-2xl w-2/3"
            onClick={() => loadMoreFreeCourses("discount")}
          >
            Load More
          </button>
        </div>
      )}
      <h3 className="text-2xl bg-slate-50 font-semibold p-4 mt-20">
        Expired Udemy Courses
      </h3>
      <CourseList courses={totalExpiredCourses} />
      {showMoreExpiredCourses && (
        <div className="w-full flex justify-center mt-8">
          <button
            className="px-4 py-2 bg-theme hover:bg-theme text-white font-bold text-2xl w-2/3"
            onClick={() => loadMoreFreeCourses("expired")}
          >
            Load More
          </button>
        </div>
      )}
      {/* <Suspense fallback={`Loading...`}>
        <CategoriesList />
      </Suspense> */}
    </div>
  )
}

export async function getServerSideProps() {
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
  const freeCourses = await FireStoreParser(freeResponseJson)
  console.log("freeCourses", freeCourses)

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
  const discountCourses = await FireStoreParser(discountResponseJson)
  console.log("discountCourses", discountCourses)

  const expiredResponse = await fetch(
    `https://firestore.googleapis.com/v1/projects/thepbcapp/databases/(default)/documents:runQuery`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...expiredQuery }),
    }
  )
  const expiredResponseJson = await expiredResponse.json()
  const expiredCourses = await FireStoreParser(expiredResponseJson)

  console.log("expiredCourses", expiredCourses)

  return {
    props: {
      freeCourses,
      discountCourses,
      expiredCourses: expiredCourses.length === 1 ? [] : expiredCourses,
      // posts,
      // templates,
    },
  }
}
