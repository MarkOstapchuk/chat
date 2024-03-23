'use client'

import { useRouter } from 'next/navigation'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { useChat } from '@/hooks/useChat'

export default function Home() {
  const { push } = useRouter()

  push(DASHBOARD_PAGES.HOME)
  return <div></div>
}
