import { createFleet } from './App/FleetService'
import { createUser } from './App/UserService'
import { createVehicle, parkVehicle } from './App/VehicleService'
import { createDatabase } from './Infra/database'

// Get command from cli and execute corresponding case
async function getCommand(cmd: string | undefined, args: string[]) {
  const fleetId = args[0]

  const vehiclePlateNumber = args[1]
  const latitude = args[2]
  const longitude = args[3]

  switch (cmd) {
    // Command to create a new user
    case 'create-user': {
      const user = await createUser()
      return `User created. \nuserId = ${user.userId}`
    }
    // Command to create a fleet to a specific user
    case 'create': {
      const userId = args[0]
      if (!userId) {
        return 'I need a userId'
      }

      const fleet = await createFleet(userId)
      return `Fleet created. \nfleetId = ${fleet.fleetId}`
    }
    // Command to register a vehicle to a fleet
    case 'register-vehicle': {
      if (!fleetId) {
        return 'Missing fleetId and vehicle plate number'
      }
      if (!vehiclePlateNumber) {
        return 'Missing vehicle plate number'
      }

      const vehiclePlateRegex = new RegExp(/^[A-Z0-9]{6,10}$/g)
      if (!vehiclePlateNumber.match(vehiclePlateRegex)) {
        return 'VehiclePlateNumber must only contain alpha-numeric characters, between 6 and 10 length.'
      }

      await createVehicle({ vehiclePlateNumber }, fleetId)
      return 'Vehicle created.'
    }
    // Command to add location to a specific vehicle
    case 'localize-vehicle': {
      if (!fleetId) {
        return 'Missing fleetId and vehicle plate number'
      }
      if (!vehiclePlateNumber) {
        return 'Missing vehicle plate number'
      }
      if (!latitude || !longitude) {
        return 'Missing latitude and longitude'
      }

      const latitudeParseFloat = parseFloat(latitude)
      const longitudeParseFloat = parseFloat(longitude)
      if (latitudeParseFloat < -90 || latitudeParseFloat > 90) {
        return 'Latitude must be between -90 and 90 degres.'
      }
      if (longitudeParseFloat < -180 || longitudeParseFloat > 180) {
        return 'Longitude must be between -180 and 180 degres.'
      }

      const vehicle = await parkVehicle(fleetId, vehiclePlateNumber, {
        lat: latitudeParseFloat,
        lng: longitudeParseFloat
      })
      return { lat: vehicle.lat, lng: vehicle.lng }
    }
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
  getCommand(command, args).then((stdout) => console.log(stdout))
}

main()
