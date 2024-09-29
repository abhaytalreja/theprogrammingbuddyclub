import React from 'react'
import CourseContent from '@/components/Courses/CourseContent'
import siteConfig from '@/config/siteConfig'
import CustomHead from '@/components/common/CustomHead'
import Head from 'next/head'
import ErrorPage from '../404'
import FireStoreParser from 'firestore-parser'
import UdemyFaq from '@/components/common/UdemyFaq'
import { useRouter } from 'next/router'

const keyword_extractor = require('keyword-extractor')

const courseFields = [
  { fieldPath: 'discountPercent' },
  { fieldPath: 'title' },
  { fieldPath: 'avg_rating_recent' },
  { fieldPath: 'num_subscribers' },
  { fieldPath: 'listPrice' },
  { fieldPath: 'discountPrice' },
  { fieldPath: 'updateDate' },
  { fieldPath: 'images.image_480x270' },
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
  { fieldPath: 'slider_menu.data.num_reviews' },
  { fieldPath: 'description' },
  { fieldPath: 'slider_menu.data.badge_family' },
  { fieldPath: 'slider_menu.data.num_reviews' },
  { fieldPath: 'visible_instructors' },
  { fieldPath: 'lastUpdated' },
  { fieldPath: 'courseLocale' },
  { fieldPath: 'caption' },
  { fieldPath: 'curriculum_context' },
  { fieldPath: 'incentives' },
  { fieldPath: 'whatYouLearn' },
  { fieldPath: 'courseDescription' },
  { fieldPath: 'reviews_context' },
  { fieldPath: 'link' },
  { fieldPath: 'searchUrl' },
]

const highlightImportant = (text) => {
  const importantWords = ['CSS', 'JavaScript', 'HTML', 'DOM', 'Ajax']
  return importantWords.reduce((acc, word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi')
    return acc.replace(regex, `<strong>${word}</strong>`)
  }, text)
}

const formatDescription = (description) => {
  // Split the description into sections
  const sections = description.split(/(?=\d+\)|\*|Who this course is for:)/)

  // Process each section
  return sections.map((section) => {
    section = section.trim()

    // If the section starts with a number and ), it's likely a main topic
    if (/^\d+\)/.test(section)) {
      return `<h3>${section}</h3>`
    }

    // If the section starts with "Who this course is for:", it's the target audience
    if (section.startsWith('Who this course is for:')) {
      return `<h3>${section.split(':')[0]}:</h3><p>${section.split(':')[1]}</p>`
    }

    // If the section starts with *, it's likely a list of topics
    if (section.startsWith('*')) {
      const topics = section
        .split('\n')
        .map((topic) => topic.trim().replace('*', '').trim())
      return `<ul>${topics.map((topic) => `<li>${topic}</li>`).join('')}</ul>`
    }

    // Otherwise, it's a regular paragraph
    return `<p>${section}</p>`
  })
}

export default function Course({ course }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const formattedDescription = formatDescription(course.description)

  const generateKeywords = (course) => {
    const keywords = [
      course.primary_category.title,
      course.primary_category.title_cleaned,
      course.primary_subcategory.title,
      course.primary_subcategory.title_cleaned,
    ]

    if (course.child_category) {
      keywords.push(course.child_category.title)
      keywords.push(course.child_category.title_cleaned)
    }

    // Add some general keywords
    keywords.push('online course', 'udemy', 'learning', 'education')

    // Remove duplicates and empty strings
    return [...new Set(keywords)].filter(Boolean).join(', ')
  }

  return (
    <>
      {course && course.title ? (
        <>
          <CustomHead
            title={`${course.title} | Free Udemy Course ${
              course.primary_category.title_cleaned
            }, ${course.primary_subcategory.title_cleaned}, ${
              course?.child_category?.title || ''
            }`}
            imageUrl={course.images.image_480x270}
            keywords={generateKeywords(course)}
            description={course.description}
            website={siteConfig.url + course.searchUrl}
          />
          <div id="content">
            <CourseContent course={course} />
            <div className="course-description">
              <h2>Course Description</h2>
              {formattedDescription.map((section, index) => (
                <div
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: highlightImportant(section),
                  }}
                />
              ))}
            </div>
          </div>
          <UdemyFaq />
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

export async function getStaticPaths() {
  return {
    paths: [], // We'll generate all paths on-demand
    fallback: 'blocking', // Show a loading state
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params
  const searchUrl = `/course/${slug}/`

  // Check referrer
  const allowedReferers = [
    'https://theprogrammingbuddy.club',
    'https://www.theprogrammingbuddy.club',
    // 'http://localhost:3000', // Add localhost
    // 'http://localhost', // Add localhost without port
  ]

  // In a server-side environment, we don't have access to the headers directly
  // So we'll skip the referrer check for now
  // You can implement a more robust solution using middleware if needed

  const firestoreQuery = {
    structuredQuery: {
      from: [{ collectionId: 'courses' }],
      select: {
        fields: courseFields,
      },
      where: {
        compositeFilter: {
          filters: [
            {
              fieldFilter: {
                field: {
                  fieldPath: 'searchUrl',
                },
                op: 'EQUAL',
                value: {
                  stringValue: searchUrl,
                },
              },
            },
          ],
          op: 'AND',
        },
      },
      limit: 1,
    },
  }

  try {
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
    const courses = await FireStoreParser(freeResponseJson)

    const course =
      courses && courses[0]?.document ? courses[0].document.fields : {}

    if (!course.title) {
      return { notFound: true }
    }

    return {
      props: { course },
      revalidate: 3600, // Revalidate every hour
    }
  } catch (error) {
    console.error('Error fetching course:', error)
    return { notFound: true }
  }
}
