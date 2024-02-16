import { createFleet } from './App/FleetService'
import { createUser } from './App/UserService'
import { createVehicle, parkVehicle } from './App/VehicleService'
import { createDatabase } from './Infra/database'

async function getCommand(cmd: string, args: string[]) {
  const fleetId = args[0]
  const vehiclePlateNumber = args[1]
  switch (cmd) {
    // Command to create a new user
    case 'create-user':
      const user = await createUser()
      return `User created. \nuserId = ${user.userId}`

    // Command to create a fleet to a specific user
    case 'create':
      const userId = args[0]
      if (!userId) {
        return 'I need a userId'
      }

      const fleet = await createFleet(userId)
      return `Fleet created. \nfleetId = ${fleet.fleetId}`

    // Command to register a vehicle to a fleet
    case 'register-vehicle':
      if (!fleetId) {
        return 'Missing fleetId and vehicle plate number'
      }
      if (!vehiclePlateNumber) {
        return 'Missing vehicle plate number'
      }

      await createVehicle({ vehiclePlateNumber }, fleetId)
      return 'Vehicle created.'

    // Command to add location to a specific vehicle
    case 'localize-vehicle':
      const latitude = args[2]
      const longitude = args[3]

      if (!fleetId) {
        return 'Missing fleetId and vehicle plate number'
      }
      if (!vehiclePlateNumber) {
        return 'Missing vehicle plate number'
      }
      if (!latitude || !longitude) {
        return 'Missing latitude and longitude'
      }

      const vehicle = await parkVehicle(fleetId, vehiclePlateNumber, { lat: latitude, lng: longitude })
      return { lat: vehicle.lat, lng: vehicle.lng }

    default:
      return 'unknown command'
  }
}

// Get command and args from cli
const command = process.argv[2]
const args = process.argv.slice(3)

async function main() {
  // Set up creation/connection to database
  await createDatabase('main.db')
  if (command) {
    getCommand(command, args).then((stdout) => console.log(stdout))
  }
}

main()
