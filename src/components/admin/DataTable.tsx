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

interface DataTableProps<T extends { id: string }> {
  data: T[]
  columns: Column<T>[]
  searchPlaceholder?: string
  emptyText?: string
}

export function DataTable<T extends { id: string }>({
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
          return val != null && String(val).toLowerCase().includes(query.toLowerCase())
        }),
      )
    : data

  return (
    <div className="flex flex-col gap-3">
      <div className="relative max-w-sm">
        <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className="pl-9"
        />
      </div>

      <div className="overflow-hidden rounded-xl border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/30 border-b">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="text-muted-foreground px-4 py-3 text-left font-medium"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-muted-foreground py-12 text-center">
                    {emptyText}
                  </td>
                </tr>
              ) : (
                filtered.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-muted/20 border-b transition-colors last:border-b-0"
                  >
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3 align-middle">
                        {col.render
                          ? col.render(row)
                          : String((row as Record<string, unknown>)[col.key] ?? "—")}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {filtered.length > 0 && (
          <div className="text-muted-foreground border-t px-4 py-2 text-xs">
            แสดง {filtered.length} จาก {data.length} รายการ
          </div>
        )}
      </div>
    </div>
  )
}
