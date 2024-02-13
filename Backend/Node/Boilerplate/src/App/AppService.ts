// Generate random id with length of 16, using base64 charac
export function generateId (): string {
  let id = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let idLength = 0
  while (idLength < 16) {
    id += characters.charAt(Math.floor(Math.random() * characters.length))
    idLength += 1
  }
  return id
}