import React, { useMemo } from 'react'
import { Todo } from '../types/todos'
import { useUsersStore } from '../store/useUsersStore'

const completedStyle = {
  fontStyle: 'italic',
  color: '#d35e0f',
  opacity: 0.4,
  textDecoration: 'line-through',
}

type TProps = {
  todo: Todo
  handleChangeProps: (id: string, values: Partial<Todo>) => void
  deleteTodoProps: (id: string) => void
}

function TodoItem({ todo, handleChangeProps, deleteTodoProps }: TProps) {
  const { completed, id, title, assignedTo } = todo
  const { users } = useUsersStore()

  const assignedToUser = useMemo(
    () => users.find((user) => user.id === assignedTo),
    [users, assignedTo]
  )

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => handleChangeProps(id, { completed: !completed })}
        data-testid="todo-checkbox"
      />
      <button onClick={() => deleteTodoProps(id)} data-testid="todo-delete">
        Delete
      </button>
      <span style={completed ? completedStyle : {}}>{title}</span>
      {assignedToUser && <span>Assigned to: {assignedToUser.name}</span>}
    </li>
  )
}

export default TodoItem
