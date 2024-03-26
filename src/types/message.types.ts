export enum Status {
  SENT,
  FAILED,
  READ
}

export interface IMessage {
  id: number
  senderId: number
  dialogId: number
  text: string
  createdAt: Date
  unreadById: number[]
  status: Status
}

export interface IMessagePost {
  senderId: number
  dialogId: number
  text: string
}
