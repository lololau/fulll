import { createVehicleDB, getVehicleDB, updateVehicleDB } from '../Infra/database/vehicle.sqlite'
import { IVehicle, IVehicleDB } from '../Domain/Types/vehicle.type'
import { getFleetDB } from '../Infra/database/fleet.sqlite'

// Create new vehicle
export async function createVehicle(vehicle: IVehicle, fleetId: string): Promise<void> {
  const fleet = await getFleetDB(fleetId)

  try {
    // check if vehicle already exist in the fleet and return error if it is
    const vehicleAlreadyInFleet = await getVehicleDB(fleet.fleetId, vehicle.vehiclePlateNumber)
    if (vehicleAlreadyInFleet) {
      throw new Error('E_VEHICLE_ALREADY_EXISTS')
    }
  } catch (err) {
    if (err.message !== 'E_VEHICLE_NOT_FOUND') {
      throw err
    }
  }

  // create vehicle if not exists
  await createVehicleDB(fleet.fleetId, vehicle)
}

// Get vehicle
export async function getVehicle(fleetId: string, vehiclePlateNumber: string): Promise<IVehicleDB> {
  const vehicle = await getVehicleDB(fleetId, vehiclePlateNumber)
  return vehicle
}

// Park vehicle at a location
export async function parkVehicle(
  fleetId: string,
  vehiclePlateNumber: string,
  location: { lat: string; lng: string }
): Promise<IVehicleDB> {
  // check if fleet is existing
  await getFleetDB(fleetId)

  // get vehicle from db
  let vehicle = await getVehicleDB(fleetId, vehiclePlateNumber)

  // return error if location is the same as before
  if (vehicle.lat === Number(location.lat) && vehicle.lng === Number(location.lng)) {
    throw new Error('E_VEHICLE_ALREADY_HAVE_THIS_LOCATION')
  }

  // update vehicle's location
  await updateVehicleDB(fleetId, vehiclePlateNumber, location)
  vehicle = await getVehicleDB(fleetId, vehiclePlateNumber)

  return vehicle
}
