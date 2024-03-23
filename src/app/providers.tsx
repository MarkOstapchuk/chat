'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useState } from 'react'

import { SocketContext, socket } from '@/components/Context/socket'

export function Providers({ children }: PropsWithChildren) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnReconnect: false
        }
      }
    })
  )
  return (
    <QueryClientProvider client={client}>
      <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    </QueryClientProvider>
  )
}
