export enum Status {
  SENT,
  FAILED,
  READ
}

export type Type = 'TEXT' | 'IMAGE' | 'FILE'

export interface IMessage {
  id: number
  senderId: number
  dialogId: number
  text: string
  createdAt: Date
  unreadById: number[]
  status: Status
  type: Type
}

export interface IMessagePost {
  senderId: number
  dialogId: number
  text?: string
}
