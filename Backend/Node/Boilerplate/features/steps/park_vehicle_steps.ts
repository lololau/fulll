import { Given, When, Then } from '@cucumber/cucumber'
import assert from 'assert'
import { getVehicleByPlateNumber, parkVehicle } from '../../src/App/VehicleService'

Given('a location', function () {
  this.location = { lat: 40.740121, lng: -73.990593 }
})

When('I park my vehicle at this location', async function () {
  try {
    this.result = await parkVehicle(this.vehicle.vehiclePlateNumber, this.location)
  } catch (err) {
    this.result = err
  }
  assert.ok(this.result.location)
})

Then('the known location of my vehicle should verify this location', async function () {
  this.result = await getVehicleByPlateNumber(this.vehicle.vehiclePlateNumber)
  assert.strictEqual(this.location, this.result.location)
})

Given('my vehicle has been parked into this location', async function () {
  await parkVehicle(this.vehicle.vehiclePlateNumber, this.location)
  this.result = await getVehicleByPlateNumber(this.vehicle.vehiclePlateNumber)
  assert.strictEqual(this.location, this.result.location)
})

When('I try to park my vehicle at this location', async function () {
  try {
    this.result = await parkVehicle(this.vehicle.vehiclePlateNumber, this.location)
  } catch (err) {
    this.result = err
  }
})

Then('I should be informed that my vehicle is already parked at this location', function () {
  assert.strictEqual(this.result.message, 'E_VEHICLE_ALREADY_HAVE_THIS_LOCATION')
})
