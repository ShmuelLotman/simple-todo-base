import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useUsersSlice, TUsersSlice } from './slices/useUsersSlice'
import { useBoardsSlice, TBoardsSlice } from './slices/useBoardsSlice'
import { useTodosSlice, TTodosSlice } from './slices/useTodosSlice'
import { useDragDropSlice, DragDropSlice } from './slices/useDragDropSlice'

export type TStore = TUsersSlice & TBoardsSlice & TTodosSlice & DragDropSlice

export const useStore = create<TStore>()(
  persist(
    (...a) => ({
      ...useUsersSlice(...a),
      ...useBoardsSlice(...a),
      ...useTodosSlice(...a),
      ...useDragDropSlice(...a),
    }),
    {
      name: 'store',
    }
  )
)
