import React from "react"

export default function Subscribe({ coursePage, isFooter }) {
  return (
    <div>
      <form
        action="https://www.getrevue.co/profile/theprogramminbuddyclub/add_subscriber"
        method="post"
        name="revue-form"
        target="_blank"
        className={`border-2 justify-center text-center w-full  mx-auto rounded-md flex flex-col ${
          isFooter ? "w-full p-2" : "md:w-2/3 p-4"
        }`}
      >
        {!isFooter && (
          <h3
            className={`bg-slate-50 font-semibold p-4 ${
              isFooter ? "text-lg" : "text-2xl"
            }`}
          >
            Subscribe to our Daily Newsletter
          </h3>
        )}
        {!isFooter && (
          <p className="text-sm my-2 border-b border-gray-300 pb-2">
            Join more than <span className="font-semibold">1650</span> Buddies
            in our daily digest.
            <span className="block">Happy Learning!</span>
          </p>
        )}
        <div
          className={`flex flex-col justify-center mx-auto w-full ${
            coursePage || isFooter ? "" : "md:w-1/2"
          }`}
        >
          <label
            className="text-left font-semibold mr-10 py-2"
            htmlFor="member_email"
          >
            Email address
          </label>
          <input
            className="outline outline-1 outline-gray-300 px-4 py-2 rounded-md w-full"
            placeholder="Your email address..."
            type="email"
            name="member[email]"
          />
        </div>
        <div className="w-full flex justify-center mt-4">
          <input
            type="submit"
            className={`px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg ${
              isFooter ? "text-lg md:w-1/2" : "text-2xl md:w-1/3"
            }`}
            value="Subscribe"
            name="member[subscribe]"
          />
        </div>
      </form>
    </div>
  )
}
