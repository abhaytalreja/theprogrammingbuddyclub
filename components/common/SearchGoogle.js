import React, { useState } from "react"

export default function SearchGoogle() {
  const [searchTerm, setSearchTerm] = useState("")
  const [url, setUrl] = useState("")

  // const url = https://www.google.com/search?q=javascript+site%3Atheprogrammingbuddy.club
  const safeEncode = (text) => {
    return encodeURIComponent(text).replace(/[!'()*]/g, (c) => {
      return "%" + c.charCodeAt(0).toString(16).toUpperCase()
    })
  }

  const handleChange = (e) => {
    const value = e.target.value
    console.log("Search value", value)
    setSearchTerm(value)
    setUrl(
      `https://www.google.com/search?q=${safeEncode(
        value
      )}+site%3Atheprogrammingbuddy.club`
    )
  }
  return (
    <div className="container text-center flex flex-row justify-center mt-8">
      <input
        type="text"
        className="border outline-0 rounded-lg p-2 shadow w-1/2"
        placeholder="Search our site"
        onChange={(e) => handleChange(e)}
      />
      <a
        className="mx-2 p-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg cursor-pointer"
        href={url}
        target="_blank"
      >
        Search
      </a>
    </div>
  )
}
