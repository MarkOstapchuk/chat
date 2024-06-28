import { IUser } from '@/types/auth.types'
import { IMessage } from '@/types/message.types'

export interface IDialogParticipant {
  useRefId: number
  userRef: IUser
  dialogId: number
  userId: number
  dialog: IDialog
  user: IUser
  notificationCount: number
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
