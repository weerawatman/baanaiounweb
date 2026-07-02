export { generateMetadata } from "./FindPropertyPage"
import FindPropertyPage from "./FindPropertyPage"

export const revalidate = 1800

export default function FindPropertyRoute() {
  return <FindPropertyPage />
}