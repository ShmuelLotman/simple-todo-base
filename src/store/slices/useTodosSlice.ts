import { StateCreator } from 'zustand'
import { TStore } from '..'
import { Todo } from '../../types/todos'

import { sampleTodos } from '../../mock-data/todos'

export interface TodosState {
  todos: Todo[]
}

export interface TodosActions {
  addTodo: (todo: Todo) => void
  updateTodo: (id: Todo['id'], todo: Partial<Todo>) => void
  deleteTodo: (id: Todo['id']) => void
}

export type TTodosSlice = TodosState & TodosActions

export const useTodosSlice: StateCreator<TStore, [], [], TTodosSlice> = (
  set,
  get
) => ({
  todos: sampleTodos,

  addTodo: (todo) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          ...todo,
          createdAt: new Date().toLocaleString(),
          updatedAt: new Date().toLocaleString(),
        },
      ],
    })),
  updateTodo: (id, todo) =>
    set((state) => ({
      todos: state.todos.map((t) => (t.id === id ? { ...t, ...todo } : t)),
    })),
  deleteTodo: (id) => {
    set((state) => ({ todos: state.todos.filter((t) => t.id !== id) }))
  },
})
