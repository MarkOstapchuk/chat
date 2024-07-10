import { Config } from 'tailwindcss'

import { axiosWithAuth } from '@/api/interceptors'

import { SERVER_URL } from '@/consts/server.consts'

class MessageService {
  private BASE_URL = `/message`

  async uploadImage(file: FormData) {
    return await axiosWithAuth
      .post<{
        file: { filename: string }
        statusCode: number
      }>(this.BASE_URL + '/uploadImage', file, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((data) => data.data)
  }

  getPicture(picture: string) {
    return `http://localhost:4444/api${this.BASE_URL}/image/${picture}`
  }

  getFile(file: string) {
    return axiosWithAuth.get(`http://localhost:4444/api/message/file/${file}`)
  }

  async uploadFile(file: FormData, config?: any) {
    return await axiosWithAuth
      .post<{
        filename: string
        statusCode: number
      }>(this.BASE_URL + '/uploadFile', file, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },

        ...config
      })
      .then((data) => data.data)
  }
}

export const messageService = new MessageService()
