import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const INSTITUTION_TYPES = [
  "Employer",
  "School district",
  "Healthcare institution",
  "Public agency",
  "Other",
] as const

const INSTRUMENTS = [
  "Module A exposure draft",
  "Structured-Dialogue Protocol",
  "Following the calendar",
] as const

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois",
  "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts",
  "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
  "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming", "Outside the U.S.",
] as const

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const NOTIFY_TO = "info@institute-for-jpd.org"
const FROM = "Institute for JPD <onboarding@resend.dev>"

function surveyMonth(): string {
  const d = new Date()
  d.setMonth(d.getMonth() + 6)
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" })
}

// PLACEHOLDER welcome-email copy — to be replaced verbatim with final copy.
function welcomeEmail(institutionName: string, instruments: string[]): string {
  return [
    `Dear colleagues at ${institutionName},`,
    ``,
    `Thank you for registering your adoption of the following instrument(s):`,
    instruments.map((i) => `  — ${i}`).join("\n"),
    ``,
    `Registration changes nothing about your access. Every instrument on the Institute's site remains free, identical, and openly licensed for every user, registered or not.`,
    ``,
    `What registration does: twice a year you will receive a short implementation survey. Responses shape each numbered revision of the instruments, and every resulting change is recorded in the public change log at institute-for-jpd.org.`,
    ``,
    `Your first implementation survey will arrive in ${surveyMonth()}. We will also send occasional publication notices. No data is sold or shared; aggregate statistics may be published.`,
    ``,
    `If you wish to support this work, you may do so at institute-for-jpd.org/support.`,
    ``,
    `— The Institute for Jurisprudence, Pluralism & Dialogue on Religious Freedom`,
  ].join("\n")
}

async function sendResendEmail(
  apiKey: string,
  to: string,
  subject: string,
  text: string,
): Promise<boolean> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: FROM, to: [to], subject, text }),
    })
    if (!res.ok) {
      console.error("[register] Resend error:", res.status, await res.text())
      return false
    }
    return true
  } catch (err) {
    console.error("[register] Resend request failed:", err)
    return false
  }
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const b = body as Record<string, unknown>
  const institutionName = typeof b.institutionName === "string" ? b.institutionName.trim() : ""
  const institutionType = typeof b.institutionType === "string" ? b.institutionType : ""
  const state = typeof b.state === "string" ? b.state : ""
  const contactEmail = typeof b.contactEmail === "string" ? b.contactEmail.trim() : ""
  const instruments = Array.isArray(b.instruments)
    ? b.instruments.filter((i): i is string => typeof i === "string")
    : []
  const consent = b.consent === true

  const errors: Record<string, string> = {}
  if (!institutionName || institutionName.length > 200) {
    errors.institutionName = "Institution name is required."
  }
  if (!(INSTITUTION_TYPES as readonly string[]).includes(institutionType)) {
    errors.institutionType = "Select an institution type."
  }
  if (!(US_STATES as readonly string[]).includes(state)) {
    errors.state = "Select a state."
  }
  if (!EMAIL_RE.test(contactEmail) || contactEmail.length > 254) {
    errors.contactEmail = "A valid contact email is required."
  }
  const validInstruments = instruments.filter((i) =>
    (INSTRUMENTS as readonly string[]).includes(i),
  )
  if (validInstruments.length === 0) {
    errors.instruments = "Select at least one instrument."
  }
  if (!consent) {
    errors.consent = "Consent is required to register."
  }
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Validation failed.", fields: errors }, { status: 400 })
  }

  // Send emails via Resend if configured; degrade gracefully if not.
  const resendKey = process.env.RESEND_API_KEY
  let emailStatus = "skipped_no_api_key"
  if (resendKey) {
    const notifyText = [
      `New adoption registration`,
      ``,
      `Institution: ${institutionName}`,
      `Type: ${institutionType}`,
      `State: ${state}`,
      `Contact: ${contactEmail}`,
      `Instruments: ${validInstruments.join("; ")}`,
      `Consent: yes`,
      `Received: ${new Date().toISOString()}`,
    ].join("\n")

    const [notified, welcomed] = await Promise.all([
      sendResendEmail(resendKey, NOTIFY_TO, `Adoption registration — ${institutionName}`, notifyText),
      sendResendEmail(
        resendKey,
        contactEmail,
        "Adoption registered — Institute for JPD on Religious Freedom",
        welcomeEmail(institutionName, validInstruments),
      ),
    ])
    emailStatus =
      notified && welcomed ? "sent" : notified || welcomed ? "partial" : "failed"
  }

  // Store the registration (server-only; RLS has no public policies).
  const supabaseUrl = process.env.SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (supabaseUrl && serviceKey) {
    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false },
    })
    const { error } = await supabase.from("adoption_registrations").insert({
      institution_name: institutionName,
      institution_type: institutionType,
      state,
      contact_email: contactEmail,
      instruments: validInstruments,
      consent,
      email_status: emailStatus,
    })
    if (error) {
      console.error("[register] Supabase insert failed:", error.message)
      // Never break the confirmation state: registration details were emailed
      // (or logged) above; report success to the registrant regardless.
      if (emailStatus === "skipped_no_api_key" || emailStatus === "failed") {
        console.error("[register] Fallback record:", {
          institutionName,
          institutionType,
          state,
          contactEmail,
          instruments: validInstruments,
        })
      }
    }
  } else {
    console.error("[register] Supabase env vars missing; registration logged only.")
  }

  return NextResponse.json({ ok: true, surveyMonth: surveyMonth() })
}
