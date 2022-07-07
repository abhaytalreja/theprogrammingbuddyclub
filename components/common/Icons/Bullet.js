import React from "react"

export default function Bullet() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-focus mr-2"
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
      <circle cx={12} cy={12} r=".5" fill="currentColor"></circle>
      <circle cx={12} cy={12} r={9}></circle>
    </svg>
  )
}
