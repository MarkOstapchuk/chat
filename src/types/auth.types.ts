export interface IAuthForm {
  username: string
  email: string
  password: string
  secondPassword: string
}
export interface ILoginForm {
  username: string
  password: string
}
export interface IUser {
  id: number
  name?: string
  email: string
  username: string
  createdAt: Date
  pictureUrl: string
}

export interface IAuthResponse {
  user: IUser
  accessToken: string
}
