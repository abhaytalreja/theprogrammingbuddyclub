import FireStoreParser from "firestore-parser"
export default async function getMoreLike(
  primary,
  subcategory,
  child,
  searchUrl
) {
  const courseFields = [
    { fieldPath: "discountPercent" },
    { fieldPath: "title" },
    { fieldPath: "avg_rating_recent" },
    { fieldPath: "num_subscribers" },
    { fieldPath: "listPrice" },
    { fieldPath: "discountPrice" },
    { fieldPath: "updateDate" },
    { fieldPath: "images.image_240x135" },
    { fieldPath: "campaign.end_time" },
    { fieldPath: "campaign.uses_remaining" },
    { fieldPath: "campaignEnd" },
    { fieldPath: "url" },
    { fieldPath: "isFree" },
    { fieldPath: "categories" },
  ]

  const firestoreQuery = {
    structuredQuery: {
      from: [{ collectionId: "courses" }],
      select: {
        fields: courseFields,
      },
      where: {
        fieldFilter: {
          field: {
            fieldPath: "categories",
          },
          op: "ARRAY_CONTAINS_ANY",
          value: {
            arrayValue: {
              values: [
                {
                  stringValue: primary,
                },
                {
                  stringValue: subcategory,
                },
              ],
            },
          },
        },
      },
      limit: 3,
    },
  }

  const firestoreQueryWithChildCategory = {
    structuredQuery: {
      from: [{ collectionId: "courses" }],
      select: {
        fields: courseFields,
      },
      where: {
        fieldFilter: {
          field: {
            fieldPath: "categories",
          },
          op: "ARRAY_CONTAINS_ANY",
          value: {
            arrayValue: {
              values: [
                {
                  stringValue: primary,
                },
                {
                  stringValue: subcategory,
                },
                {
                  stringValue: child,
                },
              ],
            },
          },
        },
      },
      limit: 3,
    },
  }

  const freeResponse = await fetch(
    `https://firestore.googleapis.com/v1/projects/thepbcapp/databases/(default)/documents:runQuery`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: child
        ? JSON.stringify({ ...firestoreQueryWithChildCategory })
        : JSON.stringify({ ...firestoreQuery }),
    }
  )

  const freeResponseJson = await freeResponse.json()
  const courses = await FireStoreParser(freeResponseJson)

  return courses
}
