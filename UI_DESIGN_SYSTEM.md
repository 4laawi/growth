# RoGrowth.ro — Locked-In UI Design System, Minimalist Vision & AI Rules

> **CRITICAL INSTRUCTION FOR AI AGENTS IN ALL FUTURE CONVERSATIONS**:
> Before creating or modifying any section or page (such as `/creare-siteweb`, `/magazin-online`, `/optimizare-seo`, `/promovare-google-ads`, or `/`), you **MUST** read and obey this constitution, use the tokens in `/src/design-system/tokens.ts`, and compose the primitives in `/src/components/ui/StudioPrimitives.tsx` and `/src/components/ui/arc-card-carousel.tsx`.
> **NEVER** invent a cluttered layout, never pile badges/overlays onto showcase imagery, and never violate the **Anti-Clutter & Radical Minimalism Mandate** in Section 1 below.

---

## 1. The Anti-Clutter & Radical Minimalism Mandate (NON-NEGOTIABLE AI RULES)

Every new section we build must match the calm, modern, high-craft minimalism established by the `<ArcCardCarousel />` showcase on `/creare-site-web`:

1. **Pure White Space Over Background Noise**:
   - Interactive showcase sections, scroll-driven galleries (`<ArcCardCarousel />`), and editorial statements must sit on **pure `#FFFFFF` white space** (`bg-white`), with **zero background grids**, zero noisy containers, and **at least 40%+ open whitespace**.
   - `.bg-onlines-grid` is strictly reserved for the top Hero section (`Block 01`). Never repeat `.bg-onlines-grid` on mid-page sections.
   - Do not precede self-explanatory interactive sections (like `<ArcCardCarousel />`) with heavy multi-line section headers, extra sub-links, or redundant intros. Let the interactive canvas breathe on its own.

2. **Unencumbered Imagery & Generous Spatial Separation**:
   - Visual cards inside carousels and scroll wheels (`<ArcCardCarousel />`) must be **100% pure, unencumbered images** (`border-radius: 12px`, soft studio shadow `0 1px 3px rgba(0,0,0,.05), 0 18px 40px -12px rgba(0,0,0,.22)`).
   - **STRICTLY FORBIDDEN ON SHOWCASE CARDS**:
     - No fake browser window top bars or traffic-light dots on wheel/carousel images.
     - No dark gradient bottom overlays, text labels, or price tags on top of the image.
     - No glowing colored borders (`border-[#0D5FF9]`) around active image cards.
   - **Mandatory Space Between Images**: Never let adjacent cards crowd or overlap each other. In `<ArcCardCarousel />`, always keep `step={19}` (or higher) and `cardW = 0.285 * u` so there is a clean, airy gap of white space between every image on the arc.

3. **Strict 3-Element Cap for Focal Text Columns**:
   - When pairing an interactive visual showcase with a text column (such as `.acc-cap` in `<ArcCardCarousel />`), display **ONLY 3 elements**:
     1. **Minimal Index**: Subtle tabular counter (`01 / 08`, `13px`, `#8a8f98`, `font-weight: 500`, `tabular-nums`).
     2. **Editorial Display Title**: Large, airy, modern heading (`clamp(34px, 5vw, 76px)`, `line-height: 0.98`, `letter-spacing: -0.035em`, `font-weight: 500`, `#141517`).
     3. **Single Meta Line**: One concise line below the title (`15px`, `#6b7280`, e.g., `Calendar Rezervări · Flotă Auto RO/EN · €700 – €1.200`).
   - **STRICTLY FORBIDDEN IN FOCAL SHOWCASE COLUMNS**:
     - Do not add multi-row pill tab bars, category badge strips, delivery badges, multi-sentence description paragraphs, 3-item checkmark lists, or clusters of CTA/arrow buttons beside the wheel.

4. **60fps Butter-Smooth Scroll & Animation Engineering**:
   - Scroll-driven sections (`<ArcCardCarousel />`, manifesto word reveals) must write transforms directly to DOM refs (`translate3d(..., 0) rotate(...)`) with `will-change: transform, opacity` and `backface-visibility: hidden`.
   - **Zero React Re-Renders on Intermediate Frames**: Track the active item index in a `useRef` (`lastIndexRef`) and only call React's `setIndex` when the integer index actually changes. Never call `el.setAttribute(...)` or `setState(...)` inside a 60fps `gsap.ticker` loop.
   - **Calibrated Damping & Settling**: Use `clampedDt / 68` exponential smoothing and `ScrollTrigger` snap (`delay: 0.15`, `duration: { min: 0.4, max: 0.9 }`, `ease: "power3.out"`, `directional: false`) so wheel and trackpad scrolling feel effortless and natural.

---

## 2. Core Visual Identity ("Mod Studio" + Commercial Clarity)

RoGrowth.ro combines **minimalist editorial whitespace** and **interactive studio craft** with **radical commercial transparency** (visible Euro pricing, 30%/70% payment terms, 2 revision rounds, 100/100 Core Web Vitals, 100% client ownership).

### A. 60-30-10 Surface & Color Rhythm
Every page must alternate cleanly between these locked-in surfaces (defined in `/src/design-system/tokens.ts` and `/src/index.css`):
1. **Pure Studio White (`#FFFFFF`)**:
   - The dominant surface (60%+) for minimalist scroll showcases (`<ArcCardCarousel />`), manifesto sections, pricing grids, and case studies.
2. **Hero Architectural Grid (`.bg-onlines-grid` on `#FFFFFF`)**:
   - Used **only** for the top Hero section (`96px × 96px` subtle architectural grid).
3. **Studio Collage Dot Matrix (`.bg-onlines-dots`)**:
   - Used only for compact studio collages (`18px × 18px` radial dot matrix inside `rounded-3xl border border-neutral-200/60`).
4. **Studio Ink Primary (`#141517`)**:
   - Primary display typography, default top-bar CTA pill, and hardware bezels.
5. **RoGrowth Electric Cobalt (`#0D5FF9`, hover `#004AD9`)**:
   - Primary conversion CTAs, Hero Figma selection frames, and pricing highlights.
6. **3 Cobalt Pricing Gradients (`getPricingVariantClasses` in `/src/design-system/tokens.ts`)**:
   - `cobalt`: `bg-gradient-to-br from-[#054CE6] via-[#0D5FF9] to-[#0042CE]`
   - `cobalt-deep`: `bg-gradient-to-br from-[#0043D6] via-[#0B55F0] to-[#0035B3]`
   - `periwinkle`: `bg-gradient-to-br from-[#2B59F5] via-[#3A66FA] to-[#1E47DC] hover:from-[#0D5FF9] hover:to-[#0044CC]`
7. **Obsidian Workshop Dark (`#050505` section background + `#131417` / `#0B0C0E` cards with `border-white/10`)**:
   - Used mid-page to contrast with white sections and showcase technical execution & workflow.
8. **Electric FAQ Indigo (`#1D1CFF`)**:
   - Used exclusively for `<ElectricFaqAccordion />` commercial objection-handling cards.

### B. Typography & The 2+1 Font Rule
- **Display & Body (`Plus Jakarta Sans`)**:
  - Hero / Money-Page H1: `font-extrabold tracking-[-0.04em] leading-[1.03] text-balance` (`clamp(2.5rem, 5.2vw, 4.4rem)`)
  - Minimalist Showcase Title (`.acc-title`): `font-medium tracking-[-0.035em] leading-[0.98]` (`clamp(34px, 5vw, 76px)`)
  - Section H2: `font-extrabold tracking-[-0.035em] leading-[1.06] text-balance` (`clamp(2rem, 4vw, 3.45rem)`)
  - Card H3: `text-[21px] lg:text-[23px] font-bold tracking-[-0.025em] leading-[1.2]`
  - Body Copy: `text-[15px] md:text-[16px] leading-[1.6] text-neutral-500` (or `text-neutral-300` on dark)
- **Technical & Commercial Metadata (`JetBrains Mono` via `.font-mono-code`)**:
  - Section Eyebrows: `text-xs font-mono-code uppercase tracking-widest text-[#0D5FF9]` (or `text-[#7DD3FC]` on dark)
  - Numeric Values: Always include `tabular-nums`.

---

## 3. Mandatory Reusable Primitives (`/src/components/ui/`)

Always import and compose these existing components when building or updating pages:

- **`<ArcCardCarousel items={...} height="100svh" scrollPerCard={0.55} step={19} radius={12} loop={false} />`** (from `/src/components/ui/arc-card-carousel.tsx`)
  Minimalist scroll-driven arc wheel on pure white space. Each card is a clean image with generous spacing (`step={19}`), paired with a 3-line caption (`01 / 08`, Title, Meta).
- **`<FigmaSelectionFrame mode="light" | "dark" badgeLabel="..." onBadgeClick={...}>`**
  Wraps hero H1s or dark-section philosophy titles with the signature 6/8-handle Figma bounding box and optional bottom CTA pill.
- **`<SectionHeader eyebrow="..." title="..." description="..." theme="light" | "dark" dashedGuides={boolean} />`**
  Standardized section header with `.font-mono-code` eyebrow kicker and tight `Plus Jakarta Sans` H2.
- **`<PricingTierCard card={...} onSelect={...} />`**
  The locked-in Cobalt package card displaying `number`, `deliveryBadge`, `priceBadge`, `30% avans`, `title`, `cardDescription`, 3 `deliverables` with checkmarks, and full-width white pill button.
- **`<ElectricFaqAccordion items={...} />`**
  The `#1D1CFF` electric-indigo accordion card for commercial FAQs and anti-slop guarantees.
- **`<CoreWebVitalsCard previewImage="..." previewAlt="..." />`**
  The dark `#13151A` technical proof card showing `100 Performanță`, `100 SEO On-Page`, `100% Codul Tău`, and a real project preview.
- **`<BrowserProjectCard project={...} onSelect={...} />`**
  Case study card used strictly in the dedicated Portfolio Grid section (`Block 04`).
- **`<MacBookHardwareFrame>` & `<IPhoneHardwareFrame>`**
  Sleek hardware mockups for interactive step switchers and mobile previews.
- **`<MultiplayerCursor />`, `<ToolSquircle />`, `<OnlinesNotificationBubble />`, `<WireframeBrowserCard />`** (from `/src/components/StudioIcons.tsx`)
  Studio canvas accents for Hero and Dot-Matrix Collage sections.

---

## 4. The Standardized "Money Page" Blueprint (`/creare-site-web`, `/magazin-online`, etc.)

Every dedicated service ("money") page follows this clean architectural sequence:

1. **Block 01 — Studio Service Hero (`bg-onlines-grid`)**:
   - Top Mod Studio toggle + `<FigmaSelectionFrame mode="light">` around the target SEO H1 + 3 floating `<MultiplayerCursor />` proof badges + floating project previews + unboxed 5-metric commercial strip.
2. **Block 02 — Manifesto, 3-Tier Transparent Pricing & Minimalist `<ArcCardCarousel />` (`bg-white`)**:
   - **2A**: Scroll-illuminated agency philosophy statement on pure white space.
   - **2B**: `<SectionHeader />` + 3-column grid of `<PricingTierCard />` + unboxed contract payment terms line.
   - **2C**: Minimalist `<ArcCardCarousel />` on pure white space (`step={19}`, `radius={12}`, no overlays, 3-line caption: index, title, meta).
   - **2D**: Clean 6-Website-Type interactive tab diagnostic.
3. **Block 03 — Obsidian Technical Anatomy (`bg-[#050505]`)**:
   - Rounded `rounded-[28px] bg-[#131417] border border-white/10` container with interactive 4-pillar selector on the left and live `<MacBookHardwareFrame />` screen on the right + 5-platform selector bar.
4. **Block 04 — Industry Case Studies (`bg-white`)**:
   - `<SectionHeader />` + category filter pill bar + 3-column grid of `<BrowserProjectCard />` showing real projects.
5. **Block 05 — Commercial Transparency & Service FAQ (`bg-[#050505]`)**:
   - 12-column split inside `rounded-[32px] bg-[#0B0C0E] border border-white/10`: left column with `<CoreWebVitalsCard />`, right column with `<ElectricFaqAccordion />`.
6. **Block 06 — Dot-Matrix Studio Collage + Pre-Selected Quote Form (`bg-white`)**:
   - Left column with `.bg-onlines-dots` collage; right column with validated inline quote form (`validateContactInquiry`).

---

## 5. Shared AppShell & Routing Contract (`/src/App.tsx`)

- All routes share the **Sticky 3-Zone Top Bar** (`rogrowth.ro` morphing to `'_` on scroll, 5 single-line navigation links, and 1 `"Cere o ofertă"` pill button) and the global modals (`ContactModal`, `ServiceDetailModal`, `ProjectCaseModal`, `ArticleReaderModal`, `CareersModal`).
- To add a new route (e.g., `/magazin-online`), add it to `AppRoute` and `resolveAppRoute()` in `/src/design-system/tokens.ts`, create the page component in `/src/pages/`, and render it inside `<main>` in `/src/App.tsx`.
