import { Shield } from "lucide-react"
import { FORM_PRIVACY_NOTICE } from "@/lib/page-content"

export default function PrivacyNotice() {
  return (
    <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-gray-400">
      <Shield className="size-3.5 shrink-0" />
      {FORM_PRIVACY_NOTICE}
    </p>
  )
}
