import { IUser } from '@/types/auth.types'
import { IDialogParticipant } from '@/types/dialog.types'
import { IProfileResponse } from '@/types/user.types'

import { axiosWithAuth } from '@/api/interceptors'

class UserService {
  private BASE_URL = '/user'

  async getProfile() {
    const response = await axiosWithAuth.get<IProfileResponse>(
      this.BASE_URL + '/profile'
    )
    return response.data
  }
  async getAllUsers() {
    const response = await axiosWithAuth.get<IUser[]>(this.BASE_URL)
    return response.data
  }
  async findUsers(username: string) {
    const response = await axiosWithAuth.get<IUser[]>(
      this.BASE_URL + '/search/' + username
    )
    return response.data
  }
  async getAllDialogs() {
    const response = await axiosWithAuth.get<IProfileResponse>(
      this.BASE_URL + '/profile'
    )
    return response.data.dialog_participants_contains
  }
  async findDialogs(username: string) {
    const response = await axiosWithAuth.get<IProfileResponse>(
      this.BASE_URL + '/searchDialog/' + username
    )
    return response.data.dialog_participants_contains
  }
  getPicture(picture: string) {
    return `http://localhost:4444/api${this.BASE_URL}/image/${picture}`
  }
  async setPicture(file: FormData) {
    const response = await axiosWithAuth
      .post<{
        statusCode: number
        data: IUser
      }>(this.BASE_URL + '/upload', file, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((data) => data.data)
    return response
  }
  async update() {}
}

export const userService = new UserService()
