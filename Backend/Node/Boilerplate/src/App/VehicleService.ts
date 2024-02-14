import db from '../Infra/mock_db'
import { IVehicle } from '../Domain/Types/vehicle.type'
import { getFleetById } from './FleetService'

// Create new vehicle
export async function createVehicle(vehicle: IVehicle): Promise<IVehicle> {
  const { vehiclePlateNumber, location } = vehicle
  const newVehicle = {
    vehiclePlateNumber,
    location
  }
  db.vehicles[vehicle.vehiclePlateNumber] = vehicle
  return newVehicle
}

// Get vehicle by plate number
export async function getVehicleByPlateNumber(vehiclePlateNumber: string): Promise<IVehicle> {
  const vehicle = db.vehicles[vehiclePlateNumber]

  if (!vehicle) {
    throw new Error('E_VEHICLE_NOT_FOUND')
  }
  return vehicle
}

// Save vehicle into the fleet
export async function saveVehicleInFleet(fleetId: string, vehiclePlateNumber: string): Promise<IVehicle> {
  const fleet = await getFleetById(fleetId)
  const vehicle = await getVehicleByPlateNumber(vehiclePlateNumber)

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
  const fleet = await getFleetById(fleetId)
  const vehicle = await getVehicleByPlateNumber(vehiclePlateNumber)

  if (fleet.vehicles) {
    const vehicleFound = fleet.vehicles.find((el) => el.vehiclePlateNumber === vehicle.vehiclePlateNumber)
    return !!vehicleFound
  }
  return false
}

// Park vehicle at a location
export async function parkVehicle(
  vehiclePlateNumber: string,
  location: { lat: number; lng: number }
): Promise<IVehicle> {
  const vehicle = await getVehicleByPlateNumber(vehiclePlateNumber)

  if (vehicle.location === location) {
    throw new Error('E_VEHICLE_ALREADY_HAVE_THIS_LOCATION')
  }

  vehicle.location = location

  return vehicle
}
