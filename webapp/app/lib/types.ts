export interface Profile {
  // email: string
  username: string
  // dob: string
  likes: string | null
  dislikes: string | null
  making: string | null
  seeking: string | null
}
export interface User {
  email: string
  username: string
  dob: string
  likes: string | null
  dislikes: string | null
  making: string | null
  seeking: string | null
}

export const UNIQUE_VIOLATION = "23505"

export function getUniqueViolation(error: unknown): string | null {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === UNIQUE_VIOLATION &&
    "constraint" in error &&
    typeof error.constraint === "string"
  ) {
    return error.constraint
  }
  return null
}