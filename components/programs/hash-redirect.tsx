"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

/**
 * Legacy anchors from the static /programs.html page map to dedicated
 * program pages. Hash fragments never reach the server, so the mapping
 * must happen client-side after the redirect lands on /programs.
 */
const HASH_MAP: Record<string, string> = {
  "#jurisprudence": "/programs/comparative-jurisprudence-lab",
  "#policy": "/programs/open-governance-frameworks",
  "#data": "/programs/religious-freedom-risk-monitor",
}

export function LegacyHashRedirect() {
  const router = useRouter()

  useEffect(() => {
    const target = HASH_MAP[window.location.hash]
    if (target) {
      router.replace(target)
    }
  }, [router])

  return null
}
