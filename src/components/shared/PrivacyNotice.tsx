import { Shield } from "lucide-react"
import { FORM_PRIVACY_NOTICE } from "@/content/form-options"

export default function PrivacyNotice() {
  return (
    <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
      <Shield className="size-3.5 shrink-0" />
      <span>{FORM_PRIVACY_NOTICE.th}</span>
      <span className="text-muted-foreground/50">|</span>
      <span className="text-[11px]">{FORM_PRIVACY_NOTICE.en}</span>
    </p>
  )
}
