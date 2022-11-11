import FireStoreParser from "firestore-parser"
export default async function getCoursesForRss(
  isFree = false,
  isDiscount = false
) {
  const courseFields = [
    { fieldPath: "discountPercent" },
    { fieldPath: "description" },
    { fieldPath: "courseDescription" },
    { fieldPath: "title" },
    { fieldPath: "searchUrl" },
    { fieldPath: "updateDate" },
    { fieldPath: "images.image_480x270" },
    { fieldPath: "couponCode" },
  ]

  const firestoreQuery = {
    structuredQuery: {
      from: [{ collectionId: "courses" }],
      orderBy: [
        { field: { fieldPath: "updateDate" }, direction: "DESCENDING" },
      ],
      select: {
        fields: courseFields,
      },
      limit: 2,
    },
  }
  const whereClauseFree = {
    compositeFilter: {
      filters: [
        {
          fieldFilter: {
            field: {
              fieldPath: "isFree",
            },
            op: "EQUAL",
            value: {
              booleanValue: true,
            },
          },
        },
      ],
      op: "AND",
    },
  }
  if (isFree) {
    firestoreQuery.structuredQuery.where = { ...whereClauseFree }
  }
  const freeResponse = await fetch(
    `https://firestore.googleapis.com/v1/projects/thepbcapp/databases/(default)/documents:runQuery`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...firestoreQuery }),
    }
  )
  const freeResponseJson = await freeResponse.json()
  const courses = await FireStoreParser(freeResponseJson)
  // console.log("Rss courses", courses)

  return courses
}
