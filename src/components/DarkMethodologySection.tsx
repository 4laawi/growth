import React, { useState, useEffect, useRef } from 'react';
import {
  WORKSHOP_FAQ_ITEMS,
  computeDarkModeScrollState,
} from '../data/studioData';
import { ArrowRight } from 'lucide-react';
import {
  CoreWebVitalsCard,
  ElectricFaqAccordion,
  FigmaSelectionFrame,
  MacBookHardwareFrame,
} from './ui/StudioPrimitives';

interface DarkMethodologySectionProps {
  onOpenContact: (presetService?: string) => void;
  onDarkModeChange?: (isDark: boolean) => void;
}

export const PROCESS_STEPS = [
  {
    step: '01',
    label: 'Descoperire',
    title: 'Descoperire & Evaluare',
    deliverable: 'Diagnostic comercial gratuit',
    detail:
      'Analizăm oferta, publicul țintă și obiectivele de vânzare pentru a defini structura exactă.',
  },
  {
    step: '02',
    label: 'Recomandare',
    title: 'Recomandare Strategică',
    deliverable: 'Fără pachete inutile',
    detail:
      'Alegem tipul optim de pagină: landing page de campanie, site de prezentare sau magazin online.',
  },
  {
    step: '03',
    label: 'Acord Ferm',
    title: 'Ofertă & Scop Clar în Scris',
    deliverable: '30% avans / 70% la predare',
    detail:
      'Definim termenele de livrare, paginile incluse și costurile clare înainte de start.',
  },
  {
    step: '04',
    label: 'Lansare',
    title: 'Dezvoltare, Revizii & Lansare',
    deliverable: '100% proprietatea ta',
    detail:
      'Design, dezvoltare, 2 runde de revizii, conectare domeniu și predare completă a codului.',
  },
];

export function DarkMethodologySection({
  onOpenContact,
  onDarkModeChange,
}: DarkMethodologySectionProps) {
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [themePhase, setThemePhase] = useState<'before' | 'active' | 'after'>('before');

  const sectionRef = useRef<HTMLElement | null>(null);
  const onDarkModeChangeRef = useRef(onDarkModeChange);

  useEffect(() => {
    onDarkModeChangeRef.current = onDarkModeChange;
  }, [onDarkModeChange]);

  useEffect(() => {
    let ticking = false;
    let lastDarkState = false;
    let lastPhaseState: 'before' | 'active' | 'after' = 'before';

    const updateThemeState = () => {
      ticking = false;
      const sectionEl = sectionRef.current;
      if (!sectionEl) return;

      const rect = sectionEl.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const state = computeDarkModeScrollState(rect.top, rect.bottom, vh);

      if (state.isDarkMode !== lastDarkState) {
        lastDarkState = state.isDarkMode;
        setIsDarkMode(state.isDarkMode);
        onDarkModeChangeRef.current?.(state.isDarkMode);
      }

      if (state.phase !== lastPhaseState) {
        lastPhaseState = state.phase;
        setThemePhase(state.phase);
      }
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateThemeState);
      }
    };

    updateThemeState();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      onDarkModeChangeRef.current?.(false);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="metodologia"
      aria-labelledby="de-cero-a-uno-heading"
      data-theme-mode={isDarkMode ? 'dark' : 'light'}
      data-theme-phase={themePhase}
      className="bg-transparent py-24 md:py-32 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-[1240px] mx-auto space-y-24">
        {/* Part 1: "Ziua 1, nu Ziua 100" + 4-Step Transparent Workflow */}
        <div>
          <div
            className={`rounded-[28px] border p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center overflow-hidden transition-colors duration-500 ease-out ${isDarkMode
                ? 'bg-[#131417] border-white/10 text-white'
                : 'bg-[#F5F6F8] border-neutral-200/80 text-[#141517]'
              }`}
          >
            {/* Left Column: Core Philosophy + Visible 4-Step Selector List */}
            <div className="lg:col-span-6 space-y-6">
              <FigmaSelectionFrame
                mode={isDarkMode ? 'dark' : 'light'}
                showMidHandles={false}
                className="inline-block px-3.5 py-1.5"
              >
                <h2
                  id="de-cero-a-uno-heading"
                  className="text-[clamp(2rem,3.6vw,3.1rem)] font-bold tracking-[-0.03em] leading-none"
                >
                  Ziua 1, nu Ziua 100
                </h2>
              </FigmaSelectionFrame>

              <p
                className={`text-[16px] md:text-[18px] font-semibold leading-[1.45] tracking-[-0.01em] ${isDarkMode ? 'text-white/95' : 'text-neutral-700'
                  }`}
              >
                Fără pachete rigide sau costuri inutile. Diagnosticăm nevoile reale ale afacerii și lansăm rapid pe o fundație curată.
              </p>

              {/* All 4 Workflow Steps Visible at a Glance */}
              <div className="space-y-2.5 pt-1">
                {PROCESS_STEPS.map((item, idx) => {
                  const isActive = activeStepIdx === idx;
                  return (
                    <button
                      key={item.step}
                      type="button"
                      onClick={() => setActiveStepIdx(idx)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-colors duration-300 cursor-pointer flex items-center justify-between gap-4 ${isActive
                          ? isDarkMode
                            ? 'bg-[#0D5FF9]/15 border-[#0D5FF9] text-white'
                            : 'bg-[#0D5FF9]/[0.08] border-[#0D5FF9] text-[#141517]'
                          : isDarkMode
                            ? 'bg-white/[0.03] border-white/10 text-neutral-300 hover:border-white/25'
                            : 'bg-white border-neutral-200/90 text-neutral-700 hover:border-neutral-300'
                        }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`text-xs font-mono-code font-bold px-2 py-1 rounded ${isActive
                              ? 'bg-[#0D5FF9] text-white'
                              : isDarkMode
                                ? 'bg-white/10 text-neutral-400'
                                : 'bg-neutral-100 text-neutral-600'
                            }`}
                        >
                          {item.step}
                        </span>
                        <span className="text-sm font-bold truncate">
                          {item.title}
                        </span>
                      </div>
                      <span
                        className={`hidden sm:inline-block text-[11px] font-mono-code shrink-0 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                          }`}
                      >
                        {item.deliverable}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenContact('Site de prezentare simplu (€300 – €400)')}
                  className="px-7 py-3.5 rounded-full bg-[#0D5FF9] hover:bg-[#256EFF] text-white text-[14px] font-semibold tracking-tight transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Solicită diagnostic & ofertă
                </button>
              </div>
            </div>

            {/* Right Column: Sleek MacBook Pro Display Mockup with Step Detail */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-end">
              <MacBookHardwareFrame className="max-w-[510px]">
                <div className="pt-2 flex items-center justify-between text-xs font-mono-code text-white/80">
                  <span>ROGROWTH.RO · FLUX TRANSPARENT</span>
                  <span>ETAPA {PROCESS_STEPS[activeStepIdx].step}/04</span>
                </div>

                <div className="my-auto py-3 space-y-2.5">
                  <p className="text-xs font-mono-code uppercase tracking-wider text-sky-200">
                    {PROCESS_STEPS[activeStepIdx].label} · {PROCESS_STEPS[activeStepIdx].deliverable}
                  </p>
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-snug">
                    {PROCESS_STEPS[activeStepIdx].title}
                  </h3>
                  <p className="text-xs md:text-sm text-white/90 leading-relaxed">
                    {PROCESS_STEPS[activeStepIdx].detail}
                  </p>
                </div>

                {/* Interactive step selector inside the laptop screen */}
                <div className="grid grid-cols-4 gap-1.5 pt-2.5 border-t border-white/20">
                  {PROCESS_STEPS.map((s, idx) => (
                    <button
                      key={s.step}
                      type="button"
                      onClick={() => setActiveStepIdx(idx)}
                      className={`px-2 py-1.5 rounded-md text-left transition-colors cursor-pointer ${activeStepIdx === idx
                          ? 'bg-white text-[#0D5FF9] font-semibold'
                          : 'bg-white/10 text-white/80 hover:bg-white/20'
                        }`}
                    >
                      <span className="block text-[10px] font-mono-code leading-none mb-0.5">
                        {s.step}
                      </span>
                      <span className="block text-[11px] truncate">{s.label}</span>
                    </button>
                  ))}
                </div>
              </MacBookHardwareFrame>
            </div>
          </div>

          <p
            className={`mt-4 text-[12.5px] max-w-xl leading-relaxed ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}
          >
            Prețuri transparente, 2 runde de revizii incluse și proprietate 100% asupra codului.
          </p>
        </div>

        {/* Part 2: RoGrowth Philosophy, Real Project Speed Card & Interactive Accordion */}
        <div
          className={`rounded-[32px] border p-8 md:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch transition-colors duration-500 ease-out ${isDarkMode
              ? 'bg-[#0B0C0E] border-white/10 text-white'
              : 'bg-[#F5F6F8] border-neutral-200/80 text-[#141517]'
            }`}
        >
          {/* Left Column: Intro + Clean Core Web Vitals & Real Project Showcase */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-5">
              <div
                className={`text-xs font-mono-code tracking-wide ${isDarkMode ? 'text-[#7DD3FC]' : 'text-[#0D5FF9]'
                  }`}
              >
                Claritate Comercială · Fără Șabloane Generice
              </div>

              <h3 className="text-[clamp(2.25rem,4vw,3.5rem)] font-bold tracking-[-0.035em] leading-[1.05]">
                De ce RoGrowth
              </h3>

              <p
                className={`text-[14px] md:text-[15px] leading-[1.65] ${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'
                  }`}
              >
                Fără șabloane generice sau teme lente. Proiectăm din perspectiva clientului tău: viteză pe mobil, structură clară și pagini optimizate să convertească.
              </p>

              <button
                type="button"
                onClick={() => onOpenContact('Site avansat orientat spre conversie (€700 – €1.200)')}
                className={`group inline-flex items-center gap-3 pt-1 text-[14px] font-semibold transition-colors cursor-pointer ${isDarkMode
                    ? 'text-white hover:text-[#7DD3FC]'
                    : 'text-[#141517] hover:text-[#0D5FF9]'
                  }`}
              >
                <span className="w-6 h-6 rounded-full bg-[#FF6B2C] text-black flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span>Ce soluție ți se potrivește? Hai să discutăm</span>
              </button>
            </div>

            <CoreWebVitalsCard mode={isDarkMode ? 'dark' : 'light'} />
          </div>

          {/* Right Column: Vibrant Electric-Blue Accordion Card */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <ElectricFaqAccordion items={WORKSHOP_FAQ_ITEMS} />
          </div>
        </div>
      </div>
    </section>
  );
}
