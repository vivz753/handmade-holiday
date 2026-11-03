"use client"

import Image from "next/image"
import { submitUser, submitExistingUser } from "./actions"
import { useActionState } from "react"

const inputStyle = "rounded-sm border border-red-400"
const initialState = { error: null, success: false }

export default function Play() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-green-100 font-sans text-red-500">
      <Header />
      <main className="flex w-full max-w-3xl flex-1 flex-row items-center gap-10 bg-yellow-50 px-16 py-32 sm:items-start">
        <CreateAccount />
        <Login />
      </main>
    </div>
  )
}

const Login = () => {
  const [state, formAction, isPending] = useActionState(submitExistingUser, initialState)
  return (
    <div className="flex flex-col gap-8 border border-blue-500">
      <span className="text-2xl">Existing player</span>
      <form className="flex w-[250px]" action={formAction}>
        <div className="flex flex-col gap-4">
          {/* <div className="flex flex-col">
            <label id="username">Username</label>
            <input required className={inputStyle} name="username" type="string" />
          </div> */}
          <div className="flex flex-col">
            <label id="email">Email</label>
            <input required className={inputStyle} name="email" type="email" />
          </div>
          <div className="flex flex-col">
            <label id="dob">Date of Birth</label>
            <input required className={inputStyle} name="dob" type="date" />
          </div>
          <button type="submit" disabled={isPending}>
            {isPending ? "Loading..." : "Log In"}
          </button>
          {state?.error ? (
            <p style={{ color: "red" }}>{state.error}</p>
          ) : (
            <p style={{ color: "green" }}>{state.message}</p>
          )}
        </div>
      </form>
    </div>
  )
}
const CreateAccount = () => {
  const [state, formAction, isPending] = useActionState(submitUser, initialState)
  return (
    <div className="flex flex-col gap-8 border border-blue-500">
      <span className="text-2xl">New player?</span>
      <form className="flex w-[250px]" action={formAction}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label id="username">Username</label>
            <input required className={inputStyle} name="username" type="string" />
          </div>
          <div className="flex flex-col">
            <label id="email">Email</label>
            <input required className={inputStyle} name="email" type="email" />
          </div>
          <div className="flex flex-col">
            <label id="dob">Date of Birth</label>
            <input required className={inputStyle} name="dob" type="date" />
          </div>
          <button type="submit" disabled={isPending}>
            {isPending ? "Loading..." : "Create Account"}
          </button>
          {state?.error ? (
            <p style={{ color: "red" }}>{state.error}</p>
          ) : (
            <p style={{ color: "green" }}>{state.message}</p>
          )}
        </div>
      </form>
    </div>
  )
}

const Header = () => (
  <nav className="absolute top-0 flex h-[100px] w-screen flex-row items-center gap-8 bg-red-400 px-20">
    <span className="text-yellow-50">FAQ</span>
    <span className="text-yellow-50">Play!</span>
  </nav>
)
