import { IUser } from '@/types/auth.types'
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
  async update() {}
}

export const userService = new UserService()
