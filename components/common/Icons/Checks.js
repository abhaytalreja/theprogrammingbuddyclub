import React from "react"

export default function Bullet() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="mr-2 w-8 h-8"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M7 12l5 5l10 -10"></path>
      <path d="M2 12l5 5m5 -5l5 -5"></path>
    </svg>
  )
}
