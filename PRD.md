# PRD — AI Study Roadmap Planner (Working Title: "Pathwise")

## 1. Project Summary

Pathwise helps anyone learn a new technology or skill by generating a **personalized, time-boxed learning roadmap**. Instead of a generic "Learn X" checklist, the AI has a short conversation to understand the learner's starting point, timeline, and daily availability — then produces a detailed, week-by-week plan.

Example flow (from your spec):
> AI: "Which technologies do you already know?"
> User: "React, HTML, JS, Tailwind"
> AI: "How much time do you want to spend learning this overall?"
> User: "About 2 months"
> AI: "How many hours per day can you commit?"
> User: "2 hours"
> AI: → generates a detailed 2-month, 2-hr/day roadmap for learning Next.js, building on the user's existing React/HTML/JS/Tailwind knowledge.

This combines a standard listing/marketplace-style app (roadmaps as the "item") with two agentic AI features:

1. **AI Chat Assistant** — multi-turn conversation that gathers the learner's known skills, target timeframe, and daily hours (via follow-up reasoning, one question at a time, remembering prior answers) before generating anything.
2. **AI Content Generator** — takes the gathered inputs (or a direct structured form) and produces a detailed, structured roadmap: weekly milestones, daily/weekly hour allocation, topics in order, and suggested resources. Supports adjustable detail level and "Regenerate."

> In practice these two features share one underlying generation engine — the Chat Assistant is the conversational *front door* that collects structured inputs before calling the same generator used by the standalone form.

---

## 2. Assumptions (please confirm/correct before build starts)

- **Architecture:** Next.js full-stack app — API Routes / Route Handlers as backend, MongoDB via Mongoose. (No separate Express service unless you say otherwise.)
- **LLM Provider:** Left as a config choice (OpenAI / Gemini / Groq / Claude etc. via `AI_PROVIDER` env var + adapter pattern) — swappable without touching feature code.
- **Trusted company/platform names:** Placeholder-but-real-sounding names for the "Trusted By" section (swap for real logos later): `CodeAcademy Labs`, `DevMentor`, `SkillForge`, `Learnly`, `TechPath Pro`, `Upskill Hub`.
- **"Roadmap" is the core listing item** — a public library of pre-generated/curated roadmaps (e.g. "Learn Next.js", "Learn Python for Data Science") that anyone can browse, plus the ability for logged-in users to generate and save their own personalized version via the AI.

---

## 3. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Animation | Framer Motion |
| Auth | BetterAuth (email/password + Google OAuth) |
| Database | MongoDB + Mongoose |
| Data Fetching / Cache | TanStack Query |
| Charts (progress/time-allocation visuals) | Recharts |
| AI | LLM provider via server-side adapter (OpenAI/Gemini/Groq — configurable) |
| Deployment | Vercel (frontend/API) + MongoDB Atlas |

---

## 4. Design System

### 4.1 Color Palette — Light & Dark Theme Tokens (authoritative — do not substitute or invent colors)

The palette is a warm "paper and espresso" theme. Both modes reuse the same 4 hex values — only their **role** flips between modes. These are the only colors allowed anywhere in the UI (max 3 primary + 1 neutral, per project rules). If a component needs a color not listed here, reuse one of these tokens — don't introduce a new hex value or let a default shadcn/Tailwind color slip through.

**Light theme (`:root` / default)**

| Token | Hex | Role |
|---|---|---|
| `--color-bg` | `#FFFFFF` | Page background,Navbar, footer,cards, |
| `--color-surface` | `#E1DCC9` | Cards, section backgrounds, secondary surfaces |
| `--color-accent` | `#412D19` | Buttons, links, active states, AI highlights, progress bars |
| `--color-dark` | `#1F150C` | headings |
| `--color-text` | `#000000` | Body text |

**Dark theme (`.dark`)**

| Token | Hex | Role |
|---|---|---|
| `--color-bg` | `#000000` | Page background |
| `--color-surface` | `#1F150C` | Cards, section backgrounds, secondary surfaces |
| `--color-accent` | `#E1DCC9` | Buttons, links, active states, AI highlights, progress bars |
| `--color-dark` | `#412D15` | Navbar, footer, headings |
| `--color-text` | `#E1DCC9` | Body text |

**Why the roles flip instead of reusing the same hex per token:** `#412D15` (brown) reads clearly as an accent against white/cream but disappears against black, so on dark mode the accent role moves to `#E1DCC9` (cream) instead, and `#412D15` shifts to the structural/dark-surface role. The 4 hex values never change — only which token they're assigned to.

**Implementation instructions for the coding agent:**
1. Define these as CSS custom properties in `globals.css` under `:root` and `.dark` exactly as tabled above — do not hardcode hex values in components, always reference the token (e.g. `bg-[var(--color-accent)]` or map them into `tailwind.config` theme colors as `bg-accent`).
2. Use `next-themes` (or shadcn's theme provider) for the light/dark toggle — do not build a custom theme switcher from scratch.
3. Every component (navbar, cards, buttons, chat bubbles, footer) must pull colors from these 5 tokens only. If a generated component uses a Tailwind default (e.g. `bg-gray-100`, `text-blue-600`) instead of a token, that's a bug — replace it.
4. Verify contrast in **both** modes before marking a screen done: `#000000` on `#FFFFFF`/`#E1DCC9` (light) and `#E1DCC9` on `#000000`/`#1F150C` (dark) must meet WCAG AA.
5. Consistent border-radius (`rounded-xl`, 12px) and shadow scale via shared Tailwind + shadcn theme tokens — no one-off styles, in either mode.

### 4.2 Typography
- One heading font, one body font (e.g., `Inter` or `Geist`), defined once in `globals.css` / Tailwind config.

### 4.3 Motion (Framer Motion)
- Page transitions: fade + slight upward slide (150–250ms).
- Hero: staggered entrance for headline, subtext, CTA, and a mock chat preview.
- Cards: hover lift (`y: -4`, shadow increase).
- AI Chat: message bubbles animate in on arrival; typing indicator uses animated dots; each new AI question appears as a distinct step (subtle progress indicator: "Step 2 of 3").

---

## 5. Site Map

| Route | Access | Purpose |
|---|---|---|
| `/` | Public | Landing page |
| `/explore` | Public | Roadmap listing/search/filter |
| `/roadmaps/[id]` | Public | Roadmap details |
| `/login`, `/register` | Public (redirect if logged in) | Auth |
| `/items/add` | Protected | Add/publish a roadmap |
| `/items/manage` | Protected | Manage own roadmaps |
| `/assistant` | Protected | AI Chat Assistant (conversational planner) |
| `/generate` | Protected | AI Content Generator (structured form) |
| `/about` | Public | About page |
| `/help` | Public | Help / Support (FAQ deep-link) |
| `/profile` | Protected | User profile/settings, saved roadmaps |

---

## 6. Landing Page

### 6.1 Navbar
- Full-width, sticky/fixed, background `--color-surface`.
- **Logged out:** Brand logo/name, `Explore`, `About`, `Help`, → `Login` / `Sign Up` buttons.
- **Logged in:** Brand logo/name, `Explore`, `Assistant`, `Generate`, `My Roadmaps`, → **User avatar dropdown** (Profile, Manage Roadmaps, Saved, Logout).
- Mobile: collapses into a shadcn `Sheet`/drawer.

### 6.2 Hero Section (SaaS style)
- Height: 60–70vh.
- Left: headline (e.g., "Learn anything, on your schedule") + subheadline + primary CTA (`Start with the AI Assistant`) + secondary CTA (`Browse Roadmaps`).
- Right: interactive visual — an animated mock conversation preview showing the exact 3-question flow (known skills → timeframe → hours/day → roadmap), built with Framer Motion staggered bubbles.
- Scroll-cue element at bottom of hero, animated, leading into the next section.

### 6.3 Sections (7 required — below the hero)
1. **How It Works** — 3-step visual (Answer 3 quick questions → AI builds your roadmap → Track your progress week by week).
2. **Trusted By** — logo strip: `CodeAcademy Labs`, `DevMentor`, `SkillForge`, `Learnly`, `TechPath Pro`, `Upskill Hub` (placeholder text now, swappable for real logos).
3. **Pricing** — Free / Pro / Team tiers, consistent card sizing, one highlighted "Most Popular" plan, CTA on each.
4. **Testimonials / Reviews** — learner quotes with name, avatar, rating (shadcn `Card` + `Avatar`), carousel on mobile.
5. **FAQ** — shadcn `Accordion`, 5–7 real Q&As (e.g., "Can I edit my roadmap after it's generated?", "Does it account for skills I already know?").
6. **Newsletter** — single email input + subscribe button, success/error state, stored to `newsletter_subscribers`.
7. **Contact Us** — short form (name, email, message) + static contact info (email, social icons), submits to a simple API route.

### 6.4 Footer (minimalistic — requirements)
- Single row (desktop) / stacked (mobile), background `--color-bg`, muted text on neutral.
- Contents: Brand mark + 1-line tagline · 3–4 working nav links (Explore, About, Help, Privacy/Terms) · Social icons (linked) · Contact email · Copyright line.
- No extra columns, no filler content — minimal by design.

---

## 7. Core Listing / Card Section (Roadmap Cards)

Each `RoadmapCard` includes:
- Image/icon (tech logo or category illustration)
- Title (e.g., "Learn Next.js from React")
- Short description (1–2 lines, truncated)
- Meta row: duration (e.g., "8 weeks"), difficulty, category/skill, rating
- `View Details` button

Rules:
- Identical height/width, identical border-radius/shadow across all cards.
- Desktop: 4 cards per row (`grid-cols-4`), responsive down to 2/1 on tablet/mobile.
- shadcn `Skeleton` loader shown while TanStack Query fetches.

---

## 8. Roadmap Details Page (`/roadmaps/[id]`)
- Publicly accessible.
- Header image/banner (tech/skill themed).
- Sections:
  - **Overview** — what you'll learn, prerequisites assumed.
  - **Key Info / Specifications** — total duration, hours/week, difficulty, prerequisite skills.
  - **Week-by-Week Breakdown** — expandable accordion per week: topics, goals, suggested resources/links, estimated hours.
  - **Reviews/Ratings** — star rating + comment list from learners who used it.
  - **Related Roadmaps** — same category/skill.
- Logged-in users can **"Save to My Roadmaps"** to track progress.

---

## 9. Explore Page (`/explore`)
- Search bar (skill/technology/keyword text search).
- Filters (≥2 fields): **Category** (frontend/backend/data/design/etc.) and **Difficulty** (beginner/intermediate/advanced) — optionally also duration range.
- Sorting: newest, most popular, rating, duration (shortest–longest).
- Pagination (or infinite scroll) via TanStack Query.

---

## 10. Authentication (BetterAuth)
- `/login` and `/register` — validated forms (react-hook-form + zod), inline error states.
- **Demo login button** — auto-fills a seeded demo account's credentials and submits.
- **Google social login** — required, via BetterAuth's OAuth provider.
- Clean shadcn `Card`-based auth forms, consistent with the color system.

---

## 11. Protected Page: Add Roadmap (`/items/add`)
- Redirects to `/login` if unauthenticated.
- Fields: Title, Short description, Full description/week-by-week plan, Duration / difficulty / category (the "relevant fields"), optional Image URL.
- Submit button publishes the roadmap; option to **"Generate with AI first"**, which routes through the Content Generator to prefill fields before manual edits/submission.

## 12. Protected Page: Manage Roadmaps (`/items/manage`)
- Table/grid of the logged-in user's published and/or saved roadmaps.
- Actions per row: **View**, **Delete**.
- Responsive: table on desktop, stacked cards on mobile.

---

## 13. Additional Pages
- **About** — mission, story.
- **Help / Support** — FAQ (expanded) + support contact.

---

## 14. AI Features (Agentic)

### 14.1 AI Chat Assistant (`/assistant`)
- Conversational UI (shadcn + Framer Motion message bubbles), streaming responses.
- **Context-aware, slot-filling conversation** — the assistant asks one question at a time and remembers every prior answer within the session (persisted per user in MongoDB):
  1. "Which technologies/skills do you already know?"
  2. "How much time do you want to spend learning this overall?" (e.g., 2 months)
  3. "How many hours per day/week can you commit?" (e.g., 2 hours)
  - It may ask **additional clarifying follow-ups** if answers are ambiguous (e.g., "By 'React' do you mean hooks and context, or just the basics?").
- **Agentic behavior:** once enough info is gathered, the assistant doesn't just chat — it **invokes the roadmap-generation logic** (same engine as 14.2) using the collected slots, and returns the full structured roadmap inline in the chat, tailored to skip topics the user already knows.
- Suggested follow-up prompt chips after the roadmap is delivered (e.g., "Make it more intense", "Add project ideas", "Extend by 2 weeks").
- Typing indicator while generating; conversation history is viewable/resumable.

### 14.2 AI Content Generator (`/generate`)
- Structured input form (for users who prefer not to chat): target skill/technology, known technologies (multi-select/tags), duration, hours per day, desired **output detail level** (concise/standard/detailed — adjustable).
- Custom prompt template assembled server-side from structured inputs.
- Output: a full structured roadmap — week-by-week breakdown, topics in learning order, estimated hours per topic, and suggested resource types (docs/videos/projects).
- **Regenerate** button — re-runs generation with the same inputs, producing a variation (e.g., different pacing or resource suggestions).
- "Save this roadmap" → publishes to `/items/manage` / prefills `/items/add`.

---

## 15. Data Models (MongoDB, high level)

- `User` (BetterAuth-managed + profile fields + known-skills history)
- `Roadmap` { title, shortDescription, fullDescription, category, difficulty, durationWeeks, hoursPerWeek, weeks: [{ weekNumber, topics, goals, resources, estHours }], imageUrl, authorId, isAIGenerated, ratingAvg, createdAt }
- `Review` { roadmapId, userId, rating, comment, createdAt }
- `ChatSession` { userId, messages: [{ role, content, createdAt }], collectedSlots: { knownSkills, targetSkill, duration, hoursPerDay } }
- `SavedRoadmap` { userId, roadmapId, progress: [{ weekNumber, completed }], savedAt } — supports progress tracking
- `NewsletterSubscriber` { email, subscribedAt }
- `ContactMessage` { name, email, message, createdAt }

---

## 16. Non-Functional Requirements
- Fully responsive (mobile/tablet/desktop) across every page.
- No placeholder/lorem-ipsum content anywhere — all copy is real and contextual.
- All buttons/links functional (no dead links, including footer/nav).
- Skeleton loaders on all async data fetches.
- Accessible color contrast maintained in **both** light and dark theme (see §4.1 token tables and contrast rule) — WCAG AA minimum in each mode.
- Theme toggle (light/dark) persists across sessions (`next-themes` with `localStorage`/cookie) and defaults to system preference on first visit.

---

## 17. Open Questions / To Confirm
1. Confirm Next.js full-stack (API routes) vs. separate Express backend.
2. Pick the LLM provider to lock in the adapter/config.
3. Confirm real names for the "Trusted By" section once available (logos to follow).
4. Confirm pricing tier names/prices for the Pricing section (currently placeholder-structure only).
5. Should progress tracking (checking off completed weeks) be in scope for v1, or is roadmap generation + save the full scope?

---

## 18. Submission Deliverables
- Live deployed URL
- GitHub repository link
- This PRD kept in repo root as `PRD.md` for reference during grading/review