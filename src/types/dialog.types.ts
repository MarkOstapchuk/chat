import { IUser } from '@/types/auth.types'
import { IMessage } from '@/types/message.types'

export interface IDialogResponse {
  id: number
  name: string
  pictureUrl: string | null
  lastMessage: string | null
  sentTime: Date | null
}

export interface IDialogMessageResponse extends IDialogResponse {
  messages: IMessage[]
}
