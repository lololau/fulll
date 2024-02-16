import { Given, Before } from '@cucumber/cucumber'
import assert from 'assert'

import { createFleet } from '../../src/App/FleetService'
import { createUser } from '../../src/App/UserService'
import { createVehicle, getVehicle } from '../../src/App/VehicleService'
import { closeDatabase, createDatabase } from '../../src/Infra/database'

Before(async function () {
  closeDatabase()
  await createDatabase(':memory:')
})

Given('my fleet', async function () {
  this.user = await createUser()
  this.fleet = await createFleet(this.user.userId)
})

Given('a vehicle', async function () {
  this.vehiclePlateNumber = 'ABC123DE'
})

Given('I have registered this vehicle into my fleet', async function () {
  await createVehicle({ vehiclePlateNumber: this.vehiclePlateNumber }, this.fleet.fleetId)
  this.result = await getVehicle(this.fleet.fleetId, this.vehiclePlateNumber)
  assert.strictEqual(!!this.result, true)
})
