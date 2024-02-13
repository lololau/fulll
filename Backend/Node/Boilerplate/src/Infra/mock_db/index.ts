import { IFleets } from 'src/Domain/Types/fleet.type'
import { IUsers } from 'src/Domain/Types/user.type'
import { IVehicles } from 'src/Domain/Types/vehicle.type'

interface IDb {
  users: IUsers
  fleets: IFleets
  vehicles: IVehicles
}

const db: IDb = {
  users: {},
  fleets: {},
  vehicles: {}
}

export default db
