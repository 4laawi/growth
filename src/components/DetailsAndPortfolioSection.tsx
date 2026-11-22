import React, { useState } from 'react';
import {
  PORTFOLIO_PROJECTS,
  PortfolioProject,
  filterPortfolioProjects,
  computeStaggerDelayMs,
} from '../data/studioData';
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

  const showcaseReveal = useSectionReveal<HTMLDivElement>();

  const filteredProjects = filterPortfolioProjects(
    PORTFOLIO_PROJECTS,
    selectedCategory
  );

  return (
    <section
      id="portfolio"
      data-theme-section="true"
      aria-labelledby="portfolio-heading"
      className="bg-transparent py-20 lg:py-24 overflow-hidden transition-colors duration-500 ease-out"
    >
      {/* Real Portfolio Projects & Case Studies Showcase */}
      <div
        ref={showcaseReveal.ref}
        id="portfolio-showcase"
        data-section-revealed={showcaseReveal.isRevealed ? 'true' : 'false'}
        className="max-w-[1380px] mx-auto px-6 md:px-12 lg:px-16"
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
            <h2
              id="portfolio-heading"
              className="text-[clamp(2rem,4vw,3.3rem)] font-extrabold tracking-[-0.035em] leading-[1.06] text-[#141517]"
            >
              Site-uri și platforme web care generează clienți
            </h2>
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
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${selectedCategory === tab.id
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
