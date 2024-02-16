import { IFleet } from '../../Domain/Types/fleet.type'
import { DB } from '.'

// Create fleet
export async function createFleetDB(userId: string, fleetId: string): Promise<void> {
  const db = DB()

  return new Promise<void>((resolve, reject) => {
    db.run(
      `INSERT INTO Fleet (fleetId, userId) VALUES ($fleetId, $userId)`,
      { $fleetId: fleetId, $userId: userId },
      (err) => {
        if (err) {
          reject(err)
          return
        }
        resolve()
      }
    )
  })
}

// Get fleet by fleetId
export async function getFleetDB(id: string): Promise<IFleet> {
  const db = DB()
  return new Promise<IFleet>((resolve, reject) => {
    db.get(`SELECT * FROM Fleet WHERE fleetId='${id}'`, (err, row: IFleet) => {
      if (err) {
        reject(err)
        return
      }
      if (row === undefined) {
        reject(new Error('E_FLEET_NOT_FOUND'))
      }
      resolve(row)
    })
  })
}
