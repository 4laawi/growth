import React, { useState } from 'react';
import {
  PORTFOLIO_PROJECTS,
  PortfolioProject,
  filterPortfolioProjects,
  computeStaggerDelayMs,
} from '../data/studioData';
import { OnlinesNotificationBubble, ToolSquircle } from './StudioIcons';
import { BrowserProjectCard, useSectionReveal } from './ui/StudioPrimitives';

interface DetailsAndPortfolioSectionProps {
  onSelectProject: (project: PortfolioProject) => void;
}

const EASE_OUT_EXPO = 'cubic-bezier(0.22, 1, 0.36, 1)';

export function DetailsAndPortfolioSection({
  onSelectProject,
}: DetailsAndPortfolioSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    'todos' | PortfolioProject['category']
  >('todos');

  const detailsReveal = useSectionReveal<HTMLDivElement>();
  const showcaseReveal = useSectionReveal<HTMLDivElement>();

  const filteredProjects = filterPortfolioProjects(
    PORTFOLIO_PROJECTS,
    selectedCategory
  );

  const scrollToShowcase = () => {
    const el = document.getElementById('portfolio-showcase');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="portfolio"
      data-theme-section="true"
      aria-labelledby="detalles-heading"
      className="bg-transparent pb-24 overflow-hidden transition-colors duration-500 ease-out"
    >
      {/* Part 1: Minimalist, Chic "Detaliile fac diferența" Full-Page Section */}
      <div
        ref={detailsReveal.ref}
        data-testid="details-craft-block"
        data-section-revealed={detailsReveal.isRevealed ? 'true' : 'false'}
        className="max-w-[1160px] mx-auto px-6 md:px-12 lg:min-h-[100svh] flex items-center py-20 lg:py-24"
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          {/* Left Column: Smooth Unfade & Subtle Upward Glide */}
          <div
            style={{
              opacity: detailsReveal.isRevealed ? 1 : 0,
              transform: detailsReveal.isRevealed
                ? 'translate3d(0, 0, 0)'
                : 'translate3d(0, 22px, 0)',
              transition: `opacity 620ms ${EASE_OUT_EXPO}, transform 620ms ${EASE_OUT_EXPO}`,
            }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="relative max-w-[440px]">
              <div
                className="hidden sm:block absolute inset-x-0 top-[47%] border-b border-dashed border-neutral-200/90 dark:border-white/15 transition-colors duration-500 ease-out pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="hidden sm:block absolute inset-x-0 bottom-[2px] border-b border-dashed border-neutral-200/90 dark:border-white/15 transition-colors duration-500 ease-out pointer-events-none"
                aria-hidden="true"
              />
              <h2
                id="detalles-heading"
                className="relative text-[clamp(2.35rem,4.2vw,3.65rem)] font-extrabold tracking-[-0.04em] leading-[1.04] text-[#141517] dark:text-white transition-colors duration-500 ease-out"
              >
                Detaliile fac{' '}
                <br />
                diferența
              </h2>
            </div>

            <p className="text-[15px] md:text-[16px] text-neutral-400 dark:text-neutral-300 font-normal leading-[1.58] max-w-[395px] transition-colors duration-500 ease-out">
              Considerăm că designul și dezvoltarea sunt inseparabile și indivizibile în procesul nostru de lucru pentru a obține cele mai bune rezultate.
            </p>

            <div className="pt-1 flex items-center gap-4">
              <button
                type="button"
                onClick={scrollToShowcase}
                className="px-7 py-3 rounded-full bg-[#0D5FF9] hover:bg-[#004AD9] text-white text-[13.5px] font-semibold tracking-tight transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
              >
                Vezi portofoliul
              </button>

              <button
                type="button"
                onClick={() => onSelectProject(PORTFOLIO_PROJECTS[0])}
                aria-label="Deschide portofoliul și studiile de caz"
                className="px-2 py-1.5 text-[#0D5FF9] hover:text-[#004AD9] font-extrabold text-[14px] tracking-tight transition-colors cursor-pointer whitespace-nowrap"
              >
                Bē
              </button>
            </div>
          </div>

          {/* Right Column: Compact, Minimalist Fanned 3-Card Deck with Smooth Fan-Out Reveal */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-[340px] sm:w-[390px] md:w-[420px] h-[340px] md:h-[400px] flex items-center justify-center">
              {/* Left Fanned Card (-6deg) */}
              <div
                onClick={() => onSelectProject(PORTFOLIO_PROJECTS[3])}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectProject(PORTFOLIO_PROJECTS[3]);
                  }
                }}
                aria-label="Explorează proiectul interactiv"
                style={{
                  opacity: detailsReveal.isRevealed ? 1 : 0,
                  transform: detailsReveal.isRevealed
                    ? 'translate3d(0, 8px, 0) rotate(-6deg)'
                    : 'translate3d(20px, 22px, 0) rotate(0deg)',
                  transition: `opacity 640ms ${EASE_OUT_EXPO} 150ms, transform 640ms ${EASE_OUT_EXPO} 150ms`,
                }}
                className="relative -mr-9 md:-mr-11 w-[124px] md:w-[148px] h-[230px] md:h-[275px] rounded-[18px] overflow-hidden shadow-[0_14px_34px_rgba(0,0,0,0.12)] cursor-pointer z-10 bg-neutral-900"
              >
                <img
                  src="/assets/extracted/details_left.png"
                  alt="Direcție vizuală și structură editorială"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* VS Code Squircle at outer top-left corner of Left Card */}
              <div
                style={{
                  opacity: detailsReveal.isRevealed ? 1 : 0,
                  transform: detailsReveal.isRevealed
                    ? 'translate3d(0, 0, 0) scale(1)'
                    : 'translate3d(0, 12px, 0) scale(0.94)',
                  transition: `opacity 580ms ${EASE_OUT_EXPO} 250ms, transform 580ms ${EASE_OUT_EXPO} 250ms`,
                }}
                className="absolute top-[11%] left-[1%] md:left-[2%] z-30"
              >
                <ToolSquircle
                  tool="vscode"
                  className="!w-11 !h-11 !rounded-[14px] shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
                />
              </div>

              {/* Center Prominent Card: Attached Tarjeta-5 Image */}
              <div
                onClick={() => onSelectProject(PORTFOLIO_PROJECTS[2])}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectProject(PORTFOLIO_PROJECTS[2]);
                  }
                }}
                aria-label="Vezi detalii studiu de caz"
                style={{
                  opacity: detailsReveal.isRevealed ? 1 : 0,
                  transform: detailsReveal.isRevealed
                    ? 'translate3d(0, 0, 0) scale(1)'
                    : 'translate3d(0, 22px, 0) scale(0.96)',
                  transition: `opacity 620ms ${EASE_OUT_EXPO} 75ms, transform 620ms ${EASE_OUT_EXPO} 75ms`,
                }}
                className="relative z-20 w-[172px] md:w-[206px] h-[288px] md:h-[348px] rounded-[20px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] cursor-pointer bg-[#eef2f6]"
              >
                <img
                  src="/assets/aistudio/Tarjeta-5-e1782838269241_c042e94c.webp"
                  alt="Detaliile fac diferența — Design și direcție artistică"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Right Fanned Card (+6deg): Minimalist Grey & Yellow Wireframe Mesh Card */}
              <div
                onClick={() => onSelectProject(PORTFOLIO_PROJECTS[1])}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectProject(PORTFOLIO_PROJECTS[1]);
                  }
                }}
                aria-label="Vezi arhitectura tehnică și wireframe"
                style={{
                  opacity: detailsReveal.isRevealed ? 1 : 0,
                  transform: detailsReveal.isRevealed
                    ? 'translate3d(0, 8px, 0) rotate(6deg)'
                    : 'translate3d(-20px, 22px, 0) rotate(0deg)',
                  transition: `opacity 640ms ${EASE_OUT_EXPO} 150ms, transform 640ms ${EASE_OUT_EXPO} 150ms`,
                }}
                className="relative -ml-9 md:-ml-11 w-[124px] md:w-[148px] h-[230px] md:h-[275px] rounded-[18px] overflow-hidden shadow-[0_14px_34px_rgba(0,0,0,0.12)] cursor-pointer z-10 bg-[#707377]"
              >
                <svg
                  viewBox="0 0 160 290"
                  className="w-full h-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect width="160" height="290" fill="#727579" />
                  <path
                    d="M55 75C72 92 108 118 135 148C115 162 92 140 72 128C65 165 82 215 95 265L35 280L30 70Z"
                    fill="#18191B"
                  />
                  <path
                    d="M70 42C96 36 122 48 148 34M82 66C108 58 130 70 154 62M90 95C114 88 136 96 156 90"
                    stroke="rgba(255,255,255,0.45)"
                    strokeWidth="0.9"
                  />
                  <path
                    d="M52 175L92 150L116 218L76 238Z"
                    fill="rgba(255,255,255,0.22)"
                  />
                  <circle cx="72" cy="182" r="1.3" fill="#232528" />
                  <circle cx="80" cy="176" r="1.5" fill="#232528" />
                  <circle cx="88" cy="172" r="1.2" fill="#232528" />
                  <circle cx="76" cy="192" r="1.4" fill="#232528" />
                  <circle cx="85" cy="188" r="1.6" fill="#232528" />
                  <circle cx="94" cy="183" r="1.3" fill="#232528" />
                  <circle cx="82" cy="202" r="1.5" fill="#232528" />
                  <circle cx="91" cy="197" r="1.4" fill="#232528" />
                  <circle cx="99" cy="193" r="1.2" fill="#232528" />
                  <circle cx="88" cy="212" r="1.4" fill="#232528" />
                  <circle cx="97" cy="208" r="1.5" fill="#232528" />
                  <circle cx="94" cy="222" r="1.3" fill="#232528" />
                  <path
                    d="M46 28C66 48 78 88 74 132C70 176 92 222 118 262"
                    stroke="#E5FF38"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M58 24C80 52 94 94 92 140C90 184 110 226 134 258"
                    stroke="#E5FF38"
                    strokeWidth="1.3"
                  />
                  <path
                    d="M42 112L94 94M48 134L92 116M54 156L94 136M62 178L102 158M72 200L112 180M84 224L122 204M96 246L132 228"
                    stroke="#E5FF38"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M35 235C54 226 74 228 96 246"
                    stroke="#E5FF38"
                    strokeWidth="1.3"
                  />
                </svg>
              </div>

              {/* Figma Squircle on outer right edge of Right Card */}
              <div
                style={{
                  opacity: detailsReveal.isRevealed ? 1 : 0,
                  transform: detailsReveal.isRevealed
                    ? 'translate3d(0, 0, 0) scale(1)'
                    : 'translate3d(0, 12px, 0) scale(0.94)',
                  transition: `opacity 580ms ${EASE_OUT_EXPO} 250ms, transform 580ms ${EASE_OUT_EXPO} 250ms`,
                }}
                className="absolute top-[42%] right-[0%] md:right-[1%] z-30"
              >
                <ToolSquircle
                  tool="figma"
                  className="!w-11 !h-11 !rounded-[14px] shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
                />
              </div>

              {/* Top-Right Notification Bubble */}
              <div
                style={{
                  opacity: detailsReveal.isRevealed ? 1 : 0,
                  transform: detailsReveal.isRevealed
                    ? 'translate3d(0, 0, 0)'
                    : 'translate3d(0, 14px, 0)',
                  transition: `opacity 600ms ${EASE_OUT_EXPO} 300ms, transform 600ms ${EASE_OUT_EXPO} 300ms`,
                }}
                className="hidden sm:block absolute top-[8%] -right-2 md:-right-6 z-30"
              >
                <OnlinesNotificationBubble
                  compact
                  timeAgo="acum 2 săpt."
                  message="Hai să testăm un grid mai amplu."
                />
              </div>

              {/* Bottom Notification Bubble */}
              <div
                style={{
                  opacity: detailsReveal.isRevealed ? 1 : 0,
                  transform: detailsReveal.isRevealed
                    ? 'translate3d(0, 0, 0)'
                    : 'translate3d(0, 14px, 0)',
                  transition: `opacity 600ms ${EASE_OUT_EXPO} 340ms, transform 600ms ${EASE_OUT_EXPO} 340ms`,
                }}
                className="absolute bottom-[1%] left-[14%] md:left-[16%] z-30"
              >
                <OnlinesNotificationBubble
                  compact
                  timeAgo="ieri"
                  message="Să optimizăm încărcarea fonturilor."
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Real Portfolio Projects & Case Studies Showcase */}
      <div
        ref={showcaseReveal.ref}
        id="portfolio-showcase"
        data-section-revealed={showcaseReveal.isRevealed ? 'true' : 'false'}
        className="mt-16 max-w-[1380px] mx-auto px-6 md:px-12 lg:px-16"
      >
        <div
          style={{
            opacity: showcaseReveal.isRevealed ? 1 : 0,
            transform: showcaseReveal.isRevealed
              ? 'translate3d(0, 0, 0)'
              : 'translate3d(0, 20px, 0)',
            transition: `opacity 600ms ${EASE_OUT_EXPO}, transform 600ms ${EASE_OUT_EXPO}`,
          }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12"
        >
          <div>
            <p className="text-xs font-mono-code uppercase tracking-widest text-[#0D5FF9] mb-2">
              Portofoliu Real RoGrowth.ro · Proiecte Construite & Lansate
            </p>
            <h3 className="text-[clamp(2rem,4vw,3.3rem)] font-extrabold tracking-[-0.035em] leading-[1.06] text-[#141517]">
              Site-uri și platforme web care generează clienți
            </h3>
          </div>

          {/* Interactive Category Filter Controls (Single-Line) */}
          <div className="flex items-center gap-1 bg-neutral-100 p-1.5 rounded-full self-start lg:self-end shrink-0 overflow-x-auto max-w-full">
            {(
              [
                { id: 'todos', label: 'Toate proiectele (6)' },
                { id: 'gobierno', label: 'Clinici & Prezentare' },
                { id: 'experiencia', label: 'Imobiliare & Rezervări' },
                { id: 'producto', label: 'Magazin Online' },
                { id: 'identidad', label: 'Brand & Catalog' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-[#141517] text-white shadow-sm'
                    : 'text-neutral-600 hover:text-[#141517]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* High-Conversion 3-Column Real Project Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 pb-6">
          {filteredProjects.map((project, idx) => {
            const delayMs = computeStaggerDelayMs(idx, 75, 360);
            return (
              <div
                key={project.id}
                style={{
                  opacity: showcaseReveal.isRevealed ? 1 : 0,
                  transform: showcaseReveal.isRevealed
                    ? 'translate3d(0, 0, 0)'
                    : 'translate3d(0, 22px, 0)',
                  transition: `opacity 600ms ${EASE_OUT_EXPO} ${delayMs}ms, transform 600ms ${EASE_OUT_EXPO} ${delayMs}ms`,
                }}
                className="flex"
              >
                <BrowserProjectCard
                  project={project}
                  onSelect={onSelectProject}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
