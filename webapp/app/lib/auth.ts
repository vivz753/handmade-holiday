import "server-only"

import { Pool } from "pg"
import { jwtVerify } from "jose"
import { getUsers } from "@lib/actions/dataActions"
import { cookies } from "next/headers"

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
  try {
    const users = await getUsers(email)
    if (users.length === 0) {
      throw new Error("User not found")
    }

    const user = users[0]
    if (user.dob !== dob) {
      throw new Error("Invalid date of birth")
    }

    return user
  } catch (e) {
    console.error(e)
  }
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
      payload: { email: payload.email, username: payload.username } satisfies SessionUser,
    }
  } catch {
    return {
      valid: false,
      payload: null,
    }
  }
}
