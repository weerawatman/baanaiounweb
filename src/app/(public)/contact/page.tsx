import { getProfile } from "@/lib/queries/profile"
import ContactPage from "./ContactPage"

export const revalidate = 3600

export default async function Page() {
  const profile = await getProfile()
  return <ContactPage profile={profile} />
}
