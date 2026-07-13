import type { Metadata } from "next"
import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { InstitutionNavigator } from "@/components/frameworks/institution-navigator"
import { FrameworkSource } from "@/components/frameworks/framework-source"
import { PrintButton } from "@/components/frameworks/print-button"
import {
  MANDATES,
  PROTOCOL_STEPS,
  PROTOCOL_TITLE,
  CHANGE_LOG,
  VALID_INSTITUTIONS,
  type InstitutionId,
} from "@/data/frameworks"

export const metadata: Metadata = {
  title:
    "Open Governance Frameworks for Religious Pluralism · Public Pilot · Institute for JPD on Religious Freedom",
  description:
    "Model policies and decision protocols any institution can adopt as written. Standardized, openly licensed, annotated to controlling authority. Free for every employer, school system, healthcare institution, and public agency.",
}

const METHODOLOGY_STAGES: { title: string; detail: React.ReactNode }[] = [
  {
    title: "Doctrinal mapping",
    detail: (
      <>
        The controlling doctrine for each institution class is mapped via Program I&apos;s{" "}
        <Link href="/programs/comparative-jurisprudence-lab" className="text-buckram underline">
          Comparative Jurisprudence Lab
        </Link>
        , which consolidates the governing federal and state framework with pinpoint citations.
      </>
    ),
  },
  {
    title: "Instrument drafting",
    detail:
      "Each instrument is drafted as directives a frontline decision-maker can apply as written — no interpretation layer, no consulting engagement required.",
  },
  {
    title: "Annotation",
    detail: "Every provision is pinpoint-cited to the controlling statute, regulation, or decision.",
  },
  {
    title: "Field testing",
    detail:
      "Instruments are tested in structured-dialogue convenings with the institutions that must apply them; findings are published.",
  },
  {
    title: "Publication",
    detail: "Publication under CC BY 4.0 — the instrument is identical for every adopter.",
  },
  {
    title: "Maintenance",
    detail: (
      <>
        A biennial doctrinal-update cycle with versioned releases; every change is recorded in the{" "}
        <a href="#change-log" className="text-buckram underline">
          public change log
        </a>
        .
      </>
    ),
  },
]

export default async function GovernanceFrameworksPage({
  searchParams,
}: {
  searchParams: Promise<{ institution?: string }>
}) {
  const params = await searchParams
  const requested = params.institution as InstitutionId | undefined
  const initialInstitution: InstitutionId =
    requested && VALID_INSTITUTIONS.includes(requested) ? requested : "employer"

  return (
    <>
      <SiteHeader />
      <main id="main">
        {/* 1. Header */}
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
                  Program II
                </li>
              </ol>
            </nav>
            <p className="overline">Program II · Open Governance Frameworks — Public Pilot</p>
            <h1 className="mt-3 max-w-[26ch] text-balance font-serif text-[clamp(2rem,4.4vw,3rem)] font-bold leading-[1.12] text-ink">
              Model policies and decision protocols any institution can adopt as written.
            </h1>
            <p className="mt-4 max-w-[68ch] text-pretty text-[1.05rem] leading-relaxed text-ink-muted">
              Standardized, openly licensed, annotated to controlling authority. Free for every
              employer, school system, healthcare institution, and public agency.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {["No account required", "Free", "CC BY 4.0", "Open methodology"].map((b) => (
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

        {/* 2. Mandate strip */}
        <section className="border-b border-rule bg-vellum" aria-labelledby="mandates-heading">
          <div className="mx-auto max-w-[1120px] px-6 py-12">
            <h2 id="mandates-heading" className="overline">
              The law already binds these institutions
            </h2>
            <ul className="mt-6 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
              {MANDATES.map((m) => (
                <li key={m.institution} className="flex flex-col gap-3 bg-white p-5">
                  <h3 className="font-serif text-[1.05rem] font-bold leading-snug text-ink">
                    {m.audience}
                  </h3>
                  <p className="flex-1 text-[0.88rem] leading-relaxed text-ink-muted">{m.rule}</p>
                  <FrameworkSource source={m.source} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. Framework Navigator */}
        <section className="border-b border-rule" aria-labelledby="navigator-heading">
          <div className="mx-auto max-w-[1120px] px-6 py-12">
            <div className="mb-3 flex items-baseline gap-3">
              <span className="font-mono text-[0.72rem] font-semibold tracking-[0.14em] text-gilt">
                FRAMEWORK NAVIGATOR
              </span>
            </div>
            <h2 id="navigator-heading" className="font-serif text-[1.4rem] font-bold text-ink">
              Select your institution
            </h2>
            <p className="mb-6 mt-2 max-w-[64ch] text-[0.95rem] text-ink-muted">
              The standard that binds you, the decisions your frontline staff face today, and the
              instrument in production — with every proposition linked to its official source.
            </p>
            <InstitutionNavigator initialInstitution={initialInstitution} />
          </div>
        </section>

        {/* 4. Exposure Draft — Module A Decision Protocol */}
        <section className="border-b border-rule bg-paper" aria-labelledby="protocol-heading">
          <div className="mx-auto max-w-[1120px] px-6 py-12">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="overline">Exposure draft · Module A</p>
                <h2
                  id="protocol-heading"
                  className="mt-3 max-w-[36ch] text-balance font-serif text-[1.6rem] font-bold leading-snug text-ink"
                >
                  {PROTOCOL_TITLE}
                </h2>
              </div>
              <PrintButton />
            </div>

            <ol className="mt-8 space-y-0">
              {PROTOCOL_STEPS.map((step, i) => (
                <li
                  key={step.number}
                  className={`print-block relative flex gap-5 pb-8 ${
                    i < PROTOCOL_STEPS.length - 1 ? "border-l-[1.5px] border-rule" : ""
                  } ml-[1.15rem] pl-8`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-[1.16rem] top-0 grid h-9 w-9 flex-none place-items-center rounded-full border-[1.5px] border-buckram bg-white font-serif text-[0.95rem] font-bold text-buckram"
                  >
                    {step.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-[1.15rem] font-bold text-ink">
                      Step {step.number} — {step.title}
                    </h3>
                    <p className="mt-2 max-w-[72ch] text-[0.98rem] leading-relaxed text-ink-soft">
                      {step.rule}
                    </p>
                    <p className="cite mt-2">{step.citations.join("; ")}</p>
                    {step.caution && (
                      <div className="mt-4 flex max-w-[72ch] gap-3 rounded-[2px] border border-gilt bg-vellum p-4">
                        <AlertTriangle
                          className="mt-[2px] h-4 w-4 flex-none text-gilt"
                          aria-hidden="true"
                        />
                        <p className="text-[0.92rem] leading-relaxed text-ink-soft">
                          <b className="font-semibold">Caution.</b> {step.caution}
                        </p>
                      </div>
                    )}
                    <div className="mt-4 grid gap-2 md:grid-cols-2">
                      {step.sources.map((s) => (
                        <FrameworkSource key={`${step.number}-${s.url}`} source={s} />
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            {/* Public comment + disclaimer */}
            <div className="mt-6 rounded-[2px] border border-rule bg-white p-6">
              <h3 className="overline">Public comment</h3>
              <p className="mt-3 max-w-[72ch] text-[0.95rem] leading-relaxed text-ink-soft">
                This exposure draft is open for public comment under the Institute&apos;s{" "}
                <a href="/methodology.html" className="text-buckram underline">
                  Documentation Standards
                </a>
                . Submit comments via the{" "}
                <a href="/contact.html" className="text-buckram underline">
                  contact page
                </a>
                ; all substantive comments and their dispositions will be published with the final
                module.
              </p>
              <p className="cite mt-4">
                Exposure draft for public comment. Not legal advice. Final Module A releases Q1 2027
                under CC BY 4.0.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Production methodology */}
        <section className="border-b border-rule" aria-labelledby="methodology-heading">
          <div className="mx-auto max-w-[1120px] px-6 py-12">
            <h2 id="methodology-heading" className="overline">
              How instruments are built
            </h2>
            <ol className="mt-7 max-w-[76ch] space-y-0">
              {METHODOLOGY_STAGES.map((stage, i) => (
                <li
                  key={stage.title}
                  className={`relative flex gap-5 pb-7 ${
                    i < METHODOLOGY_STAGES.length - 1 ? "border-l-[1.5px] border-rule" : ""
                  } ml-[0.95rem] pl-7`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-[0.95rem] top-0 grid h-[1.9rem] w-[1.9rem] flex-none place-items-center rounded-full border border-gilt bg-paper font-mono text-[0.78rem] font-semibold text-gilt"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-[1.05rem] font-bold text-ink">{stage.title}</h3>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-muted">
                      {stage.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 6. Public change log */}
        <section id="change-log" className="border-b border-rule bg-vellum" aria-labelledby="log-heading">
          <div className="mx-auto max-w-[1120px] px-6 py-12">
            <h2 id="log-heading" className="overline">
              Public change log
            </h2>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse border border-rule bg-white text-left">
                <thead>
                  <tr className="border-b-[1.5px] border-ink">
                    {["Version", "Date", "Instrument", "Change", "Nature"].map((h) => (
                      <th
                        key={h}
                        scope="col"
                        className="px-4 py-3 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-slate"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CHANGE_LOG.map((entry) => (
                    <tr key={`${entry.version}-${entry.instrument}`} className="border-b border-rule last:border-b-0">
                      <td className="cite px-4 py-3 text-ink">{entry.version}</td>
                      <td className="px-4 py-3 text-[0.9rem] text-ink-soft">{entry.date}</td>
                      <td className="px-4 py-3 text-[0.9rem] font-semibold text-ink">
                        {entry.instrument}
                      </td>
                      <td className="px-4 py-3 text-[0.9rem] text-ink-soft">{entry.change}</td>
                      <td className="cite px-4 py-3">{entry.nature}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="cite mt-4">This log is append-only. Entries are never deleted.</p>
          </div>
        </section>

        {/* Cross-navigation */}
        <section>
          <div className="mx-auto max-w-[1120px] px-6 py-12">
            <h2 className="overline">The other programs</h2>
            <ul className="mt-5 flex flex-wrap gap-4">
              <li>
                <Link
                  href="/programs/comparative-jurisprudence-lab"
                  className="inline-block border border-rule bg-white px-4 py-2.5 text-[0.88rem] font-semibold text-buckram transition-colors hover:border-gilt"
                >
                  I · Jurisprudence Lab <span aria-hidden="true">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/religious-freedom-risk-monitor"
                  className="inline-block border border-rule bg-white px-4 py-2.5 text-[0.88rem] font-semibold text-buckram transition-colors hover:border-gilt"
                >
                  III · Risk Monitor <span aria-hidden="true">→</span>
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
