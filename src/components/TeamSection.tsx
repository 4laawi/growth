import React, { useEffect, useRef } from 'react';
import {
  computeTeamSectionScrollState,
  computeWordSmoothReveal,
} from '../data/studioData';

interface TeamSectionProps {
  onOpenCareersModal?: () => void;
  isDarkMode?: boolean;
}

interface FloatingTechItem {
  id: string;
  name: string;
  src: string;
  /** Rest target polar coordinates relative to stage center */
  angleDeg: number;       // Angle in degrees around stage center
  radiusXPercent: number; // % of stage half-width (0..100)
  radiusYPercent: number; // % of stage half-height (0..100)
  size: number;
  rotationSpeed: number;  // Multiplier for orbital velocity & parallax
  spinOffsetDeg: number;  // Initial rotational spiral offset
}

const FRAMEWORK_LOGOS: FloatingTechItem[] = [
  {
    id: 'nextjs',
    name: 'Next.js',
    src: '/assets/framework--logos/nextjs.png',
    angleDeg: 215,
    radiusXPercent: 78,
    radiusYPercent: 72,
    size: 64,
    rotationSpeed: 1.0,
    spinOffsetDeg: 120,
  },
  {
    id: 'angular',
    name: 'Angular',
    src: '/assets/framework--logos/angular-logo.webp',
    angleDeg: 325,
    radiusXPercent: 76,
    radiusYPercent: 68,
    size: 58,
    rotationSpeed: -1.15,
    spinOffsetDeg: -130,
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    src: '/assets/framework--logos/taiwlind-logo.webp',
    angleDeg: 170,
    radiusXPercent: 86,
    radiusYPercent: 42,
    size: 60,
    rotationSpeed: 0.9,
    spinOffsetDeg: 100,
  },
  {
    id: 'webdesign',
    name: 'UI/UX & Web Design',
    src: '/assets/framework--logos/web-design.png',
    angleDeg: 10,
    radiusXPercent: 88,
    radiusYPercent: 40,
    size: 62,
    rotationSpeed: -1.05,
    spinOffsetDeg: -110,
  },
  {
    id: 'html',
    name: 'HTML5',
    src: '/assets/framework--logos/html-logo.webp',
    angleDeg: 235,
    radiusXPercent: 62,
    radiusYPercent: 60,
    size: 56,
    rotationSpeed: 1.25,
    spinOffsetDeg: 150,
  },
  {
    id: 'css',
    name: 'CSS3',
    src: '/assets/framework--logos/css.webp',
    angleDeg: 305,
    radiusXPercent: 64,
    radiusYPercent: 58,
    size: 56,
    rotationSpeed: -1.2,
    spinOffsetDeg: -140,
  },
  {
    id: 'python',
    name: 'Python',
    src: '/assets/framework--logos/python-logo.webp',
    angleDeg: 135,
    radiusXPercent: 70,
    radiusYPercent: 66,
    size: 54,
    rotationSpeed: 0.85,
    spinOffsetDeg: 90,
  },
  {
    id: 'mysql',
    name: 'MySQL',
    src: '/assets/framework--logos/mysql-logo.webp',
    angleDeg: 45,
    radiusXPercent: 72,
    radiusYPercent: 64,
    size: 58,
    rotationSpeed: -0.95,
    spinOffsetDeg: -95,
  },
];

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function smoothWindow(progress: number, start: number, end: number): number {
  const t = clamp01((progress - start) / Math.max(0.001, end - start));
  return t * t * (3 - 2 * t);
}

// Gentle elastic / smooth cubic settle curve
function easeOutCubic(t: number): number {
  const p = 1 - t;
  return 1 - p * p * p;
}

export function TeamSection({
  onOpenCareersModal,
  isDarkMode = false,
}: TeamSectionProps) {
  const trackRef = useRef<HTMLElement | null>(null);
  const stageContentRef = useRef<HTMLDivElement | null>(null);
  const gridBackdropRef = useRef<HTMLDivElement | null>(null);
  const headlineWrapRef = useRef<HTMLDivElement | null>(null);
  const highlightHandleLeftRef = useRef<HTMLSpanElement | null>(null);
  const highlightHandleRightRef = useRef<HTMLSpanElement | null>(null);
  const ctaWrapRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const logoRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isDarkModeRef = useRef(isDarkMode);

  useEffect(() => {
    let rafId: number | null = null;
    let lastTime = 0;
    let currentReveal = 0;
    let targetReveal = 0;
    let currentScroll = 0;
    let targetScroll = 0;
    let isNearViewport = true;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const applyVisualFrame = (reveal: number, scrollProgress: number, timeMs: number) => {
      const trackEl = trackRef.current;
      if (!trackEl) return;

      const isVisible = reveal > 0.005;
      trackEl.setAttribute('data-team-revealed', targetReveal > 0.5 ? 'true' : 'false');
      trackEl.setAttribute('data-team-reveal-progress', reveal.toFixed(3));
      trackEl.setAttribute('data-team-scroll-progress', scrollProgress.toFixed(3));

      if (stageContentRef.current) {
        stageContentRef.current.style.pointerEvents = isVisible ? 'auto' : 'none';
        stageContentRef.current.style.visibility = isVisible ? 'visible' : 'hidden';
      }

      // 1. Subtle architectural dashed grid unfade
      if (gridBackdropRef.current) {
        const gridWeight = smoothWindow(reveal, 0.02, 0.55);
        gridBackdropRef.current.style.opacity = (gridWeight * 0.78).toFixed(3);
      }

      // 2. Centerpiece headline
      if (headlineWrapRef.current) {
        const hWeight = smoothWindow(reveal, 0.06, 0.62);
        const hY = (1 - hWeight) * 24 - (scrollProgress - 0.5) * 8 * hWeight;
        const hScale = 0.972 + 0.028 * hWeight;
        headlineWrapRef.current.style.opacity = hWeight.toFixed(3);
        headlineWrapRef.current.style.transform = `translate3d(0, ${hY.toFixed(2)}px, 0) scale(${hScale.toFixed(3)})`;
      }

      // 3. Selection handles on highlight
      const handleWeight = smoothWindow(reveal, 0.22, 0.74);
      if (highlightHandleLeftRef.current) {
        highlightHandleLeftRef.current.style.opacity = handleWeight.toFixed(3);
        highlightHandleLeftRef.current.style.transform = `scaleY(${handleWeight.toFixed(3)})`;
      }
      if (highlightHandleRightRef.current) {
        highlightHandleRightRef.current.style.opacity = handleWeight.toFixed(3);
        highlightHandleRightRef.current.style.transform = `scaleY(${handleWeight.toFixed(3)})`;
      }

      // 4. Primary CTA button
      if (ctaWrapRef.current) {
        const ctaWeight = smoothWindow(reveal, 0.18, 0.72);
        const ctaY = (1 - ctaWeight) * 18;
        ctaWrapRef.current.style.opacity = ctaWeight.toFixed(3);
        ctaWrapRef.current.style.transform = `translate3d(0, ${ctaY.toFixed(2)}px, 0)`;
      }

      // 5. Orbital / Circular Vortex Reveal & Scroll Parallax for Framework Logos
      const stageEl = stageContentRef.current;
      const stageW = stageEl ? stageEl.clientWidth : 1200;
      const stageH = stageEl ? stageEl.clientHeight : 700;
      const halfW = Math.max(300, stageW * 0.5);
      const halfH = Math.max(240, stageH * 0.5);

      const totalLogos = FRAMEWORK_LOGOS.length;
      for (let i = 0; i < totalLogos; i++) {
        const el = logoRefs.current[i];
        if (!el) continue;

        const logo = FRAMEWORK_LOGOS[i];
        // Staggered unfade window
        const staggerReveal = smoothWindow(reveal, 0.08, 0.95);
        const itemWeight = computeWordSmoothReveal(staggerReveal, i, totalLogos, 2.5);
        const smoothProgress = easeOutCubic(itemWeight);

        // Circular / Orbital entrance calculation:
        // As itemWeight goes 0 -> 1:
        // - Radius expands smoothly from center (inner core ~18% outward to target radius)
        // - Spiral rotation winds from spinOffsetDeg into its target angleDeg
        const spiralAngleDelta = (1 - smoothProgress) * logo.spinOffsetDeg;
        // Subtle continuous ambient scroll orbit (turns slightly as user scrolls down the 180vh track)
        const scrollOrbitOffsetDeg = (scrollProgress - 0.45) * 32 * logo.rotationSpeed;
        
        // Gentle micro-float harmonic wave over time
        const wave = Math.sin(timeMs * 0.0015 + i * 1.1) * 4 * smoothProgress;

        const currentAngleRad = ((logo.angleDeg + spiralAngleDelta + scrollOrbitOffsetDeg) * Math.PI) / 180;
        
        // Radius expansion factor
        const radiusFactor = 0.22 + 0.78 * smoothProgress;
        const targetRadiusX = (logo.radiusXPercent / 100) * (halfW - logo.size * 0.8) * radiusFactor;
        const targetRadiusY = (logo.radiusYPercent / 100) * (halfH - logo.size * 0.8) * radiusFactor;

        const posX = Math.cos(currentAngleRad) * targetRadiusX;
        const posY = Math.sin(currentAngleRad) * targetRadiusY + wave;

        // Smooth subtle scale & opacity
        const scale = 0.5 + 0.5 * smoothProgress;
        const opacity = itemWeight * itemWeight; // extra clean fade-in without pop

        el.style.opacity = opacity.toFixed(3);
        el.style.transform = `translate3d(${posX.toFixed(2)}px, ${posY.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
      }

      // 6. Bottom progress indicator bar
      if (progressBarRef.current) {
        const barScale = clamp01(reveal * 0.35 + scrollProgress * 0.65);
        progressBarRef.current.style.transform = `scaleX(${barScale.toFixed(4)})`;
      }
    };

    const tick = (now: number) => {
      const prev = lastTime || now - 16;
      const dt = Math.min(48, Math.max(1, now - prev));
      lastTime = now;

      if (prefersReducedMotion) {
        currentReveal = targetReveal;
        currentScroll = targetScroll;
        applyVisualFrame(currentReveal, currentScroll, now);
        rafId = null;
        lastTime = 0;
        return;
      }

      // Smooth exponential damping: gentle ~95ms tau on unfade, ~42ms tau on scroll parallax
      const revealTau = targetReveal > currentReveal ? 95 : 55;
      const alphaReveal = 1 - Math.exp(-dt / revealTau);
      const alphaScroll = 1 - Math.exp(-dt / 42);

      currentReveal += (targetReveal - currentReveal) * alphaReveal;
      currentScroll += (targetScroll - currentScroll) * alphaScroll;

      const isStationary =
        Math.abs(targetReveal - currentReveal) < 0.0008 &&
        Math.abs(targetScroll - currentScroll) < 0.0008;

      if (isStationary && currentReveal >= 0.999) {
        // When settled and fully revealed, keep updating gently for harmonic micro-float while in view
        applyVisualFrame(currentReveal, currentScroll, now);
        rafId = window.requestAnimationFrame(tick);
        return;
      }

      applyVisualFrame(currentReveal, currentScroll, now);
      rafId = window.requestAnimationFrame(tick);
    };

    const startTicker = () => {
      if (rafId === null) {
        lastTime = performance.now();
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const evaluateScroll = (immediate = false) => {
      if (!isNearViewport && !immediate) return;
      const trackEl = trackRef.current;
      if (!trackEl) return;

      const rect = trackEl.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const state = computeTeamSectionScrollState(
        rect.top,
        rect.height,
        vh,
        isDarkModeRef.current
      );

      targetReveal = state.revealTarget;
      targetScroll = state.scrollProgress;

      if (immediate && prefersReducedMotion) {
        currentReveal = targetReveal;
        currentScroll = targetScroll;
        applyVisualFrame(currentReveal, currentScroll, performance.now());
        return;
      }

      startTicker();
    };

    // Expose re-evaluation trigger when isDarkMode prop updates
    (trackRef as React.MutableRefObject<HTMLElement | null> & {
      __reevaluate?: () => void;
    }).__reevaluate = () => evaluateScroll(false);

    const trackEl = trackRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isNearViewport = entry.isIntersecting;
          if (entry.isIntersecting) {
            evaluateScroll(false);
          }
        }
      },
      { rootMargin: '200px 0px 200px 0px' }
    );
    if (trackEl) io.observe(trackEl);

    applyVisualFrame(0, 0, 0);
    evaluateScroll(true);

    const onScrollOrResize = () => evaluateScroll(false);
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  useEffect(() => {
    isDarkModeRef.current = isDarkMode;
    const refWithHook = trackRef as React.MutableRefObject<HTMLElement | null> & {
      __reevaluate?: () => void;
    };
    refWithHook.__reevaluate?.();
  }, [isDarkMode]);

  const scrollToPortfolio = () => {
    if (onOpenCareersModal) {
      onOpenCareersModal();
      return;
    }
    const el = document.getElementById('portfolio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={trackRef}
      id="equipo"
      data-theme-section="true"
      data-testid="team-scroll-track"
      data-team-revealed="false"
      data-team-reveal-progress="0.000"
      data-team-scroll-progress="0.000"
      aria-labelledby="equipo-heading"
      className="relative w-full bg-transparent lg:h-[180vh] transition-colors duration-500 ease-out"
    >
      {/* Full-Page 100svh Sticky Stage */}
      <div className="sticky top-0 w-full min-h-[100svh] lg:h-[100svh] px-6 md:px-12 py-16 lg:py-0 overflow-hidden flex flex-col items-center justify-center">
        {/* Subtle architectural dashed grid across the full-page stage */}
        <div
          ref={gridBackdropRef}
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            opacity: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='96' height='96' viewBox='0 0 96 96' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 96 0 L 0 0 0 96' fill='none' stroke='rgba(20,21,23,0.08)' stroke-width='1' stroke-dasharray='2 2'/%3E%3C/svg%3E")`,
            backgroundSize: '96px 96px',
            maskImage:
              'radial-gradient(ellipse 85% 75% at 50% 50%, black 55%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 85% 75% at 50% 50%, black 55%, transparent 100%)',
          }}
        />

        {/* Full-Viewport Stage Composition */}
        <div
          ref={stageContentRef}
          style={{ visibility: 'hidden', pointerEvents: 'none' }}
          className="relative w-full max-w-[1400px] mx-auto min-h-[560px] lg:h-[calc(100svh-3rem)] lg:min-h-[640px] lg:max-h-[860px] flex flex-col items-center justify-center select-none"
        >
          {/* Circular Orbit Floating Framework Logos (Center-referenced, spiral entrance, no backgrounds) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {FRAMEWORK_LOGOS.map((item, idx) => (
              <div
                key={item.id}
                ref={(el) => {
                  logoRefs.current[idx] = el;
                }}
                style={{
                  opacity: 0,
                  transform: 'translate3d(0, 0, 0) scale(0.5)',
                }}
                className="absolute pointer-events-none will-change-[transform,opacity] flex items-center justify-center"
              >
                <img
                  src={item.src}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: `${item.size}px`,
                    height: `${item.size}px`,
                  }}
                  className="object-contain filter drop-shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:scale-115 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          {/* Center Minimalist Headline + Royal-Blue Pill CTA */}
          <div className="relative z-20 text-center px-4 max-w-[1280px] lg:translate-y-1">
            <div
              ref={headlineWrapRef}
              style={{
                opacity: 0,
                transform: 'translate3d(0, 24px, 0) scale(0.972)',
              }}
              className="will-change-[transform,opacity]"
            >
              <p className="text-[12px] font-mono-code uppercase tracking-[0.24em] text-[#0D5FF9] font-semibold mb-3">
                Tehnologii moderne & cod curat
              </p>
              <h2
                id="equipo-heading"
                className="text-[clamp(2rem,4.1vw,3.85rem)] font-extrabold tracking-[-0.04em] leading-[1.14] text-[#141517] dark:text-white transition-colors duration-500 ease-out"
              >
                <span>O arhitectură construită pe </span>
                <span className="relative inline-block bg-[#0D5FF9]/[0.14] px-3 py-1">
                  {/* Left Selection Handle */}
                  <span
                    ref={highlightHandleLeftRef}
                    style={{ opacity: 0, transform: 'scaleY(0)' }}
                    className="absolute -top-2 left-0 bottom-0 w-[2.5px] bg-[#0D5FF9] origin-bottom pointer-events-none"
                    aria-hidden="true"
                  >
                    <span className="absolute -top-1.5 -left-[4.75px] w-3 h-3 rounded-full bg-[#0D5FF9]" />
                  </span>

                  performanță și claritate.

                  {/* Right Selection Handle */}
                  <span
                    ref={highlightHandleRightRef}
                    style={{ opacity: 0, transform: 'scaleY(0)' }}
                    className="absolute top-0 right-0 -bottom-2 w-[2.5px] bg-[#0D5FF9] origin-top pointer-events-none"
                    aria-hidden="true"
                  >
                    <span className="absolute -bottom-1.5 -left-[4.75px] w-3 h-3 rounded-full bg-[#0D5FF9]" />
                  </span>
                </span>
              </h2>
            </div>

            <div
              ref={ctaWrapRef}
              style={{
                opacity: 0,
                transform: 'translate3d(0, 18px, 0)',
              }}
              className="mt-10 md:mt-12 will-change-[transform,opacity]"
            >
              <button
                type="button"
                onClick={scrollToPortfolio}
                className="px-10 py-3.5 rounded-full bg-[#0D5FF9] hover:bg-[#004AD9] text-white text-[14.5px] font-semibold tracking-tight transition-all duration-200 shadow-[0_8px_20px_rgba(13,95,249,0.24)] hover:shadow-[0_12px_28px_rgba(13,95,249,0.32)] hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer pointer-events-auto"
              >
                Vezi proiectele realizate
              </button>
            </div>
          </div>
        </div>

        {/* Minimalist Full-Page Stage Progress Bar at Bottom */}
        <div className="hidden lg:flex absolute bottom-8 inset-x-0 flex-col items-center z-10 pointer-events-none">
          <div
            aria-hidden="true"
            className="w-24 h-[2px] bg-neutral-100 rounded-full overflow-hidden"
          >
            <div
              ref={progressBarRef}
              className="h-full w-full bg-[#0D5FF9] origin-left will-change-transform"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
