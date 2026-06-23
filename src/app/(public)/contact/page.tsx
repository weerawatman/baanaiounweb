import { getProfile } from "@/lib/queries/profile"
import ContactPage from "./ContactPage"

export default async function Page() {
  const profile = await getProfile()
  return <ContactPage profile={profile} />
}
