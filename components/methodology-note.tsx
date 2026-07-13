import { DATASET_VERSION, DATASET_UPDATED } from "@/data/comparisons"

const SITE = "https://institute-for-jpd.org"

export function MethodologyNote() {
  return (
    <details className="group rounded-[2px] border border-rule bg-white print-open">
      <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 font-serif text-[1.05rem] font-bold text-ink [&::-webkit-details-marker]:hidden">
        How comparisons are built
        <span
          aria-hidden="true"
          className="font-serif text-[1.3rem] leading-none text-gilt group-open:hidden"
        >
          +
        </span>
        <span
          aria-hidden="true"
          className="hidden font-serif text-[1.3rem] leading-none text-gilt group-open:inline"
        >
          {"\u2013"}
        </span>
      </summary>
      <div className="border-t border-rule px-5 py-4 text-[0.95rem] leading-relaxed text-ink-soft">
        <ul className="flex list-none flex-col gap-2.5">
          <li className="border-l-2 border-rule pl-3">
            Comparisons are drafted by the Institute under its published{" "}
            <a href={`${SITE}/methodology.html`} className="text-buckram underline">
              Documentation Standards
            </a>
            . Sourcing, verification, citation, and abstention protocols are public and replicable.
          </li>
          <li className="border-l-2 border-rule pl-3">
            Every proposition carries a pinpoint citation to an official primary source — slip opinions,
            treaty texts, court judgments, and treaty-body records — never a paraphrase presented as
            authority.
          </li>
          <li className="border-l-2 border-rule pl-3">
            The dataset is versioned (currently v{DATASET_VERSION}, updated {DATASET_UPDATED}) and openly
            licensed under Creative Commons Attribution 4.0. It is identical for every user.
          </li>
          <li className="border-l-2 border-rule pl-3">
            Corrections may be submitted publicly. The Institute accepts no commissioned or client-specific
            work; no comparison is adapted to, prepared for, or withheld from any particular reader.
          </li>
        </ul>
      </div>
    </details>
  )
}
