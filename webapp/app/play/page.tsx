import { CreateAccount, Login } from "@components/Login"
import { Loading } from "@components/Loading"
import { getCurrentUser } from "@lib/auth"
import { Suspense } from "react"
import { getPublicUsers } from "@lib/actions/dataActions"
import { MdEdit } from "react-icons/md"
import Link from "next/link"

export default function Play() {
  return (
    <div className="flex w-full max-w-3xl flex-1 flex-row justify-center gap-10 bg-yellow-50 p-2 pt-[100px] lg:px-10">
      <Suspense fallback={<Loading />}>
        <Dashboard />
      </Suspense>
    </div>
  )
}

export const Dashboard = async () => {
  const user = await getCurrentUser()
  return (
    <>
      {user ? (
        <div className="relative pt-4">
          <span className="text-2xl">Player Board</span>
          <Board username={user.username} email={user.email} />
          <span className="absolute bottom-0 text-xs sm:text-sm">{`Logged in as ${user?.email}`}</span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-10 py-8 lg:flex-row">
          <CreateAccount />
          <Login />
        </div>
      )}
    </>
  )
}

const Board: React.FC<{ username: string; email: string }> = async ({ username, email }) => {
  const players = await getPublicUsers(email)
  console.log("players", players)
  return (
    <div className="pb-8 text-sm lg:text-base">
      {/* HEADER */}
      <div className="h-full divide-y divide-red-400 overflow-auto rounded-lg border">
        <div className="sticky top-0 grid w-full grid-cols-5 items-center divide-x divide-red-400 text-green-400 lg:px-2">
          <div className="p-1 lg:p-2">Player</div>
          <div className="p-1 lg:p-2">Making</div>
          <div className="p-1 lg:p-2">Seeking</div>
          <div className="p-1 lg:p-2">Likes</div>
          <div className="p-1 lg:p-2">Dislikes</div>
        </div>
        {/* BODY */}
        <ul className="divide-y divide-red-400">
          {players.map((p) => (
            <div className="grid grid-cols-5 items-center divide-x wrap-anywhere lg:px-2" key={p.username}>
              <div className="flex h-full flex-col gap-2 p-2 lg:flex-row">
                <Link href={`/u/${p.username}`}>{p.username}</Link>
                {username === p.username && (
                  <Link href="/edit">
                    <MdEdit className="h-5 w-5" />
                  </Link>
                )}
              </div>
              <div className="h-full p-1 wrap-anywhere lg:p-2">{p.making}</div>
              <div className="h-full p-1 lg:p-2">{p.seeking}</div>
              <div className="h-full p-1 lg:p-2">{p.likes}</div>
              <div className="h-full p-1 lg:p-2">{p.dislikes}</div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}
