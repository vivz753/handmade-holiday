import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-green-100 font-sans">
      <nav className="bg-red-400 w-screen h-[100px] px-20 items-center flex flex-row gap-8 absolute top-0">
        <span className="text-yellow-50">FAQ</span>
        <span className="text-yellow-50">Play!</span>
      </nav>
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-yellow-50 sm:items-start">
        <div className="flex flex-col gap-4">
          <span className="text-3xl text-red-500">Handmade Holiday</span>
          <span className="text-2xl text-red-500">Purpose</span>
          <span className="text-red-600">
            Create something of your own to enter the pool of holiday gift
            giving (and gambling)!
          </span>
          <span className="text-2xl text-red-500">How it works</span>
          <span className="text text-red-600">
            To play, you must enter a custom item hand-crafted or designed by
            you (absolutely no input from AI, except to ask for technical help –
            the creativity must come from your precious brain). If you really
            are unable or do not believe in your innate ability to create, you
            may enter an item worth at least $50 USD. This should be the last
            resort, and I encourage everyone to really take this opportunity to
            exercise their creative mind and craftswomanship!
          </span>
        </div>
      </main>
    </div>
  );
}
