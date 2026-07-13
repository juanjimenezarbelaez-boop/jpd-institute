import { NextResponse } from "next/server"

/**
 * Live U.S. case-law search backed by the Free Law Project / CourtListener
 * REST API (v4 opinion search). Requires COURTLISTENER_API_TOKEN.
 *
 * Contract: this endpoint NEVER throws a 5xx to the client. On any failure
 * (missing token, upstream error, timeout) it returns { ok: false, results: [] }
 * so the combobox falls back silently to the local dataset.
 */

export interface UsCaseResult {
  name: string
  citation: string | null
  court: string | null
  dateFiled: string | null
  url: string
}

const COURTLISTENER_SEARCH = "https://www.courtlistener.com/api/rest/v4/search/"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = (searchParams.get("q") ?? "").trim()

  if (q.length < 3) {
    return NextResponse.json({ ok: true, results: [] })
  }

  const token = process.env.COURTLISTENER_API_TOKEN
  if (!token) {
    // No token configured: silent fallback to the local dataset.
    return NextResponse.json({ ok: false, results: [] })
  }

  try {
    const url = `${COURTLISTENER_SEARCH}?q=${encodeURIComponent(q)}&type=o&order_by=score%20desc`
    const res = await fetch(url, {
      headers: { Authorization: `Token ${token}` },
      // Never hang the combobox on a slow upstream.
      signal: AbortSignal.timeout(5000),
      // Identical queries within a short window can share a response.
      next: { revalidate: 300 },
    })

    if (!res.ok) {
      return NextResponse.json({ ok: false, results: [] })
    }

    const data = (await res.json()) as {
      results?: Array<{
        caseName?: string
        citation?: string[] | null
        court?: string
        dateFiled?: string | null
        absolute_url?: string
      }>
    }

    const results: UsCaseResult[] = (data.results ?? []).slice(0, 5).map((r) => ({
      name: r.caseName ?? "Unnamed case",
      citation: Array.isArray(r.citation) && r.citation.length > 0 ? r.citation[0] : null,
      court: r.court ?? null,
      dateFiled: r.dateFiled ?? null,
      url: r.absolute_url
        ? `https://www.courtlistener.com${r.absolute_url}`
        : `https://www.courtlistener.com/?q=${encodeURIComponent(q)}`,
    }))

    return NextResponse.json({ ok: true, results })
  } catch {
    return NextResponse.json({ ok: false, results: [] })
  }
}
