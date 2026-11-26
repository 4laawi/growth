"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeader, useSectionReveal } from './StudioPrimitives';

const SQRT_5000 = Math.sqrt(5000);

export interface StaggerTestimonialItem {
  tempId: number;
  testimonial: string;
  by: string;
  contextTag: string;
  imgSrc: string;
}

export const DEFAULT_AVATAR = '/PFP/default-avatar.svg';

export const ROGROWTH_TESTIMONIALS: StaggerTestimonialItem[] = [
  {
    tempId: 0,
    testimonial:
      'Soluția noastră preferată din piață. Ne mișcăm de 5 ori mai rapid de când am construit site-ul cu RoGrowth.',
    by: 'Alex · Fondator, Tech & B2B București',
    contextTag: 'Viteză de execuție',
    imgSrc: '/PFP/MAN-011.webp',
  },
  {
    tempId: 1,
    testimonial:
      'Am liniștea că domeniul, codul sursă și baza de date sunt 100% pe numele nostru. Rar găsești transparența asta la alte agenții.',
    by: 'Dan · Administrator, Clinică Medicală',
    contextTag: '100% Proprietate Client',
    imgSrc: '/PFP/man02.webp',
  },
  {
    tempId: 2,
    testimonial:
      'Modul în care RoGrowth gândește pagina din perspectiva clientului final face planificarea campaniilor mult mai simplă.',
    by: 'Maria · Director Operațiuni, Imobiliare Ilfov',
    contextTag: 'Arhitectură Lead-Gen',
    imgSrc: '/PFP/HOUSE.webp',
  },
  {
    tempId: 3,
    testimonial:
      'Dacă aș putea aprecia atenția la detalii pe o scară de la 1 la 10, le-aș da 12 fără ezitare.',
    by: 'Andrei · Head of Design, Studio Creativ',
    contextTag: 'Meșteșug UI/UX',
    imgSrc: '/PFP/man-in-the-pool.webp',
  },
  {
    tempId: 4,
    testimonial:
      'Am fost sceptici la început după experiențe neplăcute cu freelanceri, dar după cum lucrează echipa RoGrowth, nu ne mai întoarcem la șabloane.',
    by: 'Paula · Coordonator Marketing, Retail RO',
    contextTag: 'Fără șabloane rigide',
    imgSrc: '/PFP/Romanian_flag_WOMAN.webp',
  },
  {
    tempId: 5,
    testimonial:
      'Căutam de ani de zile o echipă care să vorbească pe limba noastră, fără jargon tehnic inutil și fără costuri ascunse pe parcurs.',
    by: 'Petru · Director Vânzări, Distribuție B2B',
    contextTag: 'Preț fix în scris',
    imgSrc: '/PFP/man01.webp',
  },
  {
    tempId: 6,
    testimonial:
      'Am trecut pe arhitectura Next.js propusă de RoGrowth și site-ul se încarcă instantaneu pe orice telefon.',
    by: 'Adi · Inginer Software, Platformă SaaS',
    contextTag: 'Performanță mobilă',
    imgSrc: encodeURI("/PFP/I'm looking for a peaceful relationship_MAN.webp"),
  },
  {
    tempId: 7,
    testimonial:
      'Panoul de administrare este atât de simplu și intuitiv încât echipa noastră a învățat să actualizeze ofertele în 10 minute.',
    by: 'Marina · Manager Echipă, Centru Educațional',
    contextTag: 'Ușor de administrat',
    imgSrc: '/PFP/woman03.webp',
  },
  {
    tempId: 8,
    testimonial:
      'Ne place că arhitectura este construită să crească odată cu afacerea noastră: am pornit cu prezentare și am adăugat catalogul fără să refacem totul.',
    by: 'Tudor · Antreprenor, Închirieri Auto Otopeni',
    contextTag: 'Scalabilitate Ziua 1',
    imgSrc: encodeURI('/PFP/☼ Romania ☼.webp'),
  },
  {
    tempId: 9,
    testimonial:
      'Ne-au spus direct că nu avem nevoie de un pachet scump, ci de o pagină rapidă de €350 orientată pe apeluri și WhatsApp. Onestitate rară.',
    by: 'Daniel · Fondator, Servicii Locale București',
    contextTag: 'Diagnostic onest',
    imgSrc: DEFAULT_AVATAR,
  },
];

export function computeStaggerPosition(index: number, totalLength: number): number {
  if (totalLength <= 0) return 0;
  return totalLength % 2
    ? index - (totalLength + 1) / 2
    : index - totalLength / 2;
}

export function rotateTestimonialsList(
  list: StaggerTestimonialItem[],
  steps: number,
  idGenerator: () => number = () => Math.random()
): StaggerTestimonialItem[] {
  if (!list.length || steps === 0) return [...list];
  const newList = [...list];
  if (steps > 0) {
    for (let i = steps; i > 0; i--) {
      const item = newList.shift();
      if (!item) break;
      newList.push({ ...item, tempId: idGenerator() });
    }
  } else {
    for (let i = steps; i < 0; i++) {
      const item = newList.pop();
      if (!item) break;
      newList.unshift({ ...item, tempId: idGenerator() });
    }
  }
  return newList;
}

interface TestimonialCardProps {
  position: number;
  testimonial: StaggerTestimonialItem;
  handleMove: (steps: number, isUserAction?: boolean) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
}) => {
  const isCenter = position === 0;
  const authorFirstName = testimonial.by.split('·')[0]?.trim() || 'Antreprenor';

  return (
    <div
      role="button"
      tabIndex={isCenter ? 0 : -1}
      aria-label={`Adu în centru impresia de la ${authorFirstName}`}
      onClick={() => handleMove(position, true)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleMove(position, true);
        }
      }}
      className={`absolute left-1/2 top-1/2 cursor-pointer border-2 p-7 sm:p-8 select-none will-change-transform ${isCenter
        ? 'z-10 bg-[#0D5FF9] text-white border-[#0D5FF9]'
        : 'z-0 bg-white dark:bg-[#131417] text-[#141517] dark:text-white border-neutral-200 dark:border-white/10 hover:border-[#0D5FF9]/50'
        }`}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath:
          'polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)',
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? '0px 14px 35px -4px rgba(13, 95, 249, 0.35), 0px 8px 0px 4px rgba(13, 95, 249, 0.22)'
          : '0px 14px 35px -10px rgba(20, 21, 23, 0.08)',
        transition:
          'transform 700ms cubic-bezier(0.22, 1, 0.36, 1), background-color 700ms cubic-bezier(0.22, 1, 0.36, 1), color 700ms cubic-bezier(0.22, 1, 0.36, 1), border-color 700ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 700ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* Chamfered top-right corner border line */}
      <span
        aria-hidden="true"
        className={`absolute block origin-top-right rotate-45 ${isCenter ? 'bg-[#004AD9]' : 'bg-neutral-200 dark:bg-white/15'
          }`}
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
          transition: 'background-color 700ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />

      <div className="flex items-center justify-between gap-3 mb-4 pr-8">
        <img
          src={testimonial.imgSrc || DEFAULT_AVATAR}
          alt={authorFirstName}
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            if (!target.src.endsWith(DEFAULT_AVATAR)) {
              target.src = DEFAULT_AVATAR;
            }
          }}
          className="h-14 w-12 bg-neutral-100 object-cover object-top shrink-0"
          style={{
            boxShadow: isCenter ? '3px 3px 0px #004AD9' : '3px 3px 0px #141517',
            transition: 'box-shadow 700ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
        <span
          className={`text-[11px] font-mono-code uppercase tracking-wider ${isCenter ? 'text-sky-200' : 'text-[#0D5FF9] dark:text-[#7DD3FC]'
            }`}
          style={{
            transition: 'color 700ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {testimonial.contextTag}
        </span>
      </div>

      <h3
        className={`text-base sm:text-[19px] font-semibold leading-[1.38] tracking-[-0.015em] ${isCenter ? 'text-white' : 'text-[#141517] dark:text-white'
          }`}
        style={{
          transition: 'color 700ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        „{testimonial.testimonial}”
      </h3>

      <p
        className={`absolute bottom-7 left-7 right-7 sm:bottom-8 sm:left-8 sm:right-8 mt-2 text-xs sm:text-sm italic ${isCenter ? 'text-white/85' : 'text-neutral-500 dark:text-neutral-400'
          }`}
        style={{
          transition: 'color 700ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        — {testimonial.by}
      </p>
    </div>
  );
};

export const ONBOARDING_DEMO_DELAY_MS = 350;
export const AUTOPLAY_INTERVAL_MS = 3000;

export interface StaggerTestimonialsProps {
  isSectionRevealed?: boolean;
}

export const StaggerTestimonials: React.FC<StaggerTestimonialsProps> = ({
  isSectionRevealed,
}) => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState<
    StaggerTestimonialItem[]
  >(ROGROWTH_TESTIMONIALS);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasTriggeredDemo, setHasTriggeredDemo] = useState(false);
  const [isNextHighlighted, setIsNextHighlighted] = useState(false);
  const userInteractedRef = useRef(false);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const isSectionActive = Boolean(isSectionRevealed || isInView);

  const handleMove = useCallback((steps: number, isUserAction = false) => {
    if (steps === 0) return;
    if (isUserAction) {
      userInteractedRef.current = true;
    }
    setTestimonialsList((prev) => rotateTestimonialsList(prev, steps));
  }, []);

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia('(min-width: 640px)');
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // IntersectionObserver to detect when section enters viewport (as fallback or standalone)
  useEffect(() => {
    const el = stageRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: '60px 0px 0px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // On arrival (scrolling down and revealing the section):
  // Automatically advance to next comment swiftly with a subtle highlight on the Next button.
  // This demonstrates the interaction immediately so visitors know they can click the Next button to try it themselves.
  useEffect(() => {
    if (!isSectionActive || hasTriggeredDemo || userInteractedRef.current) return;

    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      setHasTriggeredDemo(true);
      return;
    }

    const demoTimer = setTimeout(() => {
      if (userInteractedRef.current) return;
      if (typeof document !== 'undefined' && document.hidden) return;

      setHasTriggeredDemo(true);
      setIsNextHighlighted(true);
      handleMove(1, false);

      const unhighlightTimer = setTimeout(() => {
        setIsNextHighlighted(false);
      }, 700);

      return () => clearTimeout(unhighlightTimer);
    }, ONBOARDING_DEMO_DELAY_MS);

    return () => clearTimeout(demoTimer);
  }, [isSectionActive, hasTriggeredDemo, handleMove]);

  // Regular autoplay loop:
  // After the arrival demonstration has completed (or user interacted),
  // smoothly advances every 3 seconds.
  // Pauses when hovered, focused, out of view, or when tab is hidden.
  useEffect(() => {
    if (!isSectionActive || isHovered) return;

    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    if (!hasTriggeredDemo && !userInteractedRef.current) return;

    const timer = setInterval(() => {
      if (typeof document !== 'undefined' && document.hidden) return;
      handleMove(1, false);
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [isSectionActive, isHovered, hasTriggeredDemo, handleMove, testimonialsList]);

  const centerIndex = testimonialsList.findIndex(
    (_, idx) => computeStaggerPosition(idx, testimonialsList.length) === 0
  );
  const activeItem = testimonialsList[centerIndex] || testimonialsList[0];

  return (
    <div
      ref={stageRef}
      data-testid="stagger-testimonials-stage"
      data-active-by={activeItem?.by || ''}
      data-nosnippet
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      onFocusCapture={() => setIsHovered(true)}
      onBlurCapture={() => setIsHovered(false)}
      className="relative w-full overflow-hidden bg-white dark:bg-transparent transition-colors duration-500 ease-out"
      style={{ height: 600 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = computeStaggerPosition(index, testimonialsList.length);
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}

      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5">
        <button
          type="button"
          onClick={() => handleMove(-1, true)}
          className="flex h-14 w-14 items-center justify-center text-2xl transition-colors duration-300 bg-white dark:bg-[#131417] text-[#141517] dark:text-white border-2 border-neutral-200 dark:border-white/15 hover:bg-[#0D5FF9] hover:text-white hover:border-[#0D5FF9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D5FF9] focus-visible:ring-offset-2 cursor-pointer shadow-sm"
          aria-label="Impresia anterioară"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          type="button"
          onClick={() => handleMove(1, true)}
          className={`flex h-14 w-14 items-center justify-center text-2xl transition-all duration-500 cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D5FF9] focus-visible:ring-offset-2 ${isNextHighlighted
            ? 'bg-[#0D5FF9] text-white border-2 border-[#0D5FF9] scale-105 shadow-lg ring-4 ring-[#0D5FF9]/25'
            : 'bg-white dark:bg-[#131417] text-[#141517] dark:text-white border-2 border-neutral-200 dark:border-white/15 hover:bg-[#0D5FF9] hover:text-white hover:border-[#0D5FF9]'
            }`}
          aria-label="Impresia următoare"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export function StaggerTestimonialsSection() {
  const reveal = useSectionReveal<HTMLElement>();
  const ease = 'cubic-bezier(0.22, 1, 0.36, 1)';

  return (
    <section
      ref={reveal.ref}
      id="impresii"
      data-theme-section="true"
      data-section-revealed={reveal.isRevealed ? 'true' : 'false'}
      aria-labelledby="impresii-heading"
      data-nosnippet
      className="bg-white dark:bg-transparent pt-16 pb-20 overflow-hidden transition-colors duration-500 ease-out"
    >
      <div
        style={{
          opacity: reveal.isRevealed ? 1 : 0,
          transform: reveal.isRevealed
            ? 'translate3d(0, 0, 0)'
            : 'translate3d(0, 20px, 0)',
          transition: `opacity 600ms ${ease}, transform 600ms ${ease}`,
        }}
        className="max-w-[1240px] mx-auto px-6 md:px-12 lg:px-16 mb-10"
      >
        <SectionHeader
          id="impresii-heading"
          eyebrow="Ce Spun Oamenii Despre Modul Nostru de Lucru"
          title="Cum se simte colaborarea cu RoGrowth"
          description="Ce apreciază antreprenorii și echipele cu care discutăm: de la diagnosticul onest și prețul fix în scris până la predarea 100% a codului sursă."
        />
      </div>

      <div
        style={{
          opacity: reveal.isRevealed ? 1 : 0,
          transform: reveal.isRevealed
            ? 'translate3d(0, 0, 0)'
            : 'translate3d(0, 22px, 0)',
          transition: `opacity 640ms ${ease} 110ms, transform 640ms ${ease} 110ms`,
        }}
      >
        <StaggerTestimonials isSectionRevealed={reveal.isRevealed} />
      </div>
    </section>
  );
}
