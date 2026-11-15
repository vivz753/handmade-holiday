"server only"

import { Pool } from "pg"
import { Profile } from "@lib/types"

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

// public function
export const getPublicUsers = async (email?: string) => {
  let result

  if (email) {
    // Query by email if provided
    result = await pool.query(
      `SELECT
      username,
      making,
      seeking,
      likes,
      dislikes
      FROM "Users"
            ORDER BY
        CASE WHEN email = $1 THEN 0 ELSE 1 END ASC,
        email ASC`,
      [email],
    )
  } else {
    // Return all users if email is not provided
    result = await pool.query(`
      SELECT
      username,
      making,
      seeking,
      likes,
      dislikes
      FROM "Users"
      `)
  }

  return result.rows
}

export const getConfidentialUserByEmail = async (email: string) => {
  const result = await pool.query(
    `SELECT
      email,
      username,
      making,
      seeking,
      likes,
      dislikes,
      TO_CHAR(dob, 'YYYY-MM-DD') AS dob
      FROM "Users"
      WHERE email = $1`,
    [email],
  )
  return result.rows
}

export const getPublicUserByUsername = async (username: string) => {
  const result = await pool.query(
    `SELECT username, making, seeking, likes, dislikes
     FROM "Users"
     WHERE lower(username) = lower($1)`,
    [username],
  )
  return result.rows[0] ?? null
}

// TODO: If your table has an id column, use WHERE id = $8 and put id in the JWT. Keying on email breaks other active sessions the moment someone changes their email.
export async function updateUser(currentEmail: string, p: Profile) {
  const result = await pool.query(
    `UPDATE "Users"
     SET username = $1,
         likes    = $2,
         dislikes = $3,
         making   = $4,
         seeking  = $5
     WHERE email = $6
     RETURNING username, email`,
    [p.username, p.likes, p.dislikes, p.making, p.seeking, currentEmail],
  )
  return result.rows[0] ?? null // null means no row matched
}

export type NewUser = { username: string; email: string; dob: string }
export const insertUser = async ({ username, email, dob }: NewUser) => {
  // Execute INSERT query directly with values from body
  // Note: Use parameterized queries ($1, $2) to prevent SQL injection,
  // even if "no filter" is requested, direct string concatenation is unsafe.
  const result = await pool.query(`INSERT INTO "Users" (username, email, dob) VALUES ($1, $2, $3) RETURNING *`, [
    username,
    email,
    dob,
  ])

  return result.rows[0]
}
