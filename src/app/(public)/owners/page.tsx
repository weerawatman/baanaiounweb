import { getFaqs } from "@/lib/queries/faqs"
import { mapFaq } from "@/lib/mappers"
import OwnersPage from "./OwnersPage"

export default async function OwnersRoute() {
  const rows = await getFaqs()
  const faqs = rows.filter((f) => f.page_slug === "owners").map(mapFaq)

  return <OwnersPage faqs={faqs} />
}
