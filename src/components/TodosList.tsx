import React from 'react'
import TodoItem from './TodoItem'
import { Todo } from '../types/todos'

type TProps = {
  todos: Todo[]
  handleChangeProps: (id: string, values: Partial<Todo>) => void
  deleteTodoProps: (id: string) => void
}

export default function TodosList({
  todos,
  handleChangeProps,
  deleteTodoProps,
}: TProps) {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleChangeProps={handleChangeProps}
          deleteTodoProps={deleteTodoProps}
        />
      ))}
    </div>
  )
}
