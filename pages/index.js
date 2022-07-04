import Head from "next/head"
import Image from "next/image"
import CourseList from "@/components/Courses/CourseList"

export default function Home() {
  return (
    <>
      <h1 className="flex flex-row md:inline-flex md:justify-between w-full px-12">
        <span className="md:text-4xl text-2xl font-bold py-2">
          The Programming Buddy Club
        </span>
        <Image
          src="/theprogrammingbuddyclub.png"
          alt="The Programming Buddy Club Logo"
          width={64}
          height={64}
          layout="fixed"
        ></Image>
      </h1>
      <h2 className="px-12">
        The best place to find free Udemy Courses. Always updated, to save you
        the time.
      </h2>
      <CourseList />
    </>
  )
}
