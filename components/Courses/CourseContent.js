import React, { useEffect, useState } from "react"
import Image from "next/image"
import Rating from "../common/Rating"
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"
import Bullet from "@/components/common/Icons/Bullet"
import Checks from "@/components/common/Icons/Checks"
import Play from "../common/Icons/Play"
import Quiz from "../common/Icons/Quiz"
import CategoryTag from "../Categories/CategoryTag"
import siteConfig from "@/config/siteConfig"
import getMoreLike from "lib/getMoreLike"
import CourseList from "./CourseList"
import Subscribe from "@/components/common/Subscribe"
import Tools from "../common/Tools"
import LinkedIn from "../Ads/LinkedIn"
import SocialJoinGroups from "../common/SocialJoinGroups"

TimeAgo.addLocale(en)
// Create formatter (English).
const timeAgo = new TimeAgo("en-US")

export default function CourseContent({ course }) {
  const [moreLike, setMoreLike] = useState(null)
  const primary = course.primary_category.title_cleaned
  const subcategory = course.primary_subcategory.title_cleaned
  const child = course?.child_category?.title_cleaned
  const searchUrl = course.searchUrl
  const sectionsToCollapse = course.curriculum_context?.data?.sections?.length
  const [collapse, setCollapse] = useState({
    whatYouLearn: true,
    description: true,
  })
  const [sectionCollapse, setSectionCollapse] = useState(
    new Array(sectionsToCollapse).fill(true)
  )

  const handleCollapseChange = (e) => {
    const { name } = e.target
    const collapseItem = collapse.whatYouLearn
    setCollapse({ ...collapse, [name]: !collapseItem })
  }
  const handleSectionCollapse = (index) => {
    const updatedSectionCollapse = [...sectionCollapse]
    updatedSectionCollapse[index] = !updatedSectionCollapse[index]
    setSectionCollapse([...updatedSectionCollapse])
  }

  useEffect(() => {
    getMoreLike(primary, subcategory, child, searchUrl).then((courses) => {
      setMoreLike(courses)
    })
  }, [])

  const titleSuffix =
    course.discountPercent === 100
      ? "| Free Udemy Course"
      : " | Discount Coupon for Udemy Course"
  const displayIcon = (type) => {
    switch (type) {
      case "lecture":
        return <Play />
      case "quiz":
        return <Quiz />
      default:
        return <Play />
    }
  }
  const getRating = (count) => {
    const percent =
      count != 0 ? (100 * count) / course.slider_menu.data.num_reviews : 0
    return { width: `${percent}%` }
  }
  const getInstructorUrl = (instructor) => {
    return encodeURIComponent(`https://udemy.com${instructor.url}`)
  }
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-12 flex flex-col">
        <div className="">
          <div className="rounded-lg overflow-hidden flex justify-center w-full">
            <Image
              width={950}
              height={540}
              src={course.images.image_480x270}
              className="mx-auto w-full"
              alt={`${course.title} ${titleSuffix}`}
            />
          </div>
          <div className="w-full flex flex-col text-center justify-center mt-8 border border-theme p-16 rounded-lg">
            <span>Scroll Down to get the course</span>
            <span className="px-4 py-2 bg-theme hover:bg-theme text-white font-bold text-2xl text-center rounded-lg opacity-40">
              Get The Course
            </span>
          </div>
          <h1 className="font-medium title-font mt-4 text-gray-900 text-2xl">
            {course.title} {titleSuffix}
          </h1>
          <div className="">
            <CategoryTag
              title={course.primary_category.title}
              title_cleaned={course.primary_category.title_cleaned}
            />
            <CategoryTag
              title={course.primary_subcategory.title}
              title_cleaned={course.primary_subcategory.title_cleaned}
            />
            {course.child_category && (
              <CategoryTag
                title={course.child_category.title}
                title_cleaned={course.child_category.title_cleaned}
              />
            )}
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-2/3 p-4">
              <div className="text-gray-600 text-2xl font-bold my-4">
                {course.discountPrice}{" "}
                <span className="font-light line-through ml-1">
                  {course.listPrice}
                </span>
                <span
                  className={`font-semibold text-lg ${
                    course.discountPercent == 100
                      ? "text-red-600"
                      : "text-green-700"
                  } ml-2`}
                >
                  {course.discountPercent}% off
                </span>
              </div>
              <div className="inline-flex text-amber-600 text-lg font-semibold">
                <span className="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-alarm"
                    width={30}
                    height={30}
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <circle cx={12} cy={13} r={7}></circle>
                    <polyline points="12 10 12 13 14 13"></polyline>
                    <line x1={7} y1={4} x2="4.25" y2={6}></line>
                    <line x1={17} y1={4} x2="19.75" y2={6}></line>
                  </svg>
                </span>
                {course.campaign ? (
                  <>
                    Price expires{" "}
                    {timeAgo.format(new Date(course.campaignEnd), "round")}{" "}
                    {course.campaign.uses_remaining && (
                      <span className="ml-1">
                        {" "}
                        or {course.campaign.uses_remaining} uses
                      </span>
                    )}
                  </>
                ) : (
                  "New Free Udemy Course"
                )}
              </div>
              <h2 className="mt-4 text-gray-900 text-lg">
                {course.description} {titleSuffix}
              </h2>
              {course.slider_menu.data.badge_family && (
                <span className="inline-flex items-center justify-center px-4 py-2 my-2 text-lg font-bold leading-none text-white bg-theme rounded-full capitalize">
                  {course.slider_menu.data.badge_family}
                </span>
              )}
              <div className="flex justify-start py-2">
                <span className="mr-2">
                  {Math.round(course.avg_rating_recent * 100) / 100}
                </span>
                <div className="pt-1">
                  <Rating rating={course.avg_rating_recent} />{" "}
                </div>
                <div className="text-gray-600 text-xs font-normal ml-2 pt-1">
                  {"("}
                  {course.slider_menu.data.num_reviews} ratings
                  {")"}
                </div>
                <div className="text-gray-600 text-xs font-normal ml-2 pt-1">
                  {course.num_subscribers} students
                </div>
              </div>
              <div className="flex flex-col justify-start">
                Created by:{" "}
                {course.visible_instructors?.map(
                  (instructor, instructorIndex) => (
                    <div key={instructorIndex} className="mt-4">
                      <a
                        href={`https://click.linksynergy.com/deeplink?id=i*IXi5qsT7c&mid=47901&murl=${getInstructorUrl(
                          instructor
                        )}`}
                        className="text-blue-600 underline mr-4"
                        target="_blank"
                        rel="nofollow noopener"
                      >
                        {instructor.display_name}
                      </a>
                    </div>
                  )
                )}
              </div>
              <div className="flex flex-col justify-start my-4 font-mono">
                <span className="py-2">{course.lastUpdated}</span>
                <span className="py-2">
                  Course Language {course.courseLocale}
                </span>
                <span className="py-2">Course Caption {course.caption}</span>
                <span className="py-2">
                  Course Length{" "}
                  {course.curriculum_context.data.estimated_content_length_text}{" "}
                  to be exact{" "}
                  {
                    course.curriculum_context.data
                      .estimated_content_length_in_seconds
                  }{" "}
                  seconds!
                </span>
                <span className="py-2">
                  Number of Lectures{" "}
                  {course.curriculum_context.data.num_of_published_lectures}
                </span>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <LinkedIn />
            </div>
          </div>

          <div className="w-full border p-8 flex justify-center my-8">
            <div className="text-left text-xl">
              <span className="font-semibold">This course includes:</span>
              <ul>
                <li className="my-4 flex flex-row">
                  <Bullet />
                  {course.incentives.video_content_length} hours of on-demand
                  video
                </li>
                {course.incentives.num_articles != 0 && (
                  <li className="my-4 flex flex-row">
                    <Bullet />
                    {course.incentives.num_articles} article
                  </li>
                )}
                {course.incentives.has_lifetime_access && (
                  <li className="my-4 flex flex-row">
                    <Bullet />
                    Full lifetime access
                  </li>
                )}
                {course.incentives.devices_access && (
                  <li className="my-4 flex flex-row">
                    <Bullet />
                    {course.incentives.devices_access}
                  </li>
                )}
                {course.incentives.audio_content_length && (
                  <li className="my-4 flex flex-row">
                    <Bullet />
                    {course.incentives.audio_content_length} hours of audio
                  </li>
                )}
                {course.incentives.has_certificate && (
                  <li className="my-4 flex flex-row">
                    <Bullet />
                    Certificate of completion
                  </li>
                )}
                {course.incentives.num_practice_tests != 0 && (
                  <li className="my-4 flex flex-row">
                    <Bullet />
                    {course.incentives.num_practice_tests} practice tests
                  </li>
                )}
                {course.incentives.num_additional_resources != 0 && (
                  <li className="my-4 flex flex-row">
                    <Bullet />
                    {course.incentives.num_additional_resources} additional
                    resources
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="w-full border p-8 flex justify-center my-8">
            <div className="text-left text-xl">
              <button
                className="font-semibold w-full text-center"
                name="whatYouLearn"
                onClick={handleCollapseChange}
              >
                What will you learn:
              </button>
              <ul
                className={`flex flex-col ease-linear transition-all duration-150 ${
                  collapse.whatYouLearn ? "hidden" : ""
                }`}
              >
                {course.whatYouLearn.map((learn, learnIndex) => (
                  <li className="my-4 inline-flex" key={`learn-${learnIndex}`}>
                    <Checks />
                    {learn}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-4 pt-4 sm:mt-0 text-center sm:text-left">
            <p className="leading-relaxed text-lg mb-4">
              {course.courseDescription.replace("Description", "")}
            </p>
          </div>
          <div className="mt-4 pt-4 sm:mt-0 text-center sm:text-left">
            <h3 className="leading-relaxed text-2xl font-semibold mb-4">
              Course Content:
            </h3>
            <p className="text-sm italic my-2">
              Sections are minimized for better readability, click the section
              title to view the course content
            </p>
            <div>
              {course.curriculum_context.data.sections?.map(
                (section, sectionId) => (
                  <div
                    key={section.index}
                    className="flex rounded-lg h-full bg-gray-100 p-2 md:p-8 flex-col mb-8"
                  >
                    <span className="font-semibold flex justify-between bg-slate-50 p-2 md:p-4 rounded-lg mb-4">
                      <button
                        className="w-full text-left"
                        onClick={() => handleSectionCollapse(sectionId)}
                        data-value={sectionCollapse[sectionId]}
                      >
                        {section.title}
                      </button>
                      <div>
                        {section.lecture_count} Lectures |{" "}
                        {section.content_length_text}
                      </div>
                    </span>
                    <ul
                      className={`bg-gray-200 rounded-lg ${
                        sectionCollapse[sectionId] ? "hidden" : ""
                      }`}
                    >
                      {section.items.map((lecture, lectureIndex) => (
                        <li
                          className="flex flex-col md:py-4 py-2 md:px-8 px-2"
                          key={`lecture-${lectureIndex}`}
                        >
                          <div className="w-full flex justify-between">
                            <div className="flex flex-row">
                              {displayIcon(lecture.item_type)}
                              <span className="text-left">{lecture.title}</span>
                            </div>
                            <div>{lecture.content_summary}</div>
                          </div>
                          {lecture.description && (
                            <div
                              className="bg-slate-50 p-2 text-xs rounded-lg"
                              dangerouslySetInnerHTML={{
                                __html: lecture.description,
                              }}
                            ></div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="container px-5 py-8 md:py-24 mx-auto">
            <div className="-my-8 divide-y-2 divide-gray-100">
              <div className="py-8 flex flex-wrap md:flex-nowrap">
                <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col w-full">
                  <span className="font-semibold title-font text-7xl text-amber-700 mx-auto">
                    {Math.round(course.reviews_context.averageRating * 100) /
                      100}
                  </span>
                  <div className="mt-1 text-gray-500 text-sm mx-auto">
                    <div className="pt-1">
                      <Rating
                        rating={course.avg_rating_recent}
                        customClassName="w-8"
                      />{" "}
                    </div>
                    <div className="text-gray-600 text-lg font-normal pt-2">
                      {"("}
                      {course.slider_menu.data.num_reviews} course ratings
                      {")"}
                    </div>
                  </div>
                </div>
                <div className="md:flex-grow w-full">
                  {course.reviews_context.ratingDistribution.map(
                    (rating, ratingIndex) => (
                      <div
                        className="flex flex-row"
                        key={`Rating-${ratingIndex}`}
                      >
                        <span className="m-2">{rating.rating}</span>
                        <div className="w-full bg-gray-200 rounded-full m-3">
                          <div
                            className="bg-amber-700 text-xs font-medium text-blue-100 text-center p-2 leading-none rounded-l-full"
                            style={getRating(rating.count)}
                          ></div>{" "}
                        </div>
                        <span className="m-2">
                          {rating.count}/{course.slider_menu.data.num_reviews}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="my-4">
            <Subscribe coursePage="true" />
            <SocialJoinGroups />
          </div>
          <div className="w-full flex flex-col justify-center mt-8 border border-theme p-8 md:p-16 rounded-lg">
            <a
              className="px-4 py-2 bg-theme hover:bg-theme text-white font-bold text-2xl text-center rounded-lg"
              href={`${siteConfig.url}/go/${course.link}`}
              title={`${course.title} ${titleSuffix} link`}
              target="_blank"
              rel="nofollow noopener"
            >
              Get The Course
            </a>
          </div>
          <div className="my-4">
            If you like to get inspired by great web projects, you should check
            out{" "}
            <a
              href="https://www.madewithjavascript.club"
              title="Made with Javascript Club"
              className="text-blue-600 underline pointer-cursor"
            >
              Made with Javascript
            </a>
            . If you have a project that you wish to share with the world, feel
            free to submit your project on{" "}
            <a
              href="https://www.madewithjavascript.club"
              title="Made with Javascript Club"
              className="text-blue-600 underline pointer-cursor"
            >
              Made with Javascript Club website.
            </a>
          </div>
          {moreLike && moreLike.length > 0 && (
            <>
              <h3 className="text-2xl bg-slate-50 font-semibold p-4 mt-8">
                Releated Courses
              </h3>
              <CourseList courses={moreLike} moreLike={true} />
            </>
          )}
          <Tools />
        </div>
      </div>
    </section>
  )
}
