import { getProfile } from "@/lib/queries/profile"
import AboutPage from "./AboutPage"

export default async function Page() {
  const profile = await getProfile()
  return <AboutPage profile={profile} />
}
