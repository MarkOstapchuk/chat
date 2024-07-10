import Chat from '@/components/UI/Chat/Chat'

import { useChat } from '@/hooks/useChat'

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <Chat>{children}</Chat>
}
