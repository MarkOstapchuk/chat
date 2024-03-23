import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { INamedDialog } from '@/types/dialog.types'

interface IProfileStore {
  dialogs: INamedDialog[]
  setOne: (payload: INamedDialog) => void
  setMany: (payload: INamedDialog[]) => void
}
const initialState: INamedDialog[] = [
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
    setOne: (payload: INamedDialog) =>
      set((state) => ({ dialogs: [...state.dialogs, payload] })),
    setMany: (payload: INamedDialog[]) =>
      set((state) => ({ dialogs: [...payload] }))
  }))
)
