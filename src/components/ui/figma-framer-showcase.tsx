import React, { useState } from 'react';
import {
  ArrowRight,
  Clock,
  DollarSign,
  Flame,
  Heart,
  RefreshCw,
  Star,
} from 'lucide-react';
import { useSectionReveal } from './StudioPrimitives';

export const FIGMA_LOGO_3D_SRC =
  '/assets/aistudio/image-removebg-preview__1__3bdc6261.webp';
export const FRAMER_LOGO_3D_SRC =
  '/assets/aistudio/image-removebg-preview_60b15c00.webp';

export type PriorityOptionId = 'good' | 'fast' | 'cheap';
export type PriorityPairKey = 'good-fast' | 'good-cheap' | 'fast-cheap';

export interface PriorityOptionSpec {
  id: PriorityOptionId;
  label: string;
  enSublabel: string;
  description: string;
}

export interface PickTwoPackageSpec {
  pairKey: PriorityPairKey;
  titleLeft: string;
  titleRight: string;
  badgeText: string;
  priceDisplay: string;
  priceRangeNote: string;
  turnaroundText: string;
  revisionsText: string;
  figmaDeliverable: string;
  framerDeliverable: string;
  ctaLabel: string;
  presetServiceOption: string;
}

export interface LayeredShowcaseCardItem {
  id: string;
  projectId: string;
  title: string;
  client: string;
  metricTag: string;
  primaryImage: string;
  secondaryImage: string;
  surfaceClass: string;
}

export const PRIORITY_OPTIONS: PriorityOptionSpec[] = [
  {
    id: 'good',
    label: 'Calitate Maximă (Good)',
    enSublabel: 'Design unic & arhitectură custom',
    description: 'Design UI/UX de top în Figma, zero șabloane',
  },
  {
    id: 'fast',
    label: 'Livrare Rapidă (Fast)',
    enSublabel: 'Prioritate în producție',
    description: 'Livrat în zile sau 2 săpt., nu luni de zile',
  },
  {
    id: 'cheap',
    label: 'Buget Optim (Cheap)',
    enSublabel: 'Cost minim de intrare',
    description: 'Soluție eficientă pentru buget de start',
  },
];

export const PICK_TWO_PACKAGES: Record<PriorityPairKey, PickTwoPackageSpec> = {
  'good-fast': {
    pairKey: 'good-fast',
    titleLeft: 'Calitate',
    titleRight: 'Viteză',
    badgeText: 'Cel mai ales',
    priceDisplay: '€700',
    priceRangeNote: 'Pachet Conversie & Lead-Gen (€700 – €1.200)',
    turnaroundText: 'Medie 2 – 3 săptămâni timp de livrare',
    revisionsText: 'Până la 3 runde structurate de revizii',
    figmaDeliverable: 'Design UI/UX custom în Figma & prototip interactiv',
    framerDeliverable: 'Dezvoltare în Framer / Next.js (100/100 PageSpeed)',
    ctaLabel: 'Rezervă discuția gratuită',
    presetServiceOption: 'Site avansat orientat spre conversie (€700 – €1.200)',
  },
  'good-cheap': {
    pairKey: 'good-cheap',
    titleLeft: 'Calitate',
    titleRight: 'Buget',
    badgeText: 'Fără grabă',
    priceDisplay: '€350',
    priceRangeNote: 'Pachet Site Prezentare (€300 – €400)',
    turnaroundText: 'Medie 3 – 4 săptămâni timp de livrare',
    revisionsText: '2 runde majore de revizii incluse în contract',
    figmaDeliverable: 'Design în Figma adaptat identității brandului tău',
    framerDeliverable: 'Implementare curată Framer / Next.js & SEO tehnic',
    ctaLabel: 'Solicită pachetul de €350',
    presetServiceOption: 'Site de prezentare simplu (€300 – €400)',
  },
  'fast-cheap': {
    pairKey: 'fast-cheap',
    titleLeft: 'Viteză',
    titleRight: 'Buget',
    badgeText: 'Validare & Ads',
    priceDisplay: '€250',
    priceRangeNote: 'Landing Page One-Page pentru Google & Meta Ads',
    turnaroundText: 'Medie 5 – 7 zile lucrătoare până la live',
    revisionsText: '1 rundă rapidă de revizii înainte de publicare',
    figmaDeliverable: 'Structură de conversie în Figma orientată pe ofertă',
    framerDeliverable: 'Personalizare rapidă Framer / Next.js cu scor 100/100',
    ctaLabel: 'Lansează Landing Page-ul',
    presetServiceOption: 'Site cu programări online / Landing Page Ads',
  },
};

export const LAYERED_SHOWCASE_CARDS: LayeredShowcaseCardItem[] = [
  {
    id: 'showcase-kasata',
    projectId: 'kasata-imobiliare',
    title: 'Kasata Imobiliare — Portal & Filtre',
    client: 'kasata.ro',
    metricTag: '+165% Cereri Calificate',
    primaryImage: '/assets/aistudio/kasataaa_b747262d.webp',
    secondaryImage: '/assets/aistudio/kasataaa_mobile__b747262d.webp',
    surfaceClass: 'from-[#181920] via-[#222533] to-[#14151B]',
  },
  {
    id: 'showcase-dental',
    projectId: 'dental-crown-health',
    title: 'Dental Crown Health — Clinică Bilingvă',
    client: 'dentalcrownhealth.ro',
    metricTag: '100/100 Core Web Vitals',
    primaryImage: '/assets/aistudio/dentalcrownhealth_1219211c.webp',
    secondaryImage: '/assets/aistudio/dentalcrownhealth_mobile__75075119.webp',
    surfaceClass: 'from-[#F7F3EE] via-[#EFE9E1] to-[#E6DEC8]',
  },
  {
    id: 'showcase-rentdacia',
    projectId: 'rentdacia-bucuresti',
    title: 'RentDacia Otopeni — Rezervări Flotă',
    client: 'rentdacia.ro',
    metricTag: 'Rezervare în < 60 sec',
    primaryImage: '/assets/aistudio/rentdacia_dfda43e0.webp',
    secondaryImage: '/assets/aistudio/rentdacia_mobile__a38acbc2.webp',
    surfaceClass: 'from-[#1E1638] via-[#2E2257] to-[#141026]',
  },
  {
    id: 'showcase-baristas',
    projectId: 'baristas-coffee',
    title: 'Baristas Specialty Coffee — E-Commerce',
    client: 'baristas.ro',
    metricTag: 'Checkout & AWB Automat',
    primaryImage: '/assets/aistudio/BARSITAS_bc81f494.webp',
    secondaryImage: '/assets/aistudio/BARSITAS_mobile__8aa0fb37.webp',
    surfaceClass: 'from-[#EEF4FA] via-[#E1ECF7] to-[#D4E3F3]',
  },
  {
    id: 'showcase-dubairent',
    projectId: 'dubai-rent-luxury',
    title: 'Dubai Rent Luxury — Landing Page Ads',
    client: 'dubairent.ro',
    metricTag: 'Conversie Directă WhatsApp',
    primaryImage: '/assets/aistudio/prject_a99b37d9.webp',
    secondaryImage: '/assets/aistudio/phone-rogrowth_6e9cdc43.webp',
    surfaceClass: 'from-[#15181E] via-[#1E232D] to-[#0F1115]',
  },
];

export const CLIENT_TRUST_BRANDS = [
  'kasata.ro',
  'dentalcrownhealth.ro',
  'rentdacia.ro',
  'baristas.ro',
  'dubairent.ro',
  'agrumea.ro',
];

/**
 * Pure helper: normalizes any 2-element tuple of PriorityOptionId into one of
 * the 3 canonical PriorityPairKey strings ('good-fast' | 'good-cheap' | 'fast-cheap').
 */
export function getPriorityPairKey(
  pair: [PriorityOptionId, PriorityOptionId]
): PriorityPairKey {
  const set = new Set(pair);
  if (set.has('good') && set.has('fast')) return 'good-fast';
  if (set.has('good') && set.has('cheap')) return 'good-cheap';
  return 'fast-cheap';
}

/**
 * Pure state transition for the "Good, Fast, Cheap — Pick Two" switches:
 * - Always keeps exactly 2 options active.
 * - If user clicks the currently inactive 3rd option, it turns ON that option and
 *   turns OFF the oldest active option (`[a, b]` + `c` -> `[b, c]`).
 * - If user clicks an option that is currently ON, it turns OFF that option and
 *   activates the remaining 3rd option so the user immediately sees the alternative pair.
 */
export function resolveNextPriorityPair(
  current: [PriorityOptionId, PriorityOptionId],
  toggled: PriorityOptionId
): [PriorityOptionId, PriorityOptionId] {
  const allOptions: PriorityOptionId[] = ['good', 'fast', 'cheap'];
  const isCurrentlyActive = current.includes(toggled);

  if (!isCurrentlyActive) {
    // Keep the most recently selected option (current[1]) and add the newly toggled one
    return [current[1], toggled];
  }

  // Toggling off an active option: keep the other active option and turn on the 3rd option
  const remainingActive = current[0] === toggled ? current[1] : current[0];
  const thirdOption =
    allOptions.find((opt) => opt !== current[0] && opt !== current[1]) || 'cheap';
  return [remainingActive, thirdOption];
}

interface FigmaFramerShowcaseSectionProps {
  onOpenContact: (presetService?: string) => void;
  onSelectProjectById?: (projectId: string) => void;
  variant?: 'homepage' | 'creare-site';
}

export function FigmaFramerShowcaseSection({
  onOpenContact,
  onSelectProjectById,
  variant = 'homepage',
}: FigmaFramerShowcaseSectionProps) {
  const { ref: cardRef, isRevealed: isCardRevealed } =
    useSectionReveal<HTMLDivElement>();
  const [activePair, setActivePair] = useState<
    [PriorityOptionId, PriorityOptionId]
  >(['good', 'fast']);

  const pairKey = getPriorityPairKey(activePair);
  const activePackage = PICK_TWO_PACKAGES[pairKey];

  const handleTogglePriority = (optionId: PriorityOptionId) => {
    setActivePair((prev) => resolveNextPriorityPair(prev, optionId));
  };

  return (
    <section
      id={
        variant === 'creare-site'
          ? 'figma-framer-configurator-site'
          : 'figma-framer-showcase'
      }
      data-testid={`figma-framer-section-${variant}`}
      aria-label="Design în Figma și dezvoltare Framer & Next.js cu configurator de priorități"
      className="relative pt-4 pb-20 md:pt-6 md:pb-24 bg-transparent overflow-hidden transition-colors duration-500 ease-out"
    >
      {/* =====================================================================
          PART 1 — REVEALING TILTED CARD WITH FIGMA & FRAMER 3D SQUIRCLE LOGOS
      ===================================================================== */}
      <div className="max-w-[1160px] mx-auto px-6 md:px-10">
        <div className="relative flex flex-col items-center">
          {/* The Tilted Warm-Editorial Reveal Container */}
          <div
            ref={cardRef}
            data-testid="tilted-reveal-card"
            data-revealed={isCardRevealed ? 'true' : 'false'}
            className={`relative w-full max-w-[920px] rounded-[28px] md:rounded-[34px] bg-[#F7F4EE] dark:bg-[#131418] border border-[#EBE5D9] dark:border-white/10 px-7 py-10 sm:px-12 sm:py-14 md:px-16 md:py-16 shadow-[0_24px_60px_-15px_rgba(20,21,23,0.07)] will-change-[transform,opacity] transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isCardRevealed
                ? 'opacity-100 translate-y-0 rotate-[-1.15deg] hover:rotate-[-0.35deg] scale-100'
                : 'opacity-0 translate-y-6 rotate-[0deg] scale-[0.975]'
            }`}
          >
            <div className="max-w-[760px]">
              {/* Staggered Line 1 + Overlapping Figma & Framer 3D Squircle Logos */}
              <div
                className={`transition-all duration-700 delay-100 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isCardRevealed
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="text-[clamp(2.15rem,5vw,4.15rem)] font-extrabold tracking-[-0.04em] leading-[1.02] text-[#1D1B1A] dark:text-white">
                    Landing page
                  </span>
                  <span className="text-[clamp(2.15rem,5vw,4.15rem)] font-serif italic font-normal tracking-[-0.02em] leading-[1.02] text-[#1D1B1A] dark:text-white">
                    design
                  </span>

                  {/* Overlapping 3D Squircle Icons: Figma + Framer */}
                  <div
                    className="inline-flex items-center ml-1 sm:ml-2 select-none"
                    aria-label="Logourile oficiale Figma și Framer"
                  >
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 -rotate-6 transition-all duration-700 delay-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:rotate-0 hover:scale-110 z-10 ${
                        isCardRevealed
                          ? 'opacity-100 scale-100 translate-y-0'
                          : 'opacity-0 scale-75 translate-y-3'
                      }`}
                    >
                      <img
                        src={FIGMA_LOGO_3D_SRC}
                        alt="Figma — Design UI/UX și prototipare interactivă"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.22)]"
                      />
                    </div>
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 -ml-3 sm:-ml-3.5 rotate-12 transition-all duration-700 delay-[260ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:rotate-3 hover:scale-110 z-20 ${
                        isCardRevealed
                          ? 'opacity-100 scale-100 translate-y-0'
                          : 'opacity-0 scale-75 translate-y-3'
                      }`}
                    >
                      <img
                        src={FRAMER_LOGO_3D_SRC}
                        alt="Framer — Animații fluide și site-uri web de înaltă conversie"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,0.26)]"
                      />
                    </div>
                  </div>
                </div>

                {/* Handwritten / Script Annotation Row ("& Site web de prezentare") with curved arrow */}
                <div className="flex items-center gap-1.5 -mt-1 mb-0.5 pl-1">
                  <span className="font-serif italic text-[15px] sm:text-[18px] font-medium text-[#0D5FF9] dark:text-[#7DD3FC] tracking-tight">
                    &amp; Site web de prezentare
                  </span>
                  <svg
                    width="34"
                    height="18"
                    viewBox="0 0 34 18"
                    fill="none"
                    aria-hidden="true"
                    className="text-[#0D5FF9] dark:text-[#7DD3FC] -translate-y-1"
                  >
                    <path
                      d="M2 14C10 15 22 11 30 3M30 3L23 3.5M30 3L29 9.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Staggered Line 2: "care chiar convertește" with self-drawing double underline */}
              <div
                className={`transition-all duration-700 delay-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isCardRevealed
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
              >
                <h2 className="text-[clamp(2.15rem,5vw,4.15rem)] font-extrabold tracking-[-0.04em] leading-[1.04] text-[#1D1B1A] dark:text-white">
                  care chiar{' '}
                  <span className="relative inline-block font-serif italic font-normal text-[#0D5FF9] dark:text-[#7DD3FC]">
                    convertește
                    <svg
                      viewBox="0 0 210 16"
                      fill="none"
                      aria-hidden="true"
                      className={`pointer-events-none absolute left-0 -bottom-2 w-full h-3.5 origin-left transition-transform duration-700 delay-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isCardRevealed ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    >
                      <path
                        d="M3 9.5C52 3.5 145 2.5 207 7.5"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                      />
                      <path
                        d="M18 13.5C70 9.5 148 8.5 196 12"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </h2>
              </div>

              {/* Staggered Line 3: Subtitle */}
              <p
                className={`mt-6 text-[15px] sm:text-[16.5px] text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-[540px] transition-all duration-700 delay-[260ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isCardRevealed
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-3'
                }`}
              >
                Prețuri flexibile și scop adaptat nevoilor și priorităților tale
                reale — proiectat în <strong>Figma</strong> și livrat impecabil în{' '}
                <strong>Framer</strong> sau <strong>Next.js</strong>.
              </p>

              {/* Staggered Line 4: CTA Button + Avatar Stack + 5 Stars */}
              <div
                className={`mt-8 flex flex-wrap items-center gap-5 transition-all duration-700 delay-[340ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isCardRevealed
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-3'
                }`}
              >
                <a
                  href={`#pick-two-configurator-${variant}`}
                  className="px-7 py-3.5 rounded-full bg-[#0D5FF9] hover:bg-[#004AD9] text-white text-[14px] font-bold tracking-tight shadow-[0_10px_25px_rgba(13,95,249,0.28)] transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
                >
                  Vezi Prețurile
                </a>

                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2.5 overflow-hidden p-0.5">
                    {[
                      '/assets/extracted/team_1.png',
                      '/assets/extracted/team_2.png',
                      '/assets/extracted/team_3.png',
                      '/assets/extracted/team_4.png',
                      '/assets/extracted/team_5.png',
                    ].map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={`Client și specialist RoGrowth ${i + 1}`}
                        referrerPolicy="no-referrer"
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-[#F7F4EE] dark:ring-[#131418] object-cover bg-neutral-200"
                      />
                    ))}
                  </div>

                  <div className="flex flex-col">
                    <div
                      className="flex items-center gap-0.5 text-[#0D5FF9] dark:text-[#7DD3FC]"
                      aria-label="Evaluare 5 din 5 stele pentru consistența livrării"
                    >
                      {Array.from({ length: 5 }).map((_, sIdx) => (
                        <Star
                          key={sIdx}
                          className="w-3.5 h-3.5 fill-current"
                        />
                      ))}
                    </div>
                    <span className="text-[11.5px] font-medium text-neutral-600 dark:text-neutral-400">
                      Livrăm constant rezultate măsurabile
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Client & Platform Trust Strip (Matches Video 00:04 -> 00:11) */}
        <div className="mt-10 mb-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 opacity-75">
          {CLIENT_TRUST_BRANDS.map((brand) => (
            <span
              key={brand}
              className="text-[13px] md:text-[14px] font-bold tracking-tight text-neutral-400 dark:text-neutral-500 hover:text-[#141517] dark:hover:text-white transition-colors select-none"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>

      {/* =====================================================================
          PART 2 — HORIZONTAL LAYERED DUAL-PREVIEW PROJECT SHOWCASE STRIP
          (Matches Video 00:04 -> 00:14 — Pure Unencumbered Layered Previews)
      ===================================================================== */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8">
        <div
          role="region"
          aria-label="Galerie interactivă de pagini web și landing page-uri livrate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {LAYERED_SHOWCASE_CARDS.slice(0, 4).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                if (onSelectProjectById) {
                  onSelectProjectById(item.projectId);
                } else {
                  onOpenContact();
                }
              }}
              aria-label={`Deschide studiul de caz ${item.title} (${item.client})`}
              className={`group relative rounded-[24px] bg-gradient-to-br ${item.surfaceClass} p-5 pt-6 pb-0 h-[275px] sm:h-[295px] overflow-hidden text-left shadow-[0_18px_40px_-15px_rgba(0,0,0,0.12)] border border-neutral-200/70 dark:border-white/10 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-end`}
            >
              {/* Layered Main Browser Preview + Tilted Secondary Mobile Preview (Video 00:05–00:13) */}
              <div className="relative w-full h-[245px]">
                {/* Primary Desktop Screen */}
                <div className="absolute left-0 top-1 w-[84%] h-[240px] rounded-t-xl overflow-hidden bg-white shadow-[0_14px_30px_rgba(0,0,0,0.22)] border border-white/40 transition-transform duration-500 group-hover:scale-[1.03] group-hover:-rotate-1">
                  <img
                    src={item.primaryImage}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Overlapping Secondary Mobile/Card Screen */}
                <div className="absolute right-0 bottom-0 w-[45%] h-[205px] rounded-t-xl overflow-hidden bg-[#141517] shadow-[0_18px_36px_rgba(0,0,0,0.34)] border-2 border-b-0 border-white/80 rotate-2 transition-transform duration-500 group-hover:rotate-0 group-hover:translate-x-0.5 group-hover:-translate-y-1 z-10">
                  <img
                    src={item.secondaryImage}
                    alt={`${item.title} — versiune mobilă`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Centered Action Pill Below Strip (Matches "View Recent Work" at 00:12–00:15) */}
        <div className="mt-10 flex justify-center">
          <a
            href={
              variant === 'creare-site' ? '#referinte-portofoliu' : '#portfolio'
            }
            className="px-6 py-3 rounded-full bg-[#0D5FF9] hover:bg-[#004AD9] text-white text-xs font-bold tracking-tight shadow-[0_10px_24px_rgba(13,95,249,0.26)] transition-transform duration-200 hover:scale-105 whitespace-nowrap"
          >
            Vezi Proiectele Recente
          </a>
        </div>
      </div>

      {/* =====================================================================
          PART 3 — "GOOD, FAST, CHEAP. PICK TWO" INTERACTIVE CONFIGURATOR
          (Matches Video 00:15 -> 00:23)
      ===================================================================== */}
      <div
        id={`pick-two-configurator-${variant}`}
        className="max-w-[980px] mx-auto px-6 md:px-10 pt-24 md:pt-28"
      >
        {/* Header with handwritten underline beneath "tale" */}
        <div className="text-center max-w-[650px] mx-auto mb-14">
          <p className="text-xs font-mono-code uppercase tracking-widest text-[#0D5FF9] dark:text-[#7DD3FC] mb-3">
            Prețuri Simple &amp; Flexibile
          </p>
          <h2 className="text-[clamp(2.1rem,4.4vw,3.4rem)] font-extrabold tracking-[-0.035em] leading-[1.08] text-[#141517] dark:text-white text-balance">
            Calitate, viteză, buget.{' '}
            <span className="font-serif italic font-normal text-[#141517] dark:text-white">
              Alege două
            </span>
          </h2>
          <p className="mt-3 text-[15px] md:text-[16.5px] text-neutral-500 dark:text-neutral-300">
            Configurare de preț și livrare adaptată nevoilor{' '}
            <span className="relative inline-block font-semibold text-[#141517] dark:text-white">
              tale
              <svg
                viewBox="0 0 60 10"
                fill="none"
                aria-hidden="true"
                className="pointer-events-none absolute left-0 -bottom-1.5 w-full h-2.5 text-[#0D5FF9] dark:text-[#7DD3FC]"
              >
                <path
                  d="M2 7C18 2.5 42 2.5 58 6.5"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>{' '}
            și priorităților proiectului
          </p>
        </div>

        {/* 2-Column Interactive Pick-Two Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left 6 Cols: The 3 Tactile Toggle Switches */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#141517] dark:text-white tracking-tight">
                Alege ce funcționează pentru tine
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Poți activa simultan doar 2 opțiuni
              </p>
            </div>

            <div className="space-y-4">
              {PRIORITY_OPTIONS.map((option) => {
                const isActive = activePair.includes(option.id);
                return (
                  <div
                    key={option.id}
                    onClick={() => handleTogglePriority(option.id)}
                    className={`group flex items-center justify-between gap-4 p-4 rounded-2xl border transition-all duration-200 cursor-pointer select-none ${
                      isActive
                        ? 'bg-[#FAF8F5] dark:bg-white/[0.06] border-neutral-200/90 dark:border-white/15 shadow-sm'
                        : 'bg-transparent border-transparent opacity-65 hover:opacity-95'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 ${
                          isActive
                            ? 'bg-[#0D5FF9]/12 text-[#0D5FF9] dark:bg-[#0D5FF9]/20 dark:text-[#7DD3FC]'
                            : 'bg-neutral-100 dark:bg-white/10 text-neutral-400'
                        }`}
                      >
                        {option.id === 'good' && <Heart className="w-4 h-4" />}
                        {option.id === 'fast' && <Flame className="w-4 h-4" />}
                        {option.id === 'cheap' && (
                          <DollarSign className="w-4 h-4" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[15px] font-bold text-[#141517] dark:text-white leading-snug">
                          {option.label}
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          {option.description}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      role="switch"
                      aria-checked={isActive}
                      aria-label={`Comută prioritatea ${option.label}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTogglePriority(option.id);
                      }}
                      className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D5FF9] ${
                        isActive
                          ? 'bg-[#0D5FF9]'
                          : 'bg-neutral-200 dark:bg-white/15'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                          isActive ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 6 Cols: Dynamic Resulting Package Card with Figma & Framer Logos */}
          <div className="lg:col-span-6">
            <div
              data-testid={`pick-two-result-card-${variant}`}
              data-active-pair={pairKey}
              className="rounded-[28px] bg-white dark:bg-[#131418] border border-neutral-200/85 dark:border-white/10 p-7 sm:p-9 shadow-[0_24px_60px_-12px_rgba(20,21,23,0.09)] transition-all duration-300"
            >
              {/* Top Combination Header + Status Tag */}
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl sm:text-2xl font-bold text-[#141517] dark:text-white tracking-tight whitespace-nowrap">
                  <span className="font-serif italic font-normal">
                    {activePackage.titleLeft}
                  </span>{' '}
                  &amp;{' '}
                  <span className="font-serif italic font-normal">
                    {activePackage.titleRight}
                  </span>
                </h3>

                <span className="text-[11px] font-mono-code font-semibold text-[#0D5FF9] bg-[#0D5FF9]/10 dark:text-[#7DD3FC] dark:bg-[#0D5FF9]/20 px-3 py-1 rounded-full whitespace-nowrap shrink-0">
                  {activePackage.badgeText}
                </span>
              </div>

              {/* Dynamic Tabular Price */}
              <div className="mt-4 pb-6 border-b border-neutral-100 dark:border-white/10">
                <div className="flex items-baseline gap-2.5">
                  <span
                    data-testid={`pick-two-price-${variant}`}
                    className="text-4xl sm:text-5xl font-extrabold tracking-[-0.04em] text-[#141517] dark:text-white tabular-nums"
                  >
                    {activePackage.priceDisplay}
                  </span>
                  <span className="text-xs font-mono-code text-neutral-400">
                    de la · fără TVA ascuns
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                  {activePackage.priceRangeNote}
                </p>
              </div>

              {/* 4 Deliverable Rows (Turnaround, Revisions, Figma Logo, Framer Logo) */}
              <ul className="py-6 space-y-4">
                <li className="flex items-center gap-3.5 text-[14px] font-medium text-[#141517] dark:text-neutral-100">
                  <span className="w-7 h-7 rounded-lg bg-[#0D5FF9]/10 text-[#0D5FF9] dark:bg-[#0D5FF9]/20 dark:text-[#7DD3FC] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </span>
                  <span>{activePackage.turnaroundText}</span>
                </li>

                <li className="flex items-center gap-3.5 text-[14px] font-medium text-[#141517] dark:text-neutral-100">
                  <span className="w-7 h-7 rounded-lg bg-[#0D5FF9]/10 text-[#0D5FF9] dark:bg-[#0D5FF9]/20 dark:text-[#7DD3FC] flex items-center justify-center shrink-0">
                    <RefreshCw className="w-4 h-4" />
                  </span>
                  <span>{activePackage.revisionsText}</span>
                </li>

                <li className="flex items-center gap-3.5 text-[14px] font-medium text-[#141517] dark:text-neutral-100">
                  <img
                    src={FIGMA_LOGO_3D_SRC}
                    alt="Figma"
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 object-contain shrink-0"
                  />
                  <span>{activePackage.figmaDeliverable}</span>
                </li>

                <li className="flex items-center gap-3.5 text-[14px] font-medium text-[#141517] dark:text-neutral-100">
                  <img
                    src={FRAMER_LOGO_3D_SRC}
                    alt="Framer"
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 object-contain shrink-0"
                  />
                  <span>{activePackage.framerDeliverable}</span>
                </li>
              </ul>

              {/* Primary CTA Button */}
              <button
                type="button"
                onClick={() => onOpenContact(activePackage.presetServiceOption)}
                className="w-full py-3.5 px-6 rounded-full bg-[#0D5FF9] hover:bg-[#004AD9] text-white text-[14px] font-bold tracking-tight shadow-[0_12px_28px_rgba(13,95,249,0.28)] transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{activePackage.ctaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="mt-3 text-center text-[11.5px] text-neutral-400">
                Nicio plată la apelul de diagnostic. Zero obligații.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
