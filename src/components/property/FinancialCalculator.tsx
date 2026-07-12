"use client"

import { useState, useMemo } from "react"
import { useLocale } from "next-intl"
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Input } from "@/components/ui/input"
import { type Property } from "@/types"
import type { Locale } from "@/i18n/routing"
import { pickLocalized } from "@/lib/i18n/pick-localized"

interface FinancialCalculatorProps {
  property: Property
}

const CHART_COLORS = ["#2d5a27", "#d4af37"]

const LABEL_PRICE = { th: "ราคาทรัพย์ (บาท)", en: "Property price (THB)" } as const
const LABEL_DOWN = { th: "เงินดาวน์ (%)", en: "Down payment (%)" } as const
const LABEL_INTEREST = { th: "อัตราดอกเบี้ย (% ต่อปี)", en: "Interest rate (% p.a.)" } as const
const LABEL_TERM = { th: "ระยะเวลากู้ (ปี)", en: "Loan term (years)" } as const
const LABEL_MONTHLY = { th: "ผ่อนชำระต่อเดือน (โดยประมาณ)", en: "Estimated monthly payment" } as const
const LABEL_PER_MONTH = { th: "บาท/เดือน", en: "THB/month" } as const
const LABEL_DOWN_AMT = { th: "ดาวน์", en: "Down" } as const
const LABEL_LOAN = { th: "เงินกู้", en: "Loan" } as const
const CHART_DOWN = { th: "เงินดาวน์", en: "Down payment" } as const
const CHART_LOAN = { th: "เงินกู้", en: "Loan amount" } as const
const DISCLAIMER = {
  th: "* ตัวเลขนี้เป็นการประมาณการเบื้องต้นเท่านั้น ยอดผ่อนจริงขึ้นอยู่กับเงื่อนไขของแต่ละธนาคาร",
  en: "* Figures are estimates only. Actual payments depend on each bank's terms.",
} as const
const CURRENCY_SUFFIX = { th: "บาท", en: "THB" } as const

function formatCurrency(value: number, locale: Locale): string {
  const intlLocale = locale === "en" ? "en-US" : "th-TH"
  return new Intl.NumberFormat(intlLocale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export default function FinancialCalculator({ property }: FinancialCalculatorProps) {
  const locale = useLocale() as Locale
  const [price, setPrice] = useState(String(property.price))
  const [downPercent, setDownPercent] = useState("20")
  const [interestRate, setInterestRate] = useState("6.5")
  const [loanYears, setLoanYears] = useState("30")

  const result = useMemo(() => {
    const p = parseFloat(price) || 0
    const dp = Math.min(100, Math.max(0, parseFloat(downPercent) || 0))
    const r = (parseFloat(interestRate) || 0) / 100 / 12
    const n = (parseFloat(loanYears) || 0) * 12

    const downAmount = (p * dp) / 100
    const loanAmount = p - downAmount

    let monthly = 0
    if (r > 0 && n > 0 && loanAmount > 0) {
      monthly = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    } else if (r === 0 && n > 0 && loanAmount > 0) {
      monthly = loanAmount / n
    }

    return { downAmount, loanAmount, monthly }
  }, [price, downPercent, interestRate, loanYears])

  const chartData = [
    { name: pickLocalized(locale, CHART_DOWN), value: result.downAmount },
    { name: pickLocalized(locale, CHART_LOAN), value: result.loanAmount },
  ].filter((d) => d.value > 0)

  const currencySuffix = pickLocalized(locale, CURRENCY_SUFFIX)

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-muted-foreground text-xs font-medium">
            {pickLocalized(locale, LABEL_PRICE)}
          </label>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={0}
            step={10000}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-muted-foreground text-xs font-medium">
            {pickLocalized(locale, LABEL_DOWN)}
          </label>
          <Input
            type="number"
            value={downPercent}
            onChange={(e) => setDownPercent(e.target.value)}
            min={0}
            max={100}
            step={5}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-muted-foreground text-xs font-medium">
            {pickLocalized(locale, LABEL_INTEREST)}
          </label>
          <Input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            min={0}
            step={0.1}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-muted-foreground text-xs font-medium">
            {pickLocalized(locale, LABEL_TERM)}
          </label>
          <Input
            type="number"
            value={loanYears}
            onChange={(e) => setLoanYears(e.target.value)}
            min={1}
            max={35}
            step={1}
          />
        </div>
      </div>

      <div className="rounded-xl border border-primary/20 bg-green-50 p-5 text-center">
        <p className="text-sm font-medium text-primary">{pickLocalized(locale, LABEL_MONTHLY)}</p>
        <p className="mt-1 text-3xl font-bold text-primary">
          {formatCurrency(result.monthly, locale)}{" "}
          <span className="text-base font-normal">{pickLocalized(locale, LABEL_PER_MONTH)}</span>
        </p>
        <div className="text-muted-foreground mt-3 flex justify-center gap-6 text-xs">
          <span>
            {pickLocalized(locale, LABEL_DOWN_AMT)}:{" "}
            <strong className="text-foreground">
              {formatCurrency(result.downAmount, locale)} {currencySuffix}
            </strong>
          </span>
          <span>
            {pickLocalized(locale, LABEL_LOAN)}:{" "}
            <strong className="text-foreground">
              {formatCurrency(result.loanAmount, locale)} {currencySuffix}
            </strong>
          </span>
        </div>
      </div>

      {chartData.length === 2 && (
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
                paddingAngle={3}
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) =>
                  typeof value === "number"
                    ? [`${formatCurrency(value, locale)} ${currencySuffix}`]
                    : [String(value)]
                }
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      <p className="text-muted-foreground text-center text-xs">{pickLocalized(locale, DISCLAIMER)}</p>
    </div>
  )
}
