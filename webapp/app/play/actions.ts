"use server"

import { NextResponse } from "next/server"

export async function submitUser(prevState: any, formData: FormData) {
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

export async function submitExistingUser(prevState: any, formData: FormData) {
  const email = formData.get("email")
  const dob = formData.get("dob")
	
	if (!formData.get("email")) {
		return { error: "Email is required" }
	}
	if (!formData.get("dob")) {
		return { error: "Date of birth is required" }
	}

  // Call external endpoint or save to DB
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/login`, {
    method: "POST",
		  body: JSON.stringify({ email, dob }),
    headers: { "Content-Type": "application/json" },
  })

	const data = await res.json();
	console.log('data', data)


  if (!res.ok) {
    return { error: "Failed to login user." }
  }
	
	// TODO: set cookie session

  // Return success status and data
  return { message: "User successfully logged in.", status: true }
}
