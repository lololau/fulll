// import { dirname } from 'path'
import sqlite3 from 'sqlite3'
sqlite3.verbose()

let database: sqlite3.Database | undefined = undefined

export function DB(): sqlite3.Database {
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

  db.run(`CREATE TABLE IF NOT EXISTS Fleet (
      fleetId VARCHAR(255) UNIQUE,
      PRIMARY KEY(fleetId)
    )`)

  db.run(`CREATE TABLE IF NOT EXISTS User (
      userId VARCHAR(255) UNIQUE,
      fleetId VARCHAR(255),
      PRIMARY KEY(userId),
      FOREIGN KEY(fleetId) REFERENCES Fleet(fleetId)
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

export function createUserDb(id: string) {
  const db = DB()

  db.run(`INSERT INTO User (userId) VALUES (?)`, [id])
}

export default database
