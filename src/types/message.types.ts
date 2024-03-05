export interface IMessage {
  id: number
  senderId: number
  dialogId: number
  text: string
  createdAt: Date
}
export interface IMessagePost {
  senderId: number
  dialogId: number
  text: string
}
