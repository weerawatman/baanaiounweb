"use client"

import { useEffect, useState } from "react"

type Lang = "th" | "en"

export default function LanguageToggle() {
  const [lang, setLang] = useState<Lang>("th")

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null
    if (saved === "th" || saved === "en") {
      document.documentElement.dataset.lang = saved
      setLang(saved)
    } else {
      document.documentElement.dataset.lang = "th"
      localStorage.setItem("lang", "th")
    }
  }, [])

  function toggle(next: Lang) {
    document.documentElement.dataset.lang = next
    localStorage.setItem("lang", next)
    setLang(next)
  }

  const base = "px-2.5 py-1 text-xs font-semibold transition-colors focus:outline-none"
  const active = "bg-primary text-white"
  const inactive = "text-gray-500 hover:text-primary"

  return (
    <div className="flex items-center overflow-hidden rounded-md border border-gray-200">
      <button
        onClick={() => toggle("th")}
        aria-label="ภาษาไทย"
        aria-pressed={lang === "th"}
        className={`${base} rounded-l-md ${lang === "th" ? active : inactive}`}
      >
        🇹🇭 TH
      </button>
      <span className="h-4 w-px bg-gray-200" aria-hidden />
      <button
        onClick={() => toggle("en")}
        aria-label="English"
        aria-pressed={lang === "en"}
        className={`${base} rounded-r-md ${lang === "en" ? active : inactive}`}
      >
        🇬🇧 EN
      </button>
    </div>
  )
}
