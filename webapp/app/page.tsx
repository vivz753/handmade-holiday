import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-green-100 font-sans">
      <nav className="absolute top-0 flex h-[100px] w-screen flex-row items-center gap-8 bg-red-400 px-20">
        <span className="text-yellow-50">FAQ</span>
        <Link href="/play">
          <span className="text-yellow-50">Play!</span>
        </Link>
      </nav>
      <main className="flex w-full max-w-3xl flex-1 flex-col items-center justify-between bg-yellow-50 px-16 py-32 sm:items-start">
        <div className="flex flex-col gap-4">
          <span className="text-3xl text-red-500">Handmade Holiday</span>
          <span className="text-2xl text-red-500">Purpose</span>
          <span className="text-red-600">
            Create something of your own to enter the pool of holiday gift giving (and gambling)!
          </span>
          <span className="text-2xl text-red-500">How it works</span>
          <span className="text text-red-600">
            To play, you must enter a custom item hand-crafted or designed by you (absolutely no input from AI, except
            to ask for technical help – the creativity must come from your precious brain). If you really are unable or
            do not believe in your innate ability to create, you may enter an item worth at least $50 USD. This should
            be the last resort, and I encourage everyone to really take this opportunity to exercise their creative mind
            and craftswomanship!
          </span>
        </div>
      </main>
    </div>
  )
}
