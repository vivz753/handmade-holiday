import Image from "next/image"
import { CreateAccount, Login } from "@components/Login"
import { getCurrentUser } from "@lib/auth"
import { Suspense } from "react"
import { getUsers } from "@lib/actions/dataActions"

export default async function Play() {
  return (
    <div className="flex w-full max-w-3xl flex-1 flex-row items-center justify-center gap-10 bg-yellow-50 px-10 pt-[100px]">
      <Suspense fallback={<Loading />}>
        <Dashboard />
      </Suspense>
    </div>
  )
}

export const Loading = () => (
  <div className="flex h-full flex-col items-center justify-center gap-4">
    <Image alt="Loading..." width={150} height={150} src="christmas-2-svgrepo-com.svg" className="animate-pulse" />
    <span className="animate-pulse text-xl text-green-300">Loading...</span>
  </div>
)
export const Dashboard = async () => {
  const user = await getCurrentUser()
  return (
    <>
      {user ? (
        <div className="">
          <span className="text-2xl">Player Board</span>
          <Board />
          <span className="absolute bottom-0 text-black">{`Logged in as ${user?.email}`}</span>
        </div>
      ) : (
        <div className="flex flex-col gap-10 lg:flex-row">
          <CreateAccount />
          <Login />
        </div>
      )}
    </>
  )
}

const Board = async () => {
  const players = await getUsers()
  console.log("players", players)
  return (
    <div className="h-[800px] max-h-[80vh] p-1">
      <div className="divide-y divide-red-400 rounded-2xl border p-2">
        <div className="grid grid-cols-5 items-center divide-x divide-red-400 text-green-200">
          <div className="p-1">Username</div>
          <div className="p-1">Making</div>
          <div className="p-1">Seeking</div>
          <div className="p-1">Likes</div>
          <div className="p-1">Dislikes</div>
          {/* <div className="p-1 tabular-nums">dob</div> */}
        </div>
        <ul className="divide-y divide-red-400">
          {players.map((p) => (
            <div className="grid grid-cols-5 items-center divide-x" key={p.username}>
              {/* <div className="truncate p-1 whitespace-pre-wrap">{p.email}</div> */}
              <div className="p-1">{p.username}</div>
              <div className="h-full p-0">{p.making}</div>
              <div className="h-full p-0">{p.seeking}</div>
              <div className="h-full p-0">{p.likes}</div>
              <div className="h-full p-1">{p.dislikes}</div>
              {/* <div className="p-1 tabular-nums">{p.dob}</div> */}
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}
