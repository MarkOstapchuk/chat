import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { IUser } from '@/types/auth.types'

interface IProfileStore {
  user: IUser
  set: (payload: Partial<IUser>) => void
}
const initialState: IUser = {
  id: 0,
  name: '',
  email: '',
  username: '',
  createdAt: new Date(),
  pictureUrl: ''
}
export const ProfileStore = create<IProfileStore>()(
  devtools((set) => ({
    user: initialState,
    set: (payload: Partial<IUser>) =>
      set((state) => ({ user: { ...state.user, ...payload } }))
  }))
)
