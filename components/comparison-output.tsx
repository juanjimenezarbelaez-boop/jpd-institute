import type { ReactNode } from "react"
import {
  SYSTEM_META,
  type HumanRightsSystem,
  type SeedCase,
  type SourceLink,
} from "@/data/comparisons"
import { VerifiedSource } from "@/components/verified-source"

function Block({
  index,
  title,
  children,
}: {
  index: string
  title: string
  children: ReactNode
}) {
  return (
    <section className="print-block border-t border-rule pt-6">
      <div className="mb-3 flex items-baseline gap-3">
        <span className="font-serif text-[1.4rem] font-bold leading-none text-gilt">{index}</span>
        <h3 className="font-serif text-[1.35rem] font-bold text-ink">{title}</h3>
      </div>
      {children}
    </section>
  )
}

function QuoteBlock({ quote, pin }: { quote: string; pin: string }) {
  return (
    <figure className="my-3 border-l-2 border-gilt bg-vellum/60 pl-4 pr-3 py-3">
      <blockquote className="font-serif text-[1.02rem] italic leading-relaxed text-ink-soft">
        {`\u201C${quote}\u201D`}
      </blockquote>
      <figcaption className="cite mt-2 not-italic">{pin}</figcaption>
    </figure>
  )
}

function Labeled({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mb-3">
      <div className="overline mb-1">{label}</div>
      <div className="text-[0.98rem] leading-relaxed text-ink-soft">{children}</div>
    </div>
  )
}

export function ComparisonOutput({
  seedCase,
  systems,
}: {
  seedCase: SeedCase
  systems: HumanRightsSystem[]
}) {
  // Case selected but no published comparison yet.
  if (!seedCase.comparison) {
    return (
      <div className="rounded-[2px] border-[1.5px] border-ink bg-white p-6 shadow-[6px_6px_0_var(--color-vellum)]">
        <div className="overline">Comparison in preparation · Publication calendar 2026</div>
        <h3 className="mt-2 font-serif text-[1.4rem] font-bold text-ink">
          {seedCase.name}{" "}
          <span className="cite align-middle">
            {seedCase.citation} · {seedCase.year}
          </span>
        </h3>
        <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-soft">{seedCase.holding}</p>
        <p className="mt-4 text-[0.92rem] leading-relaxed text-slate">
          The full comparative analysis for this decision is drafted under the Institute&apos;s Documentation
          Standards and will be published on the 2026 calendar. The primary source for the U.S. decision is
          available below. The flagship comparison, <em>Groff v. DeJoy</em>, is fully published and
          demonstrates the completed format.
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {seedCase.sources.map((s) => (
            <VerifiedSource key={s.url} source={s} />
          ))}
        </div>
      </div>
    )
  }

  const c = seedCase.comparison
  const activeSystems = c.systems.filter((s) => systems.includes(s.system))

  // Deduplicate every cited document across the whole comparison for the Sources block.
  const allSources: SourceLink[] = [
    ...c.usCase.sources,
    ...activeSystems.flatMap((s) => s.sources),
  ]
  const seen = new Set<string>()
  const uniqueSources = allSources.filter((s) => {
    if (seen.has(s.url)) return false
    seen.add(s.url)
    return true
  })

  return (
    <div className="rounded-[2px] border-[1.5px] border-ink bg-white p-5 shadow-[6px_6px_0_var(--color-vellum)] sm:p-7">
      <header className="mb-5 print-block">
        <div className="overline">Comparison · Published · Dataset v2026.1</div>
        <h2 className="mt-1.5 font-serif text-[1.7rem] font-bold leading-tight text-ink">
          {c.usCase.name} <span className="text-slate">compared with</span>{" "}
          {activeSystems.map((s, i) => (
            <span key={s.system}>
              {SYSTEM_META[s.system].label}
              {i < activeSystems.length - 1 ? " · " : ""}
            </span>
          ))}
        </h2>
        <p className="cite mt-1">
          {c.usCase.citation} · {c.usCase.year}
        </p>
      </header>

      <div className="flex flex-col gap-6">
        {/* a. The U.S. Standard */}
        <Block index="a" title="The U.S. Standard">
          <Labeled label="Holding">{c.usCase.holding}</Labeled>
          <Labeled label="Controlling test">{c.usCase.test}</Labeled>
          <QuoteBlock quote={c.usCase.keyQuote} pin={c.usCase.quotePin} />
        </Block>

        {/* b. The International Standard */}
        <Block index="b" title="The International Standard">
          {activeSystems.length === 0 ? (
            <p className="text-[0.95rem] text-slate">
              Select one or more human-rights systems in Step 2 to render the international standard.
            </p>
          ) : (
            <div className="flex flex-col gap-5">
              {activeSystems.map((s) => (
                <div key={s.system} className="rounded-[2px] border border-rule bg-paper p-4">
                  <div className="overline">{SYSTEM_META[s.system].label}</div>
                  <h4 className="mt-1 font-serif text-[1.15rem] font-bold text-ink">
                    {s.leadingAuthority}
                  </h4>
                  <p className="cite mt-1 mb-2">{s.citation}</p>
                  <Labeled label="Governing test">{s.test}</Labeled>
                  <QuoteBlock quote={s.keyQuote} pin={s.quotePin} />
                </div>
              ))}
            </div>
          )}
        </Block>

        {/* c. Binding Mandates */}
        <Block index="c" title="Binding Mandates">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-[0.9rem]">
              <thead>
                <tr className="border-b border-ink">
                  {["Instrument", "Provision", "Nature of obligation", "Who is bound"].map((h) => (
                    <th
                      key={h}
                      className="overline whitespace-nowrap py-2 pr-4 align-bottom"
                      scope="col"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.mandates.map((m, i) => (
                  <tr key={i} className="border-b border-rule align-top">
                    <td className="py-3 pr-4 font-semibold text-ink">{m.instrument}</td>
                    <td className="py-3 pr-4 font-mono text-[0.8rem] text-slate">{m.provision}</td>
                    <td className="py-3 pr-4 text-ink-soft">{m.obligation}</td>
                    <td className="py-3 pr-4 text-ink-soft">{m.boundParties}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Block>

        {/* d. Key Concepts */}
        <Block index="d" title="Key Concepts">
          <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {c.keyConcepts.map((k) => (
              <div key={k.term}>
                <dt className="font-serif text-[1.02rem] font-bold text-buckram">{k.term}</dt>
                <dd className="mt-0.5 text-[0.92rem] leading-relaxed text-ink-soft">{k.definition}</dd>
              </div>
            ))}
          </dl>
        </Block>

        {/* e. Convergences */}
        <Block index="e" title="Convergences">
          <ul className="flex flex-col gap-3">
            {c.convergences.map((p, i) => (
              <li key={i} className="border-l-2 border-buckram pl-3">
                <span className="text-[0.96rem] leading-relaxed text-ink-soft">{p.text}</span>
                <span className="cite mt-1 block">{p.citations}</span>
              </li>
            ))}
          </ul>
        </Block>

        {/* f. Divergences */}
        <Block index="f" title="Divergences">
          <ul className="flex flex-col gap-3">
            {c.divergences.map((p, i) => (
              <li key={i} className="border-l-2 border-gilt pl-3">
                <span className="text-[0.96rem] leading-relaxed text-ink-soft">{p.text}</span>
                <span className="cite mt-1 block">{p.citations}</span>
              </li>
            ))}
          </ul>
        </Block>

        {/* g. Sources */}
        <Block index="g" title="Sources">
          <p className="mb-3 text-[0.9rem] text-slate">
            Every document cited above, linked to its official repository. Each carries the destination
            domain and the date the Institute last verified the link.
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {uniqueSources.map((s) => (
              <VerifiedSource key={s.url} source={s} />
            ))}
          </div>
        </Block>
      </div>
    </div>
  )
}
