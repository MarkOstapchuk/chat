import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import { Toaster } from 'react-hot-toast'

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
    <html
      lang='en'
      suppressHydrationWarning
    >
      <body className={inter.className}>
        <Providers>
          <Toaster
            toastOptions={{
              className:
                'dark:bg-bg-dark dark:text-text-dark dark:border-dark-third dark:border-0.5'
            }}
          />
          {children}
        </Providers>
      </body>
    </html>
  )
}
