import React from 'react'

import Chat from '@/components/UI/Chat/Chat'

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <Chat>{children}</Chat>
}
