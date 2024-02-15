export interface IVehicle {
  vehiclePlateNumber: string
  location?: {
    lat: string
    lng: string
  }
}

export interface IVehicles {
  [key: string]: IVehicle
}
