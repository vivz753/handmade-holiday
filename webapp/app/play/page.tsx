import { CreateAccount, Login } from "@components/Login"
import { Loading } from "@components/Loading"
import { getCurrentUser } from "@lib/auth"
import { Suspense } from "react"
import { getPublicUsers } from "@lib/actions/dataActions"
import { MdEdit } from "react-icons/md"
import Link from "next/link"

export default async function Play() {
  return (
    <div className="flex w-full max-w-3xl flex-1 flex-row justify-center gap-10 bg-yellow-50 px-10 pt-[100px]">
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
        <div className="pt-4">
          <span className="text-2xl">Player Board</span>
          <Board username={user.username} />
          <span className="absolute bottom-0">{`Logged in as ${user?.email}`}</span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-10 border lg:flex-row">
          <CreateAccount />
          <Login />
        </div>
      )}
    </>
  )
}

const Board: React.FC<{ username: string }> = async ({ username }) => {
  const players = await getPublicUsers()
  console.log("players", players)
  return (
    <div className="max-h-[80vh] p-1">
      <div className="h-full divide-y divide-red-400 overflow-auto rounded-2xl border">
        <div className="sticky top-0 grid w-full grid-cols-5 items-center divide-x divide-red-400 px-2 text-green-200">
          <div className="p-2">Username</div>
          <div className="p-2">Making</div>
          <div className="p-2">Seeking</div>
          <div className="p-2">Likes</div>
          <div className="p-2">Dislikes</div>
        </div>
        <ul className="divide-y divide-red-400">
          {players.map((p) => (
            <div className="grid grid-cols-5 items-center divide-x px-2" key={p.username}>
              <div className="flex h-full flex-row gap-2 p-2">
                {p.username}
                {username === p.username && (
                  <Link href="/edit">
                    <MdEdit className="h-5 w-5" />
                  </Link>
                )}
              </div>
              <div className="h-full p-2 wrap-anywhere">{p.making}</div>
              <div className="h-full p-2">{p.seeking}</div>
              <div className="h-full p-2">{p.likes}</div>
              <div className="h-full p-2">{p.dislikes}</div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}
