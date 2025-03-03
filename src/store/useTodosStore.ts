import { create } from 'zustand'
import { Todo } from '../types/todos'
import { sampleTodos } from '../mock-data/todos'

export interface TodoState {
  todos: Todo[]
  addTodo: (todo: Todo) => void
  deleteTodo: (id: string) => void
  updateTodo: (id: string, values: Partial<Todo>) => void
}

export const useTodosStore = create<TodoState>((set) => ({
  todos: sampleTodos,
  addTodo: (todo: Todo) =>
    set((state) => ({
      todos: [...state.todos, todo],
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
    })),
  updateTodo: (id, values) =>
    set((state) => ({
      todos: state.todos.map((t) => (t.id === id ? { ...t, ...values } : t)),
    })),
}))
