import { useQuery } from '@tanstack/react-query'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { SocketContext } from '@/components/Context/socket'

import { IMessage, IMessagePost } from '@/types/message.types'

import { dialogService } from '@/services/dialog.service'

export const useDialog = (chatId: string) => {
  const socket = useContext(SocketContext)

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
        console.log('received', messages)
        setMessages(messages)
      })
      socket.emit('chat:join', chatId)
      socket.emit('messages:get', { chatId })
      return function () {
        socket.emit('chat:leave', chatId)
      }
    }
  }, [])

  // отправка сообщения
  const send = useCallback((payload: IMessagePost) => {
    if (socket) {
      socket.emit('message:post', payload)
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
