import { create } from 'zustand'

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
export const ProfileStore = create<IProfileStore>()((set) => ({
  user: initialState,
  set: (payload: Partial<IUser>) =>
    set((state) => ({ user: { ...state.user, ...payload } }))
}))
