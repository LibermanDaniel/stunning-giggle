import create from 'zustand'

export const useUserStore = create((set) => ({
  user: null,
  addUser: (token) => set((state) => ({ user: token })),
  removeUser: () => set({ user: null })
}))