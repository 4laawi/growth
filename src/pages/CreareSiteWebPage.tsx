import React, { useEffect, useRef, useState } from 'react';
import {
  PORTFOLIO_PROJECTS,
  PortfolioProject,
  ROGROWTH_CONTACT,
  ServiceCardItem,
  computeDarkModeScrollState,
  computeManifestoScrollState,
  computePageDarkModeState,
  computeStaggerDelayMs,
  computeWordSmoothReveal,
  filterPortfolioProjects,
  validateContactInquiry,
} from '../data/studioData';
import {
  CREARE_SITE_FAQ_ITEMS,
  CREARE_SITE_PACKAGES,
  ROGROWTH_GUARANTEE_METRICS,
  TECH_PLATFORM_STANDARDS,
  TECHNICAL_ANATOMY_PILLARS,
  WEBSITE_TYPE_CAROUSEL_ITEMS,
  WEBSITE_TYPES_CATALOG,
  buildCreareSiteWebJsonLd,
} from '../data/creareSiteWebData';
import ArcCardCarousel from '../components/ui/arc-card-carousel';
import { RoGrowthWordmarkFooter } from '../components/ui/wordmark-footer';
import { StaggerTestimonialsSection } from '../components/ui/stagger-testimonials';
import { FigmaFramerShowcaseSection } from '../components/ui/figma-framer-showcase';
import {
  BrowserProjectCard,
  CoreWebVitalsCard,
  ElectricFaqAccordion,
  FigmaSelectionFrame,
  MacBookHardwareFrame,
  PricingTierCard,
  SectionHeader,
  useSectionReveal,
} from '../components/ui/StudioPrimitives';
import {
  MultiplayerCursor,
  OnlinesNotificationBubble,
  ToolSquircle,
  WhatsAppIcon,
  WireframeBrowserCard,
} from '../components/StudioIcons';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Grid,
  Layers,
  MapPin,
  MessageSquarePlus,
  MousePointer,
  Phone,
  Sparkles,
} from 'lucide-react';

interface CreareSiteWebPageProps {
  isDarkMode?: boolean;
  onDarkModeChange?: (isDark: boolean) => void;
  onNavigateHome: () => void;
  onNavigateDesignSystem: () => void;
  onOpenContact: (presetService?: string) => void;
  onOpenServiceModal: (service: ServiceCardItem) => void;
  onSelectProject: (project: PortfolioProject) => void;
  onOpenLegalModal: (type: 'terminos' | 'privacidad') => void;
}

const CREARE_MANIFESTO_WORDS = [
  'Diagnosticăm',
  'nevoia',
  'reală',
  'a',
  'afacerii',
  'tale',
  'înainte',
  'de',
  'a',
  'recomanda',
  'orice',
  'serviciu.',
];

// Indices for "nevoia reală a afacerii tale" (indices 1..5)
const CREARE_ACCENT_INDICES = new Set([1, 2, 3, 4, 5]);
// Index for "serviciu." (index 11)
const CREARE_UNDERLINE_INDEX = 11;

const CREARE_SUB_WORDS = [
  'Fără',
  'pachete',
  'rigide.',
  'Cod',
  'verificat',
  'uman,',
  'termene',
  'ferme',
  'și',
  '100%',
  'proprietatea',
  'ta.',
];

const TOTAL_CREARE_WORDS =
  CREARE_MANIFESTO_WORDS.length + CREARE_SUB_WORDS.length;

export function CreareSiteWebPage({
  isDarkMode = false,
  onDarkModeChange,
  onNavigateHome,
  onNavigateDesignSystem,
  onOpenContact,
  onOpenServiceModal,
  onSelectProject,
  onOpenLegalModal,
}: CreareSiteWebPageProps) {
  const [studioMode, setStudioMode] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [activeWebsiteTypeIdx, setActiveWebsiteTypeIdx] = useState<number>(0);
  const [activeAnatomyIdx, setActiveAnatomyIdx] = useState<number>(0);
  const [activeTechIdx, setActiveTechIdx] = useState<number>(0);
  const [portfolioFilter, setPortfolioFilter] = useState<
    'todos' | PortfolioProject['category']
  >('todos');

  // Canvas custom notes (same interactive studio craft as Homepage)
  const [customComments, setCustomComments] = useState<
    { id: string; x: number; y: number; text: string }[]
  >([]);
  const [commentDraft, setCommentDraft] = useState('');
  const [showCommentInput, setShowCommentInput] = useState(false);

  // Inline Quote Form state
  const [inlineName, setInlineName] = useState('');
  const [inlineEmail, setInlineEmail] = useState('');
  const [inlineOrg, setInlineOrg] = useState('');
  const [inlineService, setInlineService] = useState(
    'Site de prezentare simplu (€300 – €400)'
  );
  const [inlineMessage, setInlineMessage] = useState('');
  const [inlineErrors, setInlineErrors] = useState<Record<string, string>>({});
  const [inlineSubmitted, setInlineSubmitted] = useState(false);

  // Scroll-reveal Manifesto state (60fps smoothstep wave)
  const manifestoTrackRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState(() => ({
    progress: 0,
    revealedWords: 0,
    isActive: false,
    isComplete: false,
  }));
  const [smoothProgress, setSmoothProgress] = useState(0);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  // Scroll-driven Dark Mode refs & state for Block 03 (#standard-tehnic-seo)
  const anatomySectionRef = useRef<HTMLElement>(null);
  const [localDarkMode, setLocalDarkMode] = useState(false);
  const [anatomyPhase, setAnatomyPhase] = useState<'before' | 'entering' | 'active' | 'exiting' | 'after'>('before');

  // Featherlight section reveals for main content blocks
  const { ref: pricingRevealRef, isRevealed: isPricingVisible } = useSectionReveal<HTMLDivElement>();
  const { ref: typesRevealRef, isRevealed: isTypesVisible } = useSectionReveal<HTMLDivElement>();
  const { ref: portfolioRevealRef, isRevealed: isPortfolioVisible } = useSectionReveal<HTMLElement>();
  const { ref: quoteRevealRef, isRevealed: isQuoteVisible } = useSectionReveal<HTMLElement>();

  const effectiveDark = isDarkMode || localDarkMode;

  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      'Creare Site Web Profesional în București & România (€300–€2.300+) | RoGrowth.ro';

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Servicii de creare site web de prezentare (€300–€400), site avansat pentru lead-uri (€700–€1.200) și magazin online e-commerce (€1.000–€2.300+). 100% proprietatea clientului, livrare în 2–8 săptămâni, răspuns < 24h.'
      );
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, []);

  useEffect(() => {
    const tickSmooth = () => {
      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const delta = target - current;

      if (Math.abs(delta) < 0.0008) {
        currentProgressRef.current = target;
        setSmoothProgress(target);
        rafIdRef.current = null;
        return;
      }

      const next = current + delta * 0.24;
      currentProgressRef.current = next;
      setSmoothProgress(next);
      rafIdRef.current = window.requestAnimationFrame(tickSmooth);
    };

    const updateScrollChoreography = () => {
      const viewportH = window.innerHeight || 900;

      // 1. Update Manifesto smoothstep wave
      if (manifestoTrackRef.current) {
        const rect = manifestoTrackRef.current.getBoundingClientRect();
        const next = computeManifestoScrollState(
          rect.top,
          rect.height,
          viewportH,
          TOTAL_CREARE_WORDS
        );
        targetProgressRef.current = next.progress;

        setScrollState((prev) =>
          prev.revealedWords === next.revealedWords &&
            Math.abs(prev.progress - next.progress) < 0.004 &&
            prev.isActive === next.isActive &&
            prev.isComplete === next.isComplete
            ? prev
            : next
        );

        if (Math.abs(targetProgressRef.current - currentProgressRef.current) > 0.5) {
          currentProgressRef.current = targetProgressRef.current;
          setSmoothProgress(targetProgressRef.current);
        } else if (rafIdRef.current === null) {
          rafIdRef.current = window.requestAnimationFrame(tickSmooth);
        }
      }

      // 2. Update unified Page Dark Mode state for Block 03 (#standard-tehnic-seo)
      const bounds: Array<{ top: number; bottom: number }> = [];
      if (anatomySectionRef.current) {
        const r1 = anatomySectionRef.current.getBoundingClientRect();
        bounds.push({ top: r1.top, bottom: r1.bottom });
        const st1 = computeDarkModeScrollState(r1.top, r1.bottom, viewportH);
        setAnatomyPhase((prev) => (prev === st1.phase ? prev : st1.phase));
      }

      if (bounds.length > 0) {
        const pageDark = computePageDarkModeState(bounds, viewportH);
        setLocalDarkMode((prev) => (prev === pageDark.isDarkMode ? prev : pageDark.isDarkMode));
        onDarkModeChange?.(pageDark.isDarkMode);
      }
    };

    updateScrollChoreography();
    window.addEventListener('scroll', updateScrollChoreography, { passive: true });
    window.addEventListener('resize', updateScrollChoreography, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateScrollChoreography);
      window.removeEventListener('resize', updateScrollChoreography);
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
      onDarkModeChange?.(false);
    };
  }, [onDarkModeChange]);

  const handleSelectProjectById = (projectId: string) => {
    const found = PORTFOLIO_PROJECTS.find((p) => p.id === projectId);
    if (found) onSelectProject(found);
  };

  const handlePreselectAndScrollToForm = (
    presetOption = 'Site de prezentare simplu (€300 – €400)'
  ) => {
    setInlineService(presetOption);
    const el = document.getElementById('creare-site-oferta');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onOpenContact(presetOption);
    }
  };

  const handleAddCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentDraft.trim()) return;
    setCustomComments((prev) => [
      ...prev,
      {
        id: `cs-${Date.now()}`,
        x: 50 + ((prev.length * 7) % 24),
        y: 66 - ((prev.length * 6) % 18),
        text: commentDraft.trim(),
      },
    ]);
    setCommentDraft('');
    setShowCommentInput(false);
  };

  const handleInlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = validateContactInquiry({
      name: inlineName,
      email: inlineEmail,
      organization: inlineOrg,
      service: inlineService,
      message: inlineMessage,
    });
    if (!res.valid) {
      setInlineErrors(res.errors);
      return;
    }
    setInlineErrors({});
    setInlineSubmitted(true);
  };

  const activeWebsiteType =
    WEBSITE_TYPES_CATALOG[activeWebsiteTypeIdx] || WEBSITE_TYPES_CATALOG[0];
  const matchedCaseProject =
    PORTFOLIO_PROJECTS.find((p) => p.id === activeWebsiteType.caseStudyId) ||
    PORTFOLIO_PROJECTS[0];
  const activeAnatomy =
    TECHNICAL_ANATOMY_PILLARS[activeAnatomyIdx] || TECHNICAL_ANATOMY_PILLARS[0];
  const activeTech =
    TECH_PLATFORM_STANDARDS[activeTechIdx] || TECH_PLATFORM_STANDARDS[0];
  const filteredProjects = filterPortfolioProjects(
    PORTFOLIO_PROJECTS,
    portfolioFilter
  );

  const jsonLdString = JSON.stringify(
    buildCreareSiteWebJsonLd(
      typeof window !== 'undefined'
        ? `${window.location.origin}/creare-siteweb`
        : 'https://rogrowth.ro/creare-siteweb'
    )
  );

  const underlineWeight = computeWordSmoothReveal(
    smoothProgress,
    CREARE_UNDERLINE_INDEX,
    TOTAL_CREARE_WORDS
  );

  return (
    <div
      data-theme-section="true"
      className="min-h-screen bg-transparent transition-colors duration-500 ease-out"
    >
      {/* Structured Data JSON-LD for SEO & Generative Engine Optimization (GEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />

      {/* =====================================================================
          BLOCK 01 — STUDIO SERVICE HERO (Spacious Canvas Identical to Homepage)
      ===================================================================== */}
      <section
        id="creare-site-hero"
        data-theme-section="true"
        aria-label="Creare site web profesional RoGrowth.ro"
        className={`relative min-h-[820px] lg:h-[880px] w-full overflow-hidden flex flex-col items-center justify-center pt-20 pb-20 transition-colors duration-500 ease-out ${studioMode && showGrid
            ? effectiveDark
              ? 'bg-transparent'
              : 'bg-onlines-grid'
            : 'bg-transparent'
          }`}
      >
        {/* Top Mod Studio Toggle */}
        <div className="relative z-30 mb-8 md:mb-10 flex flex-col items-center">
          <div className="bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-neutral-200/70 flex items-center gap-3.5">
            <span
              id="creare-studio-mode-label"
              className="text-[13px] font-semibold text-[#141517] tracking-tight select-none"
            >
              Mod Studio
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={studioMode}
              aria-labelledby="creare-studio-mode-label"
              onClick={() => setStudioMode((prev) => !prev)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D5FF9] ${studioMode ? 'bg-[#0D5FF9]' : 'bg-neutral-200'
                }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${studioMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
              />
            </button>
          </div>
        </div>

        {/* Central Focal Anchor: Figma Selection Frame + SEO H1 + 3 Cursors */}
        <div className="relative z-20 flex flex-col items-center px-6">
          <div className="relative">
            {/* Minimalist Cursor #1: Full Ownership */}
            {studioMode && (
              <div className="hidden md:block absolute -top-10 left-4 z-30">
                <MultiplayerCursor
                  label="100% Proprietatea Ta"
                  color="#0891B2"
                  onClick={() =>
                    handlePreselectAndScrollToForm(
                      'Site de prezentare simplu (€300 – €400)'
                    )
                  }
                />
              </div>
            )}

            {/* Minimalist Cursor #2: Delivery Timeline */}
            {studioMode && (
              <div className="hidden md:block absolute -top-10 right-8 z-30">
                <MultiplayerCursor
                  label="Livrare în 2–4 săpt."
                  color="#10B981"
                  onClick={() =>
                    handlePreselectAndScrollToForm(
                      'Site de prezentare simplu (€300 – €400)'
                    )
                  }
                />
              </div>
            )}

            {/* Minimalist Cursor #3: Fast WhatsApp Response */}
            {studioMode && (
              <div className="hidden md:block absolute -bottom-11 left-12 z-30">
                <MultiplayerCursor
                  label="Răspuns < 24h WhatsApp"
                  color="#5E5CE6"
                  onClick={() =>
                    handlePreselectAndScrollToForm(
                      'Site avansat orientat spre conversie (€700 – €1.200)'
                    )
                  }
                />
              </div>
            )}

            <FigmaSelectionFrame
              mode="light"
              badgeLabel="Prețuri fixe de la €300 · 0 Costuri Ascunse →"
              onBadgeClick={() => {
                const el = document.getElementById('grila-preturi-site');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 md:px-16 pt-4 pb-8 md:pt-6 md:pb-11 text-center"
            >
              <h1 className="text-[clamp(3.2rem,9.8vw,9.2rem)] font-extrabold tracking-[-0.055em] leading-[0.86] text-[#141517] select-none text-center">
                creare site web.
                <span className="sr-only">
                  {' '}
                  — Site de prezentare, generare lead-uri, sisteme de programări și magazine online în București și toată România
                </span>
              </h1>
            </FigmaSelectionFrame>
          </div>
        </div>

        {/* Minimalist Studio Canvas Framing at the 4 Corners (Identical to Homepage Breathing Room) */}
        {studioMode && (
          <div className="w-full max-w-[1440px] mx-auto pointer-events-auto">
            {/* TOP-LEFT: Wireframe Window + Next.js Squircle */}
            <div className="hidden lg:block absolute top-[11%] left-[2%] w-[225px] xl:w-[250px] -rotate-6 opacity-90 transition-transform duration-300 hover:rotate-0">
              <WireframeBrowserCard variant="grid" />
            </div>

            <div className="hidden lg:block absolute top-[10%] left-[31%] animate-float-slow">
              <ToolSquircle tool="framer" />
            </div>

            {/* TOP-RIGHT: Figma Squircle + Kasata Imobiliare Showcase */}
            <div className="hidden lg:block absolute top-[9%] right-[30%] animate-float-slow">
              <ToolSquircle tool="figma" />
            </div>

            <div className="hidden lg:block absolute top-[9%] right-[2%] w-[265px] xl:w-[305px] rotate-3 z-10">
              <button
                type="button"
                onClick={() => handleSelectProjectById('kasata-imobiliare')}
                aria-label="Vezi studiul de caz Kasata Imobiliare (kasata.ro)"
                className="group block w-full rounded-[24px] bg-white p-2.5 shadow-[0_18px_45px_rgba(0,0,0,0.08)] border border-neutral-200/80 overflow-hidden text-left transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <div className="relative rounded-[18px] overflow-hidden aspect-[16/9] bg-neutral-100">
                  <img
                    src="/assets/aistudio/kasataaa_b747262d.webp"
                    alt="Kasata Imobiliare (kasata.ro) — Portal imobiliar construit pe Next.js"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </button>
            </div>

            {/* BOTTOM-LEFT: MacBook Pro Showcase (Dental Crown Health) + WordPress Squircle */}
            <div className="hidden lg:block absolute bottom-[6%] left-[2%] w-[245px] xl:w-[280px] z-10">
              <button
                type="button"
                onClick={() => handleSelectProjectById('dental-crown-health')}
                aria-label="Vezi studiul de caz Dental Crown Health (dentalcrownhealth.ro)"
                className="group block w-full text-left cursor-pointer transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="rounded-t-2xl bg-[#141517] p-2.5 pb-0 shadow-2xl border border-neutral-700">
                  <div className="rounded-t-lg overflow-hidden aspect-[16/9.6] bg-neutral-900">
                    <img
                      src="/assets/aistudio/dentalcrownhealth_1219211c.webp"
                      alt="Dental Crown Health (dentalcrownhealth.ro) — Platformă clinică pe Next.js"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="h-3 bg-gradient-to-b from-neutral-300 to-neutral-400 rounded-b-xl mx-[-8px] shadow-md border-t border-white/60" />
              </button>
            </div>

            <div className="hidden lg:block absolute bottom-[12%] left-[24%] z-20 animate-float-slow">
              <ToolSquircle tool="wordpress" />
            </div>

            {/* BOTTOM-RIGHT: Minimal iPhone Frame (Baristas Coffee Shop) */}
            <div className="hidden lg:block absolute bottom-[5%] right-[2.5%] w-[172px] xl:w-[186px] -rotate-3 z-20">
              <button
                type="button"
                onClick={() => handleSelectProjectById('baristas-coffee')}
                aria-label="Vezi studiul de caz Baristas Coffee Shop (baristas.ro) pe mobil"
                className="group block w-full rounded-[34px] bg-[#141517] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.22)] border border-neutral-700/90 cursor-pointer transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative w-full aspect-[9/15.6] rounded-[26px] overflow-hidden bg-[#141517]">
                  <img
                    src="/assets/aistudio/BARSITAS_mobile__8aa0fb37.webp"
                    alt="Baristas Coffee Shop (baristas.ro) — Magazin online pe telefon"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Custom User-Added Canvas Comments */}
        {customComments.map((c) => (
          <div
            key={c.id}
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
            className="hidden md:block absolute z-30"
          >
            <OnlinesNotificationBubble timeAgo="acum" message={c.text} />
          </div>
        ))}
      </section>

      {/* Clean Architectural 5-Metric Guarantee Strip (Below Hero, Zero Overlap) */}
      <div
        data-theme-section="true"
        className="bg-transparent border-y border-neutral-200/80 dark:border-white/10 py-8 px-6 md:px-12 lg:px-20 transition-colors duration-500 ease-out"
      >
        <div className="max-w-[1240px] mx-auto">
          <dl
            aria-label="Garanții și metrici comerciale RoGrowth"
            className="grid grid-cols-2 md:grid-cols-5 gap-6 divide-y md:divide-y-0 md:divide-x divide-neutral-200/70 dark:divide-white/10"
          >
            {ROGROWTH_GUARANTEE_METRICS.map((metric, idx) => (
              <div
                key={metric.id}
                className={`${idx > 0 ? 'pt-4 md:pt-0 md:pl-6' : ''
                  } flex flex-col justify-between`}
              >
                <dt className="text-[11px] font-mono-code uppercase tracking-wider text-[#0D5FF9] dark:text-[#7DD3FC] transition-colors duration-500">
                  {metric.label}
                </dt>
                <dd className="mt-1 text-2xl lg:text-[28px] font-extrabold tracking-tight text-[#141517] dark:text-white tabular-nums transition-colors duration-500">
                  {metric.value}
                </dd>
                <dd className="mt-1 text-[12px] text-neutral-500 dark:text-neutral-400 leading-relaxed transition-colors duration-500">
                  {metric.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* =====================================================================
          BLOCK 02 — SCROLL-ILLUMINATED MANIFESTO + 3 COBALT PRICING PACKAGES
          + MINIMALIST 6-WEBSITE-TYPE INTERACTIVE DIAGNOSTIC
      ===================================================================== */}
      <section
        id="creare-site-pachete"
        data-theme-section="true"
        aria-labelledby="creare-manifesto-heading"
        className="relative bg-transparent transition-colors duration-500 ease-out"
      >
        {/* Part 2A: Scroll-Illuminated Agency Philosophy Track (60fps Smoothstep Wave) */}
        <div
          ref={manifestoTrackRef}
          data-testid="creare-manifesto-track"
          data-revealed-words={scrollState.revealedWords}
          data-total-words={TOTAL_CREARE_WORDS}
          className="relative h-[165vh] w-full"
        >
          <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 overflow-hidden">
            {/* Subtle Ambient Radial Spotlight synced to scroll progress */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <div
                className="w-[620px] h-[380px] rounded-full blur-3xl transition-opacity duration-300"
                style={{
                  background:
                    'radial-gradient(circle, rgba(13,95,249,0.065) 0%, rgba(13,95,249,0) 72%)',
                  opacity: Math.min(1, smoothProgress * 1.4),
                  transform: `scale(${0.92 + smoothProgress * 0.16})`,
                }}
              />
            </div>

            <div className="relative z-10 max-w-[920px] mx-auto text-center">
              {/* Minimalist Monospace Kicker with Flanking Hairlines */}
              <div className="inline-flex items-center gap-3 mb-7">
                <span
                  aria-hidden="true"
                  className="h-[1px] w-7 bg-[#0D5FF9]/40 origin-right transition-transform duration-300"
                  style={{
                    transform: `scaleX(${Math.min(1, 0.35 + smoothProgress * 0.65)})`,
                  }}
                />
                <p className="text-[11px] font-mono-code uppercase tracking-[0.2em] text-[#0D5FF9]">
                  Filozofia RoGrowth · Partener Strategic, Nu Simplu Executant de Cod
                </p>
                <span
                  aria-hidden="true"
                  className="h-[1px] w-7 bg-[#0D5FF9]/40 origin-left transition-transform duration-300"
                  style={{
                    transform: `scaleX(${Math.min(1, 0.35 + smoothProgress * 0.65)})`,
                  }}
                />
              </div>

              <h2
                id="creare-manifesto-heading"
                className="text-[clamp(2.25rem,4.6vw,4rem)] font-bold tracking-[-0.035em] leading-[1.1] text-balance"
              >
                {CREARE_MANIFESTO_WORDS.map((word, idx) => {
                  const weight = computeWordSmoothReveal(
                    smoothProgress,
                    idx,
                    TOTAL_CREARE_WORDS
                  );
                  const isLit = idx < scrollState.revealedWords || weight >= 0.5;
                  const opacity = 0.13 + 0.87 * weight;
                  const translateY = (1 - weight) * 10;
                  const isAccent = CREARE_ACCENT_INDICES.has(idx);
                  const isUnderlineWord = idx === CREARE_UNDERLINE_INDEX;
                  const activeColor = isAccent
                    ? '#0D5FF9'
                    : effectiveDark
                      ? '#FFFFFF'
                      : '#141517';

                  return (
                    <React.Fragment key={idx}>
                      <span
                        data-word-lit={isLit ? 'true' : 'false'}
                        data-word-weight={weight.toFixed(2)}
                        style={{
                          opacity: Number(opacity.toFixed(3)),
                          transform: `translate3d(0, ${translateY.toFixed(2)}px, 0)`,
                          color: weight > 0.35 ? activeColor : effectiveDark ? '#9CA3AF' : '#141517',
                        }}
                        className="relative inline-block will-change-[transform,opacity] transition-colors duration-200"
                      >
                        {word}
                        {isUnderlineWord && (
                          <span
                            aria-hidden="true"
                            style={{
                              transform: `scaleX(${underlineWeight.toFixed(3)})`,
                              opacity: Number((underlineWeight * 0.92).toFixed(3)),
                            }}
                            className="pointer-events-none absolute left-0 -bottom-1 h-[3px] w-full rounded-full bg-[#0D5FF9] origin-left"
                          />
                        )}
                      </span>{' '}
                    </React.Fragment>
                  );
                })}
              </h2>

              <p className="mt-8 text-[clamp(1.15rem,2vw,1.55rem)] font-semibold tracking-[-0.02em] leading-[1.38] max-w-[580px] mx-auto">
                {CREARE_SUB_WORDS.map((word, idx) => {
                  const globalIdx = CREARE_MANIFESTO_WORDS.length + idx;
                  const weight = computeWordSmoothReveal(
                    smoothProgress,
                    globalIdx,
                    TOTAL_CREARE_WORDS
                  );
                  const isLit = globalIdx < scrollState.revealedWords || weight >= 0.5;
                  const opacity = 0.14 + 0.86 * weight;
                  const translateY = (1 - weight) * 8;
                  return (
                    <React.Fragment key={idx}>
                      <span
                        data-word-lit={isLit ? 'true' : 'false'}
                        data-word-weight={weight.toFixed(2)}
                        style={{
                          opacity: Number(opacity.toFixed(3)),
                          transform: `translate3d(0, ${translateY.toFixed(2)}px, 0)`,
                        }}
                        className={`inline-block will-change-[transform,opacity] transition-colors duration-500 ${weight > 0.4
                            ? 'text-neutral-700 dark:text-neutral-200'
                            : 'text-neutral-500 dark:text-neutral-400'
                          }`}
                      >
                        {word}
                      </span>{' '}
                    </React.Fragment>
                  );
                })}
              </p>
            </div>

            <div className="absolute bottom-10 inset-x-0 flex flex-col items-center gap-3">
              <div
                aria-hidden="true"
                className="w-28 h-[2px] bg-neutral-100 dark:bg-white/10 rounded-full overflow-hidden"
              >
                <div
                  className="h-full w-full bg-[#0D5FF9] origin-left will-change-transform"
                  style={{
                    transform: `scaleX(${smoothProgress.toFixed(3)})`,
                  }}
                />
              </div>
              <a
                href="#grila-preturi-site"
                className="text-[11.5px] font-mono-code text-neutral-400 hover:text-[#141517] dark:hover:text-white transition-colors whitespace-nowrap"
              >
                {scrollState.isComplete
                  ? 'Vezi grila de prețuri și livrabile ↓'
                  : 'Derulează pentru pachete & costuri ↓'}
              </a>
            </div>
          </div>
        </div>

        {/* Part 2B: 3-Tier Transparent Pricing Cards */}
        <div
          id="grila-preturi-site"
          ref={pricingRevealRef}
          className={`max-w-[1240px] mx-auto px-6 md:px-12 lg:px-20 pt-8 pb-20 transition-all duration-700 ease-out ${isPricingVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
            }`}
        >
          <SectionHeader
            eyebrow="Prețuri Fixe Agreate în Scris · 0 Costuri Ascunse"
            title="Cât costă crearea unui site web în 2026?"
            description="Fără pachete rigide umflate artificial. Alegem împreună încadrarea corectă după complexitatea reală a afacerii tale."
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 items-stretch">
            {CREARE_SITE_PACKAGES.map((card, idx) => (
              <div
                key={card.id}
                style={{
                  transitionDelay: `${computeStaggerDelayMs(idx, 90, 270)}ms`,
                }}
                className={`transition-all duration-700 ease-out ${isPricingVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                  }`}
              >
                <PricingTierCard
                  card={card}
                  onSelect={(selected) => onOpenServiceModal(selected)}
                />
              </div>
            ))}
          </div>

          {/* Minimalist Unboxed Commercial Contract Terms Strip */}
          <div className="mt-8 pt-6 border-t border-neutral-200/80 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400 transition-colors duration-500">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-semibold text-[#141517] dark:text-white transition-colors duration-500">
                Termeni de plată standard:
              </span>
              <span className="tabular-nums">
                30% avans la semnare / 70% la finalizare și lansare
              </span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">
                Proiecte mari etapizate: 30% avans / 40% după aprobarea vizuală / 30% înainte de live
              </span>
            </div>
            <div className="font-mono-code text-[11px] text-[#0D5FF9] dark:text-[#7DD3FC]">
              2 runde majore de revizii incluse în contract
            </div>
          </div>
        </div>

        {/* Part 2B.2: Revealing Tilted Figma & Framer Showcase + Interactive "Pick Two" Configurator */}
        <FigmaFramerShowcaseSection
          variant="creare-site"
          onOpenContact={handlePreselectAndScrollToForm}
          onSelectProjectById={handleSelectProjectById}
        />

        {/* Part 2C: Arc Card Carousel — Minimalist Visual Wheel of Website Types */}
        <div
          id="galerie-tipuri-site"
          data-theme-section="true"
          className="bg-transparent transition-colors duration-500 ease-out"
        >
          <ArcCardCarousel
            items={WEBSITE_TYPE_CAROUSEL_ITEMS}
            height="100svh"
            scrollPerCard={0.55}
            step={19}
            radius={12}
            caption={true}
            loop={false}
            ariaLabel="Carusel tipuri de site-uri web pe industrii în România"
          />
        </div>

        {/* Part 2D: Minimalist 6-Website-Type Interactive Studio Selector (Zero Card Clutter) */}
        <div
          id="tipuri-site"
          ref={typesRevealRef}
          className={`max-w-[1240px] mx-auto px-6 md:px-12 lg:px-20 pt-16 pb-28 border-t border-neutral-100 dark:border-white/10 transition-all duration-700 ease-out ${isTypesVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
            }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pt-8">
            <SectionHeader
              eyebrow="Cele 6 Tipuri de Site-uri Construite de RoGrowth"
              title="Ce tip de site ți se potrivește?"
              description="Selectează mai jos profilul proiectului tău pentru a vedea cui i se adresează, ce funcționalități include, ce tehnologie folosim și un exemplu real din portofoliu."
            />

            <span className="text-xs font-mono-code text-neutral-400 shrink-0">
              Diagnostic interactiv · {activeWebsiteType.index} / 06
            </span>
          </div>

          {/* Clean Full-Width 6-Button Selector Bar (Zero Clipping) */}
          <div
            role="tablist"
            aria-label="Tipuri de site-uri web oferite de RoGrowth"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 bg-neutral-100 dark:bg-white/5 p-1.5 rounded-2xl mb-8 transition-colors duration-500"
          >
            {WEBSITE_TYPES_CATALOG.map((typeItem, idx) => {
              const isSelected = activeWebsiteTypeIdx === idx;
              return (
                <button
                  key={typeItem.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveWebsiteTypeIdx(idx)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center justify-center gap-1.5 ${isSelected
                      ? 'bg-[#141517] dark:bg-[#0D5FF9] text-white shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-300 hover:text-[#141517] dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10'
                    }`}
                >
                  <span
                    className={`font-mono-code text-[11px] ${isSelected ? 'text-[#7DD3FC]' : 'text-neutral-400'
                      }`}
                  >
                    {typeItem.index}.
                  </span>
                  <span className="truncate">{typeItem.shortTitle}</span>
                </button>
              );
            })}
          </div>

          {/* Single Focused Split View for Active Website Type (No Multi-Card Clutter) */}
          <div className="rounded-[28px] bg-neutral-50/90 dark:bg-[#131417] border border-neutral-200/90 dark:border-white/10 p-7 md:p-11 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center transition-colors duration-500 ease-out">
            {/* Left 7 Cols: Specification, Target, Purpose & Action */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code text-[#0D5FF9] dark:text-[#7DD3FC]">
                <span>TIPUL {activeWebsiteType.index} / 06</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums font-bold">
                  Buget: {activeWebsiteType.priceRange}
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-neutral-500 dark:text-neutral-400">
                  Livrare: {activeWebsiteType.timeline}
                </span>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#141517] dark:text-white tracking-[-0.03em] leading-tight transition-colors duration-500">
                  {activeWebsiteType.title}
                </h3>
                <p className="mt-2 text-xs font-mono-code text-neutral-500 dark:text-neutral-400 transition-colors duration-500">
                  Pentru: {activeWebsiteType.targetClients}
                </p>
              </div>

              <p className="text-[15px] md:text-[16px] text-neutral-600 dark:text-neutral-300 leading-[1.65] transition-colors duration-500">
                {activeWebsiteType.purpose}
              </p>

              <ul className="space-y-2.5 pt-2 border-t border-neutral-200/80 dark:border-white/10 transition-colors duration-500">
                {activeWebsiteType.keyFeatures.map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-[13.5px] text-[#141517] dark:text-neutral-100 font-medium transition-colors duration-500"
                  >
                    <Check className="w-4 h-4 text-[#0D5FF9] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-3 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200/80 dark:border-white/10 transition-colors duration-500">
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  <span className="font-mono-code text-neutral-400 uppercase">
                    Tehnologie recomandată:{' '}
                  </span>
                  <strong className="font-semibold text-[#141517] dark:text-white transition-colors duration-500">
                    {activeWebsiteType.recommendedStack}
                  </strong>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handlePreselectAndScrollToForm(
                      activeWebsiteType.presetServiceOption
                    )
                  }
                  className="px-6 py-3 rounded-full bg-[#0D5FF9] hover:bg-[#004AD9] text-white text-xs font-semibold tracking-tight transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shadow-[0_8px_22px_rgba(13,95,249,0.22)]"
                >
                  <span>Solicită ofertă: {activeWebsiteType.shortTitle}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right 5 Cols: Real Matching RoGrowth Portfolio Case Study */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-mono-code text-neutral-500 dark:text-neutral-400 px-1">
                <span>REFERINȚĂ REALĂ DIN PORTOFOLIU</span>
                <span className="text-[#0D5FF9] dark:text-[#7DD3FC] font-bold">
                  {activeWebsiteType.caseStudyDomain}
                </span>
              </div>
              <BrowserProjectCard
                project={matchedCaseProject}
                onSelect={onSelectProject}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          BLOCK 03 — OBSIDIAN TECHNICAL ANATOMY: TECH STACK, FREE TECHNICAL SEO
          & STRICT HONESTY GUARDRAILS (Scroll-Driven Dark Mode Sync)
      ===================================================================== */}
      <section
        id="standard-tehnic-seo"
        ref={anatomySectionRef}
        data-theme-section="true"
        data-dark-phase={anatomyPhase}
        aria-labelledby="anatomy-heading"
        className={`py-24 md:py-32 px-6 md:px-12 lg:px-20 transition-colors duration-500 ease-out ${effectiveDark ? 'bg-transparent text-white' : 'bg-transparent text-[#141517]'
          }`}
      >
        <div className="max-w-[1240px] mx-auto space-y-16">
          {/* Top Obsidian Container: 4-Pillar Selector + Live MacBook Frame */}
          <div
            className={`rounded-[28px] p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center overflow-hidden border transition-all duration-500 ease-out ${effectiveDark
                ? 'bg-[#131417] border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.45)]'
                : 'bg-[#131417] border-neutral-800/80 shadow-[0_24px_60px_rgba(20,21,23,0.16)]'
              }`}
          >
            {/* Left Column: 4 Technical & Commercial Standards */}
            <div className="lg:col-span-6 space-y-6">
              <FigmaSelectionFrame
                mode="dark"
                showMidHandles={false}
                className="inline-block px-3.5 py-1.5"
              >
                <h2
                  id="anatomy-heading"
                  className="text-[clamp(1.85rem,3.4vw,2.9rem)] font-bold tracking-[-0.03em] leading-none text-white"
                >
                  SEO Tehnic & Standarde
                </h2>
              </FigmaSelectionFrame>

              <p className="text-[15.5px] md:text-[17px] font-semibold text-white/95 leading-[1.48] tracking-[-0.01em]">
                Nu lăsăm capitole tehnice neterminate. Fiecare site include gratuit fundația SEO on-page, viteză Core Web Vitals și reguli stricte de onestitate.
              </p>

              <div className="space-y-2.5 pt-1">
                {TECHNICAL_ANATOMY_PILLARS.map((pillar, idx) => {
                  const isActive = activeAnatomyIdx === idx;
                  return (
                    <button
                      key={pillar.step}
                      type="button"
                      onClick={() => setActiveAnatomyIdx(idx)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${isActive
                          ? 'bg-[#0D5FF9]/15 border-[#0D5FF9] text-white'
                          : 'bg-white/[0.03] border-white/10 text-neutral-300 hover:border-white/25'
                        }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`text-xs font-mono-code font-bold px-2 py-1 rounded ${isActive
                              ? 'bg-[#0D5FF9] text-white'
                              : 'bg-white/10 text-neutral-400'
                            }`}
                        >
                          {pillar.step}
                        </span>
                        <span className="text-sm font-bold truncate">
                          {pillar.title}
                        </span>
                      </div>
                      <span className="hidden sm:inline-block text-[11px] font-mono-code text-neutral-400 shrink-0">
                        {pillar.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() =>
                    handlePreselectAndScrollToForm(
                      'Site avansat orientat spre conversie (€700 – €1.200)'
                    )
                  }
                  className="px-7 py-3.5 rounded-full bg-[#0D5FF9] hover:bg-[#256EFF] text-white text-[14px] font-semibold tracking-tight transition-all duration-200 shadow-[0_10px_30px_rgba(13,95,249,0.35)] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Solicită diagnostic gratuit pentru site-ul tău
                </button>
              </div>
            </div>

            {/* Right Column: Interactive MacBook Pro Hardware Screen */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-end">
              <MacBookHardwareFrame className="max-w-[520px]">
                <div className="pt-2 flex items-center justify-between text-xs font-mono-code text-white/80">
                  <span>ROGROWTH.RO · STANDARD TEHNIC</span>
                  <span>PILONUL {activeAnatomy.step}/04</span>
                </div>

                <div className="my-auto py-2 space-y-2">
                  <p className="text-[11px] font-mono-code uppercase tracking-wider text-sky-200">
                    {activeAnatomy.deliverable}
                  </p>
                  <h3 className="text-lg md:text-xl font-bold text-white tracking-tight leading-snug">
                    {activeAnatomy.title}
                  </h3>
                  <p className="text-xs text-white/90 leading-relaxed">
                    {activeAnatomy.detail}
                  </p>
                  <p className="text-[11px] font-mono-code text-emerald-300 pt-1">
                    ✓ {activeAnatomy.guardrailNote}
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-1.5 pt-2.5 border-t border-white/20">
                  {TECHNICAL_ANATOMY_PILLARS.map((p, idx) => (
                    <button
                      key={p.step}
                      type="button"
                      onClick={() => setActiveAnatomyIdx(idx)}
                      className={`px-2 py-1.5 rounded-md text-left transition-colors cursor-pointer ${activeAnatomyIdx === idx
                          ? 'bg-white text-[#0D5FF9] font-semibold'
                          : 'bg-white/10 text-white/80 hover:bg-white/20'
                        }`}
                    >
                      <span className="block text-[10px] font-mono-code leading-none mb-0.5">
                        {p.step}
                      </span>
                      <span className="block text-[11px] truncate">
                        {p.label}
                      </span>
                    </button>
                  ))}
                </div>
              </MacBookHardwareFrame>
            </div>
          </div>

          {/* Minimalist Interactive 5-Platform Technology Selector Strip */}
          <div className="rounded-[24px] bg-[#131417]/90 border border-white/10 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <p className="text-xs font-mono-code uppercase tracking-widest text-[#7DD3FC]">
                  5. Selecția Platformei & Tehnologiei
                </p>
                <h3 className="text-xl font-bold text-white mt-1">
                  Alegem tehnologia care se potrivește fluxului tău operațional
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {TECH_PLATFORM_STANDARDS.map((tech, idx) => {
                  const isSelected = activeTechIdx === idx;
                  return (
                    <button
                      key={tech.id}
                      type="button"
                      onClick={() => setActiveTechIdx(idx)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${isSelected
                          ? 'bg-[#0D5FF9] text-white'
                          : 'bg-white/[0.05] text-neutral-300 hover:bg-white/10'
                        }`}
                    >
                      {tech.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-4">
                <span className="text-xs font-mono-code text-[#7DD3FC]">
                  {activeTech.badge}
                </span>
                <h4 className="text-2xl font-extrabold text-white mt-1">
                  {activeTech.name}
                </h4>
              </div>
              <div className="md:col-span-4">
                <p className="text-[11px] font-mono-code uppercase text-neutral-400 mb-1">
                  Când o folosim
                </p>
                <p className="text-sm text-neutral-200 leading-relaxed">
                  {activeTech.usedFor}
                </p>
              </div>
              <div className="md:col-span-4">
                <p className="text-[11px] font-mono-code uppercase text-neutral-400 mb-1">
                  Avantaj pentru afacerea ta
                </p>
                <p className="text-sm text-neutral-200 leading-relaxed">
                  {activeTech.benefits}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          BLOCK 04 — REAL CLIENT PORTFOLIO REFERENCES (Theme-Synced Transition)
      ===================================================================== */}
      <section
        id="referinte-portofoliu"
        ref={portfolioRevealRef}
        data-theme-section="true"
        aria-labelledby="creare-portfolio-heading"
        className={`bg-transparent py-24 px-6 md:px-12 lg:px-16 max-w-[1380px] mx-auto transition-all duration-700 ease-out ${isPortfolioVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4'
          }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <SectionHeader
            id="creare-portfolio-heading"
            eyebrow="Referințe Reale din Portofoliul RoGrowth"
            title="Proiecte construite pe Next.js, WordPress & WooCommerce"
            description="Fiecare proiect este verificat uman, optimizat pentru mobil și predat cu 100% drepturi de proprietate."
          />

          <div className="flex items-center gap-1 bg-neutral-100 dark:bg-white/10 p-1.5 rounded-full self-start lg:self-end shrink-0 overflow-x-auto max-w-full transition-colors duration-500">
            {(
              [
                { id: 'todos', label: 'Toate proiectele (6)' },
                { id: 'gobierno', label: 'Clinici & Prezentare' },
                { id: 'experiencia', label: 'Imobiliare & Auto' },
                { id: 'producto', label: 'Magazin Online' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setPortfolioFilter(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${portfolioFilter === tab.id
                    ? 'bg-[#141517] dark:bg-[#0D5FF9] text-white shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-300 hover:text-[#141517] dark:hover:text-white'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              style={{
                transitionDelay: `${computeStaggerDelayMs(idx, 75, 300)}ms`,
              }}
              className={`transition-all duration-700 ease-out ${isPortfolioVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
                }`}
            >
              <BrowserProjectCard
                project={project}
                onSelect={onSelectProject}
              />
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          BLOCK 04B — WHAT PEOPLE SAY / IMPRESSIONS SECTION (Stagger Testimonials)
      ===================================================================== */}
      <StaggerTestimonialsSection />

      {/* =====================================================================
          BLOCK 05 — COMMERCIAL TRANSPARENCY, OWNERSHIP & MINIMAL FAQ
      ===================================================================== */}
      <section
        id="proprietate-si-faq"
        data-theme-section="true"
        aria-labelledby="ownership-faq-heading"
        className="py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-transparent text-[#141517] transition-colors duration-500 ease-out"
      >
        <div className="max-w-[1240px] mx-auto">
          <div className="rounded-[32px] bg-neutral-50/70 border border-neutral-200/80 p-8 md:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
            {/* Left Column: Anti-Lock-In & Ownership Rules + Core Web Vitals Card */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="text-[11px] font-mono-code uppercase tracking-wider text-neutral-500 font-semibold">
                  Drepturi Depline ale Clientului · Fără Vendor Lock-In
                </div>

                <h2
                  id="ownership-faq-heading"
                  className="text-[clamp(1.9rem,3.2vw,2.75rem)] font-bold tracking-[-0.035em] leading-[1.1] text-[#141517] text-balance"
                >
                  100% Codul Tău. 0% Dependență Forțată.
                </h2>

                <p className="text-[14px] md:text-[15px] text-neutral-600 leading-[1.65]">
                  Domeniul web (.ro, .com) se înregistrează strict pe numele companiei tale. La plata finală primești tot codul sursă, baza de date și activele grafice. Poți găzdui site-ul pe propriul server sau prin serviciul administrat RoGrowth (uptime, securitate, backup-uri).
                </p>

                <button
                  type="button"
                  onClick={() =>
                    handlePreselectAndScrollToForm(
                      'Site de prezentare simplu (€300 – €400)'
                    )
                  }
                  className="group inline-flex items-center gap-2.5 pt-1 text-[14px] font-semibold text-[#141517] hover:text-[#0D5FF9] transition-colors cursor-pointer"
                >
                  <span className="w-6 h-6 rounded-full bg-neutral-100 group-hover:bg-[#0D5FF9] group-hover:text-white text-[#141517] flex items-center justify-center transition-all group-hover:translate-x-0.5">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span>Ai o întrebare tehnică? Scrie-ne direct</span>
                </button>
              </div>

              <CoreWebVitalsCard
                mode="light"
                previewImage="/assets/aistudio/ekonstudio_showcase.webp"
                previewAlt="Standard Tehnic RoGrowth — EKON Studio — 100% proprietate client și performanță maximă"
              />
            </div>

            {/* Right Column: Minimalist Commercial & SEO FAQ Accordion */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <ElectricFaqAccordion items={CREARE_SITE_FAQ_ITEMS} variant="minimal" />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          BLOCK 06 — DOT-MATRIX STUDIO COLLAGE + PRE-SELECTED QUOTE FORM
      ===================================================================== */}
      <section
        id="creare-site-oferta"
        ref={quoteRevealRef}
        data-theme-section="true"
        aria-labelledby="creare-oferta-heading"
        className={`py-24 px-6 md:px-12 lg:px-16 max-w-[1340px] mx-auto bg-transparent transition-all duration-700 ease-out ${isQuoteVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4'
          }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Dot-Matrix Studio Collage (.bg-onlines-dots) */}
          <div className="lg:col-span-6 relative min-h-[520px] md:min-h-[580px] bg-onlines-dots rounded-3xl p-4 flex items-center justify-center overflow-hidden border border-neutral-200/60 dark:border-white/10 transition-colors duration-500">
            <svg
              viewBox="0 0 400 300"
              className="w-[360px] h-[260px] text-neutral-200/60 select-none pointer-events-none"
              fill="none"
              aria-hidden="true"
            >
              <text
                x="24"
                y="225"
                fontSize="210"
                fontWeight="800"
                stroke="currentColor"
                strokeWidth="2"
                fontFamily="Plus Jakarta Sans, sans-serif"
              >
                RO
              </text>
            </svg>

            {/* Top-Left: Google Search Console & Core Web Vitals Card */}
            <div className="absolute top-[5%] left-[3%] w-[275px] sm:w-[310px] rounded-2xl bg-white p-4 shadow-[0_12px_35px_rgba(0,0,0,0.06)] border border-neutral-200/80 z-10">
              <div className="flex items-center justify-between text-[10px] text-neutral-500 font-medium mb-2">
                <span>Google Search Console (Inclus)</span>
                <span className="text-emerald-600 font-mono-code font-bold">
                  HTTPS + Sitemap
                </span>
              </div>
              <div className="relative h-24 w-full">
                <svg
                  viewBox="0 0 240 80"
                  className="w-full h-full overflow-visible"
                  fill="none"
                >
                  <line
                    x1="0"
                    y1="15"
                    x2="240"
                    y2="15"
                    stroke="#F3F4F6"
                    strokeWidth="1"
                  />
                  <line
                    x1="0"
                    y1="45"
                    x2="240"
                    y2="45"
                    stroke="#F3F4F6"
                    strokeWidth="1"
                  />
                  <path
                    d="M0 68 L28 58 L56 42 L88 46 L122 28 L158 32 L196 16 L240 8"
                    stroke="#0D5FF9"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="mt-2 flex items-center justify-between text-[9.5px] font-mono-code text-neutral-400">
                <span>Link Privat Preview</span>
                <span>QA Formulare & DNS</span>
                <span>Indexare Ziua 1</span>
              </div>
            </div>

            {/* Top-Right: Real Project Preview (RentDacia) */}
            <div className="absolute top-[6%] right-[4%] w-[205px] sm:w-[235px] -rotate-6 z-20">
              <div className="rounded-2xl bg-white p-2 shadow-[0_16px_40px_rgba(0,0,0,0.1)] border border-neutral-200/80">
                <div className="rounded-xl overflow-hidden aspect-[16/10] bg-neutral-100">
                  <img
                    src="/assets/aistudio/rentdacia_dfda43e0.webp"
                    alt="Rent Dacia București (rentdacia.ro) — Închirieri auto"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            {/* Floating Studio Tool Squircles */}
            <div className="absolute top-[46%] left-[8%] z-20 animate-float-slow">
              <ToolSquircle tool="nextjs" />
            </div>

            <div className="absolute top-[44%] right-[18%] z-20 animate-float-slow">
              <ToolSquircle tool="figma" />
            </div>

            <div className="absolute bottom-[30%] right-[3%] z-30 animate-float-slow">
              <ToolSquircle tool="vscode" />
            </div>

            {/* Bottom-Left: Real Project Preview (Baristas Coffee) */}
            <div className="absolute bottom-[6%] left-[8%] w-[215px] sm:w-[250px] -rotate-3 z-20">
              <div className="rounded-2xl bg-white p-2 shadow-[0_16px_40px_rgba(0,0,0,0.09)] border border-neutral-200/80">
                <div className="rounded-xl overflow-hidden aspect-[16/10] bg-neutral-900">
                  <img
                    src="/assets/aistudio/BARSITAS_bc81f494.webp"
                    alt="Baristas Coffee Shop (baristas.ro) — Magazin online WooCommerce"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            {/* Bottom-Right: Notification Bubble */}
            <div className="hidden sm:block absolute bottom-[9%] right-[6%] z-20">
              <OnlinesNotificationBubble
                compact
                timeAgo="< 24h"
                message="Răspuns rapid pe WhatsApp & telefon."
                onClick={() =>
                  window.open(
                    ROGROWTH_CONTACT.whatsappHref,
                    '_blank',
                    'noopener,noreferrer'
                  )
                }
              />
            </div>
          </div>

          {/* Right Column: Validated Inline Quote Form */}
          <div className="lg:col-span-6 lg:pl-6 space-y-6">
            <div>
              <p className="text-xs font-mono-code uppercase tracking-widest text-[#0D5FF9] dark:text-[#7DD3FC] mb-2 transition-colors duration-500">
                Diagnostic Gratuit & Ofertă Scrisă în &lt; 24h
              </p>
              <h2
                id="creare-oferta-heading"
                className="text-[clamp(2.15rem,4.2vw,3.5rem)] font-extrabold tracking-[-0.04em] leading-[1.05] text-[#141517] dark:text-white transition-colors duration-500"
              >
                Începem proiectul tău web?
              </h2>
              <p className="mt-3 text-[15px] md:text-[16px] text-neutral-500 dark:text-neutral-300 font-normal leading-[1.6] transition-colors duration-500">
                Spune-ne pe scurt ce vinde afacerea ta. Analizăm nevoia ta reală și revenim în mai puțin de 24 de ore cu recomandarea tehnică, prețul fix și termenul de livrare.
              </p>
            </div>

            {inlineSubmitted ? (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 space-y-3">
                <div className="flex items-center gap-2.5 text-emerald-800 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Am primit solicitarea ta, {inlineName}!</span>
                </div>
                <p className="text-sm text-emerald-900/80 leading-relaxed">
                  Echipa RoGrowth analizează detaliile pentru{' '}
                  <strong>{inlineOrg}</strong> ({inlineService}) și îți răspunde în{' '}
                  <strong>sub 24 de ore</strong> pe <strong>{inlineEmail}</strong> cu
                  diagnosticul și oferta fixă în scris.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setInlineName('');
                    setInlineEmail('');
                    setInlineOrg('');
                    setInlineMessage('');
                    setInlineSubmitted(false);
                  }}
                  className="text-xs font-semibold text-emerald-800 underline cursor-pointer"
                >
                  Trimite o altă cerere de ofertă
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleInlineSubmit}
                noValidate
                aria-label="Formular ofertă creare site web RoGrowth.ro"
                className="rounded-[24px] bg-neutral-50 dark:bg-[#131417] border border-neutral-200/80 dark:border-white/10 p-6 space-y-4 shadow-sm transition-colors duration-500 ease-out"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label
                      htmlFor="creare-name"
                      className="block text-xs font-semibold text-[#141517] dark:text-neutral-100 mb-1 transition-colors duration-500"
                    >
                      Nume și prenume
                    </label>
                    <input
                      id="creare-name"
                      type="text"
                      value={inlineName}
                      onChange={(e) => setInlineName(e.target.value)}
                      placeholder="Ex. Andrei Popescu"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#0B0C0E] dark:text-white border border-neutral-200 dark:border-white/15 text-sm focus:outline-none focus:border-[#0D5FF9] transition-colors duration-500"
                    />
                    {inlineErrors.name && (
                      <p className="mt-1 text-xs text-red-600">
                        {inlineErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="creare-email"
                      className="block text-xs font-semibold text-[#141517] dark:text-neutral-100 mb-1 transition-colors duration-500"
                    >
                      Adresă de e-mail
                    </label>
                    <input
                      id="creare-email"
                      type="email"
                      value={inlineEmail}
                      onChange={(e) => setInlineEmail(e.target.value)}
                      placeholder="contact@afacereata.ro"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#0B0C0E] dark:text-white border border-neutral-200 dark:border-white/15 text-sm focus:outline-none focus:border-[#0D5FF9] transition-colors duration-500"
                    />
                    {inlineErrors.email && (
                      <p className="mt-1 text-xs text-red-600">
                        {inlineErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label
                      htmlFor="creare-org"
                      className="block text-xs font-semibold text-[#141517] dark:text-neutral-100 mb-1 transition-colors duration-500"
                    >
                      Companie / Domeniu activitate
                    </label>
                    <input
                      id="creare-org"
                      type="text"
                      value={inlineOrg}
                      onChange={(e) => setInlineOrg(e.target.value)}
                      placeholder="Ex. Clinică / Imobiliare / D2C"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#0B0C0E] dark:text-white border border-neutral-200 dark:border-white/15 text-sm focus:outline-none focus:border-[#0D5FF9] transition-colors duration-500"
                    />
                    {inlineErrors.organization && (
                      <p className="mt-1 text-xs text-red-600">
                        {inlineErrors.organization}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="creare-service"
                      className="block text-xs font-semibold text-[#141517] dark:text-neutral-100 mb-1 transition-colors duration-500"
                    >
                      Tipul de site dorit
                    </label>
                    <select
                      id="creare-service"
                      value={inlineService}
                      onChange={(e) => setInlineService(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#0B0C0E] dark:text-white border border-neutral-200 dark:border-white/15 text-sm focus:outline-none focus:border-[#0D5FF9] transition-colors duration-500"
                    >
                      <option value="Site de prezentare simplu (€300 – €400)">
                        Site de prezentare simplu (€300 – €400)
                      </option>
                      <option value="Site avansat orientat spre conversie (€700 – €1.200)">
                        Site avansat orientat spre conversie (€700 – €1.200)
                      </option>
                      <option value="Magazin online / Aplicație web (€1.000 – €2.300+)">
                        Magazin online / Aplicație web (€1.000 – €2.300+)
                      </option>
                      <option value="Site cu programări online / Landing Page Ads">
                        Site cu programări online / Landing Page Ads
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="creare-message"
                    className="block text-xs font-semibold text-[#141517] dark:text-neutral-100 mb-1 transition-colors duration-500"
                  >
                    Detalii despre proiect și obiectiv
                  </label>
                  <textarea
                    id="creare-message"
                    rows={2}
                    value={inlineMessage}
                    onChange={(e) => setInlineMessage(e.target.value)}
                    placeholder="Ce servicii sau produse oferi și în cât timp dorești lansarea?"
                    className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-[#0B0C0E] dark:text-white border border-neutral-200 dark:border-white/15 text-sm focus:outline-none focus:border-[#0D5FF9] transition-colors duration-500"
                  />
                  {inlineErrors.message && (
                    <p className="mt-1 text-xs text-red-600">
                      {inlineErrors.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      type="submit"
                      className="px-7 py-3.5 rounded-full bg-[#0D5FF9] hover:bg-[#004AD9] text-white text-sm font-semibold tracking-tight transition-all duration-200 shadow-[0_10px_25px_rgba(13,95,249,0.25)] inline-flex items-center gap-2 cursor-pointer whitespace-nowrap"
                    >
                      <span>Solicită oferta în scris</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <a
                      href={ROGROWTH_CONTACT.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Scrie pe WhatsApp la ${ROGROWTH_CONTACT.phoneDisplay}`}
                      className="px-5 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold tracking-tight transition-colors shadow-[0_8px_20px_rgba(5,150,105,0.22)] inline-flex items-center gap-2 whitespace-nowrap"
                    >
                      <WhatsAppIcon className="w-4 h-4 shrink-0" />
                      <span>WhatsApp</span>
                    </a>
                  </div>

                  <span className="text-xs font-mono-code text-neutral-400">
                    30% avans · 100% proprietatea ta
                  </span>
                </div>
              </form>
            )}

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs text-neutral-500 dark:text-neutral-400">
              <a
                href={ROGROWTH_CONTACT.phoneHref}
                className="inline-flex items-center gap-1.5 font-semibold text-[#141517] dark:text-white hover:text-[#0D5FF9] transition-colors tabular-nums"
              >
                <Phone className="w-3.5 h-3.5 text-[#0D5FF9] shrink-0" aria-hidden="true" />
                <span>{ROGROWTH_CONTACT.phoneDisplay}</span>
              </a>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" aria-hidden="true" />
                <span>{ROGROWTH_CONTACT.addressFull}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Branded Wordmark Footer */}
      <RoGrowthWordmarkFooter
        data-theme-section="true"
        onOpenLegalModal={onOpenLegalModal}
        onNavigate={(path) => {
          if (path === '/creare-siteweb') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (path === '/design-system') {
            onNavigateDesignSystem();
          } else if (path === '/' || path === '') {
            onNavigateHome();
          } else if (typeof window !== 'undefined') {
            window.location.href = path;
          }
        }}
      />

      {/* Popover input for adding a canvas comment */}
      {showCommentInput && (
        <div className="fixed bottom-20 left-6 z-50 bg-white rounded-2xl p-4 shadow-2xl border border-neutral-200 w-72">
          <form onSubmit={handleAddCommentSubmit} className="space-y-2.5">
            <label
              htmlFor="creare-canvas-comment-input"
              className="block text-xs font-semibold text-[#141517]"
            >
              Lasă o notă pe canvas-ul /creare-siteweb
            </label>
            <input
              id="creare-canvas-comment-input"
              type="text"
              value={commentDraft}
              onChange={(e) => setCommentDraft(e.target.value)}
              placeholder="Ex: Vreau site de prezentare în 3 săptămâni"
              className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-200 focus:outline-none focus:border-[#0D5FF9]"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowCommentInput(false)}
                className="px-2.5 py-1 text-xs text-neutral-500 hover:text-neutral-800"
              >
                Anulează
              </button>
              <button
                type="submit"
                className="px-3 py-1 rounded-full bg-[#0D5FF9] text-white text-xs font-medium hover:bg-[#004AD9]"
              >
                Publică nota
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Bottom-Left Floating Studio Canvas Toolbar */}
      <div
        role="toolbar"
        aria-label="Instrumente canvas Creare Site Web"
        className="fixed bottom-5 left-5 z-40 bg-white/95 backdrop-blur-md border border-neutral-200/80 rounded-full p-1.5 shadow-[0_8px_25px_rgba(0,0,0,0.07)] flex items-center gap-1"
      >
        <button
          type="button"
          onClick={onNavigateHome}
          aria-label="Înapoi la Homepage"
          className="px-3 h-8 rounded-full bg-neutral-100 hover:bg-[#141517] hover:text-white text-[#141517] text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>Acasă</span>
        </button>
        <button
          type="button"
          onClick={() => setShowGrid((prev) => !prev)}
          aria-label="Comută grila arhitecturală"
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${showGrid
              ? 'bg-neutral-100 text-[#0D5FF9]'
              : 'text-neutral-400 hover:bg-neutral-100'
            }`}
        >
          <Grid className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setShowCommentInput((prev) => !prev)}
          aria-label="Adaugă comentariu pe canvas"
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${showCommentInput
              ? 'bg-[#0D5FF9] text-white'
              : 'text-neutral-500 hover:bg-neutral-100'
            }`}
        >
          <MessageSquarePlus className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setStudioMode((prev) => !prev)}
          aria-label="Comută Mod Studio din bară"
          className={`px-2.5 h-8 rounded-full flex items-center gap-1 text-[11px] font-semibold transition-colors cursor-pointer ${studioMode
              ? 'bg-violet-100 text-violet-700'
              : 'bg-neutral-100 text-neutral-500'
            }`}
        >
          <Sparkles className="w-3 h-3" />
          <span>Studio</span>
        </button>
      </div>
    </div>
  );
}
