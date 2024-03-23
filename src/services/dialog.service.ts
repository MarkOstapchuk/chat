import {
  IDialog,
  IDialogMessageResponse,
  IDialogWithNamed,
  INamedDialog
} from '@/types/dialog.types'
import { IProfileResponse } from '@/types/user.types'

import { axiosWithAuth } from '@/api/interceptors'

class DialogService {
  private BASE_URL = '/dialog'
  async getDialog(id: string) {
    const response = await axiosWithAuth.get<IDialogWithNamed>(
      this.BASE_URL + `/${id}`
    )
    return response.data
  }
  async createDialog(users: Array<{ userId: number; name: string }>) {
    const data = { users }
    const response = await axiosWithAuth.post<INamedDialog>(this.BASE_URL, data)
    return response.data
  }
}

export const dialogService = new DialogService()
