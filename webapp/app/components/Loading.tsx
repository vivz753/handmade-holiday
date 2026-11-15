"use client"
import Image from "next/image"
import clsx from "clsx"

export const Loading: React.FC<{ variant?: boolean }> = ({ variant = true }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Image
        alt="Loading..."
        width={150}
        height={150}
        src={variant ? "/christmas-2-svgrepo-com.svg" : "/christmas-1-svgrepo-com.svg"}
        className="animate-pulse"
      />
      <span className={clsx("animate-pulse text-xl", variant ? "text-green-300" : "text-red-500")}>Loading...</span>
    </div>
  )
}
