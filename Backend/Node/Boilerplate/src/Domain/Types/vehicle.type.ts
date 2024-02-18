export interface IVehicle {
  vehiclePlateNumber: string
  location?: {
    lat: number
    lng: number
  }
}

export interface IVehicleDB {
  vehiclePlateNumber: string
  fleetId: string
  lat?: number
  lng?: number
}

export interface IVehicles {
  [key: string]: IVehicle
}
