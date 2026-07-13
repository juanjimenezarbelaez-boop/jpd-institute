"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import {
  NAVIGATOR_PANELS,
  getPanel,
  type InstitutionId,
  type NavigatorPanel,
} from "@/data/frameworks"
import { FrameworkSource } from "@/components/frameworks/framework-source"

const BASE_PATH = "/programs/open-governance-frameworks"

export function InstitutionNavigator({
  initialInstitution = "employer",
}: {
  initialInstitution?: InstitutionId
}) {
  const router = useRouter()
  const [institution, setInstitution] = useState<InstitutionId>(initialInstitution)
  const [loading, setLoading] = useState(false)
  const mounted = useRef(false)

  // Brief skeleton on selection change; skipped on first mount so the
  // server-rendered default panel is never replaced by a skeleton flash.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 240)
    return () => clearTimeout(t)
  }, [institution])

  function handleSelect(next: InstitutionId) {
    setInstitution(next)
    router.replace(`${BASE_PATH}?institution=${next}`, { scroll: false })
  }

  const panel = getPanel(institution)

  return (
    <div>
      {/* Toggle cards */}
      <div
        role="tablist"
        aria-label="Institution type"
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        {NAVIGATOR_PANELS.map((p) => {
          const active = p.institution === institution
          return (
            <button
              key={p.institution}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls="navigator-panel"
              onClick={() => handleSelect(p.institution)}
              className={
                active
                  ? "rounded-[2px] border-[1.5px] border-buckram bg-buckram px-4 py-3.5 text-left font-serif text-[1.02rem] font-bold text-white"
                  : "rounded-[2px] border-[1.5px] border-rule bg-white px-4 py-3.5 text-left font-serif text-[1.02rem] font-bold text-ink transition-colors hover:border-buckram"
              }
            >
              {p.label}
            </button>
          )
        })}
      </div>

      <div id="navigator-panel" role="tabpanel" aria-live="polite" className="mt-6">
        {loading ? <PanelSkeleton /> : <Panel panel={panel} />}
      </div>
    </div>
  )
}

function Panel({ panel }: { panel: NavigatorPanel }) {
  return (
    <div className="rounded-[2px] border-[1.5px] border-ink bg-white">
      {/* a. The standard that binds you */}
      <section className="border-b border-rule p-6 sm:p-7" aria-label={panel.standardHeading}>
        <h3 className="overline">{panel.standardHeading}</h3>
        <blockquote className="mt-4 border-l-[3px] border-gilt pl-5">
          <p className="max-w-[72ch] font-serif text-[1.12rem] leading-relaxed text-ink">
            &ldquo;{panel.standardQuote}&rdquo;
          </p>
        </blockquote>
        <p className="cite mt-3">{panel.standardCitation}</p>
      </section>

      {/* b. The frontline decision */}
      <section className="border-b border-rule p-6 sm:p-7" aria-label="The frontline decision">
        <h3 className="overline">The frontline decision</h3>
        <ul className="mt-4 space-y-3">
          {panel.frontlineQuestions.map((q, i) => (
            <li key={i} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-[3px] font-mono text-[0.72rem] font-semibold text-gilt"
              >
                Q{i + 1}
              </span>
              <p className="max-w-[70ch] text-[0.98rem] leading-relaxed text-ink-soft">{q}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* c. The instrument in production */}
      <section className="border-b border-rule p-6 sm:p-7" aria-label="The instrument in production">
        <h3 className="overline">The instrument in production</h3>
        <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <p className="font-serif text-[1.15rem] font-bold text-ink">
            {panel.module.code} — {panel.module.title}
          </p>
          <span className="cite whitespace-nowrap border border-rule bg-vellum px-2 py-0.5">
            {panel.module.status}
          </span>
        </div>
        <p className="mt-3 max-w-[72ch] text-[0.95rem] leading-relaxed text-ink-muted">
          {panel.module.specification}
        </p>
        <p className="cite mt-3">
          License {panel.module.license} · Release {panel.module.release}
        </p>
      </section>

      {/* d. Sources */}
      <section className="p-6 sm:p-7" aria-label="Sources">
        <h3 className="overline">Sources</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {panel.sources.map((s) => (
            <FrameworkSource key={s.url} source={s} />
          ))}
        </div>
      </section>
    </div>
  )
}

function PanelSkeleton() {
  return (
    <div className="rounded-[2px] border-[1.5px] border-ink bg-white p-7">
      <div className="h-4 w-48 animate-pulse rounded-[2px] bg-vellum" />
      <div className="mt-4 h-6 w-3/4 animate-pulse rounded-[2px] bg-vellum" />
      <div className="mt-6 space-y-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="space-y-2 border-t border-rule pt-4">
            <div className="h-4 w-36 animate-pulse rounded-[2px] bg-vellum" />
            <div className="h-3 w-full animate-pulse rounded-[2px] bg-vellum" />
            <div className="h-3 w-10/12 animate-pulse rounded-[2px] bg-vellum" />
          </div>
        ))}
      </div>
    </div>
  )
}
