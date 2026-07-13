import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Lab } from "@/components/lab"
import { getProgram } from "@/data/programs"
import { getCaseById, type HumanRightsSystem } from "@/data/comparisons"

export const metadata: Metadata = {
  title: "The Comparative Jurisprudence Lab · Public Pilot · Institute for JPD on Religious Freedom",
  description:
    "Compare U.S. religious-liberty doctrine with the Inter-American, European, African, and Universal human-rights systems. Every proposition linked to its official source. Free, no account required.",
}

const VALID_SYSTEMS: HumanRightsSystem[] = ["inter-american", "european", "african", "universal"]

/** Flagship default: fully published Groff v. DeJoy vs. ECtHR + ICCPR comparison. */
const DEFAULT_CASE = "groff"
const DEFAULT_SYSTEMS: HumanRightsSystem[] = ["european", "universal"]

function parseSystems(raw: string | undefined): HumanRightsSystem[] {
  if (!raw) return []
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter((s): s is HumanRightsSystem => VALID_SYSTEMS.includes(s as HumanRightsSystem))
}

export default async function LabProgramPage({
  searchParams,
}: {
  searchParams: Promise<{ case?: string; systems?: string }>
}) {
  const params = await searchParams
  const program = getProgram("comparative-jurisprudence-lab")!

  // Server-side selection resolution: honor URL state; when the page is opened
  // with no query at all, pre-render the flagship comparison so the full
  // analysis is present in the server response before hydration.
  const hasAnyParam = params.case !== undefined || params.systems !== undefined
  const requestedCase = getCaseById(params.case ?? null)?.id ?? null
  const initialCaseId = hasAnyParam ? requestedCase : DEFAULT_CASE
  const initialSystems = hasAnyParam ? parseSystems(params.systems) : DEFAULT_SYSTEMS

  return (
    <>
      <SiteHeader />
      <main id="main">
        {/* Program I header */}
        <section className="border-b border-rule bg-paper">
          <div className="mx-auto max-w-[1120px] px-6 py-12 sm:py-16">
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex flex-wrap items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-slate">
                <li>
                  <Link href="/programs" className="hover:text-buckram">
                    Programs
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-gilt">
                  Program {program.numeral}
                </li>
              </ol>
            </nav>
            <p className="overline">
              Program {program.numeral} · {program.discipline} — Public Pilot
            </p>
            <h1 className="mt-3 max-w-[26ch] text-balance font-serif text-[clamp(2rem,4.4vw,3rem)] font-bold leading-[1.12] text-ink">
              {program.name}
            </h1>
            <p className="mt-4 max-w-[68ch] text-pretty text-[1.05rem] leading-relaxed text-ink-muted">
              Compare U.S. religious-liberty doctrine with international human-rights standards. Select
              a U.S. decision. Select a human-rights system. Every proposition is linked to the official
              source.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {["No account required", "Free", "Open methodology"].map((b) => (
                <li
                  key={b}
                  className="rounded-[2px] border border-rule bg-white px-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-slate"
                >
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* The interactive Lab. Server-rendered with the resolved selection so
            the full comparison is visible before JavaScript hydrates. */}
        <Lab initialCaseId={initialCaseId} initialSystems={initialSystems} />

        {/* Program context below the tool */}
        <section className="border-t border-rule bg-vellum">
          <div className="mx-auto max-w-[1120px] px-6 py-12">
            <h2 className="overline">Mission</h2>
            <p className="mt-4 max-w-[72ch] text-pretty text-[0.98rem] leading-relaxed text-ink-soft">
              {program.mission}
            </p>
            <h2 className="overline mt-10">Comparative boundaries</h2>
            <p className="mt-4 max-w-[72ch] text-pretty text-[0.98rem] leading-relaxed text-ink-soft">
              {program.note}
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
