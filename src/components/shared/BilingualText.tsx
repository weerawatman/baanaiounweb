/**
 * BilingualText component for consistent TH/EN rendering
 * แสดงข้อความภาษาไทยและอังกฤษคู่กัน
 */
export interface BilingualTextProps {
  th: string
  en?: string
  className?: string
  layout?: "stack" | "side-by-side"
  thClassName?: string
  enClassName?: string
}

export default function BilingualText({
  th,
  en,
  className = "",
  layout = "stack",
  thClassName = "",
  enClassName = "",
}: BilingualTextProps) {
  if (!en) {
    return <p className={className}>{th}</p>
  }

  if (layout === "side-by-side") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className={`font-medium text-gray-900 ${thClassName}`}>{th}</span>
        <span className="text-gray-400">|</span>
        <span className={`text-gray-600 ${enClassName}`}>{en}</span>
      </div>
    )
  }

  return (
    <div className={`space-y-1 ${className}`}>
      <p className={`font-medium text-gray-900 ${thClassName}`}>{th}</p>
      <p className={`text-sm text-gray-600 ${enClassName}`}>{en}</p>
    </div>
  )
}