import { Todo } from '../types/todos'
import { v4 as uuidv4 } from 'uuid'

export const sampleTodos: Todo[] = [
  {
    // id: uuid.v4(),
    id: uuidv4(),
    title: 'Setup development environment',
    completed: true,
    assignedTo: null,
  },
  {
    // id: uuid.v4(),
    id: uuidv4(),
    title: 'Develop website and add content',
    completed: false,
    assignedTo: null,
  },
  {
    // id: uuid.v4(),
    id: uuidv4(),
    title: 'Deploy to live server',
    completed: false,
    assignedTo: null,
  },
]
