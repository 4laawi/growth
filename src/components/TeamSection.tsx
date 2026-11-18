import React, { useEffect, useRef } from 'react';
import {
  HIRING_NOTIFICATIONS,
  TEAM_MEMBERS,
  HiringNotification,
  computeTeamSectionScrollState,
  computeWordSmoothReveal,
} from '../data/studioData';
import { OnlinesNotificationBubble } from './StudioIcons';

interface TeamSectionProps {
  onOpenCareersModal: (selectedJob?: HiringNotification) => void;
  isDarkMode?: boolean;
}

const PORTRAIT_PARALLAX_SPEEDS = [0.85, 1.25, 0.95, 1.15, 0.75, 1.3];
const BUBBLE_PARALLAX_SPEEDS = [1.1, 1.35, 0.9, 1.2];

const BUBBLE_POSITIONS = [
  'top-[23%] left-[18%]',
  'top-[14.5%] left-[45.5%]',
  'top-[11%] right-[3.5%]',
  'bottom-[7%] left-[52.5%]',
];

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function smoothWindow(progress: number, start: number, end: number): number {
  const t = clamp01((progress - start) / Math.max(0.001, end - start));
  return t * t * (3 - 2 * t);
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
  const mobileWrapRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const portraitRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const bubbleRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    const applyVisualFrame = (reveal: number, scrollProgress: number) => {
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

      // 2. Centerpiece headline ("O agenție construită pe claritate și meșteșug.")
      if (headlineWrapRef.current) {
        const hWeight = smoothWindow(reveal, 0.06, 0.62);
        const hY = (1 - hWeight) * 24 - (scrollProgress - 0.5) * 8 * hWeight;
        const hScale = 0.972 + 0.028 * hWeight;
        headlineWrapRef.current.style.opacity = hWeight.toFixed(3);
        headlineWrapRef.current.style.transform = `translate3d(0, ${hY.toFixed(2)}px, 0) scale(${hScale.toFixed(3)})`;
      }

      // 3. Figma selection handles on "claritate și meșteșug."
      const handleWeight = smoothWindow(reveal, 0.22, 0.74);
      if (highlightHandleLeftRef.current) {
        highlightHandleLeftRef.current.style.opacity = handleWeight.toFixed(3);
        highlightHandleLeftRef.current.style.transform = `scaleY(${handleWeight.toFixed(3)})`;
      }
      if (highlightHandleRightRef.current) {
        highlightHandleRightRef.current.style.opacity = handleWeight.toFixed(3);
        highlightHandleRightRef.current.style.transform = `scaleY(${handleWeight.toFixed(3)})`;
      }

      // 4. Primary CTA button ("Vezi roluri deschise")
      if (ctaWrapRef.current) {
        const ctaWeight = smoothWindow(reveal, 0.18, 0.72);
        const ctaY = (1 - ctaWeight) * 18;
        ctaWrapRef.current.style.opacity = ctaWeight.toFixed(3);
        ctaWrapRef.current.style.transform = `translate3d(0, ${ctaY.toFixed(2)}px, 0)`;
      }

      // 5. Staggered unfade + gentle full-page scroll parallax for 6 floating team portraits
      const totalPortraits = TEAM_MEMBERS.length;
      for (let i = 0; i < totalPortraits; i++) {
        const el = portraitRefs.current[i];
        if (!el) continue;

        const staggerProgress = smoothWindow(reveal, 0.2, 0.92);
        const w = computeWordSmoothReveal(staggerProgress, i, totalPortraits, 2.8);
        const speed = PORTRAIT_PARALLAX_SPEEDS[i] ?? 1;
        const parallaxY = (0.45 - scrollProgress) * 26 * speed * w;
        const entryY = (1 - w) * 22;
        const totalY = entryY + parallaxY;
        const scale = 0.94 + 0.06 * w;

        el.style.opacity = w.toFixed(3);
        el.style.transform = `translate3d(0, ${totalY.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
      }

      // 6. Staggered unfade + gentle full-page scroll parallax for 4 hiring notification bubbles
      const totalBubbles = HIRING_NOTIFICATIONS.length;
      for (let j = 0; j < totalBubbles; j++) {
        const el = bubbleRefs.current[j];
        if (!el) continue;

        const staggerProgress = smoothWindow(reveal, 0.34, 1.0);
        const w = computeWordSmoothReveal(staggerProgress, j, totalBubbles, 2.4);
        const speed = BUBBLE_PARALLAX_SPEEDS[j] ?? 1;
        const parallaxY = (0.45 - scrollProgress) * 20 * speed * w;
        const entryY = (1 - w) * 16;
        const totalY = entryY + parallaxY;
        const scale = 0.95 + 0.05 * w;

        el.style.opacity = w.toFixed(3);
        el.style.transform = `translate3d(0, ${totalY.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
      }

      // 7. Mobile / Tablet responsive grid unfade
      if (mobileWrapRef.current) {
        const mWeight = smoothWindow(reveal, 0.22, 0.85);
        const mY = (1 - mWeight) * 18;
        mobileWrapRef.current.style.opacity = mWeight.toFixed(3);
        mobileWrapRef.current.style.transform = `translate3d(0, ${mY.toFixed(2)}px, 0)`;
      }

      // 8. Bottom progress indicator bar
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
        applyVisualFrame(currentReveal, currentScroll);
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

      if (
        Math.abs(targetReveal - currentReveal) < 0.001 &&
        Math.abs(targetScroll - currentScroll) < 0.001
      ) {
        currentReveal = targetReveal;
        currentScroll = targetScroll;
        applyVisualFrame(currentReveal, currentScroll);
        rafId = null;
        lastTime = 0;
        return;
      }

      applyVisualFrame(currentReveal, currentScroll);
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
        applyVisualFrame(currentReveal, currentScroll);
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

    applyVisualFrame(0, 0);
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
      {/* Full-Page 100svh Sticky Stage matching "Site-uri responsive" */}
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
          className="relative w-full max-w-[1400px] mx-auto lg:h-[calc(100svh-3rem)] lg:min-h-[640px] lg:max-h-[860px] flex flex-col items-center justify-center"
        >
          {/* Desktop Floating Team Portraits (6 members around the full-page stage) */}
          {TEAM_MEMBERS.map((member, idx) => (
            <button
              key={member.id}
              ref={(el) => {
                portraitRefs.current[idx] = el;
              }}
              type="button"
              onClick={() => onOpenCareersModal()}
              aria-label={`${member.name} — ${member.specialty}`}
              style={{
                opacity: 0,
                transform: 'translate3d(0, 22px, 0) scale(0.94)',
              }}
              className={`hidden lg:flex flex-col items-start absolute ${member.positionClass} z-10 group cursor-pointer text-left will-change-[transform,opacity]`}
            >
              <div className="w-[94px] h-[94px] rounded-[18px] p-1.5 bg-white border border-neutral-100 shadow-[0_10px_28px_rgba(0,0,0,0.06)] overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
                <img
                  src={member.avatar}
                  alt={member.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-[13px]"
                />
              </div>
              <span className="mt-2 pl-0.5 text-[9.5px] font-mono-code font-medium tracking-[0.04em] uppercase leading-[1.2] whitespace-pre-line text-[#141517] dark:text-white transition-colors duration-500 ease-out">
                {member.role}
              </span>
            </button>
          ))}

          {/* Desktop Floating Hiring Notification Bubbles (4 bubbles around the full-page stage) */}
          {HIRING_NOTIFICATIONS.map((job, idx) => (
            <div
              key={job.id}
              ref={(el) => {
                bubbleRefs.current[idx] = el;
              }}
              style={{
                opacity: 0,
                transform: 'translate3d(0, 16px, 0) scale(0.95)',
              }}
              className={`hidden lg:block absolute ${BUBBLE_POSITIONS[idx]} z-20 will-change-[transform,opacity]`}
            >
              <OnlinesNotificationBubble
                timeAgo={job.timeAgo}
                message={job.title}
                onClick={() => onOpenCareersModal(job)}
              />
            </div>
          ))}

          {/* Center Minimalist Headline + Single Royal-Blue Pill CTA */}
          <div className="relative z-20 text-center px-4 max-w-[1280px] lg:translate-y-1">
            <div
              ref={headlineWrapRef}
              style={{
                opacity: 0,
                transform: 'translate3d(0, 24px, 0) scale(0.972)',
              }}
              className="will-change-[transform,opacity]"
            >
              <h2
                id="equipo-heading"
                className="text-[clamp(2rem,4.1vw,3.85rem)] font-extrabold tracking-[-0.04em] leading-[1.12] text-[#141517] dark:text-white transition-colors duration-500 ease-out xl:whitespace-nowrap"
              >
                <span>O agenție construită pe </span>
                <span className="relative inline-block bg-[#0D5FF9]/[0.16] px-3 py-1">
                  {/* Left Selection Handle */}
                  <span
                    ref={highlightHandleLeftRef}
                    style={{ opacity: 0, transform: 'scaleY(0)' }}
                    className="absolute -top-2 left-0 bottom-0 w-[2.5px] bg-[#0D5FF9] origin-bottom pointer-events-none"
                    aria-hidden="true"
                  >
                    <span className="absolute -top-1.5 -left-[4.75px] w-3 h-3 rounded-full bg-[#0D5FF9]" />
                  </span>

                  claritate și meșteșug.

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
                onClick={() => onOpenCareersModal()}
                className="px-11 py-3.5 rounded-full bg-[#0D5FF9] hover:bg-[#004AD9] text-white text-[14.5px] font-semibold tracking-tight transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
              >
                Vezi roluri deschise
              </button>
            </div>
          </div>

          {/* Mobile / Tablet Responsive Grid */}
          <div
            ref={mobileWrapRef}
            style={{
              opacity: 0,
              transform: 'translate3d(0, 18px, 0)',
            }}
            className="lg:hidden mt-12 w-full max-w-xl space-y-6 will-change-[transform,opacity]"
          >
            <div className="grid grid-cols-3 gap-4 justify-items-center">
              {TEAM_MEMBERS.map((member) => (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => onOpenCareersModal()}
                  aria-label={`${member.name} — ${member.specialty}`}
                  className="flex flex-col items-start text-left cursor-pointer"
                >
                  <div className="w-[82px] h-[82px] rounded-[16px] p-1.5 bg-white border border-neutral-100 shadow-sm overflow-hidden">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-[12px]"
                    />
                  </div>
                  <span className="mt-1.5 text-[9px] font-mono-code uppercase leading-[1.2] whitespace-pre-line text-[#141517]">
                    {member.role}
                  </span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {HIRING_NOTIFICATIONS.map((job) => (
                <OnlinesNotificationBubble
                  key={job.id}
                  compact
                  timeAgo={job.timeAgo}
                  message={job.title}
                  onClick={() => onOpenCareersModal(job)}
                />
              ))}
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
