// import { dirname } from 'path'
import sqlite3 from 'sqlite3'
import { IFleet } from 'src/Domain/Types/fleet.type'
import { IUser } from 'src/Domain/Types/user.type'
sqlite3.verbose()

let database: sqlite3.Database | undefined = undefined

function DB(): sqlite3.Database {
  if (!database) {
    throw new Error('No database available')
  }
  return database
}

export function createDatabase(path: string) {
  database = new sqlite3.Database(path, (err) => {
    if (err) {
      throw new Error('Error during connection to database')
    } else {
      createTables()
    }
  })
}

export function createTables() {
  const db = DB()
  db.run(`CREATE TABLE IF NOT EXISTS User (
      userId VARCHAR(255) UNIQUE,
      PRIMARY KEY(userId)
    )`)

  db.run(`CREATE TABLE IF NOT EXISTS Fleet (
      fleetId VARCHAR(255) UNIQUE,
      userId VARCHAR(255),
      PRIMARY KEY(fleetId),
      FOREIGN KEY(userId) REFERENCES User(userId)
    )`)

  db.run(`CREATE TABLE IF NOT EXISTS Vehicle (
      vehiclePlateNumber VARCHAR(255) UNIQUE,
      fleetId VARCHAR(255),
      lat FLOAT,
      lng FLOAT,
      PRIMARY KEY(vehiclePlateNumber),
      FOREIGN KEY(fleetId) REFERENCES Fleet(fleetId)
    )`)
}

// Create user in User table
export async function createUserDb(id: string): Promise<void> {
  const db = DB()
  return new Promise<void>((resolve, reject) => {
    db.run(`INSERT INTO User (userId) VALUES ($userId)`, { $userId: id }, (err) => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}

// Get user in by userId
export async function getUserDb(id: string): Promise<IUser> {
  const db = DB()
  return new Promise<IUser>((resolve, reject) => {
    db.get(`SELECT * FROM User WHERE userId='${id}'`, (err, row: IUser) => {
      if (err) {
        reject(new Error(`${err}`))
        return
      }
      if (row === undefined) {
        reject(new Error('E_USER_NOT_FOUND'))
      }
      resolve(row)
    })
  })
}

// Create fleet in Fleet table
export async function createFleetDb(userId: string, fleetId: string): Promise<IFleet> {
  const db = DB()

  return new Promise<IFleet>((resolve, reject) => {
    db.run(
      `INSERT INTO Fleet (fleetId, userId) VALUES ($fleetId, $userId)`,
      { $fleetId: fleetId, $userId: userId },
      (err: string | undefined, row: IFleet) => {
        if (err) {
          reject(new Error(err))
          return
        }
        resolve(row)
      }
    )
  })
}

// Create fleet by fleetId
export async function getFleetDb(id: string): Promise<IFleet> {
  const db = DB()
  return new Promise<IFleet>((resolve, reject) => {
    db.get(`SELECT * FROM Fleet WHERE fleetId='${id}'`, (err, row: IFleet) => {
      if (err) {
        reject(new Error(`${err}`))
        return
      }
      if (row === undefined) {
        reject(new Error('E_FLEET_NOT_FOUND'))
      }
      resolve(row)
    })
  })
}

export default database
