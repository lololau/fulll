import { createFleet } from './App/FleetService'
import { createUser } from './App/UserService'
import { createDatabase } from './Infra/database'

async function getCommand(cmd: string, args: string[]) {
  switch (cmd) {
    case 'create-user':
      const user = await createUser()
      return user.userId
    case 'create':
      const userId = args[0]
      if (userId) {
        const fleet = await createFleet(userId)
        return fleet.fleetId
      } else {
        return 'I need a userId'
      }
    case 'register-vehicle':
      return 'Register a vehicle'
    case 'localize-vehicle':
      return 'Localize a vehicle'
    default:
      return 'unknown command'
  }
}

const command = process.argv[2]
const args = process.argv.slice(3)

function main() {
  // Set up creation/connection to database
  createDatabase('main.db')

  // Get command from stdin
  if (command) {
    getCommand(command, args).then((stdout) => console.log(stdout))
  }
}

main()
