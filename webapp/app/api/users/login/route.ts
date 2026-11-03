import { NextResponse, NextRequest } from "next/server"
import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Log in an existing user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
    const { email, dob } = await _req.json()

    // Connect to database
    client = await pool.connect()

    const results = await pool.query(`SELECT email, TO_CHAR(dob, 'YYYY-MM-DD') AS dob FROM "Users" WHERE email = $1`, [
      email,
    ])
    if (results.rows?.length === 0) return NextResponse.json({ error: "User with email could not be found." })

    const user = results.rows[0]
    if (dob === user.dob) {
      // Uses DOB as verification
      console.log("DOB matches!")
      return NextResponse.json({ message: "User logged in successfully", user: user }, { status: 201 })
    } else {
      console.log(dob, " does not match ", user.dob)
      throw Error("Failed to log in user.")
    }
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: error }, { status: 500 })
  } finally {
    if (client) client.release()
  }
}
