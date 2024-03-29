import axios, { CreateAxiosDefaults } from 'axios'

import { errorCatch } from '@/api/error'

import { DOMAIN } from '@/consts/server.consts'
import { AuthService } from '@/services/auth.service'
import { getAccessToken, removeFromStorage } from '@/services/authToken.service'

const options: CreateAxiosDefaults = {
  baseURL: `http://${DOMAIN}:4444/api`,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
}

const axiosClassic = axios.create(options)

const axiosWithAuth = axios.create(options)
axiosWithAuth.interceptors.request.use((config) => {
  const accessToken = getAccessToken()
  if (config?.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})
axiosWithAuth.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config
    if (
      (error?.response?.status === 401 ||
        errorCatch(error) === 'jwt expired' ||
        errorCatch(error) === 'jwt must be provided') &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        await AuthService.getNewTokens()
        return axiosWithAuth.request(originalRequest)
      } catch (error) {
        if (errorCatch(error) === 'jwt expired') removeFromStorage()
      }
    }
    throw error
  }
)
export { axiosClassic, axiosWithAuth }
