"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Printer } from "lucide-react"
import {
  SEED_CASES,
  getCaseById,
  type HumanRightsSystem,
} from "@/data/comparisons"
import { CaseCombobox } from "@/components/case-combobox"
import { SystemSelector } from "@/components/system-selector"
import { ComparisonOutput } from "@/components/comparison-output"
import { MethodologyNote } from "@/components/methodology-note"

const BASE_PATH = "/programs/comparative-jurisprudence-lab"

const SYSTEM_ORDER: Record<HumanRightsSystem, number> = {
  "inter-american": 0,
  european: 1,
  african: 2,
  universal: 3,
}

export function Lab({
  initialCaseId = null,
  initialSystems = [],
}: {
  initialCaseId?: string | null
  initialSystems?: HumanRightsSystem[]
}) {
  const router = useRouter()

  const [caseId, setCaseId] = useState<string | null>(
    getCaseById(initialCaseId) ? initialCaseId : null,
  )
  const [systems, setSystems] = useState<HumanRightsSystem[]>(initialSystems)
  const [loading, setLoading] = useState(false)
  const mounted = useRef(false)

  // Keep the URL in sync so any comparison is directly linkable / printable.
  const syncUrl = useCallback(
    (nextCase: string | null, nextSystems: HumanRightsSystem[]) => {
      const params = new URLSearchParams()
      if (nextCase) params.set("case", nextCase)
      if (nextSystems.length) {
        const ordered = [...nextSystems].sort((a, b) => SYSTEM_ORDER[a] - SYSTEM_ORDER[b])
        params.set("systems", ordered.join(","))
      }
      const qs = params.toString()
      router.replace(qs ? `${BASE_PATH}?${qs}` : BASE_PATH, { scroll: false })
    },
    [router],
  )

  // Brief skeleton state on selection change so output never appears to "pop"
  // without feedback. Skipped on first mount so the server-rendered default
  // comparison is never replaced by a skeleton flash.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    if (!caseId) return
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 280)
    return () => clearTimeout(t)
  }, [caseId, systems])

  function handleCaseChange(id: string) {
    setCaseId(id)
    syncUrl(id, systems)
  }

  function handleToggleSystem(system: HumanRightsSystem) {
    // Compute the next selection outside the state updater: calling
    // router.replace inside an updater triggers a Router update during render.
    const next = systems.includes(system)
      ? systems.filter((s) => s !== system)
      : [...systems, system]
    setSystems(next)
    syncUrl(caseId, next)
  }

  const seedCase = useMemo(() => getCaseById(caseId), [caseId])

  return (
    <div className="mx-auto max-w-[1120px] px-6 pb-24">
      {/* Step 1 */}
      <section className="pt-10" aria-labelledby="step1">
        <div className="mb-3 flex items-baseline gap-3">
          <span className="font-mono text-[0.72rem] font-semibold tracking-[0.14em] text-gilt">
            STEP 1
          </span>
          <h2 id="step1" className="font-serif text-[1.4rem] font-bold text-ink">
            Select a U.S. decision
          </h2>
        </div>
        <label
          htmlFor="case-combobox"
          className="mb-2 block text-[0.9rem] font-semibold text-ink-soft"
          id="case-combobox"
        >
          U.S. Supreme Court or federal appellate decision
        </label>
        <div className="max-w-[640px]">
          <CaseCombobox value={caseId} onChange={handleCaseChange} />
        </div>
      </section>

      {/* Step 2 */}
      <section className="pt-10" aria-labelledby="step2">
        <div className="mb-3 flex items-baseline gap-3">
          <span className="font-mono text-[0.72rem] font-semibold tracking-[0.14em] text-gilt">
            STEP 2
          </span>
          <h2 id="step2" className="font-serif text-[1.4rem] font-bold text-ink">
            Select one or more human-rights systems
          </h2>
        </div>
        <p className="mb-4 max-w-[64ch] text-[0.95rem] text-ink-muted">
          Choose the regional or universal system to compare against. Multiple systems may be selected.
        </p>
        <SystemSelector selected={systems} onToggle={handleToggleSystem} />
      </section>

      {/* Step 3 */}
      <section className="pt-10" aria-labelledby="step3">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[0.72rem] font-semibold tracking-[0.14em] text-gilt">
              STEP 3
            </span>
            <h2 id="step3" className="font-serif text-[1.4rem] font-bold text-ink">
              Comparison
            </h2>
          </div>
          {seedCase && (
            <button
              type="button"
              onClick={() => window.print()}
              className="no-print inline-flex items-center gap-2 rounded-[2px] border-[1.5px] border-buckram px-4 py-2 text-[0.85rem] font-semibold text-buckram transition-colors hover:bg-[#eef1f6]"
            >
              <Printer className="h-4 w-4" aria-hidden="true" />
              Print / Save PDF
            </button>
          )}
        </div>

        <div aria-live="polite">
          {!seedCase ? (
            <EmptyState />
          ) : loading ? (
            <ComparisonSkeleton />
          ) : (
            <ComparisonOutput seedCase={seedCase} systems={systems} />
          )}
        </div>
      </section>

      {/* Methodology footnote */}
      <section className="pt-12" aria-label="Methodology">
        <MethodologyNote />
      </section>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="rounded-[2px] border border-dashed border-rule bg-vellum/40 px-6 py-12 text-center">
      <p className="font-serif text-[1.25rem] text-ink">Select a decision above to begin.</p>
      <p className="mx-auto mt-2 max-w-[52ch] text-[0.95rem] text-slate">
        Choose a U.S. decision in Step 1 and one or more human-rights systems in Step 2. The comparison
        renders here instantly, with every proposition linked to its official primary source.
      </p>
      <div className="mx-auto mt-5 flex max-w-[42ch] flex-wrap justify-center gap-2">
        {SEED_CASES.slice(0, 3).map((c) => (
          <span key={c.id} className="cite rounded-[2px] border border-rule bg-white px-2 py-1">
            {c.name}
          </span>
        ))}
      </div>
    </div>
  )
}

function ComparisonSkeleton() {
  return (
    <div className="rounded-[2px] border-[1.5px] border-ink bg-white p-7">
      <div className="h-4 w-40 animate-pulse rounded-[2px] bg-vellum" />
      <div className="mt-3 h-8 w-3/4 animate-pulse rounded-[2px] bg-vellum" />
      <div className="mt-6 space-y-3">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2 border-t border-rule pt-4">
            <div className="h-4 w-32 animate-pulse rounded-[2px] bg-vellum" />
            <div className="h-3 w-full animate-pulse rounded-[2px] bg-vellum" />
            <div className="h-3 w-11/12 animate-pulse rounded-[2px] bg-vellum" />
          </div>
        ))}
      </div>
    </div>
  )
}
