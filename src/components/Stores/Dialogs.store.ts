import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import '@/types/dialog.types'
import { IDialogParticipant } from '@/types/dialog.types'
import { IMessage } from '@/types/message.types'

interface IProfileStore {
  dialogs: IDialogParticipant[]
  addNotification: (payload: { message: IMessage; dialogId: number }) => void
  clearNotifications: (payload: { dialogId: number }) => void
  setLastMessage: (payload: { message: IMessage; dialogId: number }) => void
  setOne: (payload: IDialogParticipant) => void
  setMany: (payload: IDialogParticipant[]) => void
}
const initialState: IDialogParticipant[] = [
  // {
  //   id: 0,
  //   name: '',
  //   dialogId: 0,
  //   userId: 0,
  //   dialog: {
  //     id: 0,
  //     pictureUrl: '',
  //     lastMessage: '',
  //     sentTime: new Date(),
  //     messages: []
  //   }
  // }
]

export const DialogsStore = create<IProfileStore>()(
  devtools((set) => ({
    dialogs: initialState,
    addNotification: (payload: { message: IMessage; dialogId: number }) => {
      set((state) => ({
        dialogs: state.dialogs.map((item) => {
          if (item.dialogId === payload.dialogId) {
            return {
              ...item,
              notificationCount: item.notificationCount + 1,
              dialog: { ...item.dialog, lastMessage: payload.message.text }
            }
          }
          return item
        })
      }))
    },
    clearNotifications: (payload: { dialogId: number }) =>
      set((state) => ({
        dialogs: state.dialogs.map((item) => {
          if (item.dialogId === payload.dialogId) {
            return {
              ...item,
              notificationCount: 0
            }
          }
          return item
        })
      })),
    setLastMessage: (payload: { message: IMessage; dialogId: number }) =>
      set((state) => ({
        dialogs: state.dialogs.map((item) => {
          if (item.dialogId === payload.dialogId) {
            return {
              ...item,
              dialog: {
                ...item.dialog,
                lastMessage: payload.message.text,
                sentTime: payload.message.createdAt
              }
            }
          }
          return item
        })
      })),
    setOne: (payload: IDialogParticipant) =>
      set((state) => ({ dialogs: [...state.dialogs, payload] })),
    setMany: (payload: IDialogParticipant[]) => {
      if (payload) set((state) => ({ dialogs: [] }))
      set((state) => ({ dialogs: [...(payload || [])] }))
    }
  }))
)
