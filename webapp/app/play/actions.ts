"use server"

import { SignJWT } from "jose"
import { cookies } from "next/headers"
import { Pool } from "pg"
import { validateUser, verifyAuthToken } from "@lib/auth"

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

export async function createUser(prevState: any, formData: FormData) {
  const username = formData.get("username")
  const email = formData.get("email")
  const dob = formData.get("dob")

  if (!formData.get("username")) {
    return { error: "Username is required" }
  }
  if (!formData.get("email")) {
    return { error: "Email is required" }
  }
  if (!formData.get("dob")) {
    return { error: "Date of birth is required" }
  }

  // Call external endpoint or save to DB
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
    method: "POST",
    body: JSON.stringify({ username, email, dob }),
    headers: { "Content-Type": "application/json" },
  })

  if (!res.ok) {
    return { error: "Failed to create user." }
  }

  // Return success status and data
  return { message: "User successfully created.", status: true }
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

    const user = validateUser(email, dob)

    const secret = new TextEncoder().encode(process.env.JWT_SECRET)

    const token = await new SignJWT({
      email,
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
      error: "Failed to login user.",
    }
  }
}

export async function getCurrentUser() {
  const cookieStore = await cookies()

  const token = cookieStore.get("authToken")?.value

  if (!token) {
    return null
  }

  const result = await verifyAuthToken(token)

  if (!result.valid) {
    return null
  }

  return result.payload
}
