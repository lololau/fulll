import { createFleetDB, getFleetDB } from '../Infra/database/fleet.sqlite'
import { IFleet } from '../Domain/Types/fleet.type'
import { generateId } from './utils'
import { getUser } from './UserService'

// Create new fleet
export async function createFleet(userId: string): Promise<IFleet> {
  const id = generateId()

  // try get user
  await getUser(userId)

  // create fleet for userId
  await createFleetDB(userId, id)

  // get fleet
  const fleet = await getFleetById(id)
  return fleet
}

// Get fleet by id
export async function getFleetById(fleetId: string): Promise<IFleet> {
  return getFleetDB(fleetId)
}
