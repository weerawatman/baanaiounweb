"use client"

import { useState, useMemo } from "react"
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Input } from "@/components/ui/input"
import { type Property } from "@/types"

interface FinancialCalculatorProps {
  property: Property
}

const CHART_COLORS = ["#2d5a27", "#d4af37"]

function formatThb(value: number): string {
  return new Intl.NumberFormat("th-TH", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export default function FinancialCalculator({ property }: FinancialCalculatorProps) {
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
    { name: "เงินดาวน์", value: result.downAmount },
    { name: "เงินกู้", value: result.loanAmount },
  ].filter((d) => d.value > 0)

  return (
    <div className="flex flex-col gap-5">
      {/* Inputs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-muted-foreground text-xs font-medium">ราคาทรัพย์ (บาท)</label>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={0}
            step={10000}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-muted-foreground text-xs font-medium">เงินดาวน์ (%)</label>
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
            อัตราดอกเบี้ย (% ต่อปี)
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
          <label className="text-muted-foreground text-xs font-medium">ระยะเวลากู้ (ปี)</label>
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

      {/* Result */}
      <div className="rounded-xl border border-primary/20 bg-green-50 p-5 text-center">
        <p className="text-sm font-medium text-primary">ผ่อนชำระต่อเดือน (โดยประมาณ)</p>
        <p className="mt-1 text-3xl font-bold text-primary">
          {formatThb(result.monthly)} <span className="text-base font-normal">บาท/เดือน</span>
        </p>
        <div className="text-muted-foreground mt-3 flex justify-center gap-6 text-xs">
          <span>
            ดาวน์: <strong className="text-foreground">{formatThb(result.downAmount)} บาท</strong>
          </span>
          <span>
            เงินกู้: <strong className="text-foreground">{formatThb(result.loanAmount)} บาท</strong>
          </span>
        </div>
      </div>

      {/* Pie chart */}
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
                  typeof value === "number" ? [`${formatThb(value)} บาท`] : [String(value)]
                }
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      <p className="text-muted-foreground text-center text-xs">
        * ตัวเลขนี้เป็นการประมาณการเบื้องต้นเท่านั้น ยอดผ่อนจริงขึ้นอยู่กับเงื่อนไขของแต่ละธนาคาร
      </p>
    </div>
  )
}
