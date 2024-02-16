import { IUser } from '../../Domain/Types/user.type'
import { DB } from '.'

// Create user
export async function createUserDB(id: string): Promise<void> {
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

// Get user by userId
export async function getUserDB(id: string): Promise<IUser> {
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
