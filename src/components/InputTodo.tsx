import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useTodosStore } from '../store'
import { TUser } from '../types/users'
import { useUsersStore } from '../store/useUsersStore'

function InputTodo() {
  const [title, setTitle] = useState('')
  const [assignedTo, setAssignedTo] = useState<TUser['id'] | null>(null)

  const { addTodo } = useTodosStore()
  const { users } = useUsersStore()

  const addTodoItem = (title: string) => {
    const newTodo = {
      // id: uuid.v4(),
      id: uuidv4(),
      title: title,
      completed: false,
      assignedTo,
    }

    addTodo(newTodo)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addTodoItem(title)
    setTitle('')
    setAssignedTo(null)
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label htmlFor="title">Title</label>
      <input
        type="text"
        className="input-text"
        placeholder="Add todo..."
        value={title}
        name="title"
        onChange={onChange}
        data-testid="todo-input"
      />
      <label htmlFor="assignee">Assignee</label>
      <select
        onChange={(e) => setAssignedTo(e.target.value)}
        value={assignedTo || ''}
        data-testid="todo-assignee-select"
      >
        <option value="" data-testid={`${assignedTo}-option`}>
          Select User
        </option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <input
        type="submit"
        className="input-submit"
        value="Submit"
        data-testid="todo-submit"
      />
    </form>
  )
}

export default InputTodo
