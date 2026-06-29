import { Shield } from "lucide-react"
import { FORM_PRIVACY_NOTICE } from "@/content/form-options"

export default function PrivacyNotice() {
  return (
    <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-gray-400">
      <Shield className="size-3.5 shrink-0" />
      <span className="text-gray-400">{FORM_PRIVACY_NOTICE.th}</span>
      <span className="text-gray-300">|</span>
      <span className="text-gray-400 text-[11px]">{FORM_PRIVACY_NOTICE.en}</span>
    </p>
  )
}
