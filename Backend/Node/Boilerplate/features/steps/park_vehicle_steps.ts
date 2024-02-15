import { Given, When, Then } from '@cucumber/cucumber'
import assert from 'assert'
import { getVehicle, parkVehicle } from '../../src/App/VehicleService'

Given('a location', function () {
  this.location = { lat: 40.740121, lng: -73.990593 }
})

When('I park my vehicle at this location', async function () {
  try {
    this.result = await parkVehicle(this.fleet.fleetId, this.vehiclePlateNumber, this.location)
  } catch (err) {
    this.errMessage = err.message
  }
})

Then('the known location of my vehicle should verify this location', async function () {
  this.result = await getVehicle(this.fleet.fleetId, this.vehiclePlateNumber)
  assert.strictEqual(this.result.lat, this.location.lat)
  assert.strictEqual(this.result.lng, this.location.lng)
})

Given('my vehicle has been parked into this location', async function () {
  await parkVehicle(this.fleet.fleetId, this.vehiclePlateNumber, this.location)
  this.result = await getVehicle(this.fleet.fleetId, this.vehiclePlateNumber)
  assert.strictEqual(this.result.lat, this.location.lat)
  assert.strictEqual(this.result.lng, this.location.lng)
})

When('I try to park my vehicle at this location', async function () {
  try {
    this.result = await parkVehicle(this.fleet.fleetId, this.vehiclePlateNumber, this.location)
  } catch (err) {
    this.errMessage = err.message
  }
})

Then('I should be informed that my vehicle is already parked at this location', function () {
  assert.strictEqual(this.errMessage, 'E_VEHICLE_ALREADY_HAVE_THIS_LOCATION')
})
