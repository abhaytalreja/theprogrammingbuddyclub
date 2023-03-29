// middleware.ts

import { NextResponse } from 'next/server'

export default function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/go/')) {
    // let url = request.nextUrl.pathname
    //   .substring(request.nextUrl.pathname.indexOf("/go/") + 4)
    //   .replace("https:/www", "https://www")

    let url = request.nextUrl.pathname.substring(
      request.nextUrl.pathname.indexOf('/go/') + 4
    )
    const affiliateUrl =
      'https://click.linksynergy.com/link?id=i*IXi5qsT7c&offerid=1074530.2855598&type=2&murl='

    const encodedUrl = encodeURIComponent(
      url.replace('https:/', 'https://') + request.nextUrl.search
    )

    // url = url + request.nextUrl.search
    url = affiliateUrl + encodedUrl

    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: '/go/:path*',
}
