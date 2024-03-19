import { useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'

import { CHAT_CONFIG } from '@/config/chat.config'

let socket: Socket
export const useChat = () => {
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
  const [log, setLog] = useState<string>()

  useEffect(() => {
    // подключение/отключение пользователя
    socket.on('log', (log: string) => {
      setLog(log)
      console.log(log)
    })
  }, [])

  return { socket, log }
}
