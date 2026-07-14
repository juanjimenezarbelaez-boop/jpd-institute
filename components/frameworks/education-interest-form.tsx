"use client"

import { useState } from "react"

// Configure this endpoint to receive Education Platform interest submissions.
// Replace the placeholder below with your form/collection endpoint URL.
const FORM_ENDPOINT = "/api/education-interest" // TODO: set to your real endpoint

const INTEREST_ROLES = ["Learner", "Volunteer expert faculty", "Venue partner institution"] as const

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const inputClass =
  "w-full rounded-[2px] border border-rule bg-white px-3 py-2 text-[0.95rem] text-ink placeholder:text-slate focus:border-buckram focus:outline-none focus:ring-1 focus:ring-buckram"

const labelClass = "block font-mono text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-slate"

type Errors = Partial<Record<"fullName" | "email" | "role" | "form", string>>

export function EducationInterestForm() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function validate(): Errors {
    const e: Errors = {}
    if (!fullName.trim()) e.fullName = "Full name is required."
    if (!EMAIL_RE.test(email.trim())) e.email = "A valid email is required."
    if (!role) e.role = "Select how you are interested."
    return e
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const clientErrors = validate()
    setErrors(clientErrors)
    if (Object.keys(clientErrors).length > 0) return

    setSubmitting(true)
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          role,
        }),
      })
      if (!res.ok) {
        setErrors({ form: "Your interest could not be submitted. Please try again." })
        return
      }
      setSubmitted(true)
    } catch {
      setErrors({ form: "Your interest could not be submitted. Please try again." })
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div role="status" className="max-w-[72ch] rounded-[2px] border border-rule bg-white p-6">
        <p className="font-serif text-[1.15rem] font-bold text-ink">Thank you.</p>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">
          The Institute will contact you as programming launches.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-[72ch] rounded-[2px] border border-rule bg-white p-6">
      <h3 className="font-serif text-[1.15rem] font-bold text-ink">Receive updates or volunteer</h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">
        For individuals and institutions interested in the Education Platform. Institutions adopting
        policy instruments should use the Adoption Registry above.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="edu-full-name" className={labelClass}>
              Full name
            </label>
            <input
              id="edu-full-name"
              name="fullName"
              type="text"
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              aria-invalid={errors.fullName ? true : undefined}
              aria-describedby={errors.fullName ? "edu-full-name-error" : undefined}
              className={`mt-1.5 ${inputClass}`}
            />
            {errors.fullName && (
              <p id="edu-full-name-error" className="mt-1.5 text-[0.85rem] text-buckram">
                {errors.fullName}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="edu-email" className={labelClass}>
              Email
            </label>
            <input
              id="edu-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "edu-email-error" : undefined}
              className={`mt-1.5 ${inputClass}`}
            />
            {errors.email && (
              <p id="edu-email-error" className="mt-1.5 text-[0.85rem] text-buckram">
                {errors.email}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="edu-role" className={labelClass}>
              I am interested as:
            </label>
            <select
              id="edu-role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              aria-invalid={errors.role ? true : undefined}
              aria-describedby={errors.role ? "edu-role-error" : undefined}
              className={`mt-1.5 ${inputClass}`}
            >
              <option value="">Select…</option>
              {INTEREST_ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            {errors.role && (
              <p id="edu-role-error" className="mt-1.5 text-[0.85rem] text-buckram">
                {errors.role}
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
          {submitting ? "Submitting…" : "Submit interest"}
        </button>
      </form>
    </div>
  )
}
