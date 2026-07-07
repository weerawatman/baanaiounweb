export { generateMetadata } from "./FindPropertyPage"
import { getProfile } from "@/lib/queries/profile"
import FindPropertyPage from "./FindPropertyPage"

export const revalidate = 1800

export default async function FindPropertyRoute() {
  const profile = await getProfile()
  return <FindPropertyPage teamImage={profile.matchTeamImage} />
}
