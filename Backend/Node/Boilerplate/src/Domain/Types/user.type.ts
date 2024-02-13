import { IFleet } from './fleet.type'

export interface IUser {
  userId: string
  fleet?: IFleet
}

export interface IUsers {
  [key: string]: IUser
}
