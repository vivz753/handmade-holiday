"use server"

import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

export const getUsers = async (email?: string) => {
  let result

  if (email) {
    // Query by email if provided
    result = await pool.query(
      `SELECT
      email,
      username,
      TO_CHAR(dob, 'YYYY-MM-DD') AS dob
      FROM "Users"
      WHERE email = $1`,
      [email],
    )
  } else {
    // Return all users if email is not provided
    result = await pool.query(`
      SELECT
      email,
      username,
      TO_CHAR(dob, 'YYYY-MM-DD') AS dob
      FROM "Users"
      `)
  }

  return result.rows
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
