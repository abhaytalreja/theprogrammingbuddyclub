// import { NextResponse } from "next/server"
// import { fetchIndexData, updateClicks } from "@/services"

// export default async function middleware(req) {
//   if (req.nextUrl.pathname === "/go") {
//     const slug = req.nextUrl.search.replace("?", "")
//     const filterOptions = {
//       slug: { $eq: slug },
//     }
//     const posts = await fetchIndexData("posts", "*", filterOptions, false)
//     let url = posts ? posts.data[0].attributes.url : "/"
//     url =
//       url +
//       "?utm_source=madewithjavascript&utm_medium=landing_page&utm_campaign=madewithvueJS&ref=madewithjavascript.club"

//     updateClicks("posts", posts.data[0].id, posts.data[0].attributes.clicks)

//     return NextResponse.redirect(url)
//   }
// }
