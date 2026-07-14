export type ProgramStatus =
  | "In development"
  | "Forthcoming"
  | "Phase II"
  | "Open access · v1 releases Q1 2027"
  | "Vol. 1 forthcoming"

export interface ProgramDeliverable {
  title: string
  detail: string
  status: ProgramStatus
}

export interface Program {
  slug: string
  numeral: "I" | "II" | "III"
  discipline: "Jurisprudence" | "Policy" | "Data"
  name: string
  shortName: string
  mission: string
  deliverables: ProgramDeliverable[]
  note: string
  publicationStatus?: string
}

export const PROGRAMS: Program[] = [
  {
    slug: "comparative-jurisprudence-lab",
    numeral: "I",
    discipline: "Jurisprudence",
    name: "The Comparative Jurisprudence Lab",
    shortName: "Jurisprudence Lab",
    mission:
      "A free, publicly accessible platform consolidating the law of religious liberty in the United States — Supreme Court and federal appellate doctrine, the constitutional and statutory protections of the fifty states, and Title VII with its interpretive materials — together with rigorously sourced documentation of the religious practices that recur in American litigation and workplace administration. Every user, from judicial chambers to a member of the public, consults the identical resource.",
    deliverables: [
      {
        title: "Consolidated doctrinal repository",
        detail: "the governing federal and state framework, continuously maintained",
        status: "In development",
      },
      {
        title: "Fifty-state survey",
        detail: "of state constitutional and statutory religious-liberty standards",
        status: "In development",
      },
      {
        title: "Religious-practice documentation library",
        detail: "sourced, verified context for practices courts and employers encounter",
        status: "In development",
      },
      {
        title: "Research interface",
        detail:
          "closed-corpus retrieval design: verified sources only, pinpoint citations, abstention where documentary support is insufficient",
        status: "Phase II",
      },
    ],
    note: "The Lab's comparative dimension is deliberately bounded: U.S. constitutional and statutory authority is the exclusive governing framework for U.S. users; foreign and international materials appear solely as contextual and scholarly resources, consistent with their status in U.S. adjudication.",
  },
  {
    slug: "open-governance-frameworks",
    numeral: "II",
    discipline: "Policy",
    name: "Open Governance Frameworks for Religious Pluralism",
    shortName: "Governance Frameworks",
    mission:
      "Standardized, openly licensed governance instruments — model policies, implementation guides, and a replicable structured-dialogue protocol — that any public agency, employer, school system, or healthcare institution can adopt directly, at no cost, without any engagement with the Institute. The instrument is the deliverable; adoption requires nothing from us.",
    deliverables: [
      {
        title: "Model Policy Library & implementation guides",
        detail: "annotated to controlling federal and state authority",
        status: "Forthcoming",
      },
      {
        title: "Replicable Structured-Dialogue Protocol",
        detail:
          "facilitation guides, stakeholder-mapping tools, and training materials for independent implementation nationwide",
        status: "Forthcoming",
      },
      {
        title: "Compliance training modules",
        detail: "published under open license for adoption by any institution",
        status: "Forthcoming",
      },
      {
        title: "Social-Impact Measurement Series",
        detail:
          "peer-review-oriented research extending established congregational-impact methodologies, with published replication files",
        status: "Forthcoming",
      },
    ],
    note: "Precedent shows instruments of this class achieve national adoption: federal religious-expression guidance certified annually by every school district; model codes drafted by nonprofit institutions and enacted by state legislatures; voluntary open frameworks adopted across sectors without any mandate.",
  },
  {
    slug: "religious-freedom-risk-monitor",
    numeral: "III",
    discipline: "Data",
    name: "The Global Religious-Freedom Risk Monitor",
    shortName: "Risk Monitor",
    mission:
      "A standardized, published research series documenting where goods, inputs, and investment flows intersect with state-directed religious persecution — organized by the U.S. State Department's own Country of Particular Concern designations, so the research agenda tracks the federal government's stated priorities. Every edition is identical for every reader, on a fixed annual calendar.",
    deliverables: [
      {
        title: "Annual Country Risk Volumes",
        detail: "for each CPC-designated state, with full evidentiary annexes",
        status: "Vol. 1 forthcoming",
      },
      {
        title: "Sector Exposure Briefs",
        detail: "aligned to the federal Forced Labor Enforcement Task Force's published high-priority sectors",
        status: "Forthcoming",
      },
      {
        title: "Open Dataset & Methodology",
        detail:
          "persecution-exposure indicators, documentation standards, and replication files, released without charge to enforcement agencies, importers, investors, researchers, and journalists",
        status: "Open access · v1 releases Q1 2027",
      },
    ],
    note: "The Monitor is also the Institute's earned-revenue instrument, on the established nonprofit publishing model: the open-access core is free; institutional subscribers receive the full analytical volumes at published, uniform rates. All revenue is reinvested in the Institute's programs.",
    publicationStatus: "Publication calendar · First releases 2027",
  },
]

export function getProgram(slug: string): Program | undefined {
  return PROGRAMS.find((p) => p.slug === slug)
}
