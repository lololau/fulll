import db from "../Infra/mock_db"
import { IFleet } from "../Domain/Types/fleet.type"
import { generateId } from "./AppService"
import { getUser } from "./UserService"

// Create new fleet
export async function createFleet(userId: string): Promise<IFleet> {
  const id = generateId()

  // try get user
  try {
    const user = getUser(userId)
  
    // creating new fleet
    const newFleet = {
      fleetId: id,
      vehicles: []
    }
    db.fleets[newFleet.fleetId] = newFleet

    // saving fleet in user data
    user.fleet = newFleet

    return newFleet
  } catch (err) {
    return err
  }
}

// Get fleet by id
export async function getFleetById(fleetId: string): Promise<IFleet> {
  const fleet = db.fleets[fleetId]
  if (!fleet) {
    throw new Error("E_FLEET_NOT_FOUND")
  }
  return fleet
}