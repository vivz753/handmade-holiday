import type { Metadata } from "next"
import Link from "next/link"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { logoutUser } from "@lib/actions/userActions"
import { getCurrentUser } from "@lib/auth"
import { Suspense } from "react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Handmade Holiday",
  description: "Gift gambling craft exchange",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body>
        <Header />
        <div className="flex min-h-screen w-full flex-1 flex-col items-center justify-center bg-green-200 font-sans text-red-500">
          {children}
        </div>
      </body>
    </html>
  )
}

const Header = async () => {
  return (
    <nav className="absolute top-0 flex h-[100px] w-full flex-row items-center gap-8 bg-red-500 p-8 md:px-20">
      <Link href="/">
        <span className="text-yellow-50 hover:text-green-100">FAQ</span>
      </Link>
      <Link href="/play">
        <span className="text-yellow-50 hover:text-green-100">Play!</span>
      </Link>
      {/* <Link href="/api-doc">
        <span className="text-yellow-50">API</span>
      </Link> */}
      <Suspense fallback={<span>Loading...</span>}>
        <LoginStatus />
      </Suspense>
    </nav>
  )
}

const LoginStatus = async () => {
  const user = await getCurrentUser()
  if (!user) return null
  return (
    <>
      {user ? (
        <div className="flex w-full flex-row gap-8">
          {/* <span className="ml-auto">{user.username}</span> */}
          <Link className="mr-auto" href="/edit">
            <span className="text-yellow-50 hover:text-green-100">Edit Profile</span>
          </Link>
          <form className="ml-auto" action={logoutUser}>
            <button className="cursor-pointer text-yellow-50 hover:text-green-100" type="submit">
              Log out
            </button>
          </form>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
