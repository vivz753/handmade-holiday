import { NextResponse, NextRequest } from "next/server"
import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

// Get Users
export async function GET() {
  try {
    const result = await pool.query(`SELECT id, username, email FROM "Users"`)
    return NextResponse.json(result.rows, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}

// Create User
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               dob:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Success
 */
export async function POST(_req: NextRequest) {
  let client
  try {
    // Parse raw JSON from request body
    const { username, email, dob } = await _req.json()

    // Connect to database
    client = await pool.connect()

    // Execute INSERT query directly with values from body
    // Note: Use parameterized queries ($1, $2) to prevent SQL injection,
    // even if "no filter" is requested, direct string concatenation is unsafe.
    const result = await client.query(`INSERT INTO "Users" (username, email, dob) VALUES ($1, $2, $3) RETURNING *`, [
      username,
      email,
      dob,
    ])

    return NextResponse.json({ message: "User created successfully", user: result.rows[0] }, { status: 201 })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  } finally {
    if (client) client.release()
  }
}
