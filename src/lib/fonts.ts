import { Noto_Sans_Thai, Prompt } from "next/font/google"

export const prompt = Prompt({
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
})

export const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
})
