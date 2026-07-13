/**
 * Program II — Open Governance Frameworks for Religious Pluralism.
 * Public pilot dataset.
 *
 * Documentation standards: every legal quotation is real and pinpoint-cited;
 * every source links to an official domain. Where a stable deep link could
 * not be verified, the official portal page is linked instead — URLs are
 * never guessed.
 */

export interface SourceLink {
  label: string
  url: string
  officialDomain: string
  lastVerified: string
}

export type InstitutionId = "employer" | "school" | "healthcare" | "police"

export interface Mandate {
  institution: InstitutionId
  audience: string
  rule: string
  source: SourceLink
}

export interface ModuleSpec {
  code: string
  title: string
  specification: string
  license: "CC BY 4.0"
  release: string
  status: "Exposure draft open for public comment" | "In drafting"
}

export interface NavigatorPanel {
  institution: InstitutionId
  label: string
  standardHeading: string
  standardQuote: string
  standardCitation: string
  frontlineQuestions: string[]
  module: ModuleSpec
  sources: SourceLink[]
}

export interface ProtocolStep {
  number: number
  title: string
  rule: string
  citations: string[]
  caution?: string
  sources: SourceLink[]
}

export interface ChangeLogEntry {
  version: string
  date: string
  instrument: string
  change: string
  nature: "strengthened" | "clarified" | "no-change" | "—"
}

/* ------------------------------------------------------------------ */
/* Shared sources                                                      */
/* ------------------------------------------------------------------ */

const LAST_VERIFIED = "July 13, 2026"

const SRC_GROFF: SourceLink = {
  label: "Groff v. DeJoy, 600 U.S. 447 (2023) — slip opinion, No. 22-174",
  url: "https://www.supremecourt.gov/opinions/22pdf/22-174_k536.pdf",
  officialDomain: "supremecourt.gov",
  lastVerified: LAST_VERIFIED,
}

const SRC_2000E: SourceLink = {
  label: "42 U.S.C. § 2000e(j) — definition of “religion” (Title VII)",
  url: "https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title42-section2000e&num=0&edition=prelim",
  officialDomain: "uscode.house.gov",
  lastVerified: LAST_VERIFIED,
}

const SRC_7904: SourceLink = {
  label: "20 U.S.C. § 7904 — ESEA § 8524, constitutionally protected prayer certification",
  url: "https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title20-section7904&num=0&edition=prelim",
  officialDomain: "uscode.house.gov",
  lastVerified: LAST_VERIFIED,
}

const SRC_ED_GUIDANCE: SourceLink = {
  label: "U.S. Dep’t of Education — Guidance on Constitutionally Protected Prayer and Religious Expression",
  url: "https://www.ed.gov/legislation/essa/guidance-on-constitutionally-protected-prayer-and-religious-expression-in-public-elementary-and-secondary-schools",
  officialDomain: "ed.gov",
  lastVerified: LAST_VERIFIED,
}

const SRC_HHS_CONSCIENCE: SourceLink = {
  label: "HHS Office for Civil Rights — Conscience Protections (Church, Coats-Snowe, Weldon)",
  url: "https://www.hhs.gov/conscience/conscience-protections/index.html",
  officialDomain: "hhs.gov",
  lastVerified: LAST_VERIFIED,
}

const SRC_CPD_PORTAL: SourceLink = {
  label: "Chicago Police Department — Directives System (General Order G02-01-05, Religious Interactions)",
  url: "https://directives.chicagopolice.org/",
  officialDomain: "directives.chicagopolice.org",
  lastVerified: LAST_VERIFIED,
}

const SRC_FIRST_AMENDMENT: SourceLink = {
  label: "U.S. Constitution, Amendment I — Free Exercise Clause (annotated)",
  url: "https://constitution.congress.gov/constitution/amendment-1/",
  officialDomain: "constitution.congress.gov",
  lastVerified: LAST_VERIFIED,
}

const SRC_EEOC_12: SourceLink = {
  label: "EEOC Compliance Manual, Section 12: Religious Discrimination",
  url: "https://www.eeoc.gov/laws/guidance/section-12-religious-discrimination",
  officialDomain: "eeoc.gov",
  lastVerified: LAST_VERIFIED,
}

const SRC_1605: SourceLink = {
  label: "29 C.F.R. Part 1605 — Guidelines on Discrimination Because of Religion",
  url: "https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XIV/part-1605",
  officialDomain: "ecfr.gov",
  lastVerified: LAST_VERIFIED,
}

/* ------------------------------------------------------------------ */
/* Section 2 — Mandate strip                                           */
/* ------------------------------------------------------------------ */

export const MANDATES: Mandate[] = [
  {
    institution: "employer",
    audience: "Employers",
    rule:
      "Title VII, 42 U.S.C. § 2000e(j), as construed in Groff v. DeJoy, 600 U.S. 447 (2023): accommodation is required unless the employer shows “substantial increased costs in relation to the conduct of its particular business.”",
    source: SRC_GROFF,
  },
  {
    institution: "school",
    audience: "School districts",
    rule:
      "ESEA § 8524, 20 U.S.C. § 7904: annual written certification of compliance with the federal religious-expression guidance is a condition of receiving federal funds.",
    source: SRC_7904,
  },
  {
    institution: "healthcare",
    audience: "Healthcare institutions",
    rule:
      "Federal conscience statutes — the Church, Coats-Snowe, and Weldon Amendments — administered and enforced by the HHS Office for Civil Rights.",
    source: SRC_HHS_CONSCIENCE,
  },
  {
    institution: "police",
    audience: "Law enforcement & municipal agencies",
    rule:
      "First Amendment free-exercise obligations arise in daily religious interactions. Documented codified precedent: Chicago Police Department General Order G02-01-05, Religious Interactions (eff. Apr. 29, 2022).",
    source: SRC_CPD_PORTAL,
  },
]

/* ------------------------------------------------------------------ */
/* Section 3 — Framework Navigator                                     */
/* ------------------------------------------------------------------ */

export const NAVIGATOR_PANELS: NavigatorPanel[] = [
  {
    institution: "employer",
    label: "Employer",
    standardHeading: "The standard that binds you",
    standardQuote:
      "Title VII requires an employer that denies a religious accommodation to show that the burden of granting an accommodation would result in substantial increased costs in relation to the conduct of its particular business.",
    standardCitation: "Groff v. DeJoy, 600 U.S. 447, 470 (2023); 42 U.S.C. § 2000e(j).",
    frontlineQuestions: [
      "An employee requests Sabbath scheduling — what showing must you make before denying?",
      "May you weigh coworker complaints about the accommodation itself, or only effects on the conduct of the business?",
      "Have you considered alternative accommodations — shift swaps, voluntary substitutes, schedule changes — before any denial?",
      "Is your documentation sufficient to demonstrate a substantial-cost analysis specific to your business?",
    ],
    module: {
      code: "Module A",
      title: "Workplace Religious Accommodation (post-Groff)",
      specification:
        "A complete written policy and decision protocol an HR department can adopt as written: intake, sincerity, options analysis, the Groff undue-hardship showing, documentation, and periodic review — every provision pinpoint-cited to controlling authority.",
      license: "CC BY 4.0",
      release: "Q1 2027",
      status: "Exposure draft open for public comment",
    },
    sources: [SRC_GROFF, SRC_2000E, SRC_EEOC_12, SRC_1605],
  },
  {
    institution: "school",
    label: "School District",
    standardHeading: "The standard that binds you",
    standardQuote:
      "As a condition of receiving ESEA funds, a local educational agency shall certify in writing to the State that it has no policy that prevents, or otherwise denies participation in, constitutionally protected prayer, as set forth in the federal guidance.",
    standardCitation: "20 U.S.C. § 7904(b) (ESEA § 8524).",
    frontlineQuestions: [
      "A student invokes religious expression in a graduation speech — what does the certified federal guidance require?",
      "A teacher asks whether she may participate in student religious clubs — what line does the guidance draw?",
      "Your district must file its § 7904 certification — what policies must be reviewed before signing?",
    ],
    module: {
      code: "Module B",
      title: "K-12 Religious Expression (§ 8524-aligned)",
      specification:
        "A district-level policy aligned to the § 7904 certification requirement and the current federal religious-expression guidance, with administrator decision protocols for prayer, expression, and equal-access questions.",
      license: "CC BY 4.0",
      release: "Q2 2027",
      status: "In drafting",
    },
    sources: [SRC_7904, SRC_ED_GUIDANCE],
  },
  {
    institution: "healthcare",
    label: "Healthcare Institution",
    standardHeading: "The standard that binds you",
    standardQuote:
      "Federal conscience statutes protect individuals and entities from being required to participate in certain medical procedures contrary to religious belief or moral conviction, as a condition of federal funding; the HHS Office for Civil Rights receives and investigates complaints.",
    standardCitation:
      "Church Amendments, 42 U.S.C. § 300a-7; Coats-Snowe Amendment, 42 U.S.C. § 238n; Weldon Amendment (annual appropriations riders); administered by HHS OCR.",
    frontlineQuestions: [
      "A clinician asserts a conscience objection — which federal statutes govern before any staffing decision?",
      "Does your intake process distinguish conscience objections from ordinary scheduling requests?",
      "Who in your institution is designated to receive, document, and resolve conscience-related requests?",
    ],
    module: {
      code: "Module C",
      title: "Healthcare Conscience Protections",
      specification:
        "An institutional policy and decision protocol covering intake, statutory coverage analysis, staffing alternatives, and documentation under the Church, Coats-Snowe, and Weldon frameworks.",
      license: "CC BY 4.0",
      release: "Q3 2027",
      status: "In drafting",
    },
    sources: [SRC_HHS_CONSCIENCE],
  },
  {
    institution: "police",
    label: "Public Agency / Law Enforcement",
    standardHeading: "The standard that binds you",
    standardQuote:
      "The Free Exercise Clause of the First Amendment binds every public agency in its daily interactions with religious individuals and communities. Codified precedent exists: Chicago Police Department General Order G02-01-05, Religious Interactions (eff. Apr. 29, 2022), governs officer conduct concerning religious garb, sacred items, and religious premises.",
    standardCitation:
      "U.S. Const. amend. I; Chicago Police Dep’t, General Order G02-01-05, Religious Interactions (eff. Apr. 29, 2022).",
    frontlineQuestions: [
      "An officer must search premises containing sacred items — what protocol applies?",
      "A detainee requests religious head-covering accommodation during booking photography — what governs?",
      "Does your agency have any written directive on religious interactions, or does each officer improvise?",
    ],
    module: {
      code: "Module D",
      title: "Law-Enforcement & Municipal Administration",
      specification:
        "A model general order for religious interactions — building on documented precedents such as Chicago G02-01-05 — covering garb, sacred items, premises, dietary needs in custody, and complaint routing.",
      license: "CC BY 4.0",
      release: "Q4 2027",
      status: "In drafting",
    },
    sources: [SRC_FIRST_AMENDMENT, SRC_CPD_PORTAL],
  },
]

export function getPanel(institution: InstitutionId): NavigatorPanel {
  return NAVIGATOR_PANELS.find((p) => p.institution === institution) ?? NAVIGATOR_PANELS[0]
}

export const VALID_INSTITUTIONS: InstitutionId[] = ["employer", "school", "healthcare", "police"]

/* ------------------------------------------------------------------ */
/* Section 4 — Module A Exposure Draft: Decision Protocol              */
/* ------------------------------------------------------------------ */

export const PROTOCOL_TITLE =
  "Religious Accommodation Decision Protocol — Exposure Draft v0.1 (post-Groff)"

export const PROTOCOL_STEPS: ProtocolStep[] = [
  {
    number: 1,
    title: "Intake",
    rule:
      "Accept the request in any form; no specific words are required. An employee need only provide notice sufficient to make the employer aware that a conflict exists between religious practice and a work requirement.",
    citations: ["EEOC Compliance Manual § 12-IV(A)", "29 C.F.R. § 1605.2"],
    sources: [SRC_EEOC_12, SRC_1605],
  },
  {
    number: 2,
    title: "Religious nature and sincerity",
    rule:
      "“Religion” is defined broadly to include all aspects of religious observance and practice, as well as belief. A sincerity inquiry is permitted but narrow; disagreement with the belief, or the belief's unfamiliarity, is never a ground for denial.",
    citations: ["42 U.S.C. § 2000e(j)", "29 C.F.R. § 1605.1", "EEOC Compliance Manual § 12-I(A)"],
    sources: [SRC_2000E, SRC_1605, SRC_EEOC_12],
  },
  {
    number: 3,
    title: "Identify accommodation options with the employee",
    rule:
      "Explore accommodation options with the employee — schedule changes, voluntary shift swaps, lateral transfers, and modifications to workplace practices — and document each option considered.",
    citations: ["29 C.F.R. § 1605.2(d)", "EEOC Compliance Manual § 12-IV(B)"],
    sources: [SRC_1605, SRC_EEOC_12],
  },
  {
    number: 4,
    title: "Undue hardship under Groff",
    rule:
      "To deny, the employer must show that the burden of granting the accommodation “would result in substantial increased costs in relation to the conduct of its particular business,” assessed in light of the nature, size, and operating cost of the employer.",
    citations: ["Groff v. DeJoy, 600 U.S. 447, 470 (2023)"],
    caution:
      "Coworker impacts count only insofar as they affect the conduct of the business; hostility to religious practice or the fact of an accommodation cannot be considered. Groff, 600 U.S. at 472.",
    sources: [SRC_GROFF],
  },
  {
    number: 5,
    title: "Decision and documentation",
    rule:
      "If denying, document the specific substantial-cost showing; Groff requires consideration of alternative accommodations before denial — it is not enough that the requested accommodation itself imposes hardship.",
    citations: ["Groff v. DeJoy, 600 U.S. 447, 473 (2023)"],
    sources: [SRC_GROFF],
  },
  {
    number: 6,
    title: "Periodic review",
    rule:
      "Review granted and denied accommodations on a fixed cycle; log every decision. Changed business circumstances may change the substantial-cost analysis in either direction.",
    citations: ["EEOC Compliance Manual § 12-IV", "29 C.F.R. Part 1605"],
    sources: [SRC_EEOC_12, SRC_1605],
  },
]

/* ------------------------------------------------------------------ */
/* Section 6 — Public change log                                       */
/* ------------------------------------------------------------------ */

export const CHANGE_LOG: ChangeLogEntry[] = [
  {
    version: "v0.1",
    date: "July 13, 2026",
    instrument: "Module A Exposure Draft",
    change: "Initial public release for comment",
    nature: "—",
  },
]
