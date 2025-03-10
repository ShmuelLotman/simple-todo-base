import { PencilIcon, TrashIcon } from 'lucide-react'
import {
  TodoCardContainer,
  TodoCardTitle,
  TodoCardHeader,
  TodoCardDescription,
  TodoCardFooter,
  TodoCardDate,
  DeleteButton,
  EditButton,
  ActionButtons,
} from './style'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Todo } from '@/types/todos'
import { useStore } from '@/store'
import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { EditTodoModal } from '../modals'
export function TodoCard({ todo }: { todo: Todo }) {
  const [isEditTodoModalOpen, setIsEditTodoModalOpen] = useState(false)

  const deleteTodo = useStore((state) => state.deleteTodo)
  const currentBoard = useStore((state) => state.currentBoard)
  const updateTodo = useStore((state) => state.updateTodo)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: todo.id,
    data: {
      type: 'todo',
      todo,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <TodoCardContainer
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <TodoCardHeader>
        <TodoCardTitle>{todo.title}</TodoCardTitle>
        <ActionButtons>
          <EditButton
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              setIsEditTodoModalOpen(true)
            }}
          >
            <PencilIcon className="w-3 h-3" />
          </EditButton>
          <DeleteButton
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              deleteTodo(todo.id)
            }}
          >
            <TrashIcon className="w-3 h-3" />
          </DeleteButton>
        </ActionButtons>
      </TodoCardHeader>
      <TodoCardDescription>{todo.description}</TodoCardDescription>
      <TodoCardFooter>
        <TodoCardDate>{todo.createdAt}</TodoCardDate>
        <Select
          onValueChange={(value) => updateTodo(todo.id, { status: value })}
          defaultValue={todo.status}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={todo.status} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Statuses</SelectLabel>
              {currentBoard!.statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </TodoCardFooter>
      {isEditTodoModalOpen && (
        <EditTodoModal
          onClose={() => setIsEditTodoModalOpen(false)}
          todoId={todo.id}
        />
      )}
    </TodoCardContainer>
  )
}
