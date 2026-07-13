import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PROGRAMS, getProgram } from "@/data/programs"

const DEDICATED_ROUTES = ["comparative-jurisprudence-lab", "open-governance-frameworks"]

export function generateStaticParams() {
  // Programs I and II have dedicated static routes under app/programs/.
  return PROGRAMS.filter((p) => !DEDICATED_ROUTES.includes(p.slug)).map((p) => ({
    slug: p.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const program = getProgram(slug)
  if (!program) return {}
  return {
    title: `${program.name} · Institute for JPD on Religious Freedom`,
    description: program.mission.split(". ")[0] + ".",
  }
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const program = getProgram(slug)
  if (!program) notFound()

  const isLab = program.slug === "comparative-jurisprudence-lab"

  return (
    <>
      <SiteHeader />
      <main id="main">
        {/* Hero */}
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
              Program {program.numeral} · {program.discipline}
            </p>
            <h1 className="mt-3 max-w-[26ch] text-balance font-serif text-[clamp(2rem,4.4vw,3rem)] font-bold leading-[1.12] text-ink">
              {program.name}
            </h1>
            {program.publicationStatus && (
              <p className="cite mt-4 inline-block border border-rule bg-white px-3 py-1">
                {program.publicationStatus}
              </p>
            )}
            {isLab && (
              <div className="mt-7">
                <Link
                  href="/lab"
                  className="inline-block border border-buckram bg-buckram px-6 py-3 text-[0.95rem] font-semibold text-white transition-colors hover:bg-buckram-deep"
                >
                  Open the public pilot <span aria-hidden="true">→</span>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Mission */}
        <section className="border-b border-rule">
          <div className="mx-auto max-w-[1120px] px-6 py-12">
            <h2 className="overline">Mission</h2>
            <p className="mt-4 max-w-[72ch] text-pretty text-[1.05rem] leading-relaxed text-ink-soft">
              {program.mission}
            </p>
          </div>
        </section>

        {/* Scope / deliverables */}
        <section className="border-b border-rule">
          <div className="mx-auto max-w-[1120px] px-6 py-12">
            <h2 className="overline">{isLab ? "Scope of the corpus" : "Deliverables"}</h2>
            <ul className="mt-6 grid gap-px border border-rule bg-rule sm:grid-cols-2">
              {program.deliverables.map((d) => (
                <li key={d.title} className="flex flex-col gap-2 bg-white p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="font-serif text-[1.05rem] font-bold leading-snug text-ink">
                      {d.title}
                    </h3>
                    <span className="cite whitespace-nowrap border border-rule bg-vellum px-2 py-0.5">
                      {d.status}
                    </span>
                  </div>
                  <p className="text-[0.92rem] leading-relaxed text-ink-muted">{d.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Program note */}
        <section className="border-b border-rule bg-vellum">
          <div className="mx-auto max-w-[1120px] px-6 py-12">
            <h2 className="overline">{isLab ? "Comparative boundaries" : "Program note"}</h2>
            <p className="mt-4 max-w-[72ch] text-pretty text-[0.98rem] leading-relaxed text-ink-soft">
              {program.note}
            </p>
            {isLab && (
              <p className="mt-4 max-w-[72ch] text-[0.98rem] leading-relaxed text-ink-soft">
                All documentation follows the Institute&apos;s published{" "}
                <a href="/methodology.html" className="text-buckram underline">
                  documentation standards
                </a>
                : verified sources only, pinpoint citations, and abstention where documentary
                support is insufficient.
              </p>
            )}
          </div>
        </section>

        {/* Cross-navigation */}
        <section>
          <div className="mx-auto max-w-[1120px] px-6 py-12">
            <h2 className="overline">The other programs</h2>
            <ul className="mt-5 flex flex-wrap gap-4">
              {PROGRAMS.filter((p) => p.slug !== program.slug).map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/programs/${p.slug}`}
                    className="inline-block border border-rule bg-white px-4 py-2.5 text-[0.88rem] font-semibold text-buckram transition-colors hover:border-gilt"
                  >
                    {p.numeral} · {p.shortName} <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
