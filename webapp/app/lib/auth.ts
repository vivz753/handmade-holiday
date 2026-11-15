import "server-only"

import { Pool } from "pg"
import { jwtVerify } from "jose"
import { cookies } from "next/headers"
import { getConfidentialUserByEmail } from "./actions/dataActions"

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

export type SessionUser = { email: string; username: string }

export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies()

  const token = cookieStore.get("authToken")?.value

  if (!token) return null

  const result = await verifyAuthToken(token)

  return result.payload
}

export async function validateUser(email: string, dob: string) {
  const users = await getConfidentialUserByEmail(email)
  const user = users[0]

  if (!user || user.dob !== dob) return null
  return user
}

export async function verifyAuthToken(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)

    const { payload } = await jwtVerify(token, secret)

    if (typeof payload.email !== "string" || typeof payload.username !== "string") {
      return { valid: false as const, payload: null }
    }

    return {
      valid: true,
      // These values get returned when the JWT is verified
      payload: { email: payload.email, username: payload.username } satisfies SessionUser,
    }
  } catch {
    return {
      valid: false,
      payload: null,
    }
  }
}
