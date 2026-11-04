import Image from "next/image"
import { CreateAccount, Login } from "@components/Login"
import { getCurrentUser } from "./actions"

export default async function Play() {
  // TODO: put in separate component and then wrap in <Suspense>
  const user = await getCurrentUser()
  console.log("user", user)
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-green-100 font-sans text-red-500">
      <Header />
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
    </div>
  )
}

const Dashboard = () => <span>Logged in</span>

const Header = () => (
  <nav className="absolute top-0 flex h-[100px] w-screen flex-row items-center gap-8 bg-red-400 px-20">
    <span className="text-yellow-50">FAQ</span>
    <span className="text-yellow-50">Play!</span>
  </nav>
)
