import { useContext, useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'

import { SocketContext } from '@/components/Context/socket'

let socket: Socket
export const useChat = () => {
  const socket = useContext(SocketContext)
  const [log, setLog] = useState<string>()

  useEffect(() => {
    // подключение/отключение пользователя
    // socket.on('log', (log: string) => {
    //   setLog(log)
    //   console.log(log)
    // })
  }, [])

  return { socket, log }
}
