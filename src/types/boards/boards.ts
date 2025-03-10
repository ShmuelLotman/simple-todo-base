import { TUser } from '../users'

export type TBoard = {
  id: string
  name: string
  statuses: string[]
  userId: TUser['id']
}
