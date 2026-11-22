import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateContactInquiry,
  filterPortfolioProjects,
  computeWordRevealProgress,
  computeManifestoScrollState,
  computeWordSmoothReveal,
  PORTFOLIO_PROJECTS,
  SERVICE_CARDS,
  WORKSHOP_FAQ_ITEMS,
  BLOG_ARTICLES,
  TEAM_MEMBERS,
} from './studioData';
import {
  resolveAppRoute,
  getPricingVariantClasses,
  ROGROWTH_COLOR_TOKENS,
  ROGROWTH_TYPOGRAPHY_SCALE,
  ROGROWTH_MINIMALISM_RULES,
  MONEY_PAGE_BLUEPRINT_STEPS,
} from '../design-system/tokens';
import {
  ROGROWTH_GUARANTEE_METRICS,
  CREARE_SITE_PACKAGES,
  WEBSITE_TYPES_CATALOG,
  TECH_PLATFORM_STANDARDS,
  TECHNICAL_ANATOMY_PILLARS,
  CREARE_SITE_FAQ_ITEMS,
  buildCreareSiteWebJsonLd,
} from './creareSiteWebData';

test('validateContactInquiry rejects empty and invalid inputs', () => {
  const res = validateContactInquiry({
    name: '',
    email: 'invalid-email',
    organization: '',
    service: '',
    message: 'scurt',
  });
  assert.equal(res.valid, false);
  assert.ok(res.errors.name);
  assert.ok(res.errors.email);
  assert.ok(res.errors.organization);
  assert.ok(res.errors.service);
  assert.ok(res.errors.message);
});

test('validateContactInquiry accepts valid project inquiry', () => {
  const res = validateContactInquiry({
    name: 'Andrei Popescu',
    email: 'andrei@companie.ro',
    organization: 'Atelier București SRL',
    service: 'Site de prezentare simplu (€300 – €400)',
    message: 'Dorim crearea unui site de prezentare rapid și optimizat SEO pentru afacerea noastră.',
  });
  assert.equal(res.valid, true);
  assert.deepEqual(res.errors, {});
});

test('filterPortfolioProjects returns all or matching category items', () => {
  const all = filterPortfolioProjects(PORTFOLIO_PROJECTS, 'todos');
  assert.equal(all.length, PORTFOLIO_PROJECTS.length);

  const exp = filterPortfolioProjects(PORTFOLIO_PROJECTS, 'experiencia');
  assert.ok(exp.length >= 2);
  assert.ok(exp.every((item) => item.category === 'experiencia'));
});

test('computeWordRevealProgress clamps and scales word count accurately', () => {
  assert.equal(computeWordRevealProgress(100, 200, 600, 20), 0);
  assert.equal(computeWordRevealProgress(400, 200, 600, 20), 10);
  assert.equal(computeWordRevealProgress(800, 200, 600, 20), 20);
});

test('computeManifestoScrollState waits until user reaches the full-window section and reveals progressively', () => {
  const viewportH = 900;
  const trackH = 1575; // 175vh
  const totalWords = 22;

  // Before reaching the section (e.g. still in Hero at scrollY = 0, trackTop = 880)
  const beforeState = computeManifestoScrollState(880, trackH, viewportH, totalWords);
  assert.equal(beforeState.revealedWords, 0);
  assert.equal(beforeState.progress, 0);
  assert.equal(beforeState.isActive, false);
  assert.equal(beforeState.isComplete, false);

  // Just above the trigger threshold (trackTop = 300 > 252) -> still waiting
  const approachingState = computeManifestoScrollState(300, trackH, viewportH, totalWords);
  assert.equal(approachingState.revealedWords, 0);
  assert.equal(approachingState.isActive, false);

  // Locked in full window (trackTop = 0) -> partially revealed
  const lockedState = computeManifestoScrollState(0, trackH, viewportH, totalWords);
  assert.ok(lockedState.revealedWords > 0 && lockedState.revealedWords < totalWords);
  assert.equal(lockedState.isActive, true);
  assert.equal(lockedState.isComplete, false);

  // Scrolled through sticky window (trackTop = -560) -> all 22 words revealed
  const completedState = computeManifestoScrollState(-560, trackH, viewportH, totalWords);
  assert.equal(completedState.revealedWords, totalWords);
  assert.equal(completedState.progress, 1);
  assert.equal(completedState.isComplete, true);
});

test('computeWordSmoothReveal produces continuous smoothstep wave weights across words', () => {
  const totalWords = 22;
  assert.equal(computeWordSmoothReveal(0, 0, totalWords), 0);
  assert.equal(computeWordSmoothReveal(1, 21, totalWords), 1);

  // At mid-scroll (progress = 0.5), early words are 1, mid words transition smoothly, late words are 0
  const earlyWeight = computeWordSmoothReveal(0.5, 2, totalWords);
  const midWeightA = computeWordSmoothReveal(0.5, 10, totalWords);
  const midWeightB = computeWordSmoothReveal(0.5, 11, totalWords);
  const lateWeight = computeWordSmoothReveal(0.5, 18, totalWords);

  assert.equal(earlyWeight, 1);
  assert.ok(midWeightA > midWeightB);
  assert.ok(midWeightA > 0 && midWeightA < 1);
  assert.ok(midWeightB > 0 && midWeightB < 1);
  assert.equal(lateWeight, 0);
});

test('core RoGrowth datasets contain required transparent pricing, real projects, and zero placeholders', () => {
  assert.equal(SERVICE_CARDS.length, 3);
  assert.ok(SERVICE_CARDS.every((c) => c.hasCta && c.priceBadge && c.deliveryBadge));
  assert.ok(SERVICE_CARDS[0].priceBadge.includes('€300 – €400'));
  assert.ok(SERVICE_CARDS[1].priceBadge.includes('€700 – €1.200'));
  assert.ok(SERVICE_CARDS[2].priceBadge.includes('€1.000 – €2.300+'));

  assert.equal(PORTFOLIO_PROJECTS.length, 6);
  for (const project of PORTFOLIO_PROJECTS) {
    assert.ok(!project.client.includes('NEEDS OWNER INPUT'));
    assert.ok(!project.image.includes('/assets/extracted/'));
  }

  for (const member of TEAM_MEMBERS) {
    assert.ok(!member.name.includes('NEEDS OWNER INPUT'));
  }

  assert.equal(WORKSHOP_FAQ_ITEMS.length, 4);
  assert.equal(BLOG_ARTICLES.length, 3);
});

test('resolveAppRoute normalizes paths and routes to /creare-siteweb, /design-system, or /', () => {
  assert.equal(resolveAppRoute('/'), '/');
  assert.equal(resolveAppRoute(''), '/');
  assert.equal(resolveAppRoute('/creare-siteweb'), '/creare-siteweb');
  assert.equal(resolveAppRoute('/creare-site-web/'), '/creare-siteweb');
  assert.equal(resolveAppRoute('/CREARE-SITE'), '/creare-siteweb');
  assert.equal(resolveAppRoute('/design-system'), '/design-system');
  assert.equal(resolveAppRoute('/design-system/'), '/design-system');
  assert.equal(resolveAppRoute('/UI-SYSTEM'), '/design-system');
  assert.equal(resolveAppRoute('/unknown-path'), '/');
});

test('getPricingVariantClasses returns distinct cobalt gradients per tier variant', () => {
  const cobalt = getPricingVariantClasses('cobalt');
  const deep = getPricingVariantClasses('cobalt-deep');
  const periwinkle = getPricingVariantClasses('periwinkle');

  assert.ok(cobalt.includes('#0D5FF9'));
  assert.ok(deep.includes('#0043D6'));
  assert.ok(periwinkle.includes('#2B59F5'));
  assert.notEqual(cobalt, deep);
  assert.notEqual(deep, periwinkle);
});

test('RoGrowth UI Design System tokens and Money Page Blueprint are complete and locked in', () => {
  assert.ok(ROGROWTH_COLOR_TOKENS.length >= 8);
  assert.ok(ROGROWTH_COLOR_TOKENS.some((t) => t.hex === '#0D5FF9'));
  assert.ok(ROGROWTH_COLOR_TOKENS.some((t) => t.hex === '#141517'));
  assert.ok(ROGROWTH_COLOR_TOKENS.some((t) => t.hex === '#1D1CFF'));
  assert.ok(ROGROWTH_COLOR_TOKENS.some((t) => t.hex === '#050505'));

  assert.equal(ROGROWTH_TYPOGRAPHY_SCALE.length, 6);
  assert.equal(ROGROWTH_MINIMALISM_RULES.length, 4);
  assert.equal(ROGROWTH_MINIMALISM_RULES[0].id, 'rule-pure-whitespace');
  assert.equal(ROGROWTH_MINIMALISM_RULES[1].id, 'rule-clean-imagery');
  assert.equal(ROGROWTH_MINIMALISM_RULES[2].id, 'rule-three-element-cap');
  assert.equal(ROGROWTH_MINIMALISM_RULES[3].id, 'rule-smooth-scroll-60fps');
  assert.equal(MONEY_PAGE_BLUEPRINT_STEPS.length, 6);
  assert.equal(MONEY_PAGE_BLUEPRINT_STEPS[0].stepNumber, '01');
  assert.equal(MONEY_PAGE_BLUEPRINT_STEPS[5].stepNumber, '06');
});

test('Creare Site Web datasets and SEO/GEO JSON-LD schema match RoGrowth business standards', () => {
  assert.equal(ROGROWTH_GUARANTEE_METRICS.length, 5);
  assert.equal(ROGROWTH_GUARANTEE_METRICS[0].value, '100%');
  assert.equal(ROGROWTH_GUARANTEE_METRICS[2].value, '8+ Ani');
  assert.equal(ROGROWTH_GUARANTEE_METRICS[3].value, '< 24h');
  assert.equal(ROGROWTH_GUARANTEE_METRICS[4].value, '2 Runde');

  assert.equal(CREARE_SITE_PACKAGES.length, 3);
  assert.equal(CREARE_SITE_PACKAGES[0].priceBadge, '€300 – €400');
  assert.equal(CREARE_SITE_PACKAGES[1].priceBadge, '€700 – €1.200');
  assert.equal(CREARE_SITE_PACKAGES[2].priceBadge, '€1.000 – €2.300+');

  assert.equal(WEBSITE_TYPES_CATALOG.length, 6);
  assert.equal(TECH_PLATFORM_STANDARDS.length, 5);
  assert.equal(TECHNICAL_ANATOMY_PILLARS.length, 4);
  assert.equal(CREARE_SITE_FAQ_ITEMS.length, 5);

  const schema = buildCreareSiteWebJsonLd('https://rogrowth.ro/creare-siteweb');
  assert.equal(schema['@context'], 'https://schema.org');
  assert.equal(schema['@graph'].length, 3);
});

import {
  WEBSITE_TYPE_CAROUSEL_ITEMS,
} from './creareSiteWebData';
import {
  offsetOf,
  ringSize,
  wrapIndex,
  geometry,
  place,
  spans,
  positionAt,
  scrollFor,
} from '../components/ui/arc-card-carousel';

test('ArcCardCarousel wheel math and WEBSITE_TYPE_CAROUSEL_ITEMS dataset work accurately', () => {
  assert.equal(WEBSITE_TYPE_CAROUSEL_ITEMS.length, 8);
  assert.ok(WEBSITE_TYPE_CAROUSEL_ITEMS[0].title.includes('Închirieri Auto'));
  assert.ok(WEBSITE_TYPE_CAROUSEL_ITEMS[1].title.includes('Cabinete Medicale'));
  for (const item of WEBSITE_TYPE_CAROUSEL_ITEMS) {
    assert.ok(item.src.startsWith('/assets/'));
    assert.ok(item.slotFileName.endsWith('.webp'));
    assert.ok(item.highlights.length === 3);
  }

  assert.equal(ringSize(8), 16);
  assert.equal(wrapIndex(0, 8), 0);
  assert.equal(wrapIndex(8, 8), 0);
  assert.equal(wrapIndex(-1, 8), 7);
  assert.equal(offsetOf(0, 0, 16), 0);
  assert.equal(spans(8, false), 7);
  assert.equal(spans(8, true), 8);
  assert.equal(positionAt(0.5, 0, 8), 4);
  assert.equal(scrollFor(2, 4, 100, 500), 300);

  const g = geometry(1440, 900);
  assert.ok(g.cardW > 0 && g.cardH > 0 && g.radius > 0);
  const p0 = place(0, 14, g);
  assert.ok(Math.abs(p0.rot) === 0);
});

import {
  DEFAULT_CROSSOVER_CARDS,
  computeCrossoverProgress,
  computeCrossoverCardLayout,
} from '../components/ui/crossover-scroll-showcase';

test('CrossoverScrollShowcase progress and staggered parallax card geometry match reference choreography', () => {
  assert.equal(DEFAULT_CROSSOVER_CARDS.length, 3);
  assert.equal(
    DEFAULT_CROSSOVER_CARDS[0].src,
    '/assets/aistudio/phone-project_6d808408.webp'
  );
  assert.equal(
    DEFAULT_CROSSOVER_CARDS[1].src,
    '/assets/aistudio/desktop-project.webp_026b89fb.webp'
  );
  assert.equal(
    DEFAULT_CROSSOVER_CARDS[2].src,
    '/assets/aistudio/tablet-project_b287e069.webp'
  );
  assert.equal(computeCrossoverProgress(200, 2400, 800), 0);
  assert.equal(computeCrossoverProgress(0, 2400, 800), 0);
  assert.equal(computeCrossoverProgress(-800, 2400, 800), 0.5);
  assert.equal(computeCrossoverProgress(-1600, 2400, 800), 1);

  const stageW = 1280;
  const stageH = 804;

  // At progress = 0, all 3 cards start below the viewport (y > stageH)
  const startLayouts = DEFAULT_CROSSOVER_CARDS.map((c) =>
    computeCrossoverCardLayout(c, stageW, stageH, 0, 1)
  );
  assert.ok(startLayouts.every((l) => l.y > stageH));

  // At progress = 0.34 (alignment point), all 3 cards align their top edges at ~0.516 * stageH (415px)
  const alignLayouts = DEFAULT_CROSSOVER_CARDS.map((c) =>
    computeCrossoverCardLayout(c, stageW, stageH, 0.34, 1)
  );
  assert.equal(alignLayouts[0].y, alignLayouts[1].y);
  assert.equal(alignLayouts[1].y, alignLayouts[2].y);
  assert.ok(Math.abs(alignLayouts[0].y - 415) <= 2);

  // At progress = 0.50 (past alignment), center card (index 1) is highest (smallest y), right card (index 2) is middle, left card (index 0) is lowest
  const midLayouts = DEFAULT_CROSSOVER_CARDS.map((c) =>
    computeCrossoverCardLayout(c, stageW, stageH, 0.5, 1)
  );
  assert.ok(midLayouts[1].y < midLayouts[2].y);
  assert.ok(midLayouts[2].y < midLayouts[0].y);

  // At progress = 1.0, all 3 cards have exited above the viewport (y + cardH < 0)
  const endLayouts = DEFAULT_CROSSOVER_CARDS.map((c) =>
    computeCrossoverCardLayout(c, stageW, stageH, 1.0, 1)
  );
  assert.ok(endLayouts.every((l) => l.y + l.cardH < 0));
});

import {
  ROGROWTH_TESTIMONIALS,
  computeStaggerPosition,
  rotateTestimonialsList,
  AUTOPLAY_INTERVAL_MS,
  ONBOARDING_DEMO_DELAY_MS,
} from '../components/ui/stagger-testimonials';

test('StaggerTestimonials dataset, position math, and list rotation work accurately without review schema spam', () => {
  assert.equal(ROGROWTH_TESTIMONIALS.length, 10);
  for (const item of ROGROWTH_TESTIMONIALS) {
    assert.ok(!item.testimonial.includes('COMPANY'));
    assert.ok(item.imgSrc.startsWith('/PFP/'));
    assert.ok(item.by.length > 3);
  }

  // Verify position calculation centers index 5 for length 10
  assert.equal(computeStaggerPosition(5, 10), 0);
  assert.equal(computeStaggerPosition(4, 10), -1);
  assert.equal(computeStaggerPosition(6, 10), 1);

  // Verify forward rotation (+1) shifts the first item to the end and advances index 6 to index 5 (center)
  let seq = 100;
  const nextList = rotateTestimonialsList(ROGROWTH_TESTIMONIALS, 1, () => ++seq);
  assert.equal(nextList.length, 10);
  assert.equal(nextList[5].by, ROGROWTH_TESTIMONIALS[6].by);
  assert.equal(nextList[9].by, ROGROWTH_TESTIMONIALS[0].by);
  assert.equal(nextList[9].tempId, 101);

  // Verify backward rotation (-1) pops the last item to the front and moves index 4 to index 5 (center)
  const prevList = rotateTestimonialsList(ROGROWTH_TESTIMONIALS, -1, () => ++seq);
  assert.equal(prevList.length, 10);
  assert.equal(prevList[5].by, ROGROWTH_TESTIMONIALS[4].by);
  assert.equal(prevList[0].by, ROGROWTH_TESTIMONIALS[9].by);

  // Verify 10 consecutive forward rotations complete a seamless full loop back to the initial testimonial order
  let looped = ROGROWTH_TESTIMONIALS;
  for (let step = 0; step < 10; step++) {
    looped = rotateTestimonialsList(looped, 1);
  }
  assert.equal(looped.length, 10);
  assert.equal(looped[5].by, ROGROWTH_TESTIMONIALS[5].by);
  assert.equal(AUTOPLAY_INTERVAL_MS, 3000);
  assert.equal(ONBOARDING_DEMO_DELAY_MS, 350);

  // Ensure JSON-LD schema never claims Review or AggregateRating
  const schemaStr = JSON.stringify(
    buildCreareSiteWebJsonLd('https://rogrowth.ro/creare-siteweb')
  );
  assert.ok(!schemaStr.includes('AggregateRating'));
  assert.ok(!schemaStr.includes('"Review"'));
});

import {
  computeDarkModeScrollState,
  computeTeamSectionScrollState,
} from './studioData';

test('computeDarkModeScrollState keeps website white at start, switches to dark mode on reaching Ziua 1 section, and waits until section finishes before restoring light mode', () => {
  const vh = 900;
  const sectionHeight = 1450;

  // 1. At start of website (section far below viewport) -> light mode (white)
  const atStart = computeDarkModeScrollState(2400, 2400 + sectionHeight, vh);
  assert.equal(atStart.isDarkMode, false);
  assert.equal(atStart.phase, 'before');
  assert.equal(atStart.immersionProgress, 0);

  // 2. Section top just peeking into bottom of viewport (top = 680px > 0.58 * 900 = 522px) -> still light mode (white)
  const peeking = computeDarkModeScrollState(680, 680 + sectionHeight, vh);
  assert.equal(peeking.isDarkMode, false);
  assert.equal(peeking.phase, 'before');

  // 3. User reaches "Ziua 1, nu Ziua 100" (top = 420px <= 522px, bottom = 1870px) -> website switches to dark mode
  const enteringDark = computeDarkModeScrollState(420, 420 + sectionHeight, vh);
  assert.equal(enteringDark.isDarkMode, true);
  assert.equal(enteringDark.phase, 'active');
  assert.ok(enteringDark.immersionProgress > 0.6);

  // 4. Deep inside "Ziua 1, nu Ziua 100" / "De ce RoGrowth" (top = -200px, bottom = 1250px) -> full dark mode immersion
  const midSection = computeDarkModeScrollState(-200, 1250, vh);
  assert.equal(midSection.isDarkMode, true);
  assert.equal(midSection.phase, 'active');
  assert.equal(midSection.immersionProgress, 1);

  // 5. Still leaving dark section (bottom = 300px >= 0.24 * 900 = 216px) -> remains in dark mode until dark section finishes
  const leavingDark = computeDarkModeScrollState(-1150, 300, vh);
  assert.equal(leavingDark.isDarkMode, true);
  assert.equal(leavingDark.phase, 'active');

  // 6. Finished dark section (bottom = 180px < 0.24 * 900 = 216px) -> switches back to light mode
  const afterSection = computeDarkModeScrollState(-1270, 180, vh);
  assert.equal(afterSection.isDarkMode, false);
  assert.equal(afterSection.phase, 'after');
});

test('computeTeamSectionScrollState reveals smoothly onto full-page stage as section enters viewport', () => {
  const vh = 900;
  const trackH = 1620; // 180vh

  // 1. Below trigger threshold (trackTop = 750px > 0.75 * 900 = 675px) -> waiting to enter
  const beforeEnter = computeTeamSectionScrollState(750, trackH, vh, false);
  assert.equal(beforeEnter.isRevealed, false);
  assert.equal(beforeEnter.revealTarget, 0);
  assert.equal(beforeEnter.scrollProgress, 0);

  // 2. Enters viewport (trackTop = 600px <= 675px) -> unlocks smoothly
  const justUnlocked = computeTeamSectionScrollState(600, trackH, vh, false);
  assert.equal(justUnlocked.isRevealed, true);
  assert.equal(justUnlocked.revealTarget, 1);
  assert.equal(justUnlocked.phase, 'active');
  assert.ok(justUnlocked.scrollProgress > 0 && justUnlocked.scrollProgress < 0.2);

  // 3. Pinned mid-scroll in full-page stage (trackTop = -360px) -> revealed with mid parallax progress
  const midStage = computeTeamSectionScrollState(-360, trackH, vh, false);
  assert.equal(midStage.isRevealed, true);
  assert.equal(midStage.revealTarget, 1);
  assert.ok(midStage.scrollProgress > 0.5 && midStage.scrollProgress < 0.8);

  // 4. Completed full-page stage (trackTop = -800px) -> complete
  const completedStage = computeTeamSectionScrollState(-800, trackH, vh, false);
  assert.equal(completedStage.isRevealed, true);
  assert.equal(completedStage.revealTarget, 1);
  assert.equal(completedStage.scrollProgress, 1);
  assert.equal(completedStage.phase, 'complete');
});

import {
  computeSectionRevealState,
  computeStaggerDelayMs,
} from './studioData';

test('computeSectionRevealState and computeStaggerDelayMs handle smooth hysteresis and bounded stagger delays', () => {
  const vh = 900;

  // Below trigger threshold (top = 640px > 0.62 * 900 = 558px) -> not revealed yet
  assert.equal(computeSectionRevealState(640, 1240, vh, false), false);

  // Enters focus zone of viewport (top = 520px <= 558px) -> reveals smoothly
  assert.equal(computeSectionRevealState(520, 1120, vh, false), true);

  // Hysteresis: once revealed, stays revealed even if user scrolls back slightly (top = 850px <= 1.02 * 900 = 918px)
  assert.equal(computeSectionRevealState(850, 1450, vh, true), true);

  // Only resets if user scrolls all the way back up so element is completely below viewport (top = 950px > 918px)
  assert.equal(computeSectionRevealState(950, 1550, vh, true), false);

  // Stagger delay is bounded cleanly
  assert.equal(computeStaggerDelayMs(0, 75, 360), 0);
  assert.equal(computeStaggerDelayMs(2, 75, 360), 150);
  assert.equal(computeStaggerDelayMs(8, 75, 360), 360);
});

import { computePageDarkModeState } from './studioData';

test('computePageDarkModeState syncs dark mode across multiple dark sections on /creare-siteweb and restores light mode between and after them', () => {
  const vh = 900;

  // 1. Before both dark sections (Hero / Manifesto / Pricing / Arc Carousel) -> light mode
  const beforeBoth = computePageDarkModeState(
    [
      { top: 1400, bottom: 2600 },
      { top: 4200, bottom: 5100 },
    ],
    vh
  );
  assert.equal(beforeBoth.isDarkMode, false);
  assert.equal(beforeBoth.phase, 'before');

  // 2. Inside Block 03 (#standard-tehnic-seo) -> dark mode active
  const inBlock03 = computePageDarkModeState(
    [
      { top: 120, bottom: 1320 },
      { top: 2920, bottom: 3820 },
    ],
    vh
  );
  assert.equal(inBlock03.isDarkMode, true);
  assert.equal(inBlock03.phase, 'active');

  // 3. Between Block 03 and Block 05 (inside Block 04 #referinte-portofoliu & Block 04B #impresii) -> light mode restored
  const betweenBlocks = computePageDarkModeState(
    [
      { top: -1150, bottom: 140 }, // exited Block 03 (< 216px)
      { top: 920, bottom: 1820 },  // not yet entered Block 05 (> 522px)
    ],
    vh
  );
  assert.equal(betweenBlocks.isDarkMode, false);
  assert.equal(betweenBlocks.phase, 'after');

  // 4. Inside Block 05 (#proprietate-si-faq) -> dark mode active again
  const inBlock05 = computePageDarkModeState(
    [
      { top: -2100, bottom: -900 },
      { top: 180, bottom: 1080 },
    ],
    vh
  );
  assert.equal(inBlock05.isDarkMode, true);
  assert.equal(inBlock05.phase, 'active');

  // 5. After Block 05 (inside Block 06 #creare-site-oferta & Footer) -> light mode restored
  const afterBoth = computePageDarkModeState(
    [
      { top: -3200, bottom: -2000 },
      { top: -820, bottom: 120 }, // exited Block 05 (< 216px)
    ],
    vh
  );
  assert.equal(afterBoth.isDarkMode, false);
  assert.equal(afterBoth.phase, 'after');
});

import {
  FIGMA_LOGO_3D_SRC,
  FRAMER_LOGO_3D_SRC,
  PRIORITY_OPTIONS,
  PICK_TWO_PACKAGES,
  LAYERED_SHOWCASE_CARDS,
  getPriorityPairKey,
  resolveNextPriorityPair,
} from '../components/ui/figma-framer-showcase';

test('FigmaFramerShowcaseSection Pick-Two state machine always keeps 2 active options and maps to the 3 package configurations', () => {
  assert.equal(
    FIGMA_LOGO_3D_SRC,
    '/assets/aistudio/image-removebg-preview__1__3bdc6261.webp'
  );
  assert.equal(
    FRAMER_LOGO_3D_SRC,
    '/assets/aistudio/image-removebg-preview_60b15c00.webp'
  );
  assert.equal(PRIORITY_OPTIONS.length, 3);
  assert.equal(LAYERED_SHOWCASE_CARDS.length, 5);

  // Initial state: ['good', 'fast'] -> 'good-fast' (€700)
  const initialPair: ['good', 'fast'] = ['good', 'fast'];
  assert.equal(getPriorityPairKey(initialPair), 'good-fast');
  assert.equal(PICK_TWO_PACKAGES['good-fast'].priceDisplay, '€700');

  // Toggling the inactive 3rd option ('cheap') activates 'cheap' and keeps the most recent active ('fast') -> ['fast', 'cheap'] -> 'fast-cheap' (€250)
  const nextPair1 = resolveNextPriorityPair(initialPair, 'cheap');
  assert.equal(nextPair1.length, 2);
  assert.equal(getPriorityPairKey(nextPair1), 'fast-cheap');
  assert.equal(PICK_TWO_PACKAGES['fast-cheap'].priceDisplay, '€250');

  // Toggling an active option ('fast') off automatically activates the remaining 3rd option ('good') -> 'good-cheap' (€350)
  const nextPair2 = resolveNextPriorityPair(nextPair1, 'fast');
  assert.equal(nextPair2.length, 2);
  assert.equal(getPriorityPairKey(nextPair2), 'good-cheap');
  assert.equal(PICK_TWO_PACKAGES['good-cheap'].priceDisplay, '€350');
});
