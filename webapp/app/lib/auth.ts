"use server"

import { Pool } from "pg"
import { jwtVerify } from "jose";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

export async function validateUser(email: string, dob: string) {
  let client
  let result
  try {
    client = await pool.connect()

    result = await client.query(
      `
      SELECT
      email,
      TO_CHAR(dob, 'YYYY-MM-DD') AS dob
      FROM "Users"
      WHERE email = $1
      `,
      [email],
    )
  } catch (e) {
    console.error(e)
  } finally {
    client?.release()
  }

  if (result?.rows.length === 0) {
    throw new Error("User not found")
  }

  const user = result?.rows[0]

  if (user.dob !== dob) {
    throw new Error("Invalid date of birth")
  }
  return user
}

export async function verifyAuthToken(token: string) {
  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET
    );

    const { payload } = await jwtVerify(token, secret);

    return {
      valid: true,
      payload,
    };
  } catch {
    return {
      valid: false,
      payload: null,
    };
  }
}