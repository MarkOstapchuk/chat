import { NextRequest, NextResponse } from 'next/server'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { EnumTokens } from '@/services/authToken.service'

export async function middleware(request: NextRequest, response: NextResponse) {
  const { url, cookies } = request
  const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value
  const isAuthPage = url.includes('/auth')
  if (isAuthPage && refreshToken) {
    return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, url))
  }
  if (isAuthPage) {
    return NextResponse.next()
  }
  if (!refreshToken) {
    return NextResponse.redirect(new URL(DASHBOARD_PAGES.AUTH, request.url))
  }
  return NextResponse.next()
}
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)'
}
