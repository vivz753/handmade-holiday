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

export const isRandomNumberEven = () => {
  const random = Math.floor(Math.random() * 100) + 1
  return random % 2 === 0
}
