// import { dirname } from 'path'
import sqlite3 from 'sqlite3'
import { IFleet } from 'src/Domain/Types/fleet.type'
import { IUser } from 'src/Domain/Types/user.type'
import { IVehicle, IVehicleDB } from 'src/Domain/Types/vehicle.type'
sqlite3.verbose()

let database: sqlite3.Database | undefined = undefined

function DB(): sqlite3.Database {
  if (!database) {
    throw new Error('No database available')
  }
  return database
}

export async function createDatabase(path: string): Promise<void> {
  if (database) {
    throw new Error('Database already created')
  }

  return new Promise<void>((resolve, reject) => {
    database = new sqlite3.Database(path, (err) => {
      if (err) {
        reject(new Error(`Error during connection to database: ${err}`))
      } else {
        resolve(createTables())
      }
    })
  })
}

export function closeDatabase() {
  // Close db if existing
  if (database) {
    database.close()
  }
  database = undefined
}

export async function createTables(): Promise<void> {
  const db = DB()

  return new Promise<void>((resolve, reject) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS User (
        userId VARCHAR(255) UNIQUE,
        PRIMARY KEY(userId)
      )`
    )
      .run(
        `CREATE TABLE IF NOT EXISTS Fleet (
        fleetId VARCHAR(255) UNIQUE,
        userId VARCHAR(255),
        PRIMARY KEY(fleetId),
        FOREIGN KEY(userId) REFERENCES User(userId)
      )`
      )
      .run(
        `CREATE TABLE IF NOT EXISTS Vehicle (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        vehiclePlateNumber VARCHAR(255),
        fleetId VARCHAR(255) NOT NULL UNIQUE,
        lat FLOAT,
        lng FLOAT,
        FOREIGN KEY(fleetId) REFERENCES Fleet(fleetId)
      )`,
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        }
      )
  })
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
export async function createFleetDb(userId: string, fleetId: string): Promise<void> {
  const db = DB()

  return new Promise<void>((resolve, reject) => {
    db.run(
      `INSERT INTO Fleet (fleetId, userId) VALUES ($fleetId, $userId)`,
      { $fleetId: fleetId, $userId: userId },
      (err) => {
        if (err) {
          reject(err)
          return
        }
        resolve()
      }
    )
  })
}

// Get fleet by fleetId
export async function getFleetDb(id: string): Promise<IFleet> {
  const db = DB()
  return new Promise<IFleet>((resolve, reject) => {
    db.get(`SELECT * FROM Fleet WHERE fleetId='${id}'`, (err, row: IFleet) => {
      if (err) {
        reject(err)
        return
      }
      if (row === undefined) {
        reject(new Error('E_FLEET_NOT_FOUND'))
      }
      resolve(row)
    })
  })
}

// Create vehicle in Vehicle table
export async function createVehicleDb(fleetId: string, vehicle: IVehicle): Promise<void> {
  const db = DB()

  return new Promise<void>((resolve, reject) => {
    db.run(
      `INSERT INTO Vehicle (vehiclePlateNumber, fleetId, lat, lng) VALUES ($vehiclePlateNumber, $fleetId, $lat, $lng)`,
      {
        $vehiclePlateNumber: vehicle.vehiclePlateNumber,
        $fleetId: fleetId,
        $lat: vehicle.location?.lat,
        $lng: vehicle.location?.lng
      },
      (err: any) => {
        if (err) {
          if (err.errno === sqlite3.CONSTRAINT) {
            reject(new Error('E_VEHICLE_ALREADY_EXISTS'))
          }
          reject(err)
          return
        }
        resolve()
      }
    )
  })
}

// Get vehicle by vehiclePlateNumber
export async function getVehicleDB(fleetId: string, vehiclePlateNumber: string): Promise<IVehicleDB> {
  const db = DB()
  // console.log('fleetId', fleetId)
  // console.log('vehiclePlate', vehiclePlateNumber)
  return new Promise<IVehicleDB>((resolve, reject) => {
    db.get(
      `SELECT * FROM Vehicle WHERE vehiclePlateNumber='${vehiclePlateNumber}' AND fleetId='${fleetId}'`,
      (err, row: IVehicleDB) => {
        if (err) {
          reject(err)
          return
        }
        if (row === undefined) {
          reject(new Error('E_VEHICLE_NOT_FOUND'))
        }
        resolve(row)
      }
    )
  })
}

// Update vehicle location
export async function updateVehicleDB(
  fleetId: string,
  vehiclePlateNumber: string,
  location: { lat: string; lng: string }
): Promise<void> {
  const db = DB()
  return new Promise<void>((resolve, reject) => {
    db.run(
      `UPDATE Vehicle SET lat='${location.lat}', lng='${location.lng}' WHERE vehiclePlateNumber='${vehiclePlateNumber}' AND fleetId='${fleetId}'`,
      (err) => {
        if (err) {
          reject(err)
          return
        }
        resolve()
      }
    )
  })
}

export default database
