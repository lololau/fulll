import { IVehicle } from '../Domain/Types/vehicle.type'
import { getFleetById } from './FleetService'
import { createVehicleDb, getVehicleDB, updateVehicleDB } from '../Infra/database'

// Create new vehicle
export async function createVehicle(vehicle: IVehicle, fleetId: string): Promise<void> {
  // create vehicle
  await createVehicleDb(fleetId, vehicle)
}

// Get vehicle by plate number
export async function getVehicleByPlateNumber(vehiclePlateNumber: string, fleetId: string): Promise<IVehicle> {
  return getVehicleDB(fleetId, vehiclePlateNumber)
}

// Save vehicle into the fleet
export async function saveVehicleInFleet(fleetId: string, vehiclePlateNumber: string): Promise<IVehicle> {
  const fleet = await getFleetById(fleetId)
  const vehicle = await getVehicleByPlateNumber(fleetId, vehiclePlateNumber)

  if (!fleet.vehicles) {
    fleet.vehicles = [vehicle]
  } else {
    const isVehicleAlreadyExist = fleet.vehicles.find((el) => el.vehiclePlateNumber === vehicle.vehiclePlateNumber)
    if (isVehicleAlreadyExist) {
      throw new Error('E_VEHICLE_ALREADY_EXISTS')
    }

    // saving into fleet table
    fleet.vehicles = [...fleet.vehicles, vehicle]
  }
  return vehicle
}

// Get vehicle
export async function isVehicleInMyFleet(fleetId: string, vehiclePlateNumber: string): Promise<boolean> {
  const vehicle = await getVehicleDB(fleetId, vehiclePlateNumber)
  return !!vehicle
}

// Park vehicle at a location
export async function parkVehicle(
  fleetId: string,
  vehiclePlateNumber: string,
  location: { lat: string; lng: string }
): Promise<IVehicle> {
  let vehicle = await getVehicleDB(fleetId, vehiclePlateNumber)

  if (vehicle.location === location) {
    throw new Error('E_VEHICLE_ALREADY_HAVE_THIS_LOCATION')
  }

  await updateVehicleDB(fleetId, vehiclePlateNumber, location)
  vehicle = await getVehicleDB(fleetId, vehiclePlateNumber)

  return vehicle
}
