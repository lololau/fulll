import { IFleet } from '../Domain/Types/fleet.type'
import { generateId } from './AppService'
import { getUser } from './UserService'
import { createFleetDb, getFleetDb } from '../Infra/database'

// Create new fleet
export async function createFleet(userId: string): Promise<IFleet> {
  const id = generateId()

  // try get user
  await getUser(userId)

  // create fleet for userId
  await createFleetDb(userId, id)

  // get fleet
  const fleet = await getFleetById(id)
  return fleet
}

// Get fleet by i d
export async function getFleetById(fleetId: string): Promise<IFleet> {
  return getFleetDb(fleetId)
}
