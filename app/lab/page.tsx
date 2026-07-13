import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Lab } from "@/components/lab"

export default function LabPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        {/* Header strip */}
        <section className="border-b border-rule bg-paper">
          <div className="mx-auto max-w-[1120px] px-6 py-12 sm:py-16">
            <p className="overline">
              Program I · The Comparative Jurisprudence Lab — Public Pilot
            </p>
            <h1 className="mt-3 max-w-[24ch] text-balance font-serif text-[clamp(2rem,4.4vw,3rem)] font-bold leading-[1.12] text-ink">
              Compare U.S. religious-liberty doctrine with international human-rights standards.
            </h1>
            <p className="mt-4 max-w-[68ch] text-pretty text-[1.05rem] leading-relaxed text-ink-muted">
              Select a U.S. decision. Select a human-rights system. Every proposition is linked to the
              official source.
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

        <Suspense fallback={<LabFallback />}>
          <Lab />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  )
}

function LabFallback() {
  return (
    <div className="mx-auto max-w-[1120px] px-6 py-16">
      <div className="h-6 w-48 animate-pulse rounded-[2px] bg-vellum" />
      <div className="mt-4 h-12 w-full max-w-[640px] animate-pulse rounded-[2px] bg-vellum" />
    </div>
  )
}
