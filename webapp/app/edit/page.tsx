import { getCurrentUser } from "@lib/auth"
import { Suspense } from "react"
import { redirect } from "next/navigation"
import { EditProfileForm } from "@components/EditProfile"
import { Loading } from "@components/Loading"
import { getConfidentialUserByEmail } from "@lib/actions/dataActions"

export default async function Profile() {
  return (
    <div className="flex w-full max-w-3xl flex-1 flex-row items-center justify-center overflow-y-auto bg-yellow-50 p-4 pt-[100px] lg:px-16">
      <Suspense fallback={<Loading variant={false} />}>
        <EditProfile />
      </Suspense>
    </div>
  )
}

const EditProfile = async () => {
  const user = await getCurrentUser()
  if (!user) redirect("/play")

  const profile = await getConfidentialUserByEmail(user.email)
  if (!profile) redirect("/play")

  return <EditProfileForm profile={profile[0]} />
}
