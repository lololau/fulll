import { Given, When, Then } from '@cucumber/cucumber'
import assert from 'assert'

import { createFleet } from '../../src/App/FleetService'
import { createUser } from '../../src/App/UserService'
import { isVehicleInMyFleet, saveVehicleInFleet } from '../../src/App/VehicleService'

When('I register this vehicle into my fleet', async function () {
  try {
    this.result = await saveVehicleInFleet(this.fleet.fleetId, this.vehicle.vehiclePlateNumber)
  } catch (err) {
    this.result = err
  }
  assert.ok(this.result.vehiclePlateNumber)
})

Then('this vehicle should be part of my vehicle fleet', async function () {
  const result = await isVehicleInMyFleet(this.fleet.fleetId, this.vehicle.vehiclePlateNumber)
  assert.strictEqual(true, result)
})

When('I try to register this vehicle into my fleet', async function () {
  try {
    this.result = await saveVehicleInFleet(this.fleet.fleetId, this.vehicle.vehiclePlateNumber)
  } catch (err) {
    this.result = err
  }
})

Then('I should be informed this this vehicle has already been registered into my fleet', function () {
  assert.strictEqual(this.result.message, 'E_VEHICLE_ALREADY_EXISTS')
})

Given('the fleet of another user', async function () {
  this.secondUser = await createUser()
  this.secondFleet = await createFleet(this.secondUser.userId)
})

Given("this vehicle has been registered into the other user's fleet", async function () {
  await saveVehicleInFleet(this.secondFleet.fleetId, this.vehicle.vehiclePlateNumber)
  const result = await isVehicleInMyFleet(this.secondFleet.fleetId, this.vehicle.vehiclePlateNumber)
  assert.strictEqual(true, result)
})
