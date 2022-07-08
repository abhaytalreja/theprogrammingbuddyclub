import { getServerSideSitemap } from "next-sitemap"
import FireStoreParser from "firestore-parser"
import categories from "../../public/categories.json"
import development from "../../public/development.json"
import business from "../../public/business.json"
import design from "../../public/design.json"
import personal from "../../public/personal.json"

const courseFields = [{ fieldPath: "searchUrl" }]

const firestoreQuery = {
  structuredQuery: {
    from: [{ collectionId: "courses" }],
    orderBy: [{ field: { fieldPath: "updateDate" }, direction: "DESCENDING" }],
    select: {
      fields: courseFields,
    },
    limit: 5000,
  },
}

export const getServerSideProps = async (ctx) => {
  const response = await fetch(
    `https://firestore.googleapis.com/v1/projects/thepbcapp/databases/(default)/documents:runQuery`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...firestoreQuery }),
    }
  )
  const responseJson = await response.json()
  const courses = await FireStoreParser(responseJson)

  const fields = courses.map((item) => ({
    loc: `https://theprogrammingbuddy.club${item.document.fields.searchUrl}`,
    lastmod: new Date().toISOString(),
  }))

  categories.map((cat) => {
    fields.push({
      loc: `https://theprogrammingbuddy.club${cat.url}`,
      lastmod: new Date().toISOString(),
    })
  })

  development.map((cat) => {
    fields.push({
      loc: `https://theprogrammingbuddy.club${cat.url}`,
      lastmod: new Date().toISOString(),
    })
  })
  business.map((cat) => {
    fields.push({
      loc: `https://theprogrammingbuddy.club${cat.url}`,
      lastmod: new Date().toISOString(),
    })
  })
  design.map((cat) => {
    fields.push({
      loc: `https://theprogrammingbuddy.club${cat.url}`,
      lastmod: new Date().toISOString(),
    })
  })
  personal.map((cat) => {
    fields.push({
      loc: `https://theprogrammingbuddy.club${cat.url}`,
      lastmod: new Date().toISOString(),
    })
  })

  return getServerSideSitemap(ctx, fields)
}

export default function Site() {}
