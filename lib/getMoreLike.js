import FireStoreParser from "firestore-parser"
export default async function getMoreLike(primary, subcategory, searchUrl) {
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
  ]

  const firestoreQuery = {
    structuredQuery: {
      from: [{ collectionId: "courses" }],
      select: {
        fields: courseFields,
      },
      orderBy: [
        { field: { fieldPath: "searchUrl" }, direction: "DESCENDING" },
        { field: { fieldPath: "discountPercent" }, direction: "DESCENDING" },
      ],
      where: {
        compositeFilter: {
          filters: [
            {
              fieldFilter: {
                field: {
                  fieldPath: "primary_category.title_cleaned",
                },
                op: "EQUAL",
                value: {
                  stringValue: primary,
                },
              },
              fieldFilter: {
                field: {
                  fieldPath: "primary_subcategory.title_cleaned",
                },
                op: "EQUAL",
                value: {
                  stringValue: subcategory,
                },
              },
              fieldFilter: {
                field: {
                  fieldPath: "searchUrl",
                },
                op: "NOT_EQUAL",
                value: {
                  stringValue: searchUrl,
                },
              },
            },
          ],
          op: "AND",
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
      body: JSON.stringify({ ...firestoreQuery }),
    }
  )
  const freeResponseJson = await freeResponse.json()
  const courses = await FireStoreParser(freeResponseJson)

  return courses
}
