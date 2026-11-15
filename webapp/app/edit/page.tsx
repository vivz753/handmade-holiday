import { getCurrentUser } from "@lib/auth"
import { Suspense } from "react"
import { redirect } from "next/navigation"
import { EditProfileForm } from "@components/EditProfile"
import { Loading } from "@components/Loading"
import { getConfidentialUsers } from "@lib/actions/dataActions"

export default async function Profile() {
  return (
    <div className="flex w-full max-w-3xl flex-1 flex-row items-center justify-center overflow-y-auto bg-yellow-50 px-16 pt-[100px]">
      <Suspense fallback={<Loading />}>
        <EditProfile />
      </Suspense>
    </div>
  )
}

const EditProfile = async () => {
  const user = await getCurrentUser()
  if (!user) redirect("/play")

  const profile = await getConfidentialUsers(user.email)
  if (!profile) redirect("/play")

  return <EditProfileForm profile={profile[0]} />
}
