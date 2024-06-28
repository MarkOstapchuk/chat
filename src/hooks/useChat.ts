'use client'

import { useContext, useEffect, useRef, useState } from 'react'

import { SocketContext } from '@/components/Context/socket'
import { DialogsStore } from '@/components/Stores/Dialogs.store'

import { IMessage } from '@/types/message.types'

import { useProfile } from '@/hooks/useProfile'

export const useChat = () => {
  const socket = useContext(SocketContext)
  const { data, isLoading } = useProfile()
  const addNotification = DialogsStore((state) => state.addNotification)
  const isHandlerSet = useRef(false)

  useEffect(() => {
    if (socket && data && !isLoading && !isHandlerSet.current) {
      socket.emit('user:connect', data.id)
      socket.on('dialog:notification', (message: IMessage) => {
        addNotification({ message, dialogId: message.dialogId })
      })
      isHandlerSet.current = true
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
