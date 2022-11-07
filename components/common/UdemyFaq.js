import Link from "next/link"
import React from "react"

export default function UdemyFaq() {
  return (
    <div className="p-8 w-full border rounded-2xl mt-8">
      <h2 className="text-2xl my-2">
        FAQ: Udemy Free course Most frequent questions and answers
      </h2>
      <h3 className="text-xl font-bold my-4">
        Does Udemy offer Free Udemy coupons?
      </h3>
      <p>
        Yes, Udemy is the largest online education platform, with the broadest
        selection of video-on-demand courses and qualified instructors available
        to meet your needs. At <Link href="/">theprogrammingbuddy.club</Link> we
        curate the latest udemy coupons, their expiry, and the number of uses
        left of these udemy coupons.
      </p>
      <h3 className="text-xl font-bold my-4">How to get free Udemy courses?</h3>
      <p>There are two ways to get free Udemy courses:</p>
      <ol>
        <li>
          Go to udemy.com and search for your desired course category. Then
          select free from the filter options.{" "}
        </li>
        <li>
          You can also get paid courses for free if you have a coupon. You can
          head to <Link href="/">theprogrammingbuddy.club</Link>, where you can
          get a daily udemy paid course for free.
        </li>
      </ol>
      <h3 className="text-xl font-bold my-4">
        How to get Udemy Certificates for free?
      </h3>
      <p>
        Udemy offers certification on completion of each course. In order to
        receive a certificate of completion from Udemy, you need to complete
        your course 100%. There is a simple hack, you can open a video and jump
        on the timeline to complete a lecture.
      </p>
      <p>
        To download the certificate from Udemy, you need to head over to your
        account on a desktop browser. Udemy certificates can't be accessed on
        the mobile app.
      </p>
      <h3 className="text-xl font-bold my-4">Do Udemy courses expire?</h3>
      <p>
        No, once you enroll, you will have lifetime access to the course. You
        can complete the course on your schedule.
      </p>
      <h3 className="text-xl font-bold my-4">
        Why are the Udemy instructors giving away free Udemy Coupons?
      </h3>
      <p>
        Every instructor has worked for hours on each of their courses. As new
        courses get launched, the instructors have no way to get their course in
        front of an audience to get some feedback. So, instructors share free
        coupons for their courses to get feedback from the students. We at
        <Link href="/">theprogrammingbuddy.club</Link> work with these
        instructors to get their courses available to our buddies.
      </p>
      <h3 className="text-xl font-bold my-4">Is Udemy safe to use?</h3>
      <p>
        Yes, payments on Udemy are safe. It is no different than paying for
        other services on an application or website and inputting your payment
        information before receiving your goods. Just be sure to keep your
        account secure, do not share your udemy accounts.
      </p>
      <h3 className="text-xl font-bold my-4">
        Can Udemy courses get you a job?
      </h3>
      <p>
        Earning a skill is more valuable than earning a job these days. Skills
        are your most valuable asset. They can help you qualify for jobs you
        want and get promoted to more advanced positions within your
        organization. Unfortunately, it is difficult for many people to balance
        taking courses with work and family obligations. We have had many
        students, who have taken just Udemy courses, started a job as well as
        started freelancing with the skills they have learned.
      </p>
    </div>
  )
}
