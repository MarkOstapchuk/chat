import { IUser } from '@/types/auth.types'
import { IMessage } from '@/types/message.types'

export interface INamedDialog {
  id: number
  name: string
  dialogId: number
  userId: number
  dialog: IDialog
}
export interface IDialog {
  id: number
  pictureUrl: string | null
  lastMessage: string | null
  sentTime: Date | null
}
export interface IDialogWithMessages extends IDialog {
  messages: IMessage[]
}
export interface IDialogMessageResponse extends INamedDialog {
  dialog: IDialogWithMessages
}
