import { IVehicle } from "./vehicle.type"

export interface IFleet {
  fleetId: string
  vehicles?: IVehicle[]
}

export interface IFleets {
  [key: string]: IFleet
}