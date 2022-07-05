import React from "react"
import { useRouter } from "next/router"

// import Search from "@/components/common/Search"

export default function Header({ logoImage }) {
  const router = useRouter()
  return (
    <header className="text-gray-600 body-font p-4 mb-12">
      <nav className="flex flex-wrap items-center text-base justify-end">
        <a className="mr-5 hover:text-gray-900">First Link</a>
        <a className="mr-5 hover:text-gray-900">Second Link</a>
      </nav>
    </header>
  )
}
