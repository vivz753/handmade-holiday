"use client"
import { User } from "@lib/types"
import { useActionState } from "react"
import { editUser } from "@lib/actions/userActions"

const inputStyle = "p-1 rounded-sm border border-red-400 disabled:opacity-50"
const initialState = { error: null, success: false }
export const EditProfileForm: React.FC<{ profile: User }> = ({ profile }) => {
  const [state, formAction, isPending] = useActionState(editUser, initialState)
  console.log("profile", profile)
  return (
    <>
      {profile && (
        <div className="my-16">
          <span className="text-2xl">Edit Profile</span>
          <div className="divide-y divide-red-400 rounded-2xl border p-2">
            <form className="flex h-full justify-center" action={formAction}>
              <div className="flex flex-col gap-4">
                <div className="group disabled flex flex-col">
                  <label className="group:bg-green-500" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    disabled
                    defaultValue={profile.email}
                    required
                    className={inputStyle}
                    name="email"
                    type="email"
                  />
                </div>
                <div className="group flex flex-col">
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    id="dob"
                    disabled
                    defaultValue={profile.dob}
                    required
                    className={inputStyle}
                    name="dob"
                    type="date"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    defaultValue={profile.username}
                    required
                    className={inputStyle}
                    name="username"
                    type="string"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="making">Making</label>
                  <span>Let everyone know what crafts they might expect from you.</span>
                  <textarea
                    id="making"
                    defaultValue={profile.making || ""}
                    required
                    className={inputStyle}
                    name="making"
                    maxLength={120}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="seeking">Seeking</label>
                  <span>What do you wish for? Maybe someone might make it for you!</span>
                  <textarea
                    id="seeking"
                    defaultValue={profile.seeking || ""}
                    required
                    className={inputStyle}
                    name="seeking"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="likes">Likes</label>
                  <span className="text-sm">List any colors, themes, mediums you particularly enjoy.</span>
                  <textarea
                    id="likes"
                    defaultValue={profile.likes || ""}
                    required
                    className={inputStyle}
                    name="likes"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="dislikes">Dislikes</label>
                  <span>Is there anything you absolutely despise?</span>
                  <textarea
                    id="dislikes"
                    defaultValue={profile.dislikes || ""}
                    required
                    className={inputStyle}
                    name="dislikes"
                  />
                </div>
                <button
                  className="mt-8 cursor-pointer rounded-lg bg-red-500 p-2 text-yellow-100"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? "Loading..." : "Update Profile"}
                </button>
                {state?.error ? (
                  <p style={{ color: "red" }}>{state.error}</p>
                ) : (
                  <p style={{ color: "green" }}>{state.message}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
