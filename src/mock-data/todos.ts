import { Todo } from '../types/todos'
import { v4 as uuidv4 } from 'uuid'

export const sampleTodos: Todo[] = [
  {
    // id: uuid.v4(),
    id: uuidv4(),
    title: 'Setup development environment',
    completed: true,
    assignedTo: null,
    boardId: '1',
    status: 'todo',
    order: 1,
    description: 'Setup development environment',
    createdAt: new Date().toLocaleString(),
    updatedAt: new Date().toLocaleString(),
  },
  {
    // id: uuid.v4(),
    id: uuidv4(),
    title: 'Develop website and add content',
    completed: false,
    assignedTo: null,
    boardId: '1',
    status: 'todo',
    order: 2,
    description: 'Develop website and add content',
    createdAt: new Date().toLocaleString(),
    updatedAt: new Date().toLocaleString(),
  },
  {
    // id: uuid.v4(),
    id: uuidv4(),
    title: 'Deploy to live server',
    completed: false,
    assignedTo: null,
    boardId: '1',
    status: 'todo',
    order: 3,
    description: 'Deploy to live server',
    createdAt: new Date().toLocaleString(),
    updatedAt: new Date().toLocaleString(),
  },
]
