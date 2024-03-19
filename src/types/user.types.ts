import { IUser } from '@/types/auth.types'
import { INamedDialog } from '@/types/dialog.types'

export interface IProfileResponse extends IUser {
  dialogs: INamedDialog[]
}
