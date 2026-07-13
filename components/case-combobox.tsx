"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ChevronsUpDown, Check, Search } from "lucide-react"
import { SEED_CASES, type SeedCase } from "@/data/comparisons"
import { cn } from "@/lib/utils"

export function CaseCombobox({
  value,
  onChange,
}: {
  value: string | null
  onChange: (id: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const selected = SEED_CASES.find((c) => c.id === value) ?? null

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return SEED_CASES
    return SEED_CASES.filter((c) =>
      [c.name, c.citation, String(c.year), c.holding].join(" ").toLowerCase().includes(q),
    )
  }, [query])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 0)
      return () => clearTimeout(t)
    }
  }, [open])

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onDocClick)
    return () => document.removeEventListener("mousedown", onDocClick)
  }, [])

  function commit(item: SeedCase) {
    onChange(item.id)
    setOpen(false)
    setQuery("")
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.nativeEvent.isComposing || e.keyCode === 229) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      const item = filtered[activeIndex]
      if (item) commit(item)
    } else if (e.key === "Escape") {
      setOpen(false)
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 rounded-[2px] border-[1.5px] border-ink bg-white px-4 py-3 text-left transition-colors hover:border-buckram"
      >
        <span className={cn("min-w-0", !selected && "text-slate")}>
          {selected ? (
            <span className="flex flex-col">
              <span className="font-serif text-[1.05rem] font-bold leading-tight text-ink">
                {selected.name}
              </span>
              <span className="cite mt-0.5">
                {selected.citation} · {selected.year}
              </span>
            </span>
          ) : (
            <span className="font-sans text-[0.98rem]">Search and select a decision…</span>
          )}
        </span>
        <ChevronsUpDown className="h-4 w-4 flex-none text-slate" aria-hidden="true" />
      </button>

      {open && (
        <div className="absolute z-40 mt-2 w-full overflow-hidden rounded-[2px] border-[1.5px] border-ink bg-white shadow-[6px_6px_0_var(--color-vellum)]">
          <div className="flex items-center gap-2 border-b border-rule px-3 py-2">
            <Search className="h-4 w-4 flex-none text-slate" aria-hidden="true" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Filter by case name, citation, or year…"
              aria-label="Filter decisions"
              className="w-full bg-transparent py-1 font-sans text-[0.95rem] text-ink outline-none placeholder:text-slate"
            />
          </div>
          <ul role="listbox" aria-label="U.S. decisions" className="max-h-[22rem] overflow-y-auto">
            {filtered.length === 0 && (
              <li className="px-4 py-4 text-[0.9rem] text-slate">No decisions match that search.</li>
            )}
            {filtered.map((item, idx) => {
              const isSelected = item.id === value
              const isActive = idx === activeIndex
              return (
                <li key={item.id} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => commit(item)}
                    className={cn(
                      "flex w-full items-start gap-3 border-b border-rule px-4 py-3 text-left last:border-b-0",
                      isActive ? "bg-vellum" : "bg-white",
                    )}
                  >
                    <Check
                      className={cn(
                        "mt-1 h-4 w-4 flex-none text-buckram",
                        isSelected ? "opacity-100" : "opacity-0",
                      )}
                      aria-hidden="true"
                    />
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-baseline gap-x-2">
                        <span className="font-serif text-[1rem] font-bold leading-snug text-ink">
                          {item.name}
                        </span>
                        <span className="cite">
                          {item.citation} · {item.year}
                        </span>
                      </span>
                      <span className="mt-1 block text-[0.86rem] leading-snug text-ink-muted">
                        {item.holding}
                      </span>
                      {item.status === "in-preparation" && (
                        <span className="mt-1.5 inline-block rounded-[2px] border border-gilt px-1.5 py-[0.05rem] font-mono text-[0.6rem] uppercase tracking-[0.1em] text-gilt">
                          Comparison in preparation · 2026
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
