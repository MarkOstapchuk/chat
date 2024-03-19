import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Socket, io } from 'socket.io-client'

import { IMessage, IMessagePost } from '@/types/message.types'

import { CHAT_CONFIG } from '@/config/chat.config'

import { dialogService } from '@/services/dialog.service'

let socket: Socket
export const useDialog = (chatId: string) => {
  const [messages, setMessages] = useState<IMessage[]>()
  const { data, isLoading } = useQuery({
    queryKey: ['dialog', chatId],
    queryFn: () => {
      return dialogService.getDialog(chatId)
    }
  })
  if (!socket) {
    socket = io(
      CHAT_CONFIG.SERVER_URL
      //   , {
      //   query: {
      //     chatId
      //   }
      // }
    )
  }
  useEffect(() => {
    // получение сообщений
    socket.on('messages', (messages: IMessage[]) => {
      console.log('received', messages)
      setMessages(messages)
    })
    socket.emit('chat:join', chatId)
    socket.emit('messages:get', { chatId })
    return function () {
      socket.emit('chat:leave', chatId)
    }
  }, [])

  // отправка сообщения
  const send = useCallback((payload: IMessagePost) => {
    socket.emit('message:post', payload)
  }, [])

  // обновление сообщения
  const update = useCallback((text: { text: string }) => {
    socket.emit('message:put', text)
  }, [])

  // удаление сообщения
  const remove = useCallback((id: number) => {
    socket.emit('message:delete', id)
  }, [])

  // очистка сообщения - для отладки при разработке
  // можно вызывать в консоли браузера, например
  // window.clearMessages = useCallback(() => {
  //   socket.emit('messages:clear')
  //   location.reload()
  // }, [])

  // операции
  const chatActions = useMemo(
    () => ({
      send,
      update,
      remove
    }),
    []
  )

  return { data, messages, chatActions }
}
