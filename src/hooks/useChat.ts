import { useContext, useEffect } from 'react'

import { SocketContext } from '@/components/Context/socket'
import { ProfileStore } from '@/components/Stores/Profile.store'

import { IMessage } from '@/types/message.types'

import { useProfile } from '@/hooks/useProfile'

export const useChat = () => {
  const socket = useContext(SocketContext)
  const { data, isLoading } = useProfile()
  useEffect(() => {
    if (socket && !isLoading && data) {
      socket.on('dialog:message', (data: IMessage) => {})
      socket.emit('user:connect', data.id)
    }
  }, [data, isLoading])
  return {}
}
