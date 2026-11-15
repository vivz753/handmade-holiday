import { notFound } from "next/navigation"
import { Suspense } from "react"
import { getPublicUserByUsername } from "@lib/actions/dataActions" // server-only helper
import { inputStyle, buttonStyle } from "@lib/styles"
import clsx from "clsx"

const USERNAME_RE = /^[a-zA-Z0-9_]{3,20}$/

async function ProfileContent({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params

  // Validate before touching the database
  if (!USERNAME_RE.test(username)) notFound()

  const user = await getPublicUserByUsername(username)
  if (!user) notFound()

  return (
    <div className="flex w-full max-w-3xl flex-1 flex-col items-center gap-10 bg-yellow-50 p-2 pt-[100px] lg:px-10">
      <div className="mt-8 flex h-full w-full flex-row items-center gap-16 rounded-lg border border-red-500 px-16 py-8">
        <div className="flex flex-col gap-2">
          <span className="h-20 w-20 rounded-full bg-red-500" />
          <h1 className="text-2xl">{user.username}</h1>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <p className="font-semibold">Making: </p>
            <p>{user.making}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold">Seeking:</p>
            <p>{user.seeking}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold">Likes:</p>
            <p>{user.likes}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold">Dislikes:</p>
            <p>{user.dislikes}</p>
          </div>
        </div>
      </div>
      {/* <div className="flex h-full w-full flex-col gap-8 rounded-lg border border-red-500 p-8">
        <span className="text-xl">Message Board</span>
        <form className="flex gap-2">
          <input
            id="username"
            placeholder={"Leave a message..."}
            required
            className={clsx("w-full", inputStyle)}
            name="username"
            type="string"
          />
          <button className={buttonStyle} type="submit" disabled={0}>
            {0 ? "Loading..." : "Post"}
          </button>
        </form>
      </div> */}
    </div>
  )
}

export default function UserPage({ params }: { params: Promise<{ username: string }> }) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ProfileContent params={params} />
    </Suspense>
  )
}
