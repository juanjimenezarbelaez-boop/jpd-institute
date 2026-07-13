"use client"

import { Printer } from "lucide-react"

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex items-center gap-2 rounded-[2px] border-[1.5px] border-buckram px-4 py-2 text-[0.85rem] font-semibold text-buckram transition-colors hover:bg-[#eef1f6]"
    >
      <Printer className="h-4 w-4" aria-hidden="true" />
      Print / Save PDF
    </button>
  )
}
