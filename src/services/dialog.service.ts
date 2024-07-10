import '@/types/dialog.types'
import {
  IDialog,
  IDialogWithMessages,
  IDialogWithParticipants
} from '@/types/dialog.types'

import { axiosWithAuth } from '@/api/interceptors'

class DialogService {
  private BASE_URL = '/dialog'
  async getDialog(id: string) {
    const response = await axiosWithAuth.get<IDialogWithMessages>(
      this.BASE_URL + `/${id}`
    )
    return response.data
  }
  async createDialog(user: { userId: number; name: string }) {
    const response = await axiosWithAuth.post<IDialogWithParticipants>(
      this.BASE_URL,
      user
    )
    return response.data
  }
}

export const dialogService = new DialogService()
