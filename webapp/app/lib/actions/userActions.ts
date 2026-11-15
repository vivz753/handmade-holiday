"use server"

import { SignJWT } from "jose"
import { cookies } from "next/headers"
import { Pool } from "pg"
import { validateUser, getCurrentUser } from "@lib/auth"
import { insertUser, updateUser } from "./dataActions"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { getUniqueViolation } from "@lib/helpers"

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

const text = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim()
const optional = (fd: FormData, key: string) => text(fd, key).slice(0, 200) || null

export async function editUser(prevState: unknown, formData: FormData) {
  const session = await getCurrentUser()
  if (!session) return { error: "Not logged in.", success: false }
  console.log("formData", formData)

  const username = text(formData, "username")
  // const email = text(formData, "email").toLowerCase()
  // const dob = text(formData, "dob")
  const making = text(formData, "making")
  const seeking = text(formData, "seeking")
  const likes = text(formData, "likes")
  const dislikes = text(formData, "dislikes")

  if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) return { error: "Invalid username.", success: false }
  // if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Invalid email.", success: false }
  // if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) return { error: "Invalid date of birth.", success: false }
  if (making.length > 200 || seeking.length > 200 || likes.length > 200 || dislikes.length > 200)
    return { error: "Text must be 200 characters or fewer.", success: false }

  try {
    const updated = await updateUser(session.email, {
      username,
      // email,
      // dob,
      likes: optional(formData, "likes"),
      dislikes: optional(formData, "dislikes"),
      making: optional(formData, "making"),
      seeking: optional(formData, "seeking"),
    })
    if (!updated) return { error: "Profile not found.", success: false }

    // The JWT holds username/email, so reissue it with the new values
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const token = await new SignJWT({
      email: updated.email,
      username: updated.username,
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

    revalidatePath("/edit")
    return { error: null, success: true }
  } catch (e: any) {
    console.error(e)
    if (e?.code === "23505") return { error: "That username or email is already taken.", success: false }
    return { error: "Failed to update profile.", success: false }
  }
}

export async function createUser(prevState: unknown, formData: FormData) {
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
    return { success: true, error: null }
  } catch (error) {
    console.error(error)

    const constraint = getUniqueViolation(error)
    if (constraint === "Users_email_key") {
      return {
        success: false,
        error: `Email already in use.`,
      }
    }

    return {
      error: `Failed to create user. ${error}`,
      success: false,
    }
  }
}

export async function logoutUser() {
  const cookieStore = await cookies()
  cookieStore.delete("authToken")
  redirect("/play")
}

export async function loginUser(prevState: unknown, formData: FormData) {
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
    if (!user) return { success: false, error: "Invalid email or date of birth." }

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
      success: true,
      error: null,
    }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      error: `Failed to login user. ${error}`,
    }
  }
}
