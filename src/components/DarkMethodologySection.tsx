import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
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
}: DarkMethodologySectionProps) {
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [isInView, setIsInView] = useState<boolean>(false);
  const [timerResetKey, setTimerResetKey] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const hasTriggeredInitialRef = useRef<boolean>(false);

  // Detect when user arrives at the "Day 1, not Day 100" ("Ziua 1, nu Ziua 100") section
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-advance timer:
  // 1. On arrival in view, wait 0.8s, then switch to point 2 (Recomandare Strategică).
  // 2. Then continue auto-advancing every 2 seconds to the next point.
  useEffect(() => {
    if (!isInView) return;

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    if (!hasTriggeredInitialRef.current) {
      // First arrival at the section: after 0.8s, switch to 2. Recomandare Strategică
      timeoutId = setTimeout(() => {
        hasTriggeredInitialRef.current = true;
        setActiveStepIdx(1);

        // Then rotate every 2 seconds
        intervalId = setInterval(() => {
          setActiveStepIdx((prev) => (prev + 1) % PROCESS_STEPS.length);
        }, 2000);
      }, 800);
    } else {
      // Auto-advance every 2 seconds
      intervalId = setInterval(() => {
        setActiveStepIdx((prev) => (prev + 1) % PROCESS_STEPS.length);
      }, 2000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [isInView, timerResetKey]);

  const handleStepSelect = useCallback((idx: number) => {
    hasTriggeredInitialRef.current = true;
    setActiveStepIdx(idx);
    setTimerResetKey((prev) => prev + 1);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="metodologia"
      aria-labelledby="de-cero-a-uno-heading"
      className="bg-transparent py-20 md:py-28 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-[1240px] mx-auto">
        {/* "Ziua 1, nu Ziua 100" + 4-Step Transparent Interactive Workflow */}
        <div className="rounded-[28px] border border-neutral-200/90 bg-[#F5F6F8] text-[#141517] p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
          {/* Left Column: Core Philosophy + Visible 4-Step Selector List */}
          <div className="lg:col-span-6 space-y-6">
            <FigmaSelectionFrame
              mode="light"
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

            <p className="text-[16px] md:text-[18px] font-semibold leading-[1.45] tracking-[-0.01em] text-neutral-700">
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
                    onClick={() => handleStepSelect(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center gap-3 ${isActive
                        ? 'bg-white border-[#0D5FF9] text-[#141517] shadow-sm'
                        : 'bg-white/60 border-neutral-200/80 text-neutral-700 hover:bg-white hover:border-neutral-300'
                      }`}
                  >
                    <span
                      className={`text-xs font-mono-code font-bold px-2 py-1 rounded shrink-0 ${isActive
                          ? 'bg-[#0D5FF9] text-white'
                          : 'bg-neutral-100 text-neutral-600'
                        }`}
                    >
                      {item.step}
                    </span>
                    <span className="text-sm font-bold truncate">
                      {item.title}
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
                    onClick={() => handleStepSelect(idx)}
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
      </div>
    </section>
  );
}
