import { NextResponse, NextRequest } from "next/server"
import { Pool } from "pg"
import { insertUser, getUsers } from "@lib/actions/dataActions"

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieves a new user
 *     parameters:
 *       - in: query
 *         name: email
 *         description: Filter by email
 *         required: false
 *         schema:
 *           type: string
 *           format: string
 *     responses:
 *       200:
 *         description: Success
 */
export async function GET(_req: NextRequest) {
  const email = _req.nextUrl.searchParams.get("email")

  try {
    const users = await getUsers(email)
    return NextResponse.json(users, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}

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
  try {
    // Parse raw JSON from request body
    const { username, email, dob } = await _req.json()

    const user = await insertUser(username, email, dob)

    return NextResponse.json({ message: "User created successfully", user }, { status: 201 })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
