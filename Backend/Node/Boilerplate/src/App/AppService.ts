import crypto from 'crypto'

// Generate random id with length of 16, using base64 charac
export function generateId(): string {
  return crypto.randomUUID()
}
