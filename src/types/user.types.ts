import { IUser } from '@/types/auth.types'
import { IDialogParticipant } from '@/types/dialog.types'
import { IMessage } from '@/types/message.types'

export interface IProfileResponse extends IUser {
  dialog_participants_in: IDialogParticipant[]
  dialog_participants_contains: IDialogParticipant[]
  message: IMessage[]
}
