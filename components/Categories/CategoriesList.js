import Link from "next/link"
import React from "react"
import categories from "../../public/categories.json"
import development from "../../public/development.json"
import business from "../../public/business.json"
import design from "../../public/design.json"
import personal from "../../public/personal.json"
import CategoryLinks from "./CategoryLinks"

export default function CategoriesList() {
  return (
    <>
      <CategoryLinks categories={categories} sectionTitle="Popular Category" />
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
    </>
  )
}
