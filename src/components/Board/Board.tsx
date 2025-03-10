import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { useState } from 'react'
import { useShallow } from 'zustand/shallow'
import { useStore } from '../../store'
import { FilterInput } from '../FilterInput/FilterInput'
import { AddColumnModal, AddTodoModal } from '../modals'
import { StatusColumn } from '../StatusColumn/StatusColumn'
import {
  AddTodoButton,
  BoardActions,
  BoardContainer,
  BoardInnerContainer,
  Header,
  HeaderText,
  StyledPlus,
} from './style'

export function Board() {
  const { currentBoard } = useStore()
  const statuses = useStore((state) => state.currentBoard?.statuses || [])

  const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState(false)
  const [isAddColumnModalOpen, setIsAddColumnModalOpen] = useState(false)

  const {
    setActiveId,
    setActiveType,
    setIsDragging,
    reorderColumns,
    reorderTodos,
  } = useStore(
    useShallow((state) => ({
      setActiveId: state.setActiveId,
      setActiveType: state.setActiveType,
      setIsDragging: state.setIsDragging,
      reorderColumns: state.reorderColumns,
      reorderTodos: state.reorderTodos,
    }))
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveId(active.id.toString())
    setActiveType(active.data.current?.type)
    setIsDragging(true)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) {
      setActiveId(null)
      setActiveType(null)
      setIsDragging(false)
      return
    }

    if (active.id !== over.id) {
      const activeType = active.data.current?.type
      const overType = over.data.current?.type

      // Handle column reordering
      if (activeType === 'column' && overType === 'column') {
        const oldIndex = statuses.indexOf(active.id.toString())
        const newIndex = statuses.indexOf(over.id.toString())

        if (oldIndex !== newIndex) {
          reorderColumns(oldIndex, newIndex)
        }
      }

      // Handle todo reordering
      if (activeType === 'todo') {
        const activeTodoId = active.id.toString()
        const activeTodo = active.data.current?.todo

        if (!activeTodo) {
          console.error('Todo data not found in drag event')
          return
        }

        const sourceStatus = activeTodo.status
        let destinationStatus = sourceStatus
        let overTodoId: string | null = null

        // Determine destination status and todo
        if (overType === 'todo') {
          const overTodo = over.data.current?.todo
          if (overTodo) {
            destinationStatus = overTodo.status
            overTodoId = overTodo.id
          }
        } else if (overType === 'column') {
          destinationStatus = over.id.toString()
        }

        // Find source and destination indices
        const todos = useStore.getState().todos

        const sourceTodos = todos
          .filter((t) => t.status.toLowerCase() === sourceStatus.toLowerCase())
          .sort((a, b) => (a.order || 0) - (b.order || 0))

        const destinationTodos =
          sourceStatus.toLowerCase() === destinationStatus.toLowerCase()
            ? sourceTodos
            : todos
                .filter(
                  (t) =>
                    t.status.toLowerCase() === destinationStatus.toLowerCase()
                )
                .sort((a, b) => (a.order || 0) - (b.order || 0))

        const sourceIndex = sourceTodos.findIndex((t) => t.id === activeTodoId)
        let destinationIndex

        if (overType === 'todo') {
          destinationIndex = destinationTodos.findIndex(
            (t) => t.id === overTodoId
          )

          // If dropping onto the same todo in the same column, no change needed
          if (
            sourceStatus.toLowerCase() === destinationStatus.toLowerCase() &&
            activeTodoId === overTodoId
          ) {
            setActiveId(null)
            setActiveType(null)
            setIsDragging(false)
            return
          }
        } else {
          // If dropping on a column, place at the end
          destinationIndex = destinationTodos.length
        }

        reorderTodos(
          activeTodoId,
          sourceStatus,
          destinationStatus,
          sourceIndex,
          destinationIndex
        )
      }
    }

    setActiveId(null)
    setActiveType(null)
    setIsDragging(false)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeType = active.data.current?.type
    const overType = over.data.current?.type

    // Handle dragging todos over columns (for changing status)
    if (activeType === 'todo' && overType === 'column') {
      const activeTodo = active.data.current?.todo
      if (!activeTodo) return

      const currentStatus = activeTodo.status
      const newStatus = over.id.toString()

      if (currentStatus !== newStatus) {
        // We don't actually update here, we'll do it on dragEnd
        // This is just for visual feedback during the drag
      }
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    })
  )

  return (
    <BoardContainer>
      <Header>
        <HeaderText>{currentBoard?.name}</HeaderText>
        <BoardActions>
          <FilterInput />
          <AddTodoButton onClick={() => setIsAddTodoModalOpen(true)}>
            <StyledPlus />
            Add Todo
          </AddTodoButton>
          <AddTodoButton onClick={() => setIsAddColumnModalOpen(true)}>
            <StyledPlus />
            Add Column
          </AddTodoButton>
        </BoardActions>
      </Header>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <BoardInnerContainer>
          {currentBoard!.statuses.map((status) => (
            <StatusColumn key={status} status={status} />
          ))}
        </BoardInnerContainer>
        {isAddTodoModalOpen && (
          <AddTodoModal onClose={() => setIsAddTodoModalOpen(false)} />
        )}
        {isAddColumnModalOpen && (
          <AddColumnModal onClose={() => setIsAddColumnModalOpen(false)} />
        )}
      </DndContext>
    </BoardContainer>
  )
}
