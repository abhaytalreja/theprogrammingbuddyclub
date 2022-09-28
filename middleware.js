// middleware.ts

import { NextResponse } from "next/server"

export default function middleware(request) {
  console.log("Middleware called")
  if (request.nextUrl.pathname.startsWith("/go/")) {
    let url = request.nextUrl.pathname
      .substring(request.nextUrl.pathname.indexOf("/go/") + 4)
      .replace("https:/www", "https://www")

    const affiliateUrl =
      "https://click.linksynergy.com/deeplink?id=i*IXi5qsT7c&mid=47901&murl="
    // + "&utm_source=theProgrammingBuddy&utm_medium=landing_page&utm_campaign=theProgrammingBuddyClub&ref=theProgrammingBuddy.club"

    const encodedUrl = encodeURIComponent(url + request.nextUrl.search)

    return NextResponse.redirect(affiliateUrl + encodedUrl)
  }
}

export const config = {
  matcher: "/go/:path*",
}
