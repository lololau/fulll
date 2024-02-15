import { createUserDb, getUserDb } from '../Infra/database'
import { IUser } from '../Domain/Types/user.type'
import { generateId } from './AppService'

// Create new user
export async function createUser() {
  const id = generateId()
  await createUserDb(id)
  const user = await getUserDb(id)
  return user
}

// Get user by userId
export function getUser(userId: string): Promise<IUser> {
  return getUserDb(userId)
}
