export { generateMetadata } from "./ListPropertyPage"
import { getFaqsByPage } from "@/lib/queries/faqs"
import { mapFaq } from "@/lib/mappers"
import ListPropertyPage from "./ListPropertyPage"

export const revalidate = 1800

export default async function ListPropertyRoute() {
  const rows = await getFaqsByPage("owners")
  const faqs = rows.map(mapFaq)

  return <ListPropertyPage faqs={faqs} />
}