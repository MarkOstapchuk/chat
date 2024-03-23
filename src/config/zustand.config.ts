import { create } from 'zustand'

interface BearState {
  bears: number
  increase: (by: number) => void
}
export const useStore = create<{ count: number }>((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 }))
}))
