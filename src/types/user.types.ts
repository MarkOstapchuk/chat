import { IUser } from '@/types/auth.types'
import { IDialogResponse } from '@/types/dialog.types'

export interface IProfileResponse extends IUser {
  dialogs: IDialogResponse[]
}
