import { ExternalLink, ShieldCheck } from "lucide-react"
import type { SourceLink } from "@/data/comparisons"

export function VerifiedSource({ source }: { source: SourceLink }) {
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="group flex flex-col gap-1 rounded-[2px] border border-rule bg-white p-3 transition-colors hover:border-buckram hover:no-underline"
    >
      <span className="flex items-center gap-1.5 font-sans text-[0.92rem] font-semibold text-ink group-hover:text-buckram">
        {source.label}
        <ExternalLink className="h-3.5 w-3.5 flex-none text-slate group-hover:text-buckram" aria-hidden="true" />
      </span>
      <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="inline-flex items-center gap-1 rounded-[2px] border border-gilt px-1.5 py-[0.1rem] font-mono text-[0.62rem] uppercase tracking-[0.08em] text-gilt">
          <ShieldCheck className="h-3 w-3" aria-hidden="true" />
          Verified · Official source
        </span>
        <span className="cite">{source.officialDomain}</span>
        <span className="cite">Last verified {source.lastVerified}</span>
      </span>
    </a>
  )
}
