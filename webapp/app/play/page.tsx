import Image from "next/image"
import { CreateAccount, Login } from "@components/Login"
import { getCurrentUser } from "./actions"

export default async function Play() {
  // TODO: put in separate component and then wrap in <Suspense>
  const user = await getCurrentUser()
  console.log("user", user)
  return (
      <main className="flex w-full max-w-3xl flex-1 flex-row items-center gap-10 bg-yellow-50 px-16 py-32 sm:items-start">
        {user ? (
          <Dashboard />
        ) : (
          <div>
            <CreateAccount />
            <Login />
          </div>
        )}
      </main>
  )
}

const Dashboard = () => <span>Logged in</span>


