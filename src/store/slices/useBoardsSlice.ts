import { StateCreator } from 'zustand'
import { TStore } from '..'
import { TBoard } from '../../types/boards/boards'
import { sampleBoards } from '@/mock-data/boards'

export interface BoardsState {
  boards: TBoard[]
  currentBoard: TBoard | null
}

export interface BoardsActions {
  addBoard: (board: TBoard) => void
  updateBoard: (id: TBoard['id'], board: Partial<TBoard>) => void
  deleteBoard: (id: TBoard['id']) => void
}

export type TBoardsSlice = BoardsState & BoardsActions

export const useBoardsSlice: StateCreator<TStore, [], [], TBoardsSlice> = (
  set,
  get
) => ({
  boards: [...sampleBoards],
  currentBoard: sampleBoards[0],
  addBoard: (board) => set((state) => ({ boards: [...state.boards, board] })),
  updateBoard: (id, board) =>
    set((state) => ({
      boards: state.boards.map((b) => (b.id === id ? { ...b, ...board } : b)),
      currentBoard:
        state.currentBoard?.id === id
          ? { ...state.currentBoard, ...board }
          : state.currentBoard,
    })),
  deleteBoard: (id) => {
    set((state) => ({ boards: state.boards.filter((b) => b.id !== id) }))

    // delete todos
    get()
      .todos.filter((t) => t.boardId === id)
      .forEach((t) => {
        get().deleteTodo(t.id)
      })
  },
})
