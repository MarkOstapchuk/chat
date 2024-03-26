import { IUser } from '@/types/auth.types'
import { IDialogParticipant } from '@/types/dialog.types'
import { IMessage } from '@/types/message.types'

export interface IProfileResponse extends IUser {
  dialog_participant: IDialogParticipant[]
  message: IMessage[]
}
