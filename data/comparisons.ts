// The Comparative Jurisprudence Lab — versioned public dataset.
// Version 2026.1 · Licensed CC BY 4.0.
//
// EDITORIAL RULE: No quotation or citation in this file is invented. The flagship
// comparison (Groff v. DeJoy) is fully populated with verbatim quotations and
// pinpoint citations from the official primary sources. Remaining seed cases are
// stubbed with their holdings and official source links, and are explicitly marked
// "comparison in preparation" until published on the 2026 calendar.

export type HumanRightsSystem = "inter-american" | "european" | "african" | "universal"

export type SourceLink = {
  label: string
  url: string
  officialDomain: string
  lastVerified: string // ISO date
}

export type SystemAnalysis = {
  system: HumanRightsSystem
  leadingAuthority: string
  citation: string
  test: string
  keyQuote: string
  quotePin: string
  sources: SourceLink[]
}

export type UsCase = {
  name: string
  citation: string
  year: number
  holding: string
  test: string
  keyQuote: string
  quotePin: string
  sources: SourceLink[]
}

export type Mandate = {
  instrument: string
  provision: string
  obligation: string
  boundParties: string
}

export type KeyConcept = {
  term: string
  definition: string
}

export type CitedPoint = {
  text: string
  citations: string
}

export type Comparison = {
  usCase: UsCase
  systems: SystemAnalysis[]
  mandates: Mandate[]
  keyConcepts: KeyConcept[]
  convergences: CitedPoint[]
  divergences: CitedPoint[]
}

export type SeedCase = {
  id: string
  name: string
  citation: string
  year: number
  holding: string
  // A populated `comparison` marks the case as published; otherwise it is "in preparation".
  comparison?: Comparison
  status: "published" | "in-preparation"
  sources: SourceLink[]
}

export const SYSTEM_META: Record<
  HumanRightsSystem,
  { label: string; short: string; instrument: string; body: string }
> = {
  "inter-american": {
    label: "Inter-American System",
    short: "IACtHR / IACHR",
    instrument: "American Convention on Human Rights, Art. 12",
    body: "Inter-American Court & Commission on Human Rights",
  },
  european: {
    label: "European System",
    short: "ECtHR",
    instrument: "European Convention on Human Rights, Art. 9",
    body: "European Court of Human Rights",
  },
  african: {
    label: "African System",
    short: "ACtHPR / ACHPR",
    instrument: "African Charter on Human and Peoples' Rights, Art. 8",
    body: "African Court & Commission on Human and Peoples' Rights",
  },
  universal: {
    label: "Universal System",
    short: "UN HRC · ICCPR Art. 18",
    instrument: "ICCPR Art. 18 + HRC General Comment No. 22",
    body: "UN Human Rights Committee · Special Rapporteur on FoRB",
  },
}

// ---------------------------------------------------------------------------
// FLAGSHIP COMPARISON — fully populated with verified primary sources
// Groff v. DeJoy (600 U.S. 447 (2023))
//   vs. Eweida and Others v. United Kingdom (ECtHR 2013)
//   vs. ICCPR Art. 18 / HRC General Comment No. 22
// ---------------------------------------------------------------------------

const GROFF_COMPARISON: Comparison = {
  usCase: {
    name: "Groff v. DeJoy",
    citation: "600 U.S. 447 (2023)",
    year: 2023,
    holding:
      "Title VII requires an employer denying a religious accommodation to show that the burden of granting it would result in substantial increased costs in relation to the conduct of its particular business. The Court clarified — but declined to overrule — its prior decision in Trans World Airlines, Inc. v. Hardison, rejecting the widely applied reading that any burden greater than a 'de minimis' cost sufficed to defeat an accommodation.",
    test: "\"Undue hardship\" under Title VII, 42 U.S.C. § 2000e(j), means a burden that is \"substantial in the overall context of an employer's business\" — a fact-specific inquiry considering the accommodation's practical impact in light of the employer's nature, size, and operating cost. The prior \"de minimis\" gloss is displaced.",
    keyQuote:
      "We hold that showing \"more than a de minimis cost,\" as that phrase is used in common parlance, does not suffice to establish \"undue hardship\" under Title VII. . . . [A]n employer must show that the burden of granting an accommodation would result in substantial increased costs in relation to the conduct of its particular business.",
    quotePin: "Groff v. DeJoy, 600 U.S. 447, 468, 470 (2023) (slip op., at 18, 20)",
    sources: [
      {
        label: "Groff v. DeJoy — Slip Opinion (No. 22-174)",
        url: "https://www.supremecourt.gov/opinions/22pdf/22-174_k536.pdf",
        officialDomain: "supremecourt.gov",
        lastVerified: "2026-01-08",
      },
      {
        label: "Groff v. DeJoy — Docket & Record",
        url: "https://www.courtlistener.com/docket/62796747/groff-v-dejoy/",
        officialDomain: "courtlistener.com",
        lastVerified: "2026-01-08",
      },
      {
        label: "Title VII — 42 U.S.C. § 2000e(j) (definition of religion)",
        url: "https://uscode.house.gov/view.xhtml?req=(title:42%20section:2000e%20edition:prelim)",
        officialDomain: "uscode.house.gov",
        lastVerified: "2026-01-08",
      },
    ],
  },
  systems: [
    {
      system: "european",
      leadingAuthority: "Eweida and Others v. the United Kingdom",
      citation:
        "ECtHR, Applications nos. 48420/10, 59842/10, 51671/10 and 36516/10, Judgment of 15 January 2013 (Fourth Section), final 27 May 2013",
      test:
        "Under Article 9 ECHR, a limitation on the manifestation of religion must be prescribed by law, pursue a legitimate aim, and be \"necessary in a democratic society\" — i.e. proportionate. The Court abandoned the earlier view that the ability to resign and find other work negated any interference; instead, that possibility is weighed within the overall proportionality balance, and a fair balance must be struck between the individual's rights and the interests of others.",
      keyQuote:
        "Given the importance in a democratic society of freedom of religion, the Court considers that, where an individual complains of a restriction on freedom of religion in the workplace, rather than holding that the possibility of changing job would negate any interference with the right, the better approach would be to weigh that possibility in the overall balance when considering whether or not the restriction was proportionate.",
      quotePin: "Eweida and Others v. United Kingdom, § 83 (15 Jan. 2013)",
      sources: [
        {
          label: "Eweida and Others v. UK — HUDOC Judgment (§ 83)",
          url: "https://hudoc.echr.coe.int/eng?i=001-115881",
          officialDomain: "hudoc.echr.coe.int",
          lastVerified: "2026-01-08",
        },
        {
          label: "European Convention on Human Rights — Article 9",
          url: "https://www.echr.coe.int/documents/d/echr/convention_ENG",
          officialDomain: "echr.coe.int",
          lastVerified: "2026-01-08",
        },
      ],
    },
    {
      system: "universal",
      leadingAuthority:
        "UN Human Rights Committee, General Comment No. 22 (Art. 18, ICCPR)",
      citation:
        "CCPR/C/21/Rev.1/Add.4 (30 July 1993); ICCPR Art. 18 (opened for signature 16 Dec. 1966, 999 UNTS 171)",
      test:
        "ICCPR Article 18 protects the freedom to manifest religion or belief, which may be limited only by limitations 'prescribed by law and . . . necessary to protect public safety, order, health, or morals or the fundamental rights and freedoms of others' (Art. 18(3)). General Comment No. 22 stresses that the internal freedom of thought, conscience and religion (the forum internum) admits of no limitation whatsoever, and that permissible restrictions on manifestation must be strictly construed and directly related and proportionate to the specific need.",
      keyQuote:
        "Article 18 distinguishes the freedom of thought, conscience, religion or belief from the freedom to manifest religion or belief. It does not permit any limitations whatsoever on the freedom of thought and conscience or on the freedom to have or adopt a religion or belief of one's choice. . . . Limitations may be applied only for those purposes for which they were prescribed and must be directly related and proportionate to the specific need on which they are predicated.",
      quotePin: "HRC General Comment No. 22, §§ 3, 8 (1993)",
      sources: [
        {
          label: "HRC General Comment No. 22 (Art. 18) — official record",
          url: "https://www.ohchr.org/en/resources/educators/human-rights-education-training/l-general-comment-no-22-article-18-freedom-thought-conscience-or-religion",
          officialDomain: "ohchr.org",
          lastVerified: "2026-01-08",
        },
        {
          label: "ICCPR Article 18 — UN Treaty text (undocs)",
          url: "https://undocs.org/A/RES/2200(XXI)",
          officialDomain: "undocs.org",
          lastVerified: "2026-01-08",
        },
        {
          label: "OHCHR jurisprudence database (juris.ohchr.org)",
          url: "https://juris.ohchr.org/search/results",
          officialDomain: "juris.ohchr.org",
          lastVerified: "2026-01-08",
        },
      ],
    },
  ],
  mandates: [
    {
      instrument: "Title VII, Civil Rights Act of 1964",
      provision: "42 U.S.C. § 2000e(j); § 2000e-2(a)",
      obligation:
        "Duty to reasonably accommodate an employee's religious observance or practice unless doing so imposes an undue hardship (post-Groff: substantial increased costs).",
      boundParties:
        "Covered employers (15+ employees), employment agencies, and labor organizations within the United States.",
    },
    {
      instrument: "European Convention on Human Rights",
      provision: "Article 9(1)–(2)",
      obligation:
        "Negative duty not to interfere with, and positive duty to secure, the freedom to manifest religion; limitations must be lawful, pursue a legitimate aim, and be proportionate.",
      boundParties:
        "The 46 Contracting States of the Council of Europe; enforceable against the State before the ECtHR.",
    },
    {
      instrument: "International Covenant on Civil and Political Rights",
      provision: "Article 18(1)–(3)",
      obligation:
        "Absolute protection of the forum internum; manifestation may be restricted only where prescribed by law and necessary and proportionate to an enumerated aim.",
      boundParties:
        "States parties to the ICCPR (173 as of the dataset date); supervised by the UN Human Rights Committee.",
    },
  ],
  keyConcepts: [
    {
      term: "Undue hardship (U.S.)",
      definition:
        "Under Title VII after Groff, a burden that is substantial in the overall context of the employer's business — assessed on the facts, in relation to the employer's nature, size, and operating cost. The prior 'more than de minimis' reading no longer suffices.",
    },
    {
      term: "Proportionality (European / Universal)",
      definition:
        "The requirement that any restriction on a manifestation of religion be suitable, necessary, and strike a fair balance between the individual right and the competing public or private interest. Central to Art. 9 ECHR and Art. 18(3) ICCPR analysis.",
    },
    {
      term: "Forum internum / forum externum",
      definition:
        "The inner freedom to hold or change a belief (forum internum), which is absolute and non-derogable, distinguished from the outward freedom to manifest belief in worship, observance, practice and teaching (forum externum), which may be subject to proportionate, lawful limits.",
    },
    {
      term: "Margin of appreciation",
      definition:
        "The latitude the ECtHR affords national authorities in assessing local conditions and balancing competing rights, subject to European supervision of whether the measure was justified in principle and proportionate.",
    },
    {
      term: "Reasonable accommodation",
      definition:
        "An adjustment to a workplace rule or practice that enables religious observance. Express and rule-based in U.S. statutory law; in the European and Universal systems it is generally addressed through the proportionality balance rather than a free-standing statutory duty.",
    },
  ],
  convergences: [
    {
      text: "Both frameworks reject the notion that the mere availability of an alternative (changing jobs, or absorbing a trivial cost) automatically defeats a religious claim; each demands a substantive, fact-specific weighing.",
      citations:
        "Groff v. DeJoy, 600 U.S. 447, 470–71 (2023); Eweida v. UK, § 83 (ECtHR 2013).",
    },
    {
      text: "Both treat the burden of justification as resting on the party imposing the restriction — the employer under Title VII, the State under Art. 9 ECHR and Art. 18(3) ICCPR.",
      citations:
        "Groff, 600 U.S. at 468–70; Eweida v. UK, §§ 84–85; HRC Gen. Comment No. 22, § 8.",
    },
    {
      text: "Both recognize protection of religious manifestation in the employment/public sphere as a serious interest that cannot be displaced by administrative convenience alone.",
      citations:
        "Groff, 600 U.S. at 470–72; Eweida v. UK, §§ 94–95; ICCPR Art. 18(1).",
    },
  ],
  divergences: [
    {
      text: "The U.S. standard is a statutory employer-accommodation duty enforced between private parties; the European and Universal standards are human-rights obligations that primarily bind the State, reaching private employment indirectly through positive obligations.",
      citations:
        "42 U.S.C. § 2000e(j); ECHR Art. 9; ICCPR Art. 18; Eweida v. UK, §§ 84, 91.",
    },
    {
      text: "U.S. doctrine frames the question as 'undue hardship / substantial increased cost' to the employer; the international systems frame it as 'proportionality' of a limitation to a legitimate aim, an analytically distinct calibration.",
      citations:
        "Groff, 600 U.S. at 468–70; Eweida v. UK, § 84; HRC Gen. Comment No. 22, § 8.",
    },
    {
      text: "The international systems expressly insulate the forum internum from any limitation, a categorical protection with no direct analogue in the Title VII accommodation inquiry, which is confined to workplace practice.",
      citations: "HRC Gen. Comment No. 22, § 3; ICCPR Art. 18(2); cf. Groff, 600 U.S. at 454–55.",
    },
  ],
}

// ---------------------------------------------------------------------------
// SEED CASES
// ---------------------------------------------------------------------------

export const SEED_CASES: SeedCase[] = [
  {
    id: "groff",
    name: "Groff v. DeJoy",
    citation: "600 U.S. 447 (2023)",
    year: 2023,
    holding:
      "Title VII 'undue hardship' requires a showing of substantial increased costs to the employer's business; the 'de minimis' gloss on Hardison is displaced.",
    status: "published",
    comparison: GROFF_COMPARISON,
    sources: [
      {
        label: "Groff v. DeJoy — Slip Opinion",
        url: "https://www.supremecourt.gov/opinions/22pdf/22-174_k536.pdf",
        officialDomain: "supremecourt.gov",
        lastVerified: "2026-01-08",
      },
    ],
  },
  {
    id: "kennedy",
    name: "Kennedy v. Bremerton School District",
    citation: "597 U.S. 507 (2022)",
    year: 2022,
    holding:
      "The Free Exercise and Free Speech Clauses protected a public-school football coach's brief, personal midfield prayer; the Establishment Clause is interpreted by reference to historical practices and understandings rather than the Lemon test.",
    status: "in-preparation",
    sources: [
      {
        label: "Kennedy v. Bremerton — Slip Opinion (No. 21-418)",
        url: "https://www.supremecourt.gov/opinions/21pdf/21-418_i425.pdf",
        officialDomain: "supremecourt.gov",
        lastVerified: "2026-01-08",
      },
      {
        label: "Kennedy v. Bremerton — Docket",
        url: "https://www.courtlistener.com/docket/16233886/kennedy-v-bremerton-school-district/",
        officialDomain: "courtlistener.com",
        lastVerified: "2026-01-08",
      },
    ],
  },
  {
    id: "fulton",
    name: "Fulton v. City of Philadelphia",
    citation: "593 U.S. 522 (2021)",
    year: 2021,
    holding:
      "A contractual non-discrimination requirement that permitted individualized exemptions was not generally applicable and, as applied to a religious foster-care agency, failed strict scrutiny under the Free Exercise Clause.",
    status: "in-preparation",
    sources: [
      {
        label: "Fulton v. City of Philadelphia — Slip Opinion (No. 19-123)",
        url: "https://www.supremecourt.gov/opinions/20pdf/19-123_g3bi.pdf",
        officialDomain: "supremecourt.gov",
        lastVerified: "2026-01-08",
      },
      {
        label: "Fulton v. City of Philadelphia — Docket",
        url: "https://www.courtlistener.com/docket/16267825/fulton-v-city-of-philadelphia/",
        officialDomain: "courtlistener.com",
        lastVerified: "2026-01-08",
      },
    ],
  },
  {
    id: "holt",
    name: "Holt v. Hobbs",
    citation: "574 U.S. 352 (2015)",
    year: 2015,
    holding:
      "Under the Religious Land Use and Institutionalized Persons Act (RLUIPA), a prison grooming policy that barred a Muslim inmate from growing a half-inch beard substantially burdened his exercise of religion and was not the least restrictive means of furthering the asserted security interests.",
    status: "in-preparation",
    sources: [
      {
        label: "Holt v. Hobbs — Slip Opinion (No. 13-6827)",
        url: "https://www.supremecourt.gov/opinions/14pdf/13-6827_5h26.pdf",
        officialDomain: "supremecourt.gov",
        lastVerified: "2026-01-08",
      },
      {
        label: "Holt v. Hobbs — Docket",
        url: "https://www.courtlistener.com/docket/2778150/holt-v-hobbs/",
        officialDomain: "courtlistener.com",
        lastVerified: "2026-01-08",
      },
    ],
  },
  {
    id: "lukumi",
    name: "Church of the Lukumi Babalu Aye v. City of Hialeah",
    citation: "508 U.S. 520 (1993)",
    year: 1993,
    holding:
      "Municipal ordinances targeting Santería animal sacrifice were neither neutral nor generally applicable; because they were directed at religiously motivated conduct, they were subject to and failed strict scrutiny.",
    status: "in-preparation",
    sources: [
      {
        label: "Church of the Lukumi Babalu Aye v. Hialeah — Opinion",
        url: "https://www.courtlistener.com/opinion/112891/church-of-lukumi-babalu-aye-inc-v-hialeah/",
        officialDomain: "courtlistener.com",
        lastVerified: "2026-01-08",
      },
    ],
  },
  {
    id: "smith",
    name: "Employment Division v. Smith",
    citation: "494 U.S. 872 (1990)",
    year: 1990,
    holding:
      "The Free Exercise Clause does not relieve an individual of the obligation to comply with a neutral law of general applicability; a State may deny unemployment benefits to persons dismissed for sacramental peyote use in violation of a generally applicable criminal law.",
    status: "in-preparation",
    sources: [
      {
        label: "Employment Division v. Smith — Opinion",
        url: "https://www.courtlistener.com/opinion/112404/employment-div-dept-of-human-resources-of-ore-v-smith/",
        officialDomain: "courtlistener.com",
        lastVerified: "2026-01-08",
      },
    ],
  },
  {
    id: "303creative",
    name: "303 Creative LLC v. Elenis",
    citation: "600 U.S. 570 (2023)",
    year: 2023,
    holding:
      "The Free Speech Clause bars a State from compelling a website designer to create expressive works — custom wedding websites — that conflict with her sincerely held beliefs, even under a public-accommodations anti-discrimination law.",
    status: "in-preparation",
    sources: [
      {
        label: "303 Creative LLC v. Elenis — Slip Opinion (No. 21-476)",
        url: "https://www.supremecourt.gov/opinions/22pdf/21-476_c185.pdf",
        officialDomain: "supremecourt.gov",
        lastVerified: "2026-01-08",
      },
      {
        label: "303 Creative LLC v. Elenis — Docket",
        url: "https://www.courtlistener.com/docket/59948921/303-creative-llc-v-elenis/",
        officialDomain: "courtlistener.com",
        lastVerified: "2026-01-08",
      },
    ],
  },
]

export const DATASET_VERSION = "2026.1"
export const DATASET_UPDATED = "2026-01-08"

export function getCaseById(id: string | null | undefined): SeedCase | undefined {
  if (!id) return undefined
  return SEED_CASES.find((c) => c.id === id)
}
