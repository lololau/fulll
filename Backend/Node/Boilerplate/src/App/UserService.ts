import { createUserDB, getUserDB } from '../Infra/database/user.sqlite'
import { IUser } from '../Domain/Types/user.type'
import { generateId } from './utils'

// Create new user
export async function createUser() {
  const id = generateId()

  // create new user
  await createUserDB(id)

  // get new user to return
  const user = await getUserDB(id)
  return user
}

// Get user by userId
export function getUser(userId: string): Promise<IUser> {
  return getUserDB(userId)
}
