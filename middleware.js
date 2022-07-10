// middleware.ts

import { NextResponse } from "next/server"
import ReactPixel from "react-facebook-pixel"

export default function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/go/")) {
    let url = request.nextUrl.pathname.substring(
      request.nextUrl.pathname.indexOf("/go/") + 4
    )
    url =
      url +
      request.nextUrl.search +
      "&utm_source=theProgrammingBuddy&utm_medium=landing_page&utm_campaign=theProgrammingBuddyClub&ref=theProgrammingBuddy.club"

    ReactPixel.track("Lead")

    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: "/go/:path*",
}
