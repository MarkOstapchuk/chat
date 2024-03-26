import { IUser } from '@/types/auth.types'
import { IMessage } from '@/types/message.types'

export interface IDialogParticipant {
  name: string
  pictureUrl?: string
  dialogId: number
  userId: number
  dialog: IDialog
}
export interface IDialog {
  id: number
  name?: string
  pictureUrl?: string
  isGroup: boolean
  lastMessage?: string
  sentTime: Date
}
export interface IDialogWithParticipants extends IDialog {
  dialog_participants: IDialogParticipant[]
}
export interface IDialogWithMessages extends IDialogWithParticipants {
  messages: IMessage[]
}
