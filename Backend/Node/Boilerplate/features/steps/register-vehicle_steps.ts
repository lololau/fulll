import { Given, When, Then } from '@cucumber/cucumber';
import { createFleet } from '../../src/App/FleetService';
import { createUser } from '../../src/App/UserService';
import { createVehicle, isVehicleInMyFleet, saveVehicleInFleet } from '../../src/App/VehicleService';
import { IUser } from '../../src/Domain/Types/user.type';
import { IVehicle } from '../../src/Domain/Types/vehicle.type';
import assert from 'assert';

const user: IUser | undefined = undefined
const secondUser: IUser | undefined = undefined
const vehicle: IVehicle | undefined = undefined

// Scenario 1
Given('my fleet', async function () {
  if (!user) {
    this.user = await createUser()
  }
  this.fleet = await createFleet(this.user.userId)
});

Given('a vehicle', async function () {
  if (!vehicle) {
    this.vehicle = await createVehicle({ vehiclePlateNumber: 'ABC12359' })
  }
});

When('I register this vehicle into my fleet', async function () {
  await saveVehicleInFleet(this.fleet.fleetId, this.vehicle.vehiclePlateNumber)
});

Then('this vehicle should be part of my vehicle fleet', async function () {
  const result = await isVehicleInMyFleet(this.fleet.fleetId, this.vehicle.vehiclePlateNumber)
  assert.strictEqual(true, result)
});

// Scenario 2
Given('I have registered this vehicle into my fleet', async function () {
  const result = await isVehicleInMyFleet(this.fleet.fleetId, this.vehicle.vehiclePlateNumber)
  if (result) {
    assert.strictEqual(true, result)
  } else {
    await saveVehicleInFleet(this.fleet.fleetId, this.vehicle.vehiclePlateNumber)
    const isExisting = await isVehicleInMyFleet(this.fleet.fleetId, this.vehicle.vehiclePlateNumber)
    assert.strictEqual(true, isExisting)
  }
});

When('I try to register this vehicle into my fleet', async function () {
  this.result = await saveVehicleInFleet(this.fleet.fleetId, this.vehicle.vehiclePlateNumber)
});

Then('I should be informed this this vehicle has already been registered into my fleet', function () {
  assert.strictEqual('E_VEHICLE_ALREADY_EXISTS', this.result.message)
});

// Scenario 3
Given('the fleet of another user', async function () {
  // Write code here that turns the phrase above into concrete actions
  if (!secondUser) {
    this.secondUser = await createUser()
  }
  this.secondFleet = await createFleet(this.secondUser.userId)
});

Given('this vehicle has been registered into the other user\'s fleet', async function () {
  await saveVehicleInFleet(this.secondFleet.fleetId, this.vehicle.vehiclePlateNumber)
});