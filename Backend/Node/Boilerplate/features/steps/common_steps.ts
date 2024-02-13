import { Given } from '@cucumber/cucumber'
import { createFleet } from '../../src/App/FleetService'
import { createUser } from '../../src/App/UserService'
import { createVehicle, isVehicleInMyFleet, saveVehicleInFleet } from '../../src/App/VehicleService'
import { IUser } from '../../src/Domain/Types/user.type'
import { IVehicle } from '../../src/Domain/Types/vehicle.type'
import assert from 'assert'

const user: IUser | undefined = undefined
const vehicle: IVehicle | undefined = undefined

Given('my fleet', async function () {
  if (!user) {
    this.user = await createUser()
  }
  this.fleet = await createFleet(this.user.userId)
})

Given('a vehicle', async function () {
  if (!vehicle) {
    this.vehicle = await createVehicle({ vehiclePlateNumber: 'ABC12359' })
  }
})

Given('I have registered this vehicle into my fleet', async function () {
  await saveVehicleInFleet(this.fleet.fleetId, this.vehicle.vehiclePlateNumber)
  const result = await isVehicleInMyFleet(this.fleet.fleetId, this.vehicle.vehiclePlateNumber)
  assert.strictEqual(true, result)
})
