import Image from "next/image"
import { CreateAccount, Login } from "@components/Login"
import { getCurrentUser } from "../lib/actions/userActions"
import { Suspense } from "react"

export default async function Play() {
  return (
    <div className="flex w-full max-w-3xl flex-1 flex-row items-center justify-center gap-10 bg-yellow-50 pt-[100px]">
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
  console.log("user", user)
  return (
    <div>
      {user ? (
        <div>
          <span>{`Logged in as ${user?.email}`}</span>
        </div>
      ) : (
        <div className="flex flex-col gap-10 lg:flex-row">
          <CreateAccount />
          <Login />
        </div>
      )}
    </div>
  )
}
