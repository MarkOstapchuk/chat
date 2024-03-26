import { useQuery } from '@tanstack/react-query'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { SocketContext } from '@/components/Context/socket'

import { IMessage, IMessagePost } from '@/types/message.types'

import { useProfile } from '@/hooks/useProfile'

import { dialogService } from '@/services/dialog.service'

export const useDialog = (chatId: string) => {
  const socket = useContext(SocketContext)
  const profile = useProfile()
  const [messages, setMessages] = useState<IMessage[]>()
  const { data, isLoading } = useQuery({
    queryKey: ['dialog', chatId],
    queryFn: () => {
      return dialogService.getDialog(chatId)
    }
  })

  useEffect(() => {
    if (socket) {
      socket.on('messages', (messages: IMessage[]) => {
        setMessages(messages)
      })
      if (profile.data && !profile.isLoading) {
        socket.emit('messages:get', {
          chatId: +chatId,
          userId: profile.data.id
        })
      }
      if (data) readAllMessages({ chatId: data.id })
      return function () {}
    }
  }, [profile.data, profile.isLoading, data])

  // отправка сообщения
  const send = useCallback(
    (payload: { message: IMessagePost; usersId: number[] }) => {
      if (socket) {
        socket.emit('message:post', payload)
      }
    },
    []
  )
  const readAllMessages = useCallback((payload: { chatId: number }) => {
    if (socket) {
      socket.emit('messages:readall', payload)
    }
  }, [])
  // обновление сообщения
  const update = useCallback((text: { text: string }) => {
    if (socket) {
      socket.emit('message:put', text)
    }
  }, [])

  // удаление сообщения
  const remove = useCallback((id: number) => {
    if (socket) {
      socket.emit('message:delete', id)
    }
  }, [])
  const chatActions = useMemo(
    () => ({
      send,
      update,
      remove
    }),
    []
  )

  return { data, isLoading, messages, chatActions }
}
