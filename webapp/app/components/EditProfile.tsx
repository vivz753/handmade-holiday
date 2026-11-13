"use client"
import { Profile } from "@lib/types"
import { useActionState } from "react"
import { editUser } from "@lib/actions/userActions"

const inputStyle = "p-1 rounded-sm border border-red-400"
const initialState = { error: null, success: false }
export const EditProfileForm: React.FC<{ profile: Profile }> = ({ profile }) => {
  const [state, formAction, isPending] = useActionState(editUser, initialState)
  console.log("profile", profile)
  return (
    <>
      {profile && (
        <div className="">
          <span className="text-2xl">Edit Profile</span>
          <div className="h-[800px] max-h-[80vh] p-1">
            <div className="divide-y divide-red-400 rounded-2xl border p-2">
              <form className="flex h-full w-[250px]" action={formAction}>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      defaultValue={profile.email}
                      required
                      className={inputStyle}
                      name="email"
                      type="email"
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
                    <label htmlFor="dob">Date of Birth</label>
                    <input id="dob" defaultValue={profile.dob} required className={inputStyle} name="dob" type="date" />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="making">Making</label>
                    <input
                      id="making"
                      defaultValue={profile.making || ""}
                      required
                      className={inputStyle}
                      name="making"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="seeking">Seeking</label>
                    <input
                      id="seeking"
                      defaultValue={profile.seeking || ""}
                      required
                      className={inputStyle}
                      name="seeking"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="making">Likes</label>
                    <input
                      id="likes"
                      defaultValue={profile.likes || ""}
                      required
                      className={inputStyle}
                      name="likes"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="dislikes">Dislikes</label>
                    <input
                      id="dislikes"
                      defaultValue={profile.dislikes || ""}
                      required
                      className={inputStyle}
                      name="dislikes"
                      type="text"
                    />
                  </div>
                  <button className="mt-8 rounded-lg bg-red-500 p-2 text-yellow-100" type="submit" disabled={isPending}>
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
          <span className="absolute bottom-0 text-black">{`Logged in as ${profile?.email}`}</span>
        </div>
      )}
    </>
  )
}
