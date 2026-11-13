import Image from "next/image"


export const Loading = () => (
  <div className="flex h-full flex-col items-center justify-center gap-4">
    <Image alt="Loading..." width={150} height={150} src="/christmas-2-svgrepo-com.svg" className="animate-pulse" />
    <span className="animate-pulse text-xl text-green-300">Loading...</span>
  </div>
)
