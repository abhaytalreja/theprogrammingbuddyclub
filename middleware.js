import { NextResponse } from 'next/server'

const REQUESTS_PER_MINUTE = 60
const WINDOW_SIZE_IN_SECONDS = 60

const ipRequestCounts = new Map()

export function middleware(request) {
  const ip = request.ip || 'unknown'
  const now = Math.floor(Date.now() / 1000)

  if (!ipRequestCounts.has(ip)) {
    ipRequestCounts.set(ip, [])
  }

  const requests = ipRequestCounts.get(ip)
  const windowStart = now - WINDOW_SIZE_IN_SECONDS

  // Remove old requests
  while (requests.length > 0 && requests[0] < windowStart) {
    requests.shift()
  }

  if (requests.length >= REQUESTS_PER_MINUTE) {
    return new NextResponse(null, {
      status: 429,
      statusText: 'Too Many Requests',
      headers: {
        'Retry-After': WINDOW_SIZE_IN_SECONDS.toString(),
        'Content-Type': 'text/plain',
      },
    })
  }

  requests.push(now)
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/category/:path*',
    '/course/:path*',
    '/free-coupon-udemy-courses-today',
  ],
}
