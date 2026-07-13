"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

const NAV_BEFORE = [
  { label: "Home", href: "/index.html" },
  { label: "Commitments", href: "/commitments.html" },
]

const PROGRAMS_MENU = [
  { label: "Programs overview", href: "/programs" },
  { label: "I · Comparative Jurisprudence Lab", href: "/programs/comparative-jurisprudence-lab" },
  { label: "II · Open Governance Frameworks — Public pilot", href: "/programs/open-governance-frameworks" },
  { label: "III · Religious-Freedom Risk Monitor", href: "/programs/religious-freedom-risk-monitor" },
]

const NAV_AFTER = [
  { label: "Publications", href: "/publications.html" },
  { label: "Methodology", href: "/methodology.html" },
  { label: "Governance", href: "/governance.html" },
  { label: "About", href: "/about.html" },
  { label: "Contact", href: "/contact.html" },
]

function ProgramsDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLLIElement>(null)

  useEffect(() => {
    if (!open) return
    function onPointerDown(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  return (
    <li ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 pb-[3px] text-[0.84rem] font-semibold text-ink hover:text-buckram"
      >
        Programs
        <span aria-hidden="true" className="text-[0.6rem] text-gilt">
          {open ? "▲" : "▼"}
        </span>
      </button>
      {open && (
        <ul
          role="menu"
          className="absolute left-0 top-full z-50 mt-2 w-72 border border-rule bg-white py-1 shadow-[0_8px_24px_rgba(27,36,54,0.12)]"
        >
          {PROGRAMS_MENU.map((item) => (
            <li key={item.href} role="none">
              <Link
                role="menuitem"
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-[0.84rem] font-semibold text-ink hover:bg-vellum hover:text-buckram"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

export function SiteHeader() {
  return (
    <>
      <div className="no-print bg-ink text-[#cfd6e2] font-mono text-[0.72rem] tracking-[0.08em]">
        <div className="mx-auto flex max-w-[1120px] flex-wrap justify-between gap-4 px-6 py-2">
          <span>AN INDEPENDENT, NONPROFIT RESEARCH INSTITUTION</span>
          <span>FOUNDED 2026 · ARLINGTON, VIRGINIA</span>
        </div>
      </div>

      <header className="no-print sticky top-0 z-50 border-b border-rule bg-paper">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-6 px-6 py-4">
          <a
            href="/index.html"
            className="flex items-center gap-3.5 text-ink hover:no-underline"
            aria-label="Institute home"
          >
            <span
              aria-hidden="true"
              className="relative grid h-11 w-11 flex-none place-items-center rounded-full border-[1.5px] border-gilt"
            >
              <span className="pointer-events-none absolute inset-[3px] rounded-full border border-gilt opacity-55" />
              <span className="font-serif text-[0.82rem] font-bold text-buckram">J·P·D</span>
            </span>
            <b className="block max-w-[30ch] font-serif text-base font-bold leading-tight">
              Institute for Jurisprudence, Policy, and Data on Religious Freedom
            </b>
          </a>
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex flex-wrap items-center gap-[1.15rem]">
              {NAV_BEFORE.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="pb-[3px] text-[0.84rem] font-semibold text-ink hover:text-buckram"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <ProgramsDropdown />
              {NAV_AFTER.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="pb-[3px] text-[0.84rem] font-semibold text-ink hover:text-buckram"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}
