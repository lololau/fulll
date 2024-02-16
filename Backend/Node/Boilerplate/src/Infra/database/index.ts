import sqlite3 from 'sqlite3'
sqlite3.verbose()

let database: sqlite3.Database | undefined = undefined

// Get db - will throw error if database have not been creating using 'createDatabase' before
export function DB(): sqlite3.Database {
  if (!database) {
    throw new Error('No database available')
  }
  return database
}

// Create database
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

// Create database tables
export async function createTables(): Promise<void> {
  const db = DB()

  return new Promise<void>((resolve, reject) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS User (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId VARCHAR(255) UNIQUE
      )`
    )
      .run(
        `CREATE TABLE IF NOT EXISTS Fleet (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fleetId VARCHAR(255) UNIQUE,
        userId VARCHAR(255),
        FOREIGN KEY(userId) REFERENCES User(userId)
      )`
      )
      .run(
        `CREATE TABLE IF NOT EXISTS Vehicle (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        vehiclePlateNumber VARCHAR(255),
        fleetId VARCHAR(255) NOT NULL,
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

export default database
