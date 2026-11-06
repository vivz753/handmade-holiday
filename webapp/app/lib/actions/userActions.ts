"use server"

import { SignJWT } from "jose"
import { cookies } from "next/headers"
import { Pool } from "pg"
import { validateUser } from "@lib/auth"
import { insertUser } from "./dataActions"
import { redirect } from "next/navigation"

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

export async function createUser(prevState: any, formData: FormData) {
  const username = String(formData.get("username") ?? "").trim()
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase()
  const dob = String(formData.get("dob") ?? "")

  if (!username || !email || !dob) {
    return { status: false, message: "All fields are required." }
  }
  try {
    // Call external endpoint or save to DB
    await insertUser({ username, email, dob })

    // Return success status and data
    return { message: "User successfully created.", status: true }
  } catch (error) {
    console.error(error)

    return {
      error: `Failed to create user. ${error}`,
    }
  }
}

export async function logoutUser() {
  const cookieStore = await cookies()
  cookieStore.delete("authToken")
  redirect("/play")
}

export async function loginUser(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email")?.toString()
    const dob = formData.get("dob")?.toString()

    if (!email) {
      throw new Error("Email is required")
    }

    if (!dob) {
      throw new Error("Date of birth is required")
    }

    const user = await validateUser(email, dob)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)

    const token = await new SignJWT({
      // These values get included in the JWT payload when decrypted
      email,
      username: user.username,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(secret)

    const cookieStore = await cookies()

    cookieStore.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    })

    return {
      status: true,
      message: "User logged in successfully.",
      user,
    }
  } catch (error) {
    console.error(error)

    return {
      error: `Failed to login user. ${error}`,
    }
  }
}