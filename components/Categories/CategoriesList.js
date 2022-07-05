import React from "react"
import categories from "../../public/categories.json"
import development from "../../public/development.json"
import business from "../../public/business.json"
import design from "../../public/design.json"
import personal from "../../public/personal.json"

import dynamic from "next/dynamic"
import { Suspense } from "react"

// const categories = dynamic(() => import("../../public/categories.json"))
// const development = dynamic(() => import("../../public/development.json"))
// const business = dynamic(() => import("../../public/business.json"))
// const design = dynamic(() => import("../../public/design.json"))
// const personal = dynamic(() => import("../../public/personal.json"))
const CategoryLinks = dynamic(() => import("./CategoryLinks"), {
  suspense: true,
})

export default function CategoriesList() {
  return (
    <>
      <Suspense fallback={`Loading...`}>
        <CategoryLinks
          categories={categories}
          sectionTitle="Popular Category"
        />
        <CategoryLinks
          categories={development}
          sectionTitle="Development Category"
        />
        <CategoryLinks categories={business} sectionTitle="Business Category" />
        <CategoryLinks categories={design} sectionTitle="Design Category" />
        <CategoryLinks
          categories={personal}
          sectionTitle="Personal Development Category"
        />
      </Suspense>
    </>
  )
}
