import { DOMAIN } from '@/consts/server.consts'

class CHAT_CONFIG_CLASS {
  public SERVER_URL = `http://${DOMAIN}:4444/chat`
}

export const CHAT_CONFIG = new CHAT_CONFIG_CLASS()
