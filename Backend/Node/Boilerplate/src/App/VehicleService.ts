import { IVehicle } from '../Domain/Types/vehicle.type'
import { createVehicleDb, getVehicleDB, updateVehicleDB } from '../Infra/database'

// Create new vehicle
export async function createVehicle(vehicle: IVehicle, fleetId: string): Promise<void> {
  // create vehicle
  await createVehicleDb(fleetId, vehicle)
}

// Get vehicle
export async function getVehicle(fleetId: string, vehiclePlateNumber: string): Promise<IVehicle> {
  const vehicle = await getVehicleDB(fleetId, vehiclePlateNumber)
  return vehicle
}

// Park vehicle at a location
export async function parkVehicle(
  fleetId: string,
  vehiclePlateNumber: string,
  location: { lat: string; lng: string }
): Promise<IVehicle> {
  let vehicle = await getVehicleDB(fleetId, vehiclePlateNumber)

  if (vehicle.lat === Number(location.lat) && vehicle.lng === Number(location.lng)) {
    console.log('lalaal')
    throw new Error('E_VEHICLE_ALREADY_HAVE_THIS_LOCATION')
  }

  await updateVehicleDB(fleetId, vehiclePlateNumber, location)
  vehicle = await getVehicleDB(fleetId, vehiclePlateNumber)

  return vehicle
}
