import { Given, When, Then } from '@cucumber/cucumber';
import { createFleet } from '../../src/App/FleetService';
import { createUser } from '../../src/App/UserService';
import { createVehicle, isVehicleInMyFleet, saveVehicleInFleet } from '../../src/App/VehicleService';
import { IUser } from '../../src/Domain/Types/user.type';
import { IVehicle } from '../../src/Domain/Types/vehicle.type';

const user: IUser | undefined = undefined
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
  return await isVehicleInMyFleet(this.fleet.fleetId, this.vehicle.vehiclePlateNumber)
});
