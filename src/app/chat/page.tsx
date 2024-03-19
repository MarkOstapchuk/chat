'use client'

import { useChat } from '@/hooks/useChat'

const Page = () => {
  const { socket, log } = useChat()
  return (
    <div className={'w-full h-full flex items-center justify-center'}>
      <div>Select chat to show messages</div>
    </div>
  )
}

export default Page
