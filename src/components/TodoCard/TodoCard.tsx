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
import { EditTodoModal } from '../modals'
export function TodoCard({ todo }: { todo: Todo }) {
  const [isEditTodoModalOpen, setIsEditTodoModalOpen] = useState(false)

  const deleteTodo = useStore((state) => state.deleteTodo)
  const currentBoard = useStore((state) => state.currentBoard)
  const updateTodo = useStore((state) => state.updateTodo)

  return (
    <TodoCardContainer>
      <TodoCardHeader>
        <TodoCardTitle>{todo.title}</TodoCardTitle>
        <ActionButtons>
          <EditButton onClick={() => setIsEditTodoModalOpen(true)}>
            <PencilIcon className="w-3 h-3" />
          </EditButton>
          <DeleteButton onClick={() => deleteTodo(todo.id)}>
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
