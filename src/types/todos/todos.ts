import { TBoard } from '../boards'
import { TUser } from '../users'

export type Todo = {
  id: string
  title: string
  completed: boolean
  assignedTo: TUser['id'] | null
  boardId: TBoard['id']
  status: string
  order: number
  description: string
  createdAt?: string
  updatedAt?: string
}
