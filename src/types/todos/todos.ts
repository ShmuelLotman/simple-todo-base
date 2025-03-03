import { TUser } from '../users'

export type Todo = {
  id: string
  title: string
  completed: boolean
  assignedTo: TUser['id'] | null
}
