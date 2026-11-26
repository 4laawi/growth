import React, { useEffect, useRef, useState } from 'react';
import {
  SERVICE_CARDS,
  ServiceCardItem,
  computeManifestoScrollState,
  computeWordSmoothReveal,
} from '../data/studioData';
import { PricingTierCard } from './ui/StudioPrimitives';

interface ServicesSectionProps {
  onOpenServiceModal: (service: ServiceCardItem) => void;
}

const MANIFESTO_WORDS = [
  'Creăm',
  'site-uri',
  'web',
  'rapide',
  'și',
  'orientate',
  'spre',
  'conversie',
  'pentru',
  'afaceri',
  'din',
  'România.',
];

const SUB_WORDS = [
  'Fără',
  'șabloane',
  'rigide.',
  'Diagnosticăm',
  'nevoia',
  'reală',
  'și',
  'livrăm',
  'claritate',
  'comercială.',
];

const TOTAL_WORDS = MANIFESTO_WORDS.length + SUB_WORDS.length;

// Indices in MANIFESTO_WORDS that receive cobalt editorial emphasis & self-drawing underline
const ACCENT_WORD_INDICES = new Set([5, 6, 7]); // "orientate spre conversie"
const UNDERLINE_WORD_INDICES = new Set([11]); // "România."

export function ServicesSection({ onOpenServiceModal }: ServicesSectionProps) {
  const manifestoTrackRef = useRef<HTMLDivElement>(null);
  const stageContainerRef = useRef<HTMLDivElement>(null);
  const ambientAuraRef = useRef<HTMLDivElement>(null);
  const kickerLineLeftRef = useRef<HTMLSpanElement>(null);
  const kickerLineRightRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const wordSpanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const wordUnderlineRefs = useRef<Record<number, HTMLSpanElement | null>>({});
  const subWordSpanRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;
    let currentProgress = 0;
    let targetProgress = 0;
    let currentEntryProgress = 1;
    let targetEntryProgress = 1;
    let isInitialized = false;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const applyVisualFrame = (progress: number, entryProgress: number) => {
      const trackEl = manifestoTrackRef.current;
      if (!trackEl) return;

      const revealedCount = Math.round(progress * TOTAL_WORDS);
      trackEl.setAttribute('data-revealed-words', String(revealedCount));
      trackEl.setAttribute('data-reveal-progress', progress.toFixed(3));

      // 1. Seamless stage entry glide (compositor transform + opacity only)
      if (stageContainerRef.current) {
        const entryY = (1 - entryProgress) * 18;
        const entryOpacity = 0.35 + 0.65 * entryProgress;
        stageContainerRef.current.style.opacity = entryOpacity.toFixed(3);
        stageContainerRef.current.style.transform = `translate3d(0, ${entryY.toFixed(2)}px, 0)`;
      }

      // 2. Kicker flanking hairlines scaleX reveal
      const kickerScale = Math.min(1, Math.max(0.15, entryProgress * 0.6 + progress * 0.4));
      if (kickerLineLeftRef.current) {
        kickerLineLeftRef.current.style.transform = `scaleX(${kickerScale.toFixed(3)})`;
      }
      if (kickerLineRightRef.current) {
        kickerLineRightRef.current.style.transform = `scaleX(${kickerScale.toFixed(3)})`;
      }

      // 3. Ambient radial spotlight (single compositor layer, no filter:blur)
      if (ambientAuraRef.current) {
        const waveCrest = Math.sin(progress * Math.PI);
        const auraOpacity = 0.035 + 0.065 * waveCrest;
        const auraScale = 0.92 + 0.12 * progress;
        const auraY = (0.5 - progress) * 24;
        ambientAuraRef.current.style.opacity = auraOpacity.toFixed(3);
        ambientAuraRef.current.style.transform = `translate3d(0, ${auraY.toFixed(1)}px, 0) scale(${auraScale.toFixed(3)})`;
      }

      // 4. Primary headline words: continuous smoothstep wave (transform + opacity only)
      for (let i = 0; i < MANIFESTO_WORDS.length; i++) {
        const el = wordSpanRefs.current[i];
        if (!el) continue;

        const w = computeWordSmoothReveal(progress, i, TOTAL_WORDS, 3.6);
        const isLit = i < revealedCount || w >= 0.5;
        el.setAttribute('data-word-lit', isLit ? 'true' : 'false');
        el.setAttribute('data-word-weight', w.toFixed(2));

        const translateY = (1 - w) * 11;
        const scale = 0.968 + 0.032 * w;
        const opacity = 0.13 + 0.87 * w;

        el.style.opacity = opacity.toFixed(3);
        el.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;

        const underlineEl = wordUnderlineRefs.current[i];
        if (underlineEl) {
          underlineEl.style.transform = `scaleX(${w.toFixed(3)})`;
          underlineEl.style.opacity = (w * 0.92).toFixed(3);
        }
      }

      // 5. Sub-statement words: seamless continuation of the same smoothstep wave
      for (let j = 0; j < SUB_WORDS.length; j++) {
        const el = subWordSpanRefs.current[j];
        if (!el) continue;

        const globalIdx = MANIFESTO_WORDS.length + j;
        const w = computeWordSmoothReveal(progress, globalIdx, TOTAL_WORDS, 3.6);
        const isLit = globalIdx < revealedCount || w >= 0.5;
        el.setAttribute('data-word-lit', isLit ? 'true' : 'false');
        el.setAttribute('data-word-weight', w.toFixed(2));

        const translateY = (1 - w) * 8;
        const opacity = 0.14 + 0.86 * w;

        el.style.opacity = opacity.toFixed(3);
        el.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0)`;
      }

      // 6. Bottom progress bar transform
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
      }

      const nextComplete = revealedCount >= TOTAL_WORDS;
      setIsComplete((prev) => (prev === nextComplete ? prev : nextComplete));
    };

    const tick = () => {
      const diffProgress = targetProgress - currentProgress;
      const diffEntry = targetEntryProgress - currentEntryProgress;

      if (
        prefersReducedMotion ||
        (Math.abs(diffProgress) < 0.0008 && Math.abs(diffEntry) < 0.002)
      ) {
        currentProgress = targetProgress;
        currentEntryProgress = targetEntryProgress;
        applyVisualFrame(currentProgress, currentEntryProgress);
        rafId = null;
        return;
      }

      // Smooth inertial damping (0.22 factor gives silky 60fps settling with zero lag)
      currentProgress += diffProgress * 0.22;
      currentEntryProgress += diffEntry * 0.22;
      applyVisualFrame(currentProgress, currentEntryProgress);
      rafId = window.requestAnimationFrame(tick);
    };

    const measureAndSchedule = () => {
      if (!manifestoTrackRef.current) return;
      const rect = manifestoTrackRef.current.getBoundingClientRect();
      const viewportH = window.innerHeight || 900;

      const state = computeManifestoScrollState(
        rect.top,
        rect.height,
        viewportH,
        TOTAL_WORDS
      );
      targetProgress = state.progress;

      // Entry glide as section travels from bottom of viewport (0.92 * vh) to trigger zone (0.28 * vh)
      const entryStart = viewportH * 0.92;
      const entryEnd = viewportH * 0.28;
      const rawEntry = (entryStart - rect.top) / Math.max(1, entryStart - entryEnd);
      const clampedEntry = Math.max(0, Math.min(1, rawEntry));
      targetEntryProgress = clampedEntry * clampedEntry * (3 - 2 * clampedEntry);

      if (!isInitialized) {
        isInitialized = true;
        currentProgress = targetProgress;
        currentEntryProgress = targetEntryProgress;
        applyVisualFrame(currentProgress, currentEntryProgress);
        return;
      }

      // If scrolled by a large programmatic jump (e.g. instant scrollTo in tests), snap closer
      if (Math.abs(targetProgress - currentProgress) > 0.45) {
        currentProgress = targetProgress;
        currentEntryProgress = targetEntryProgress;
        applyVisualFrame(currentProgress, currentEntryProgress);
        return;
      }

      if (rafId === null) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    measureAndSchedule();
    window.addEventListener('scroll', measureAndSchedule, { passive: true });
    window.addEventListener('resize', measureAndSchedule, { passive: true });
    return () => {
      window.removeEventListener('scroll', measureAndSchedule);
      window.removeEventListener('resize', measureAndSchedule);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <section
      id="servicios"
      data-theme-section="true"
      aria-labelledby="manifesto-heading"
      className="relative bg-transparent transition-colors duration-500 ease-out"
    >
      {/* Full-Window Scroll-Reveal Manifesto Track */}
      <div
        ref={manifestoTrackRef}
        data-testid="manifesto-scroll-track"
        data-revealed-words={0}
        data-reveal-progress="0.000"
        data-total-words={TOTAL_WORDS}
        className="relative h-[175vh] w-full border-t border-neutral-100"
      >
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 overflow-hidden">
          {/* Featherlight Compositor Radial Aura (No GPU-heavy filter:blur) */}
          <div
            ref={ambientAuraRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center will-change-transform"
            style={{
              opacity: 0.04,
              background:
                'radial-gradient(46% 42% at 50% 48%, rgba(13, 95, 249, 0.14) 0%, rgba(13, 95, 249, 0.03) 55%, rgba(255, 255, 255, 0) 100%)',
            }}
          />

          <div
            ref={stageContainerRef}
            className="relative z-10 max-w-[920px] mx-auto text-center will-change-transform"
          >
            {/* Editorial Kicker with Self-Drawing Flanking Hairlines */}
            <div className="inline-flex items-center gap-3.5 mb-7">
              <span
                ref={kickerLineLeftRef}
                aria-hidden="true"
                className="hidden sm:inline-block w-7 h-[1.5px] bg-[#0D5FF9]/40 origin-right"
                style={{ transform: 'scaleX(0.3)' }}
              />
              <p className="text-xs font-mono-code uppercase tracking-widest text-[#0D5FF9]">
                Claritate &amp; Performanță Web
              </p>
              <span
                ref={kickerLineRightRef}
                aria-hidden="true"
                className="hidden sm:inline-block w-7 h-[1.5px] bg-[#0D5FF9]/40 origin-left"
                style={{ transform: 'scaleX(0.3)' }}
              />
            </div>

            <h2
              id="manifesto-heading"
              className="text-[clamp(2.35rem,4.8vw,4.15rem)] font-bold tracking-[-0.035em] leading-[1.12] text-balance"
            >
              {MANIFESTO_WORDS.map((word, idx) => {
                const isAccentWord = ACCENT_WORD_INDICES.has(idx);
                const hasUnderline = UNDERLINE_WORD_INDICES.has(idx);

                return (
                  <React.Fragment key={idx}>
                    <span
                      ref={(el) => {
                        wordSpanRefs.current[idx] = el;
                      }}
                      data-word-lit="false"
                      data-word-weight="0.00"
                      className={`relative inline-block will-change-[transform,opacity] ${
                        isAccentWord ? 'text-[#0D5FF9]' : 'text-[#141517]'
                      }`}
                      style={{
                        opacity: 0.13,
                        transform: 'translate3d(0, 11px, 0) scale(0.968)',
                      }}
                    >
                      {word}
                      {hasUnderline && (
                        <span
                          ref={(el) => {
                            wordUnderlineRefs.current[idx] = el;
                          }}
                          aria-hidden="true"
                          className="pointer-events-none absolute left-0 right-0 -bottom-1 h-[2.5px] rounded-full bg-[#0D5FF9] origin-left will-change-[transform,opacity]"
                          style={{
                            transform: 'scaleX(0)',
                            opacity: 0,
                          }}
                        />
                      )}
                    </span>{' '}
                  </React.Fragment>
                );
              })}
            </h2>

            <p className="mt-8 text-[clamp(1.2rem,2.1vw,1.6rem)] font-semibold tracking-[-0.02em] leading-[1.38] max-w-[560px] mx-auto">
              {SUB_WORDS.map((word, idx) => (
                <React.Fragment key={idx}>
                  <span
                    ref={(el) => {
                      subWordSpanRefs.current[idx] = el;
                    }}
                    data-word-lit="false"
                    data-word-weight="0.00"
                    className="inline-block text-neutral-700 will-change-[transform,opacity]"
                    style={{
                      opacity: 0.14,
                      transform: 'translate3d(0, 8px, 0)',
                    }}
                  >
                    {word}
                  </span>{' '}
                </React.Fragment>
              ))}
            </p>
          </div>

          {/* Modest Bottom Scroll Progress & Anchor Cue */}
          <div className="absolute bottom-10 inset-x-0 flex flex-col items-center gap-3 z-10">
            <div
              aria-hidden="true"
              className="w-28 h-[2px] bg-neutral-100 rounded-full overflow-hidden"
            >
              <div
                ref={progressBarRef}
                className="h-full w-full bg-[#0D5FF9] origin-left will-change-transform"
                style={{ transform: 'scaleX(0)' }}
              />
            </div>
            <p className="text-[11.5px] font-mono-code text-neutral-400 whitespace-nowrap">
              {isComplete
                ? 'Continuă să derulezi ↓'
                : 'Derulează pentru a descoperi ↓'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PricingTablesSection({
  onOpenServiceModal,
}: ServicesSectionProps) {
  return (
    <section
      id="pachete-preturi"
      data-theme-section="true"
      aria-labelledby="pricing-heading"
      className="bg-transparent py-20 lg:py-24 transition-colors duration-500 ease-out"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="mb-12">
          <p className="text-xs font-mono-code uppercase tracking-widest text-[#0D5FF9] mb-2">
            Pachete &amp; Prețuri
          </p>
          <h2
            id="pricing-heading"
            className="text-[clamp(2rem,4vw,3.3rem)] font-extrabold tracking-[-0.035em] leading-[1.06] text-[#141517]"
          >
            Pachete transparente, fără costuri ascunse
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          {SERVICE_CARDS.map((card) => (
            <PricingTierCard
              key={card.id}
              card={card}
              onSelect={onOpenServiceModal}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
