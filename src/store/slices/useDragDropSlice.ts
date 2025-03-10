import { StateCreator } from 'zustand'
import { TStore } from '..'

export interface DragDropState {
  activeId: string | null
  activeType: 'column' | 'todo' | null
  isDragging: boolean
}

export interface DragDropActions {
  setActiveId: (id: string | null) => void
  setActiveType: (type: 'column' | 'todo' | null) => void
  setIsDragging: (isDragging: boolean) => void
  reorderColumns: (sourceIndex: number, destinationIndex: number) => void
  reorderTodos: (
    todoId: string,
    sourceStatus: string,
    destinationStatus: string,
    sourceIndex: number,
    destinationIndex: number
  ) => void
}

export interface DragDropSlice extends DragDropState, DragDropActions {}

export const useDragDropSlice: StateCreator<TStore, [], [], DragDropSlice> = (
  set,
  get
) => ({
  activeId: null,
  activeType: null,
  isDragging: false,

  setActiveId: (id) => set({ activeId: id }),
  setActiveType: (type) => set({ activeType: type }),
  setIsDragging: (isDragging) => set({ isDragging }),

  reorderColumns: (sourceIndex, destinationIndex) => {
    const { currentBoard, updateBoard } = get()
    if (!currentBoard || !currentBoard.statuses) return

    const statuses = [...currentBoard.statuses]
    const [removed] = statuses.splice(sourceIndex, 1)
    statuses.splice(destinationIndex, 0, removed)

    updateBoard(currentBoard.id, { statuses })
  },

  reorderTodos: (
    todoId,
    sourceStatus,
    destinationStatus,
    sourceIndex,
    destinationIndex
  ) => {
    const { todos, updateTodo } = get()

    // Get todos in source and destination columns, sorted by order
    const sourceTodos = todos
      .filter((t) => t.status.toLowerCase() === sourceStatus.toLowerCase())
      .sort((a, b) => (a.order || 0) - (b.order || 0))

    const destinationTodos =
      sourceStatus.toLowerCase() === destinationStatus.toLowerCase()
        ? [...sourceTodos] // Create a new array to avoid modifying sourceTodos
        : todos
            .filter(
              (t) => t.status.toLowerCase() === destinationStatus.toLowerCase()
            )
            .sort((a, b) => (a.order || 0) - (b.order || 0))

    // Get the todo being moved
    const todoToMove = sourceTodos[sourceIndex]

    if (!todoToMove) {
      console.error('Todo not found at source index:', sourceIndex)
      return
    }

    // If moving within the same column
    if (sourceStatus.toLowerCase() === destinationStatus.toLowerCase()) {
      // Create a new array with the todos in the new order
      const reorderedTodos = [...sourceTodos]

      // Remove from source position
      reorderedTodos.splice(sourceIndex, 1)

      // Insert at destination position
      reorderedTodos.splice(destinationIndex, 0, todoToMove)

      // Update the order property of all todos in the column
      reorderedTodos.forEach((todo, index) => {
        updateTodo(todo.id, { order: index })
      })
    } else {
      // Moving between columns

      // Remove from source array
      const updatedSourceTodos = [...sourceTodos]
      updatedSourceTodos.splice(sourceIndex, 1)

      // Update orders in source column
      updatedSourceTodos.forEach((todo, index) => {
        updateTodo(todo.id, { order: index })
      })

      // Insert into destination array
      const updatedDestinationTodos = [...destinationTodos]
      updatedDestinationTodos.splice(destinationIndex, 0, {
        ...todoToMove,
        status: destinationStatus,
      })

      // Update status and orders in destination column
      updateTodo(todoId, { status: destinationStatus })

      updatedDestinationTodos.forEach((todo, index) => {
        updateTodo(todo.id, { order: index })
      })
    }
  },
})
