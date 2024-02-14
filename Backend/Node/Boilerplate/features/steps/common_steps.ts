import { Given } from '@cucumber/cucumber'
import assert from 'assert'

import { createFleet } from '../../src/App/FleetService'
import { createUser } from '../../src/App/UserService'
import { createVehicle, isVehicleInMyFleet, saveVehicleInFleet } from '../../src/App/VehicleService'

Given('my fleet', async function () {
  this.user = await createUser()
  this.fleet = await createFleet(this.user.userId)
})

Given('a vehicle', async function () {
  this.vehicle = await createVehicle({ vehiclePlateNumber: 'ABC12359' })
})

Given('I have registered this vehicle into my fleet', async function () {
  await saveVehicleInFleet(this.fleet.fleetId, this.vehicle.vehiclePlateNumber)
  const result = await isVehicleInMyFleet(this.fleet.fleetId, this.vehicle.vehiclePlateNumber)
  assert.strictEqual(true, result)
})
