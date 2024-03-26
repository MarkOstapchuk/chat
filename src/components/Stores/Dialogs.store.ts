import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import '@/types/dialog.types'
import { IDialogParticipant } from '@/types/dialog.types'

interface IProfileStore {
  dialogs: IDialogParticipant[]
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
    setOne: (payload: IDialogParticipant) =>
      set((state) => ({ dialogs: [...state.dialogs, payload] })),
    setMany: (payload: IDialogParticipant[]) =>
      set((state) => ({ dialogs: [...payload] }))
  }))
)
