import { DATASET_VERSION, DATASET_UPDATED } from "@/data/comparisons"

const NAV = [
  { label: "Home", href: "/index.html" },
  { label: "Commitments", href: "/commitments.html" },
  { label: "Programs", href: "/programs.html" },
  { label: "Publications", href: "/publications.html" },
  { label: "Methodology", href: "/methodology.html" },
  { label: "Governance", href: "/governance.html" },
  { label: "About", href: "/about.html" },
  { label: "Contact", href: "/contact.html" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-rule bg-vellum py-11 text-[0.82rem] text-slate">
      <div className="mx-auto grid max-w-[1120px] gap-4 px-6">
        <p className="font-mono text-[0.74rem] font-semibold tracking-[0.06em] text-ink">
          Free and identical for every user · Licensed CC BY 4.0 · This tool does not provide legal advice.
        </p>
        <nav aria-label="Footer" className="no-print flex flex-wrap gap-[1.2rem]">
          {NAV.map((item) => (
            <a key={item.label} href={item.href} className="text-[0.8rem] text-slate hover:text-buckram">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="font-mono text-[0.74rem]">
          © 2026 Institute for Jurisprudence, Policy, and Data on Religious Freedom · Comparative
          Jurisprudence Lab dataset v{DATASET_VERSION} (updated {DATASET_UPDATED}) · Except where noted,
          publications are licensed CC BY 4.0
        </div>
        <div className="max-w-[80ch] leading-relaxed">
          The Institute for Jurisprudence, Policy, and Data on Religious Freedom is an independent, nonprofit
          research institution. It does not provide legal advice, representation, or individualized guidance,
          and it accepts no commissioned, client-specific, or bespoke engagements. Nothing on this site
          constitutes legal advice, and no professional relationship is created by its use.
        </div>
      </div>
    </footer>
  )
}
