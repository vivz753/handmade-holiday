"use client"
import { useActionState } from "react"
import { createUser, loginUser } from "../lib/actions/userActions"

const inputStyle = "p-1 rounded-sm border border-red-400"
const initialState = { error: null, success: false }

export const Login = () => {
  const [state, formAction, isPending] = useActionState(loginUser, initialState)
  return (
    <div className="flex flex-col gap-8 rounded-lg bg-green-100 px-12 py-10 text-red-500">
      <span className="text-2xl">Existing player</span>
      <form className="flex h-full w-[250px]" action={formAction}>
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
          <button className="mt-auto rounded-lg bg-red-500 p-2 text-yellow-100" type="submit" disabled={isPending}>
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

export const CreateAccount = () => {
  const [state, formAction, isPending] = useActionState(createUser, initialState)
  return (
    <div className="flex flex-col gap-8 rounded-lg bg-green-100 px-12 py-10 text-red-500">
      <span className="text-2xl">New player?</span>
      <form className="flex h-full w-[250px]" action={formAction}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label id="username">Username</label>
            <input
              type="text"
              minLength={3}
              maxLength={20}
              pattern="[a-zA-Z0-9_]+"
              autoComplete="username"
              title="3-20 letters, numbers or underscores"
              required
              className={inputStyle}
              name="username"
            />
          </div>
          <div className="flex flex-col">
            <label id="email">Email</label>
            <input required autoComplete="email" maxLength={254} className={inputStyle} name="email" type="email" />
          </div>
          <div className="flex flex-col">
            <label id="dob">Date of Birth</label>
            <input required className={inputStyle} name="dob" type="date" />
          </div>
          <button className="mt-8 rounded-lg bg-red-500 p-2 text-yellow-100" type="submit" disabled={isPending}>
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