import { createContext } from 'react'
import { Socket, io } from 'socket.io-client'

import { CHAT_CONFIG } from '@/config/chat.config'

export const socket = io(CHAT_CONFIG.SERVER_URL)
export const SocketContext = createContext<Socket | null>(null)
