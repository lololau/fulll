import { Given, When, Then } from '@cucumber/cucumber'
import assert from 'assert'

import { createFleet } from '../../src/App/FleetService'
import { createUser } from '../../src/App/UserService'
import { createVehicle, getVehicle } from '../../src/App/VehicleService'

When('I register this vehicle into my fleet', async function () {
  try {
    await createVehicle({ vehiclePlateNumber: this.vehiclePlateNumber }, this.fleet.fleetId)
    await getVehicle(this.fleet.fleetId, this.vehiclePlateNumber)
  } catch (err) {
    this.errMessage = err.message
  }
})

Then('this vehicle should be part of my vehicle fleet', async function () {
  const result = await getVehicle(this.fleet.fleetId, this.vehiclePlateNumber)
  assert.strictEqual(!!result, true)
})

When('I try to register this vehicle into my fleet', async function () {
  try {
    this.result = await createVehicle({ vehiclePlateNumber: this.vehiclePlateNumber }, this.fleet.fleetId)
  } catch (err) {
    this.errMessage = err.message
  }
})

Then('I should be informed this this vehicle has already been registered into my fleet', function () {
  assert.strictEqual(this.errMessage, 'E_VEHICLE_ALREADY_EXISTS')
})

Given('the fleet of another user', async function () {
  this.secondUser = await createUser()
  this.secondFleet = await createFleet(this.secondUser.userId)
})

Given("this vehicle has been registered into the other user's fleet", async function () {
  await createVehicle({ vehiclePlateNumber: this.vehiclePlateNumber }, this.secondFleet.fleetId)
  const result = await getVehicle(this.secondFleet.fleetId, this.vehiclePlateNumber)
  assert.strictEqual(!!result, true)
})
