"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export interface Column<T> {
  key: string
  label: string
  render?: (row: T) => React.ReactNode
  searchable?: boolean
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  searchPlaceholder?: string
  emptyText?: string
}

export function DataTable<T>({
  data,
  columns,
  searchPlaceholder = "ค้นหา...",
  emptyText = "ไม่มีข้อมูล",
}: DataTableProps<T>) {
  const [query, setQuery] = useState("")

  const searchableCols = columns.filter((c) => c.searchable !== false)

  const filtered = query
    ? data.filter((row) =>
        searchableCols.some((col) => {
          const val = (row as Record<string, unknown>)[col.key]
          return (
            val != null && String(val).toLowerCase().includes(query.toLowerCase())
          )
        }),
      )
    : data

  return (
    <div className="flex flex-col gap-3">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className="pl-9"
        />
      </div>

      <div className="rounded-xl border bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-4 py-3 text-left font-medium text-muted-foreground"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="py-12 text-center text-muted-foreground"
                  >
                    {emptyText}
                  </td>
                </tr>
              ) : (
                filtered.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b last:border-b-0 hover:bg-muted/20 transition-colors"
                  >
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3 align-middle">
                        {col.render
                          ? col.render(row)
                          : String(
                              (row as Record<string, unknown>)[col.key] ?? "—",
                            )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {filtered.length > 0 && (
          <div className="border-t px-4 py-2 text-xs text-muted-foreground">
            แสดง {filtered.length} จาก {data.length} รายการ
          </div>
        )}
      </div>
    </div>
  )
}
