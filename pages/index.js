import CourseList from '@/components/Courses/CourseList'
import FireStoreParser from 'firestore-parser'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Link from 'next/link'
import Subscribe from '@/components/common/Subscribe'
import Tools from '@/components/common/Tools'
// import LearderBoardAd from "@/components/Ads/LearderBoardAd"
import UdemyFaq from '@/components/common/UdemyFaq'
import Image from 'next/image'

const udemyLinks = [
  { country: 'IN', src: '/ad/udemy/udemy_india_728_90.png', link: '' },
  { country: 'ID', src: '/ad/udemy/udemy_indonesia_728_90.png' },
  { country: 'SG', src: '/ad/udemy/udemy_singapore_728_90.png' },
  { country: 'GB', src: '/ad/udemy/udemy_uk_728_90.png' },
]

const CategoriesList = dynamic(
  () => import('@/components/Categories/CategoriesList'),
  {
    suspense: true,
  }
)

const courseFields = [
  { fieldPath: 'discountPercent' },
  { fieldPath: 'title' },
  { fieldPath: 'avg_rating_recent' },
  { fieldPath: 'num_subscribers' },
  { fieldPath: 'listPrice' },
  { fieldPath: 'discountPrice' },
  { fieldPath: 'updateDate' },
  { fieldPath: 'images.image_240x135' },
  { fieldPath: 'campaign.end_time' },
  { fieldPath: 'campaign.uses_remaining' },
  { fieldPath: 'campaignEnd' },
  { fieldPath: 'url' },
  { fieldPath: 'primary_category.title_cleaned' },
  { fieldPath: 'primary_category.title' },
  { fieldPath: 'primary_subcategory.title_cleaned' },
  { fieldPath: 'primary_subcategory.title' },
  { fieldPath: 'child_category.title_cleaned' },
  { fieldPath: 'child_category.title' },
  { fieldPath: 'isFree' },
  { fieldPath: 'isPaid' },
]

const firestoreQuery = {
  structuredQuery: {
    from: [{ collectionId: 'courses' }],
    orderBy: [{ field: { fieldPath: 'updateDate' }, direction: 'DESCENDING' }],
    select: {
      fields: courseFields,
    },
    where: {
      compositeFilter: {
        filters: [
          {
            fieldFilter: {
              field: {
                fieldPath: 'isFree',
              },
              op: 'EQUAL',
              value: {
                booleanValue: true,
              },
            },
          },
        ],
        op: 'AND',
      },
    },
    limit: 8,
  },
}

const discountQuery = {
  structuredQuery: {
    from: [{ collectionId: 'courses' }],
    orderBy: [
      // { field: { fieldPath: "isPaid" }, direction: "DESCENDING" },
      { field: { fieldPath: 'updateDate' }, direction: 'DESCENDING' },
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
                fieldPath: 'isPaid',
              },
              op: 'EQUAL',
              value: {
                booleanValue: true,
              },
            },
          },
        ],
        op: 'AND',
      },
    },
    limit: 8,
  },
}

const nowNumber = +Date.parse(new Date())
export default function Home({ freeCourses, discountCourses }) {
  const [udemyAdSource, setUdemyAdSource] = useState(
    '/ad/udemy/udemy_uk_728_90.png'
  )
  const geoJson = fetch(
    'https://geolocation.onetrust.com/cookieconsentpub/v1/geo/location',
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      const linkFound = udemyLinks.find((li) => li.country === data.country)
      setUdemyAdSource(
        linkFound ? linkFound.src : '/ad/udemy/udemy_uk_728_90.png'
      )
    })

  const [showMoreFreeCourses, setShowMoreFreeCourses] = useState(
    freeCourses.length > 0 && freeCourses.length % 8 == 0
  )
  const [showMoreDiscountCourses, setShowMoreDiscountCourses] = useState(
    discountCourses.length > 0 && discountCourses.length % 8 == 0
  )

  const [totalFreeCourses, setTotalFreeCourses] = useState(freeCourses)
  const [totalDiscountCourses, setTotalDiscountCourses] =
    useState(discountCourses)

  const loadMoreFreeCourses = async (type) => {
    if (type === 'free') {
      firestoreQuery.structuredQuery.offset = totalFreeCourses.length

      const freeResponse = await fetch(
        `https://firestore.googleapis.com/v1/projects/thepbcapp/databases/(default)/documents:runQuery`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
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
    } else if (type === 'discount') {
      discountQuery.structuredQuery.offset = totalDiscountCourses.length

      const discountResponse = await fetch(
        `https://firestore.googleapis.com/v1/projects/thepbcapp/databases/(default)/documents:runQuery`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
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
    }
  }

  // let adBlockDisabled = false

  // const isSSR = typeof window === "undefined"
  // if (!isSSR) {
  //   let test = new Request(
  //     "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
  //     // "https://static.ads-twitter.com/uwt.js",
  //     { method: "HEAD", mode: "no-cors" }
  //   )

  //   // (B) FIRE THE REQEST
  //   fetch(test)
  //     .then((res) => {
  //       adBlockDisabled = true
  //     })
  //     .catch((err) => {
  //       alert(
  //         "The website will not function well if you are using Adblock, Please disable it and refresh the page. If that didn't work you may change the browser"
  //       )
  //     })
  // }
  return (
    <div className="px-4 md:px-12 mt-8">
      <h1 className="flex flex-row md:inline-flex md:justify-between w-full text-xl font-bold py-2">
        The Programming Buddy Club
      </h1>
      <h2 className="">
        Learning Should be free. We at{' '}
        <Link href="/">theprogrammingbuddy.club</Link> make sure that you get
        the latest and the best Udemy courses for Free or a at a discount. We do
        keep track of regular updates on these coupons so you don't need to.
        Some of the online course platforms like Udemy have a strict policy on
        the life of these discount coupons. Udemy coupons las for 3 - 30 days
        depending on the type of coupon the instructor is promoting it with.
      </h2>
      <p className="mb-8">
        If you like to view a list of courses and an easy way to share all our
        daily courses, you can{' '}
        <Link
          href="/free-coupon-udemy-courses-today"
          title="Latest Udemy Free & Discout coupons"
        >
          <a className="text-blue-600 underline">check this page</a>
        </Link>
      </p>
      {/* <div className="my-4">
        <Subscribe />
      </div> */}
      <a
        href="https://click.linksynergy.com/fs-bin/click?id=i*IXi5qsT7c&offerid=1074530.221&subid=0&type=4"
        target="_blank"
        className="mt-8"
      >
        <Image
          alt="Udemy UK"
          layout="responsive"
          width={728}
          height={90}
          src={udemyAdSource}
        />
      </a>
      <h3 className="text-2xl bg-slate-50 font-semibold p-4 my-8">
        Free Udemy Courses
      </h3>
      {/* <LearderBoardAd /> */}
      <CourseList courses={totalFreeCourses} />
      {showMoreFreeCourses && (
        <div className="w-full flex justify-center mt-8">
          <button
            className="px-4 py-2 bg-theme hover:bg-theme text-white font-bold text-2xl w-2/3"
            onClick={() => loadMoreFreeCourses('free')}
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
            onClick={() => loadMoreFreeCourses('discount')}
          >
            Load More
          </button>
        </div>
      )}
      <Tools />
      <Suspense fallback={`Loading...`}>
        <CategoriesList />
        <UdemyFaq />
      </Suspense>
    </div>
  )
}

const cache = new Map()
const CACHE_TTL = 30 * 60 * 1000 // 30 minutes

export async function getServerSideProps() {
  const cacheKey = 'home_page_courses'
  if (cache.has(cacheKey)) {
    const { data, timestamp } = cache.get(cacheKey)
    if (Date.now() - timestamp < CACHE_TTL) {
      return { props: data }
    }
  }

  const freeQuery = {
    structuredQuery: {
      from: [{ collectionId: 'courses' }],
      orderBy: [
        { field: { fieldPath: 'updateDate' }, direction: 'DESCENDING' },
      ],
      select: {
        fields: courseFields,
      },
      where: {
        fieldFilter: {
          field: { fieldPath: 'isFree' },
          op: 'EQUAL',
          value: { booleanValue: true },
        },
      },
      limit: 8,
    },
  }

  const discountQuery = {
    structuredQuery: {
      from: [{ collectionId: 'courses' }],
      orderBy: [
        { field: { fieldPath: 'updateDate' }, direction: 'DESCENDING' },
      ],
      select: {
        fields: courseFields,
      },
      where: {
        fieldFilter: {
          field: { fieldPath: 'isFree' },
          op: 'EQUAL',
          value: { booleanValue: false },
        },
      },
      limit: 8,
    },
  }

  try {
    const freeResponse = await fetch(
      `https://firestore.googleapis.com/v1/projects/thepbcapp/databases/(default)/documents:runQuery`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(freeQuery),
      }
    )
    const freeResponseJson = await freeResponse.json()
    const freeCourses = await FireStoreParser(freeResponseJson)

    const discountResponse = await fetch(
      `https://firestore.googleapis.com/v1/projects/thepbcapp/databases/(default)/documents:runQuery`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(discountQuery),
      }
    )
    const discountResponseJson = await discountResponse.json()
    const discountCourses = await FireStoreParser(discountResponseJson)

    console.log('Free courses raw response:', freeResponseJson)
    console.log('Discount courses raw response:', discountResponseJson)

    const data = {
      freeCourses: freeCourses.filter(
        (course) => course && course.document && course.document.fields
      ),
      discountCourses: discountCourses.filter(
        (course) => course && course.document && course.document.fields
      ),
    }

    cache.set(cacheKey, { data, timestamp: Date.now() })

    return { props: data }
  } catch (error) {
    console.error('Error fetching courses:', error)
    return {
      props: {
        freeCourses: [],
        discountCourses: [],
        error: 'Failed to fetch courses',
      },
    }
  }
}
