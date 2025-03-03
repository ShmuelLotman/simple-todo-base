import { create } from 'zustand'
import { TUser } from '../types/users'
import { sampleUsers } from '../mock-data/users'

export interface UserState {
  users: TUser[]
}

export const useUsersStore = create<UserState>((set) => ({
  users: sampleUsers,
}))
