import React, { useEffect, useRef, useCallback } from 'react';

export interface CrossoverCardConfig {
  id: string;
  src: string;
  alt: string;
  /** Width as a fraction of stage width on desktop (e.g. 0.145) */
  widthRatio: number;
  /** Width / height ratio matching the asset's native dimensions */
  aspectRatio: number;
  /** Horizontal center X as a fraction of stage width on desktop (e.g. 0.25) */
  centerXRatio: number;
  /** Upward scroll parallax velocity multiplier (e.g. 1.0, 2.40, 1.58) */
  speedMultiplier: number;
  /** Counter-transformed crossover text color inside this device's silhouette */
  mirrorTextColor?: string;
  /** Image object-fit mode (defaults to 'contain' for device mockups) */
  objectFit?: 'contain' | 'cover';
}

export interface CrossoverCardLayout {
  cardW: number;
  cardH: number;
  cardX: number;
  y: number;
  isVisible: boolean;
}

export const DEFAULT_CROSSOVER_CARDS: CrossoverCardConfig[] = [
  {
    id: 'crossover-mobile-project',
    src: '/assets/aistudio/phone-project_6d808408.webp',
    alt: 'Creare site web și aplicație mobilă responsive — interfață modernă pe smartphone pentru companii din România',
    widthRatio: 0.145,
    aspectRatio: 945 / 1680,
    centerXRatio: 0.25,
    speedMultiplier: 1.0,
    mirrorTextColor: '#0D5FF9',
    objectFit: 'contain',
  },
  {
    id: 'crossover-desktop-project',
    src: '/assets/aistudio/desktop-project.webp_026b89fb.webp',
    alt: 'Platformă web desktop optimizată pentru conversii și rezervări — arhitectură tehnică rapidă RoGrowth',
    widthRatio: 0.27,
    aspectRatio: 1500 / 1125,
    centerXRatio: 0.505,
    speedMultiplier: 2.4,
    mirrorTextColor: '#0D5FF9',
    objectFit: 'contain',
  },
  {
    id: 'crossover-tablet-project',
    src: '/assets/aistudio/tablet-project_b287e069.webp',
    alt: 'Site web e-commerce și comenzi online pe tabletă — experiență impecabilă și încărcare rapidă',
    widthRatio: 0.23,
    aspectRatio: 1500 / 1125,
    centerXRatio: 0.775,
    speedMultiplier: 1.58,
    mirrorTextColor: '#0D5FF9',
    objectFit: 'contain',
  },
];

/**
 * Pure calculation of normalized scroll progress [0, 1] while the stage is pinned.
 */
export function computeCrossoverProgress(
  trackTop: number,
  trackHeight: number,
  viewportHeight: number
): number {
  const scrollable = trackHeight - viewportHeight;
  if (scrollable <= 0 || viewportHeight <= 0) return 0;
  const raw = -trackTop / scrollable;
  return Math.max(0, Math.min(1, raw));
}

/**
 * Pure calculation of a card's pixel dimensions and device-pixel-snapped (x, y)
 * position for a given progress p in [0, 1].
 *
 * At p = 0.34 (the alignment point), all 3 cards align their top edges along
 * `y = 0.516 * stageH` (the horizontal midline between Line 1 and Line 2).
 */
export function computeCrossoverCardLayout(
  card: CrossoverCardConfig,
  stageW: number,
  stageH: number,
  progress: number,
  dpr = 1
): CrossoverCardLayout {
  const isNarrow = stageW < 640;
  let effectiveWidthRatio = card.widthRatio;
  let effectiveCenterXRatio = card.centerXRatio;

  if (isNarrow) {
    if (card.centerXRatio < 0.35) {
      effectiveCenterXRatio = 0.18;
      effectiveWidthRatio = 0.23;
    } else if (card.centerXRatio > 0.65) {
      effectiveCenterXRatio = 0.82;
      effectiveWidthRatio = 0.27;
    } else {
      effectiveCenterXRatio = 0.5;
      effectiveWidthRatio = 0.34;
    }
  }

  const safeDpr = dpr > 0 ? dpr : 1;
  const cardW = Math.round(stageW * effectiveWidthRatio);
  const cardH = Math.round(cardW / card.aspectRatio);
  const rawX = stageW * effectiveCenterXRatio - cardW / 2;
  const cardX = Math.round(rawX * safeDpr) / safeDpr;

  const alignY = 0.516 * stageH;
  const baseTravel = 1.54 * stageH;
  const alignProgress = 0.34;
  const rawY =
    alignY - card.speedMultiplier * baseTravel * (progress - alignProgress);
  const snappedY = Math.round(rawY * safeDpr) / safeDpr;

  const isVisible = snappedY < stageH + 48 && snappedY + cardH > -48;

  return {
    cardW,
    cardH,
    cardX,
    y: snappedY,
    isVisible,
  };
}

export interface CrossoverScrollShowcaseProps {
  line1?: string;
  line2?: string;
  seoHeading?: string;
  seoSubtitle?: string;
  cards?: CrossoverCardConfig[];
  /** Total scroll track height in vh units (default 290vh for silky-smooth scrubbing) */
  trackHeightVh?: number;
  isDarkMode?: boolean;
  className?: string;
}

const CROSSOVER_CSS = `
.crossover-track {
  position: relative;
  width: 100%;
  background-color: transparent;
  user-select: none;
}
.crossover-stage {
  position: sticky;
  top: 0;
  width: 100%;
  height: 100svh;
  min-height: 560px;
  overflow: hidden;
  background-color: #EDEDEB;
  contain: layout paint style;
  transition: background-color 500ms ease-out;
}
.crossover-track[data-end-blend="true"] .crossover-stage {
  background-color: transparent;
}
.crossover-track[data-dark-mode="true"] .crossover-stage {
  background-color: transparent;
}
.crossover-text-plane {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
.crossover-heading {
  margin: 0;
  padding: 0;
  text-align: center;
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
  font-size: clamp(3.8rem, 13.2vw, 12.6rem);
  font-weight: 500;
  line-height: 0.96;
  letter-spacing: -0.045em;
  font-kerning: normal;
  -webkit-font-smoothing: antialiased;
  transition: color 500ms ease-out;
}
.crossover-track[data-dark-mode="true"] .crossover-base-heading {
  color: rgba(255, 255, 255, 0.92);
}
.crossover-card {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  background: transparent;
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  will-change: transform;
  backface-visibility: hidden;
  transform: translate3d(0, 120vh, 0);
  pointer-events: none;
  z-index: 20;
}
.crossover-card-img {
  display: block;
  width: 100%;
  height: 100%;
  object-position: center;
  pointer-events: none;
  user-select: none;
}
.crossover-white-mirror {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  will-change: transform;
  backface-visibility: hidden;
  z-index: 2;
}
`;

export function CrossoverScrollShowcase({
  line1 = 'Site-uri',
  line2 = 'responsive',
  seoHeading = 'Creare Site-uri Web Responsive & Optimizate pentru Conversii',
  seoSubtitle = 'Dezvoltăm platforme digitale moderne pentru companii din România. Arhitectură tehnică sigură, încărcare rapidă și experiență impecabilă pe mobil, tabletă și desktop.',
  cards = DEFAULT_CROSSOVER_CARDS,
  trackHeightVh = 290,
  isDarkMode = false,
  className = '',
}: CrossoverScrollShowcaseProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mirrorRefs = useRef<(HTMLDivElement | null)[]>([]);

  const stageSizeRef = useRef({ w: 1280, h: 804, dpr: 1 });
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);
  const isNearViewportRef = useRef(true);
  const reducedMotionRef = useRef(false);
  const lastAttrProgressRef = useRef('');

  const applyFrame = useCallback(
    (progress: number) => {
      const { w, h, dpr } = stageSizeRef.current;
      if (w <= 0 || h <= 0) return;

      for (let i = 0; i < cards.length; i++) {
        const cardEl = cardRefs.current[i];
        const mirrorEl = mirrorRefs.current[i];
        if (!cardEl || !mirrorEl) continue;

        const layout = computeCrossoverCardLayout(cards[i], w, h, progress, dpr);

        cardEl.style.transform = `translate3d(${layout.cardX}px, ${layout.y}px, 0)`;
        mirrorEl.style.transform = `translate3d(${-layout.cardX}px, ${-layout.y}px, 0)`;
      }

      const trackEl = trackRef.current;
      if (trackEl) {
        const rounded = progress.toFixed(2);
        if (rounded !== lastAttrProgressRef.current) {
          lastAttrProgressRef.current = rounded;
          trackEl.setAttribute('data-crossover-progress', rounded);
          trackEl.setAttribute('data-end-blend', progress >= 0.72 ? 'true' : 'false');
        }
      }
    },
    [cards]
  );

  const syncGeometry = useCallback(() => {
    const stageEl = stageRef.current;
    if (!stageEl) return;
    const w = stageEl.clientWidth || window.innerWidth || 1280;
    const h = stageEl.clientHeight || window.innerHeight || 804;
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    stageSizeRef.current = { w, h, dpr };

    for (let i = 0; i < cards.length; i++) {
      const cardEl = cardRefs.current[i];
      const mirrorEl = mirrorRefs.current[i];
      if (!cardEl || !mirrorEl) continue;

      const layout = computeCrossoverCardLayout(
        cards[i],
        w,
        h,
        currentProgressRef.current,
        dpr
      );
      cardEl.style.width = `${layout.cardW}px`;
      cardEl.style.height = `${layout.cardH}px`;
      mirrorEl.style.width = `${w}px`;
      mirrorEl.style.height = `${h}px`;
    }

    applyFrame(currentProgressRef.current);
  }, [cards, applyFrame]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => {
      reducedMotionRef.current = mq.matches;
    };
    updateMotion();
    mq.addEventListener('change', updateMotion);
    return () => mq.removeEventListener('change', updateMotion);
  }, []);

  useEffect(() => {
    const stageEl = stageRef.current;
    if (!stageEl) return;
    syncGeometry();
    const ro = new ResizeObserver(() => {
      syncGeometry();
    });
    ro.observe(stageEl);
    return () => ro.disconnect();
  }, [syncGeometry]);

  useEffect(() => {
    const trackEl = trackRef.current;
    if (!trackEl) return;

    const tick = (now: number) => {
      const prevTime = lastFrameTimeRef.current || now - 16;
      const dt = Math.min(48, Math.max(1, now - prevTime));
      lastFrameTimeRef.current = now;

      const target = targetProgressRef.current;
      const current = currentProgressRef.current;

      // Exponential damper (tau = 38ms) for silky inertia without lag
      const alpha = reducedMotionRef.current ? 1 : 1 - Math.exp(-dt / 38);
      const next = current + (target - current) * alpha;

      if (Math.abs(target - next) < 0.00015) {
        currentProgressRef.current = target;
        applyFrame(target);
        rafIdRef.current = null;
        lastFrameTimeRef.current = 0;
        return;
      }

      currentProgressRef.current = next;
      applyFrame(next);
      rafIdRef.current = window.requestAnimationFrame(tick);
    };

    const startTickerIfNeeded = () => {
      if (rafIdRef.current === null) {
        lastFrameTimeRef.current = performance.now();
        rafIdRef.current = window.requestAnimationFrame(tick);
      }
    };

    const readScrollTarget = (immediate = false) => {
      if (!isNearViewportRef.current && !immediate) return;
      const rect = trackEl.getBoundingClientRect();
      const vh = window.innerHeight || 804;
      const nextTarget = computeCrossoverProgress(rect.top, rect.height, vh);
      targetProgressRef.current = nextTarget;

      if (immediate || reducedMotionRef.current) {
        currentProgressRef.current = nextTarget;
        applyFrame(nextTarget);
      } else {
        startTickerIfNeeded();
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isNearViewportRef.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            readScrollTarget(true);
          }
        }
      },
      { rootMargin: '250px 0px 250px 0px' }
    );
    io.observe(trackEl);

    readScrollTarget(true);

    const onScroll = () => readScrollTarget(false);
    const onResize = () => {
      syncGeometry();
      readScrollTarget(true);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [applyFrame, syncGeometry]);

  return (
    <div
      ref={trackRef}
      data-testid="crossover-scroll-track"
      data-crossover-progress="0.00"
      data-end-blend="false"
      data-dark-mode={isDarkMode ? 'true' : 'false'}
      className={`crossover-track ${className}`}
      style={{ height: `${trackHeightVh}vh` }}
    >
      <style>{CROSSOVER_CSS}</style>

      <div ref={stageRef} className="crossover-stage">
        {/* Semantic SEO H2 & Subtitle for search indexation and screen readers without cluttering the stage */}
        <div className="sr-only">
          <h2 id="crossover-showcase-heading">{seoHeading}</h2>
          <p>{seoSubtitle}</p>
        </div>

        {/* Layer 1 (Base z-10): Crisp dark ink monumental display typography on #EDEDEB studio canvas */}
        <div aria-hidden="true" className="crossover-text-plane z-10">
          <div className="crossover-heading crossover-base-heading text-[#111111]">
            <span className="block">{line1}</span>
            <span className="block">{line2}</span>
          </div>
        </div>

        {/* Layer 2 (Cards z-20): 3 rising transparent-cutout device mockups with alpha-masked crossover text mirrors */}
        {cards.map((card, idx) => {
          const maskUrl = `url("${card.src}")`;
          return (
            <div
              key={card.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              data-testid={`crossover-card-${idx}`}
              className="crossover-card"
              style={{
                WebkitMaskImage: maskUrl,
                maskImage: maskUrl,
              }}
            >
              <img
                src={card.src}
                alt={card.alt}
                decoding="sync"
                loading="eager"
                fetchPriority="high"
                draggable={false}
                referrerPolicy="no-referrer"
                className="crossover-card-img"
                style={{ objectFit: card.objectFit || 'contain' }}
              />
              <div
                ref={(el) => {
                  mirrorRefs.current[idx] = el;
                }}
                aria-hidden="true"
                className="crossover-white-mirror"
              >
                <div
                  className="crossover-heading"
                  style={{ color: card.mirrorTextColor || '#0D5FF9' }}
                >
                  <span className="block">{line1}</span>
                  <span className="block">{line2}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default CrossoverScrollShowcase;
