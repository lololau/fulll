import db from "../Infra/mock_db"
import { IVehicle } from "../Domain/Types/vehicle.type"
import { getFleetById } from "./FleetService"

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
  try {
    const fleet = await getFleetById(fleetId)
    const vehicle = await getVehicleByPlateNumber(vehiclePlateNumber)

    if (!fleet.vehicles) {
      fleet.vehicles = [vehicle]
    } else {
      const isVehicleAlreadyExist = fleet.vehicles.find((el) => el.vehiclePlateNumber === vehicle.vehiclePlateNumber)
      if (isVehicleAlreadyExist) {
        throw new Error ('E_VEHICLE_ALREADY_EXISTS')
      }

      // saving into fleet table
      fleet.vehicles = [...fleet.vehicles, vehicle]
    }
    return vehicle
  } catch (err) {
    return err
  }
}

// Get vehicle
export async function isVehicleInMyFleet(fleetId: string, vehiclePlateNumber: string): Promise<boolean> {
  try {
    const fleet = await getFleetById(fleetId)
    const vehicle = await getVehicleByPlateNumber(vehiclePlateNumber)

    if (fleet.vehicles) {
      const vehicleFound = fleet.vehicles.find((el) => el.vehiclePlateNumber === vehicle.vehiclePlateNumber)
      if (vehicleFound) {
        return true
      }
    }
    return false
  } catch (err) {
    return err
  }
}