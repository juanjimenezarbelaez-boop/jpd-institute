"use client"

import { Check } from "lucide-react"
import { SYSTEM_META, type HumanRightsSystem } from "@/data/comparisons"
import { cn } from "@/lib/utils"

const ORDER: HumanRightsSystem[] = ["inter-american", "european", "african", "universal"]

export function SystemSelector({
  selected,
  onToggle,
}: {
  selected: HumanRightsSystem[]
  onToggle: (system: HumanRightsSystem) => void
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {ORDER.map((sys) => {
        const meta = SYSTEM_META[sys]
        const isOn = selected.includes(sys)
        return (
          <button
            key={sys}
            type="button"
            role="checkbox"
            aria-checked={isOn}
            onClick={() => onToggle(sys)}
            className={cn(
              "flex flex-col items-start gap-2 rounded-[2px] border p-4 text-left transition-colors",
              isOn
                ? "border-buckram border-[1.5px] bg-white shadow-[4px_4px_0_var(--color-vellum)]"
                : "border-rule bg-white hover:border-buckram",
            )}
          >
            <span className="flex w-full items-center justify-between gap-3">
              <span className="overline">{meta.short}</span>
              <span
                aria-hidden="true"
                className={cn(
                  "grid h-5 w-5 flex-none place-items-center rounded-[2px] border",
                  isOn ? "border-buckram bg-buckram text-white" : "border-rule text-transparent",
                )}
              >
                <Check className="h-3.5 w-3.5" />
              </span>
            </span>
            <span className="font-serif text-[1.15rem] font-bold leading-tight text-ink">{meta.label}</span>
            <span className="text-[0.85rem] leading-snug text-ink-muted">{meta.body}</span>
            <span className="cite mt-auto pt-1">{meta.instrument}</span>
          </button>
        )
      })}
    </div>
  )
}
