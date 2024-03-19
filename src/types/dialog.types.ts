import { IUser } from '@/types/auth.types'
import { IMessage } from '@/types/message.types'

export interface IDialog {
  id: number
  pictureUrl: string | null
  lastMessage: string | null
  sentTime: Date | null
}
export interface IDialogResponse {
  dialog: IDialog
  dialogId: number
  id: number
  name: string
  userId: number
}
export interface IDialogMessageResponse extends IDialogResponse {
  messages: IMessage[]
}
