import { useStore } from '@/store'
import {
  BoardContainer,
  Header,
  BoardActions,
  BoardInnerContainer,
  HeaderText,
  AddTodoButton,
  StyledPlus,
} from './style'
import { StatusColumn } from '../StatusColumn/StatusColumn'
import { useState } from 'react'
import { AddTodoModal } from '../modals'
import { AddColumnModal } from '../modals/AddColumnModal'
export function Board() {
  const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState(false)
  const [isAddColumnModalOpen, setIsAddColumnModalOpen] = useState(false)
  const currentBoard = useStore((store) => store.currentBoard)

  return (
    <BoardContainer>
      <Header>
        <HeaderText>{currentBoard?.name}</HeaderText>
        <BoardActions>
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
    </BoardContainer>
  )
}
