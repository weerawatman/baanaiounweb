import { getProfile } from "@/lib/queries/profile"
import AboutPage from "./AboutPage"

export const revalidate = 3600

export default async function Page() {
  const profile = await getProfile()
  return <AboutPage profile={profile} />
}
