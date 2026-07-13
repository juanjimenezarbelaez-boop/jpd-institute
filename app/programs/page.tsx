import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LegacyHashRedirect } from "@/components/programs/hash-redirect"
import { PROGRAMS } from "@/data/programs"

export const metadata: Metadata = {
  title: "Programs · Institute for JPD on Religious Freedom",
  description:
    "The three programs of the Institute for Jurisprudence, Policy, and Data on Religious Freedom: the Comparative Jurisprudence Lab, Open Governance Frameworks, and the Religious-Freedom Risk Monitor.",
}

export default function ProgramsPage() {
  return (
    <>
      <LegacyHashRedirect />
      <SiteHeader />
      <main id="main">
        <section className="border-b border-rule bg-paper">
          <div className="mx-auto max-w-[1120px] px-6 py-12 sm:py-16">
            <p className="overline">Three Programs, One Architecture</p>
            <h1 className="mt-3 max-w-[24ch] text-balance font-serif text-[clamp(2rem,4.4vw,3rem)] font-bold leading-[1.12] text-ink">
              Programs of the Institute
            </h1>
            <p className="mt-4 max-w-[68ch] text-pretty text-[1.05rem] leading-relaxed text-ink-muted">
              Each program operates under the{" "}
              <a href="/commitments.html" className="text-buckram underline">
                Founding Commitments
              </a>{" "}
              in full: standardized outputs, an open-access core, published uniform terms, and no
              commissioned work.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1120px] px-6 py-12 sm:py-16">
          <ul className="grid gap-6 md:grid-cols-3">
            {PROGRAMS.map((program) => (
              <li key={program.slug} className="flex">
                <Link
                  href={`/programs/${program.slug}`}
                  className="group flex w-full flex-col border border-rule bg-white p-7 transition-colors hover:border-gilt"
                >
                  <p className="overline">
                    {program.numeral} · {program.discipline}
                  </p>
                  <h2 className="mt-3 font-serif text-[1.35rem] font-bold leading-snug text-ink group-hover:text-buckram">
                    {program.name}
                  </h2>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink-muted">
                    {program.mission.split(". ")[0]}.
                  </p>
                  {program.publicationStatus ? (
                    <p className="cite mt-4">{program.publicationStatus}</p>
                  ) : (
                    <p className="cite mt-4">Public pilot available</p>
                  )}
                  <span className="mt-5 border-t border-rule pt-4 text-[0.84rem] font-semibold text-buckram">
                    Read the program brief <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
