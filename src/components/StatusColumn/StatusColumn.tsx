import { useStore } from '@/store'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import {
  StatusColumnContainer,
  StatusColumnContent,
  StatusColumnHeader,
  StatusColumnTitle,
  DeleteButton,
} from './style'
import { useShallow } from 'zustand/shallow'
import { TodoCard } from '../TodoCard/TodoCard'

import { TrashIcon } from 'lucide-react'

export function StatusColumn({ status }: { status: string }) {
  const filterText = useStore((state) => state.filterText.toLowerCase())
  const todos = useStore(
    useShallow(
      (state) =>
        state.todos
          .filter(
            (todo) =>
              todo.status.toLowerCase() === status.toLowerCase() &&
              (filterText === '' ||
                todo.title.toLowerCase().includes(filterText) ||
                todo.description.toLowerCase().includes(filterText))
          )
          .sort((a, b) => (a.order || 0) - (b.order || 0)) // Ensure todos are sorted by order
    )
  )
  const currentBoard = useStore((state) => state.currentBoard)
  const updateBoard = useStore((state) => state.updateBoard)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: status,
    data: {
      type: 'column',
      status,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  // Make sure we're using the id property for the sortable items
  const todoIds = todos.map((todo) => todo.id)

  return (
    <StatusColumnContainer
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      data-testid={`status-column-${status}`}
    >
      <StatusColumnHeader>
        <StatusColumnTitle>{status}</StatusColumnTitle>
        <DeleteButton
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            updateBoard(currentBoard!.id, {
              statuses: currentBoard!.statuses.filter((s) => s !== status),
            })
          }}
          data-testid={`delete-status-column-button-${status}`}
        >
          <TrashIcon className="w-3 h-3" />
        </DeleteButton>
      </StatusColumnHeader>

      <StatusColumnContent>
        <SortableContext items={todoIds} strategy={verticalListSortingStrategy}>
          {todos.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </SortableContext>
      </StatusColumnContent>
    </StatusColumnContainer>
  )
}
