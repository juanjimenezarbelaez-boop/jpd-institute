import type { Metadata, Viewport } from "next"
import { Libre_Caslon_Text, Public_Sans, IBM_Plex_Mono } from "next/font/google"
import type { ReactNode } from "react"
import "./globals.css"

const libreCaslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre-caslon",
  display: "swap",
})

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-public-sans",
  display: "swap",
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "The Comparative Jurisprudence Lab · Public Pilot · Institute for JPD on Religious Freedom",
  description:
    "A free public tool comparing U.S. Supreme Court and federal appellate religious-freedom doctrine against the Inter-American, European, African, and UN Universal human-rights systems. Every proposition is linked to an official primary source. No account required.",
  metadataBase: new URL("https://institute-for-jpd.org"),
  openGraph: {
    title: "The Comparative Jurisprudence Lab · Public Pilot",
    description:
      "Compare U.S. religious-liberty doctrine with international human-rights standards. Free, open methodology, every proposition sourced.",
    type: "website",
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: "#1b2436",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${libreCaslon.variable} ${publicSans.variable} ${ibmPlexMono.variable} bg-paper`}
    >
      <body className="font-sans text-ink bg-paper antialiased">{children}</body>
    </html>
  )
}
