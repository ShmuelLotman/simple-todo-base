import { useStore } from '@/store'
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
  const todos = useStore(
    useShallow((state) => state.todos.filter((todo) => todo.status === status))
  )
  const currentBoard = useStore((state) => state.currentBoard)
  const updateBoard = useStore((state) => state.updateBoard)

  return (
    <StatusColumnContainer>
      <StatusColumnHeader>
        <StatusColumnTitle>{status}</StatusColumnTitle>
        <DeleteButton
          onClick={() =>
            updateBoard(currentBoard!.id, {
              statuses: currentBoard!.statuses.filter((s) => s !== status),
            })
          }
        >
          <TrashIcon className="w-3 h-3" />
        </DeleteButton>
      </StatusColumnHeader>
      <StatusColumnContent>
        {todos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </StatusColumnContent>
    </StatusColumnContainer>
  )
}
