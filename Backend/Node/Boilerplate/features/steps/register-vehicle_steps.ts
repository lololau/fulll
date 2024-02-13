import { Given, When, Then } from '@cucumber/cucumber'
import { createFleet } from '../../src/App/FleetService'
import { createUser } from '../../src/App/UserService'
import { isVehicleInMyFleet, saveVehicleInFleet } from '../../src/App/VehicleService'
import { IUser } from '../../src/Domain/Types/user.type'
import assert from 'assert'

const secondUser: IUser | undefined = undefined

// Scenario 1
When('I register this vehicle into my fleet', async function () {
  await saveVehicleInFleet(this.fleet.fleetId, this.vehicle.vehiclePlateNumber)
})

Then('this vehicle should be part of my vehicle fleet', async function () {
  const result = await isVehicleInMyFleet(this.fleet.fleetId, this.vehicle.vehiclePlateNumber)
  assert.strictEqual(true, result)
})

// Scenario 2
When('I try to register this vehicle into my fleet', async function () {
  this.result = await saveVehicleInFleet(this.fleet.fleetId, this.vehicle.vehiclePlateNumber)
})

Then('I should be informed this this vehicle has already been registered into my fleet', function () {
  assert.strictEqual('E_VEHICLE_ALREADY_EXISTS', this.result.message)
})

// Scenario 3
Given('the fleet of another user', async function () {
  if (!secondUser) {
    this.secondUser = await createUser()
  }
  this.secondFleet = await createFleet(this.secondUser.userId)
})

Given("this vehicle has been registered into the other user's fleet", async function () {
  await saveVehicleInFleet(this.secondFleet.fleetId, this.vehicle.vehiclePlateNumber)
})
