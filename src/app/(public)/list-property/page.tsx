import { getFaqs } from "@/lib/queries/faqs"
import { mapFaq } from "@/lib/mappers"
import ListPropertyPage from "./ListPropertyPage"

export default async function ListPropertyRoute() {
  const rows = await getFaqs()
  const faqs = rows.filter((f) => f.page_slug === "owners").map(mapFaq)

  return <ListPropertyPage faqs={faqs} />
}