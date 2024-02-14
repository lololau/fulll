import { createUserDb } from '../Infra/database'
import { IUser } from '../Domain/Types/user.type'
import dbFake from '../Infra/mock_db'
import { generateId } from './AppService'

// Create new user
export async function createUser(): Promise<IUser> {
  const id = generateId()
  const newUser: IUser = {
    userId: id
  }
  createUserDb(id)
  return newUser
}

// Get user by userId
export function getUser(userId: string): IUser {
  const user = dbFake.users[userId]

  if (!user) {
    throw new Error('E_USER_NOT_FOUND')
  }

  return user
}
