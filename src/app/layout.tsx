import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'

import Chat from '@/components/UI/Chat/Chat'

import './globals.scss'
import { Providers } from '@/app/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chat',
  description: 'Ochen good'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
