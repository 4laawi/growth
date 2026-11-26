import React, { useState, useEffect, useRef } from 'react';
import {
  PortfolioProject,
  ServiceCardItem,
  WorkshopFaqItem,
  computeSectionRevealState,
} from '../../data/studioData';
import { getPricingVariantClasses } from '../../design-system/tokens';
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Plus,
} from 'lucide-react';

/**
 * Featherlight IntersectionObserver-driven reveal hook.
 * Zero scroll event listeners and zero continuous rAF loops — triggers a single
 * compositor-friendly opacity + translate3d CSS transition when entering the viewport.
 */
export function useSectionReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [isRevealed, setIsRevealed] = useState<boolean>(() => {
    if (
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsRevealed(true);
      return;
    }

    const evaluate = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      setIsRevealed((prev) =>
        computeSectionRevealState(rect.top, rect.bottom, vh, prev)
      );
    };

    evaluate();

    const io = new IntersectionObserver(
      () => {
        evaluate();
      },
      {
        threshold: [0, 0.15, 0.3, 0.45],
        rootMargin: '0px 0px -36% 0px',
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, isRevealed };
}

/**
 * 1. Signature Figma Selection Frame
 * Used around hero H1s, dark-mode philosophy titles ("Ziua 1, nu Ziua 100"),
 * and money-page value propositions.
 */
export function FigmaSelectionFrame({
  children,
  mode = 'light',
  showMidHandles = true,
  badgeLabel,
  onBadgeClick,
  className = '',
}: {
  children: React.ReactNode;
  mode?: 'light' | 'dark';
  showMidHandles?: boolean;
  badgeLabel?: string;
  onBadgeClick?: () => void;
  className?: string;
}) {
  const isDark = mode === 'dark';
  const frameBorder = isDark ? 'border-white/25' : 'border-[#0D5FF9]/35';
  const handleClass = isDark
    ? 'w-2 h-2 bg-[#131417] border border-white/40'
    : 'w-2.5 h-2.5 bg-white border border-[#0D5FF9]';

  return (
    <div className={`relative ${className}`}>
      <div
        className={`absolute inset-0 border ${frameBorder} pointer-events-none transition-colors duration-500 ease-out`}
        aria-hidden="true"
      >
        <span className={`absolute -top-1.5 -left-1.5 ${handleClass}`} />
        {showMidHandles && (
          <span
            className={`absolute -top-1.5 left-1/2 -translate-x-1/2 ${handleClass}`}
          />
        )}
        <span className={`absolute -top-1.5 -right-1.5 ${handleClass}`} />
        <span className={`absolute -bottom-1.5 -left-1.5 ${handleClass}`} />
        {showMidHandles && (
          <span
            className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 ${handleClass}`}
          />
        )}
        <span className={`absolute -bottom-1.5 -right-1.5 ${handleClass}`} />
      </div>

      {children}

      {badgeLabel && (
        <button
          type="button"
          onClick={onBadgeClick}
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-30 px-5 py-1.5 rounded-full bg-[#0D5FF9] hover:bg-[#004AD9] text-white text-[12px] font-semibold tracking-tight shadow-[0_8px_22px_rgba(13,95,249,0.28)] whitespace-nowrap cursor-pointer transition-transform duration-200 hover:scale-105"
        >
          {badgeLabel}
        </button>
      )}
    </div>
  );
}

/**
 * 2. Standardized Studio Section Header
 * Combines the JetBrains Mono uppercase kicker, tight Plus Jakarta Sans H2,
 * optional architectural dashed guide lines, and optional lead description.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  id,
  theme = 'light',
  align = 'left',
  dashedGuides = false,
  className = '',
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  id?: string;
  theme?: 'light' | 'dark';
  align?: 'left' | 'center';
  dashedGuides?: boolean;
  className?: string;
}) {
  const isDark = theme === 'dark';
  const alignClasses = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`${alignClasses} ${className}`}>
      {eyebrow && (
        <p
          className={`text-xs font-mono-code uppercase tracking-widest mb-2.5 transition-colors duration-500 ease-out ${isDark
            ? 'text-[#7DD3FC]'
            : 'text-[#0D5FF9] dark:text-[#7DD3FC]'
            }`}
        >
          {eyebrow}
        </p>
      )}

      <div className={`relative ${dashedGuides ? 'max-w-[460px]' : ''}`}>
        {dashedGuides && (
          <>
            <div
              className="hidden sm:block absolute inset-x-0 top-[47%] border-b border-dashed border-neutral-200/90 dark:border-white/15 transition-colors duration-500 ease-out pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="hidden sm:block absolute inset-x-0 bottom-[2px] border-b border-dashed border-neutral-200/90 dark:border-white/15 transition-colors duration-500 ease-out pointer-events-none"
              aria-hidden="true"
            />
          </>
        )}
        <h2
          id={id}
          className={`relative text-[clamp(2rem,4vw,3.45rem)] font-extrabold tracking-[-0.035em] leading-[1.06] text-balance transition-colors duration-500 ease-out ${isDark ? 'text-white' : 'text-[#141517] dark:text-white'
            }`}
        >
          {title}
        </h2>
      </div>

      {description && (
        <p
          className={`mt-3 text-[15px] md:text-[16px] leading-[1.6] transition-colors duration-500 ease-out ${align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-xl'
            } ${isDark
              ? 'text-neutral-300'
              : 'text-neutral-500 dark:text-neutral-300'
            }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/**
 * 3. Signature Cobalt Pricing & Deliverable Card
 * Locked-in commercial tier card used on Homepage and dedicated money pages.
 */
export function PricingTierCard({
  card,
  onSelect,
}: {
  card: ServiceCardItem;
  onSelect: (card: ServiceCardItem) => void;
}) {
  const bgStyles = getPricingVariantClasses(card.variant);

  return (
    <div className="flex flex-col">
      <div
        onClick={() => onSelect(card)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(card);
          }
        }}
        aria-label={`${card.title} (${card.priceBadge}) — Vezi detalii și livrabile`}
        className={`group relative rounded-2xl p-7 md:p-8 min-h-[500px] lg:min-h-[530px] text-white flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-[0_18px_40px_rgba(13,95,249,0.16)] cursor-pointer flex-1 ${bgStyles}`}
      >
        <div>
          {/* Top Index */}
          <div className="flex items-center text-xs font-mono-code text-white/80 pb-4 mb-5 border-b border-white/15">
            <span>{card.number}. PACHET</span>
          </div>

          {/* Prominent Price Display */}
          <div className="mb-4">
            <span className="text-[28px] lg:text-[32px] font-extrabold tracking-tight text-white tabular-nums block">
              {card.priceBadge}
            </span>
          </div>

          <h3 className="text-[20px] lg:text-[22px] font-bold tracking-[-0.025em] leading-[1.2] mb-3 text-balance">
            {card.title}
          </h3>

          <p className="text-[13px] lg:text-[13.5px] text-white/85 leading-relaxed font-normal mb-5">
            {card.cardDescription}
          </p>

          {/* Concrete Deliverables directly visible on card */}
          <ul className="space-y-2.5 border-t border-white/15 pt-4 text-[12.5px] text-white/95">
            {card.deliverables.slice(0, 3).map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-sky-200 shrink-0 mt-0.5" />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-7 flex items-center justify-between">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(card);
            }}
            className="w-full px-5 py-3 rounded-full bg-white text-[#0D5FF9] hover:bg-neutral-100 text-[13px] font-bold tracking-tight transition-colors whitespace-nowrap shrink-0 cursor-pointer text-center shadow-sm"
          >
            {card.ctaLabel || 'Vezi livrabile & comandă →'}
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * 4. Vibrant Electric-Blue (#1D1CFF) Objection & FAQ Accordion Card (with Minimal variant support)
 */
export function ElectricFaqAccordion({
  items,
  defaultOpenId,
  variant = 'electric',
}: {
  items: WorkshopFaqItem[];
  defaultOpenId?: string;
  variant?: 'electric' | 'minimal';
}) {
  const [openFaqId, setOpenFaqId] = useState<string>(
    defaultOpenId ?? (items[0]?.id || '')
  );

  if (variant === 'minimal') {
    return (
      <div className="rounded-[24px] bg-white border border-neutral-200/80 p-6 md:p-8 lg:p-9 flex flex-col justify-center shadow-[0_2px_16px_rgba(0,0,0,0.02)]">
        <div className="divide-y divide-neutral-100">
          {items.map((item) => {
            const isOpen = openFaqId === item.id;
            return (
              <div key={item.id} className="py-4.5 first:pt-0 last:pb-0">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaqId(isOpen ? '' : item.id)}
                  className="w-full flex items-center justify-between gap-4 text-left group cursor-pointer"
                >
                  <span className="text-[15.5px] md:text-[17px] font-semibold text-[#141517] group-hover:text-[#0D5FF9] transition-colors tracking-[-0.015em]">
                    {item.question}
                  </span>
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isOpen
                        ? 'bg-[#141517] text-white'
                        : 'bg-neutral-100 text-neutral-600 group-hover:bg-neutral-200/80'
                    }`}
                    aria-hidden="true"
                  >
                    {isOpen ? (
                      <ArrowUp className="w-3.5 h-3.5 stroke-[2.2]" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 stroke-[2.2]" />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="mt-3 pr-6 space-y-2.5 animate-fadeIn">
                    <p className="text-[13.5px] md:text-[14px] text-neutral-600 leading-[1.68]">
                      {item.answer}
                    </p>
                    <p className="text-[11.5px] font-mono-code text-neutral-400 pt-0.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0D5FF9] shrink-0" />
                      <span>{item.metricsHighlight}</span>
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[26px] bg-[#1D1CFF] p-7 md:p-10 lg:p-12 flex flex-col justify-center shadow-[0_24px_60px_rgba(29,28,255,0.3)]">
      <div className="divide-y divide-white/20">
        {items.map((item) => {
          const isOpen = openFaqId === item.id;
          return (
            <div key={item.id} className="py-5 first:pt-0 last:pb-0">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenFaqId(isOpen ? '' : item.id)}
                className="w-full flex items-center justify-between gap-4 text-left group cursor-pointer"
              >
                <span className="text-[17px] md:text-[19px] font-bold text-white tracking-[-0.015em]">
                  {item.question}
                </span>
                <span
                  className="w-7 h-7 rounded-full bg-white text-[#1D1CFF] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105"
                  aria-hidden="true"
                >
                  {isOpen ? (
                    <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  )}
                </span>
              </button>

              {isOpen && (
                <div className="mt-3.5 pr-6 space-y-3 animate-fadeIn">
                  <p className="text-[13.5px] md:text-[14.5px] text-white/90 leading-[1.65]">
                    {item.answer}
                  </p>
                  <p className="text-[12px] font-mono-code text-white/75 pt-1">
                    Angajament RoGrowth · {item.metricsHighlight}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * 5. Core Web Vitals 100/100 + Ownership Proof Card
 */
export function CoreWebVitalsCard({
  previewImage = '/assets/aistudio/rentdacia_dfda43e0.webp',
  previewAlt = 'RentDacia București — Performanță și viteză pe mobil și desktop',
  mode = 'dark',
}: {
  previewImage?: string;
  previewAlt?: string;
  mode?: 'light' | 'dark';
}) {
  const isDark = mode === 'dark';

  return (
    <div
      className={`rounded-2xl overflow-hidden border p-4 space-y-3.5 transition-colors duration-500 ease-out ${isDark
        ? 'border-white/10 bg-[#13151A] text-white'
        : 'border-neutral-200/90 bg-white text-[#141517] shadow-[0_2px_12px_rgba(0,0,0,0.03)]'
        }`}
    >
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold flex items-center gap-1.5">
          <CheckCircle2
            className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'
              }`}
          />
          <span>Standard Tehnic RoGrowth</span>
        </span>
        <span
          className={`font-mono-code text-[11px] ${isDark ? 'text-emerald-400' : 'text-emerald-600'
            }`}
        >
          100/100 Core Web Vitals
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div
          className={`rounded-xl border py-2.5 px-2 ${isDark
            ? 'bg-white/[0.04] border-white/5'
            : 'bg-neutral-50/80 border-neutral-100'
            }`}
        >
          <span
            className={`block text-lg font-extrabold tabular-nums ${isDark ? 'text-emerald-400' : 'text-emerald-600'
              }`}
          >
            100
          </span>
          <span
            className={`block text-[10px] font-mono-code ${isDark ? 'text-neutral-400' : 'text-neutral-500'
              }`}
          >
            Performanță
          </span>
        </div>
        <div
          className={`rounded-xl border py-2.5 px-2 ${isDark
            ? 'bg-white/[0.04] border-white/5'
            : 'bg-neutral-50/80 border-neutral-100'
            }`}
        >
          <span
            className={`block text-lg font-extrabold tabular-nums ${isDark ? 'text-emerald-400' : 'text-emerald-600'
              }`}
          >
            100
          </span>
          <span
            className={`block text-[10px] font-mono-code ${isDark ? 'text-neutral-400' : 'text-neutral-500'
              }`}
          >
            SEO On-Page
          </span>
        </div>
        <div
          className={`rounded-xl border py-2.5 px-2 ${isDark
            ? 'bg-white/[0.04] border-white/5'
            : 'bg-neutral-50/80 border-neutral-100'
            }`}
        >
          <span
            className={`block text-lg font-extrabold tabular-nums ${isDark ? 'text-sky-400' : 'text-[#0D5FF9]'
              }`}
          >
            100%
          </span>
          <span
            className={`block text-[10px] font-mono-code ${isDark ? 'text-neutral-400' : 'text-neutral-500'
              }`}
          >
            Codul Tău
          </span>
        </div>
      </div>

      <div
        className={`rounded-xl overflow-hidden border aspect-[16/10] relative ${isDark
          ? 'border-white/10 bg-neutral-900'
          : 'border-neutral-200/80 bg-neutral-100'
          }`}
      >
        <img
          src={previewImage}
          alt={previewAlt}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top"
        />
      </div>
    </div>
  );
}

/**
 * 6. Reusable Browser-Framed Portfolio & Case Study Card
 */
export function BrowserProjectCard({
  project,
  onSelect,
}: {
  project: PortfolioProject;
  onSelect: (project: PortfolioProject) => void;
}) {
  const categoryName = project.categoryLabel.split('·')[0].trim();

  return (
    <div
      onClick={() => onSelect(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(project);
        }
      }}
      aria-label={`Deschide studiul de caz: ${project.title}`}
      className="group rounded-[22px] bg-white dark:bg-[#131417] border border-neutral-200/80 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-neutral-300 dark:hover:border-white/20 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out overflow-hidden flex flex-col justify-between cursor-pointer text-left"
    >
      <div>
        {/* Browser Frame Header */}
        <div className="px-4 py-2.5 bg-neutral-50 dark:bg-white/[0.03] border-b border-neutral-200/60 dark:border-white/10 transition-colors duration-300 ease-out flex items-center gap-2 text-[11px] font-mono-code text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-white/20" />
          </div>
          <span className="ml-1.5 font-medium text-neutral-700 dark:text-neutral-300 truncate">
            {project.client.split('(')[0].trim()}
          </span>
        </div>

        {/* Real Website Screenshot Preview */}
        <div className="relative aspect-[16/10] bg-neutral-100 dark:bg-neutral-900 overflow-hidden border-b border-neutral-100 dark:border-white/10">
          <img
            src={project.image}
            alt={`${project.title} — ${categoryName}`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Project Info */}
        <div className="p-5 md:p-6 space-y-2">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#0D5FF9] dark:text-[#7DD3FC] font-mono-code">
            {categoryName}
          </div>

          <h4 className="text-[17px] font-bold text-[#141517] dark:text-white group-hover:text-[#0D5FF9] transition-colors duration-200 tracking-tight leading-snug">
            {project.title}
          </h4>

          <p className="text-[13px] text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
            {project.summary}
          </p>
        </div>
      </div>

      {/* Card Footer Action */}
      <div className="px-5 md:px-6 pb-4 pt-3 border-t border-neutral-100 dark:border-white/10 flex items-center justify-between text-xs">
        <span className="text-neutral-400 font-mono-code text-[11px] truncate max-w-[65%]">
          {project.stack.slice(0, 2).join(' · ')}
        </span>
        <span className="font-semibold text-[#0D5FF9] dark:text-[#7DD3FC] inline-flex items-center gap-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 whitespace-nowrap">
          <span>Vezi detalii</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
}

/**
 * 7. Hardware Mockup Frames (MacBook Pro + iPhone)
 */
export function MacBookHardwareFrame({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`w-full ${className}`}>
      <div className="rounded-t-[20px] bg-[#0A0A0C] p-3 pb-0 border-t border-x border-neutral-700 shadow-2xl">
        <div className="rounded-t-[12px] bg-gradient-to-br from-[#0D5FF9] via-[#1C64F2] to-[#3B76F6] aspect-[16/10.5] p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-3 bg-[#0A0A0C] rounded-b-lg" />
          {children}
        </div>
      </div>
      <div className="h-3.5 bg-gradient-to-r from-neutral-600 via-neutral-300 to-neutral-600 rounded-b-xl -mx-3 shadow-lg flex items-center justify-center">
        <div className="w-16 h-1 bg-neutral-700 rounded-full" />
      </div>
    </div>
  );
}

export function IPhoneHardwareFrame({
  imageSrc,
  imageAlt,
  ariaLabel,
  onClick,
  className = '',
}: {
  imageSrc: string;
  imageAlt: string;
  ariaLabel: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`group block w-full rounded-[34px] bg-[#141517] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.22)] border border-neutral-700/90 cursor-pointer transition-transform duration-300 hover:-translate-y-1 ${className}`}
    >
      <div className="relative w-full aspect-[9/15.6] rounded-[26px] overflow-hidden bg-[#141517]">
        <img
          src={imageSrc}
          alt={imageAlt}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </button>
  );
}
