import { IVehicle, IVehicleDB } from '../../Domain/Types/vehicle.type'
import { DB } from '.'

// Create vehicle in Vehicle table
export async function createVehicleDB(fleetId: string, vehicle: IVehicle): Promise<void> {
  const db = DB()

  return new Promise<void>((resolve, reject) => {
    db.run(
      `INSERT INTO Vehicle (vehiclePlateNumber, fleetId, lat, lng) VALUES ($vehiclePlateNumber, $fleetId, $lat, $lng)`,
      {
        $vehiclePlateNumber: vehicle.vehiclePlateNumber,
        $fleetId: fleetId,
        $lat: vehicle.location?.lat,
        $lng: vehicle.location?.lng
      },
      (err: any) => {
        if (err) {
          reject(err)
          return
        }
        resolve()
      }
    )
  })
}

// Get vehicle by vehiclePlateNumber and fleetId
export async function getVehicleDB(fleetId: string, vehiclePlateNumber: string): Promise<IVehicleDB> {
  const db = DB()
  return new Promise<IVehicleDB>((resolve, reject) => {
    db.get(
      `SELECT * FROM Vehicle WHERE vehiclePlateNumber='${vehiclePlateNumber}' AND fleetId='${fleetId}'`,
      (err, row: IVehicleDB) => {
        if (err) {
          reject(err)
          return
        }
        if (row === undefined) {
          reject(new Error('E_VEHICLE_NOT_FOUND'))
          return
        }
        resolve(row)
      }
    )
  })
}

// Update vehicle location
export async function updateVehicleDB(
  fleetId: string,
  vehiclePlateNumber: string,
  location: { lat: string; lng: string }
): Promise<void> {
  const db = DB()
  return new Promise<void>((resolve, reject) => {
    db.run(
      `UPDATE Vehicle SET lat='${location.lat}', lng='${location.lng}' WHERE vehiclePlateNumber='${vehiclePlateNumber}' AND fleetId='${fleetId}'`,
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
