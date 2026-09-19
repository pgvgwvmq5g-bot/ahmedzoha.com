# Website alignment with IET Fellowship application

**Source:** Fellowship Application — AZ Draft V1 (September 2026)  
**Branch:** `cursor/align-website-fellowship-8b32`  
**Purpose:** Make the public site match the Fellowship application so a reviewer sees no discrepancy in numbers, titles, funding, or career record.

This report is for later review. It lists what was wrong, what was changed, what was added, and what was left as-is on purpose.

---

## Title convention

Official UK title is **Senior Lecturer**. The international equivalent is shown in brackets:

**Senior Lecturer (Associate Professor)**

Used on:

- Sidebar
- Homepage timeline
- About heading and appointment
- FLAIR director card
- MIMER team card (Dr Ahmed Zoha only)
- Schema.org `jobTitle`

Collaborators who are Associate Professors (for example Dr Ali Javed) were not changed.

---

## Canonical figures (from the application)

| Item | Application | Website before | Website now |
|---|---|---|---|
| Publications | 132 (16 first-author, 49 senior, 67 co-authored) | 150+ | 132 |
| Citations | 5,450 (Google Scholar, Sep 2026) | 5,200+ | 5,450 |
| h-index | 32 | 30 (homepage), 29 (impact) | 32 |
| Competitive external funding | £2.2M (£433,446 PI; £1.76M Co-I) | £3.5M+ | £2.2M |
| EPSRC MIMER | £176,517 (2024–2026) | £200,000 / £200K | £176,517 |
| Innovate UK KTP with AWTG | £238,757 (£159,968 grant + £78,789 company; 2025–2028) | £300K; 2025–2027 | £238,757; 2025–2028 |
| Scotland 5G Centre (Co-I) | £1.6M | £1.62M on About | £1.6M |
| DCMS 5G New Thinking (Co-I share) | £159,411 | £160K About; £4.3M shown as his funding on the project page | £159,411 Co-I share; £4.3M kept as consortium total |
| PhD completions | 11 | 13 | 11 |
| Current supervision | 5 principal, 4 second; 2 postdocs, 6 RAs | “23+ researchers”, “£400K+ annual portfolio” | Matches application wording |
| Top 10% journals (CiteScore) | 62% | 55% / 58% | 62% |
| Top 10% most-cited worldwide | one in five (20%) | 30% | 20% |
| Patent documents citing the research | 68 (Lens.org, Sep 2026) | 33 | 68 |
| TIHM operational scale | 200+ homes, 650+ people | 1,000+ patients; 2,000+ users on the TIHM project page | 200+ homes / 650+ people |
| InfraMesh | Founding shareholder (Nov 2025), director (Jan 2026); £320,000 seed led by AI Seed; Supermeter prototype | CTO; £250K | Founding shareholder and director; £320K seed |
| EAI honour | Distinguished Member (top 0.5%, 2022) | Distinguished Fellow | Distinguished Member |
| Job title | Senior Lecturer | Associate Professor / Professor of Distributed AI | Senior Lecturer (Associate Professor) |

---

## Page-by-page changes

### Homepage (`src/pages/index.astro`)
- Career highlights: 5,450 / 132 / 32 / £2.2M
- Timeline: Senior Lecturer (Associate Professor); EAI Distinguished Member; Teaching Excellence Award 2026 (replaced Fellow RET)
- TIHM cards: 200+ homes / 650+ people
- PECN/energy card: 2,000-occupant campus building
- LEAP description: Aruva platform

### About (`src/pages/about.astro`)
- Heading: Senior Lecturer (Associate Professor) in Distributed AI
- Bio uses 5,450 citations, £2.2M, 132 publications, 11 PhD completions
- Impact cards: authorship split, 62% CiteScore, 68 patents, InfraMesh £320K, EAI Distinguished Member, two IEEE Best Paper Awards named
- Appointments added:
  - Knowledge Exchange Associate (5G and Beyond), 2018–2019
  - Visiting Assistant Professor, Bahria University, 2016
- QMIC role wording: Principal Researcher on the $1.45M QNRF programme (not PI of that full award)
- Funded programmes: LEAP £238,757 (2025–2028); MIMER £176,517; Scotland 5G £1.6M; 5G New Thinking £159,411
- Intro under funded programmes states the £2.2M PI/Co-I split and two SFC Global Challenges awards
- TIHM card labelled as programme contribution, not personal grant total
- Education: BEng (Hons) Distinction, Air University, 2006; MSc year corrected to 2010; PGCAP Distinction
- Conference/examining: PIMRC 2024 6G workshop TPC Chair; keynotes; 2026 deepfakes roundtable; external examiner at nine institutions in five countries; New College Durham 2026; NCSTE Kyrgyzstan as grant reviewer

### Research (`src/pages/research.astro`)
- Footprint stats updated to 132 / authorship / 20% most-cited / 62% journals / 5,450 citations / 68 patents
- Overview: 11 PhDs graduated
- Citations tab: 5,450 and h-index 32
- New dataset cards: VeriVoice-V1 and iRAW

### New dataset pages
- `/datasets/verivoice-v1/` — bilingual Urdu–English corpus, IEEE DataPort 2026, STech.ai
- `/datasets/iraw/` — 3,203 RAW images from 20 smartphone sensors, IEEE DataPort August 2026

### Projects
- **Projects index:** MIMER years 2024–2026; LEAP 2025–2028 and Aruva; TIHM 200+ homes / 650+ people
- **LEAP:** £238,757; 2025–2028; grant/company split; Aruva / Smart Syllabus; UK IPO trademark May 2026; Nokia Saudi and Kingston University pilots
- **MIMER:** £176,517; iRAW release added to project updates
- **5G New Thinking:** Co-I share £159,411; consortium total still £4.3M
- **Scotland 5G Centre:** PECN in a 2,000-occupant campus building, shown at COP26
- **TIHM:** 200+ homes / 650+ people; House of Lords INQ0017; programme total labelled as such

### Impact
- Teaching Excellence Award 2026 added at the top of awards
- Top-scientist page: 5,450 / 32 / 132
- NHS dementia: 200+ homes / 650+ people; House of Lords INQ0017
- Energy assisted living: 2,000-occupant campus PECN
- Global collaboration: 68 patent documents; nine institutions in five countries

### FLAIR, sidebar, layout
- Director title: Senior Lecturer (Associate Professor)
- Sidebar: Senior Lecturer (Associate Professor)
- Schema.org job title and description updated

---

## Intentionally not changed

- **Other people’s titles and metrics** (Dr Ali Javed, Prof Muhammad Haroon Yousaf, and similar)
- **TIHM / QSON / 5G New Thinking consortium programme values** where they are labelled as programme or consortium totals, not as Dr Zoha’s personal award
- **COVID-era SABP expansion to 1,000+ individuals** on the NHS dementia impact story — the application’s operational figure is 200+ homes / 650+ people; the later SABP expansion is a separate fact
- **i10-index, media-feature counts, Q1/Q2 80%** where the application does not give a replacement figure
- **Blog posts, news items, and WordPress content**
- **Internal audit markdown** (`AUDIT_REPORT.md` and similar) — not public pages

---

## Files touched

- `src/pages/index.astro`
- `src/pages/about.astro`
- `src/pages/research.astro`
- `src/pages/projects.astro`
- `src/pages/projects/leap.astro`
- `src/pages/projects/mimer.astro`
- `src/pages/projects/5g-new-thinking.astro`
- `src/pages/projects/scotland-5g-centre.astro`
- `src/pages/projects/tihm-healthcare.astro`
- `src/pages/impact.astro`
- `src/pages/impact/top-scientist-recognition.astro`
- `src/pages/impact/nhs-dementia-care.astro`
- `src/pages/impact/energy-assisted-living.astro`
- `src/pages/impact/global-collaboration.astro`
- `src/pages/flair.astro`
- `src/pages/datasets/verivoice-v1.astro` (new)
- `src/pages/datasets/iraw.astro` (new)
- `src/components/Sidebar.astro`
- `src/layouts/BaseLayout.astro`
- `FELLOWSHIP_ALIGNMENT_REPORT.md` (this file)

---

## How to review

1. Open the draft PR and this file side by side.
2. Check the homepage stats strip and sidebar title first.
3. Check About → funded programmes and appointments.
4. Check Research → footprint and the two new dataset pages.
5. Check LEAP for Aruva and the £238,757 split.
6. Flag anything that should still use a consortium total, a dual title, or a different public wording.
