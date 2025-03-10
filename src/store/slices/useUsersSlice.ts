import { StateCreator } from 'zustand'
import { TStore } from '..'
import { TUser } from '../../types/users'
import { sampleUsers } from '../../mock-data/users'

export interface UsersState {
  users: TUser[]
  currentUser: TUser | null
}

export interface UsersActions {
  addUser: (user: TUser) => void
  updateUser: (id: TUser['id'], user: Partial<TUser>) => void
  deleteUser: (id: TUser['id']) => void
}

export type TUsersSlice = UsersState & UsersActions

export const useUsersSlice: StateCreator<TStore, [], [], TUsersSlice> = (
  set,
  get
) => ({
  users: [...sampleUsers],
  currentUser: sampleUsers[0],
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (id, user) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? { ...u, ...user } : u)),
    })),
  deleteUser: (id) => {
    set((state) => ({ users: state.users.filter((u) => u.id !== id) }))
  },
})
