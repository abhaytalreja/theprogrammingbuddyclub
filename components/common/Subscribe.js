import React from "react"

export default function Subscribe({ coursePage }) {
  return (
    <div id="revue-embed">
      <form
        action="https://www.getrevue.co/profile/theprogramminbuddyclub/add_subscriber"
        method="post"
        id="revue-form"
        name="revue-form"
        target="_blank"
        className="p-4 border-2 justify-center text-center w-full md:w-2/3 mx-auto rounded-md flex flex-col"
      >
        <h3 className="text-2xl bg-slate-50 font-semibold p-4">
          Subscribe to our Daily Newsletter
        </h3>
        <p className="text-sm my-2 border-b border-gray-300 pb-2">
          We get daily updates to our courses, new courses get added, old
          courses are updated. If you wish to get the daily newsletter, just put
          in your email id below and subscribe to our newsletter.
          <span className="block">Happy Learning!</span>
        </p>
        <div
          className={`flex flex-col justify-center mx-auto w-full ${
            coursePage ? "" : "md:w-1/2"
          }`}
        >
          <label
            className="text-left font-semibold mr-10 py-2"
            for="member_email"
          >
            Email address
          </label>
          <input
            className="outline outline-1 outline-gray-300 px-4 py-2 rounded-md w-full"
            placeholder="Your email address..."
            type="email"
            name="member[email]"
            id="member_email"
          />
        </div>
        <div className="w-full flex justify-center mt-4">
          <input
            type="submit"
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold text-2xl md:w-1/3 rounded-lg"
            value="Subscribe"
            name="member[subscribe]"
            id="member_submit"
          />
        </div>
      </form>
    </div>
  )
}
