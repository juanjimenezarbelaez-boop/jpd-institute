"use client"

import { useState } from "react"

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

const CONSENT_TEXT =
  "We agree to receive the semiannual implementation survey and occasional publication notices. No data is sold or shared; aggregate statistics may be published."

const inputClass =
  "w-full rounded-[2px] border border-rule bg-white px-3 py-2 text-[0.95rem] text-ink placeholder:text-slate focus:border-buckram focus:outline-none focus:ring-1 focus:ring-buckram"

const labelClass = "block font-mono text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-slate"

type Errors = Partial<
  Record<"institutionName" | "institutionType" | "state" | "contactEmail" | "instruments" | "consent" | "form", string>
>

export function AdoptionRegistryForm() {
  const [institutionName, setInstitutionName] = useState("")
  const [institutionType, setInstitutionType] = useState("")
  const [usState, setUsState] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [instruments, setInstruments] = useState<string[]>([])
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)
  const [surveyMonth, setSurveyMonth] = useState<string | null>(null)

  function toggleInstrument(name: string) {
    setInstruments((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name],
    )
  }

  function validate(): Errors {
    const e: Errors = {}
    if (!institutionName.trim()) e.institutionName = "Institution name is required."
    if (!institutionType) e.institutionType = "Select an institution type."
    if (!usState) e.state = "Select a state."
    if (!EMAIL_RE.test(contactEmail.trim())) e.contactEmail = "A valid contact email is required."
    if (instruments.length === 0) e.instruments = "Select at least one instrument."
    if (!consent) e.consent = "Consent is required to register."
    return e
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const clientErrors = validate()
    setErrors(clientErrors)
    if (Object.keys(clientErrors).length > 0) return

    setSubmitting(true)
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          institutionName: institutionName.trim(),
          institutionType,
          state: usState,
          contactEmail: contactEmail.trim(),
          instruments,
          consent,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrors(
          data?.fields ?? { form: "Registration could not be processed. Please try again." },
        )
        return
      }
      setSurveyMonth(data.surveyMonth as string)
    } catch {
      setErrors({ form: "Registration could not be processed. Please try again." })
    } finally {
      setSubmitting(false)
    }
  }

  if (surveyMonth) {
    return (
      <div
        role="status"
        className="max-w-[72ch] rounded-[2px] border border-rule bg-white p-6"
      >
        <p className="font-serif text-[1.15rem] font-bold text-ink">Registered.</p>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">
          You&apos;ll receive a welcome note shortly. Your first implementation survey arrives in{" "}
          {surveyMonth}.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-[72ch]">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="reg-institution-name" className={labelClass}>
            Institution name
          </label>
          <input
            id="reg-institution-name"
            name="institutionName"
            type="text"
            autoComplete="organization"
            value={institutionName}
            onChange={(e) => setInstitutionName(e.target.value)}
            aria-invalid={errors.institutionName ? true : undefined}
            aria-describedby={errors.institutionName ? "reg-institution-name-error" : undefined}
            className={`mt-1.5 ${inputClass}`}
          />
          {errors.institutionName && (
            <p id="reg-institution-name-error" className="mt-1.5 text-[0.85rem] text-buckram">
              {errors.institutionName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="reg-institution-type" className={labelClass}>
            Institution type
          </label>
          <select
            id="reg-institution-type"
            name="institutionType"
            value={institutionType}
            onChange={(e) => setInstitutionType(e.target.value)}
            aria-invalid={errors.institutionType ? true : undefined}
            aria-describedby={errors.institutionType ? "reg-institution-type-error" : undefined}
            className={`mt-1.5 ${inputClass}`}
          >
            <option value="">Select…</option>
            {INSTITUTION_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.institutionType && (
            <p id="reg-institution-type-error" className="mt-1.5 text-[0.85rem] text-buckram">
              {errors.institutionType}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="reg-state" className={labelClass}>
            State
          </label>
          <select
            id="reg-state"
            name="state"
            value={usState}
            onChange={(e) => setUsState(e.target.value)}
            aria-invalid={errors.state ? true : undefined}
            aria-describedby={errors.state ? "reg-state-error" : undefined}
            className={`mt-1.5 ${inputClass}`}
          >
            <option value="">Select…</option>
            {US_STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.state && (
            <p id="reg-state-error" className="mt-1.5 text-[0.85rem] text-buckram">
              {errors.state}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="reg-contact-email" className={labelClass}>
            Contact email
          </label>
          <input
            id="reg-contact-email"
            name="contactEmail"
            type="email"
            autoComplete="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            aria-invalid={errors.contactEmail ? true : undefined}
            aria-describedby={errors.contactEmail ? "reg-contact-email-error" : undefined}
            className={`mt-1.5 ${inputClass}`}
          />
          {errors.contactEmail && (
            <p id="reg-contact-email-error" className="mt-1.5 text-[0.85rem] text-buckram">
              {errors.contactEmail}
            </p>
          )}
        </div>

        <fieldset
          className="sm:col-span-2"
          aria-describedby={errors.instruments ? "reg-instruments-error" : undefined}
        >
          <legend className={labelClass}>Instrument(s) adopted</legend>
          <div className="mt-2.5 flex flex-col gap-2.5">
            {INSTRUMENTS.map((instrument) => (
              <label
                key={instrument}
                className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-ink-soft"
              >
                <input
                  type="checkbox"
                  name="instruments"
                  value={instrument}
                  checked={instruments.includes(instrument)}
                  onChange={() => toggleInstrument(instrument)}
                  className="mt-1 h-4 w-4 flex-none rounded-[2px] border-rule text-buckram accent-[color:var(--color-buckram,#1f3a5f)] focus:ring-buckram"
                />
                {instrument}
              </label>
            ))}
          </div>
          {errors.instruments && (
            <p id="reg-instruments-error" className="mt-1.5 text-[0.85rem] text-buckram">
              {errors.instruments}
            </p>
          )}
        </fieldset>

        <div className="sm:col-span-2 border-t border-rule pt-5">
          <label className="flex items-start gap-3 text-[0.92rem] leading-relaxed text-ink-soft">
            <input
              type="checkbox"
              name="consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? "reg-consent-error" : undefined}
              className="mt-1 h-4 w-4 flex-none rounded-[2px] border-rule accent-[color:var(--color-buckram,#1f3a5f)] focus:ring-buckram"
            />
            {CONSENT_TEXT}
          </label>
          {errors.consent && (
            <p id="reg-consent-error" className="mt-1.5 text-[0.85rem] text-buckram">
              {errors.consent}
            </p>
          )}
        </div>
      </div>

      {errors.form && (
        <p role="alert" className="mt-4 text-[0.9rem] text-buckram">
          {errors.form}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 inline-block border border-rule bg-white px-5 py-2.5 text-[0.88rem] font-semibold text-buckram transition-colors hover:border-gilt disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Registering…" : "Register adoption"}
      </button>
    </form>
  )
}
