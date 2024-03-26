import { IAuthForm, IAuthResponse, ILoginForm } from '@/types/auth.types'

import { axiosClassic } from '@/api/interceptors'

import { saveTokenStorage } from '@/services/authToken.service'

export const AuthService = {
  async main(type: 'login' | 'register', data: IAuthForm | ILoginForm) {
    const response = await axiosClassic.post<IAuthResponse>(
      `/auth/${type}`,
      data
    )
    if (response.data.accessToken) saveTokenStorage(response.data.accessToken)
    return response
  },
  async getNewTokens() {
    const response = await axiosClassic.post<IAuthResponse>(
      '/auth/login/access-token'
    )

    if (response.data.accessToken) saveTokenStorage(response.data.accessToken)
    return response
  },
  async logout() {
    const response = await axiosClassic.post<boolean>('/auth/logout')
    return response
  }
}
