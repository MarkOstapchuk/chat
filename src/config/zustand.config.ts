import { create } from 'zustand'

export const useStore = create<{ count: number }>((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 }))
}))
