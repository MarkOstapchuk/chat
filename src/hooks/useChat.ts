'use client'

import { useContext, useEffect, useState } from 'react'

import { SocketContext } from '@/components/Context/socket'

import { useProfile } from '@/hooks/useProfile'

export const useChat = () => {
  const socket = useContext(SocketContext)
  const { data, isLoading } = useProfile()

  useEffect(() => {
    if (socket && data && !isLoading) {
      socket.emit('user:connect', data.id)
    }

    const handleBeforeUnload = () => {
      if (socket && data && !isLoading) {
        socket.emit('user:disconnect', data.id)
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [socket, data, isLoading])

  return {}
}
