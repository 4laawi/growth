export type AppRoute = '/' | '/creare-siteweb' | '/design-system';

export type PricingCardVariant = 'cobalt' | 'cobalt-deep' | 'periwinkle';

export interface ColorTokenSpec {
  id: string;
  name: string;
  hex: string;
  tailwindClass: string;
  role: string;
  usageRule: string;
  textContrastClass: 'text-white' | 'text-[#141517]';
}

export interface TypographyTokenSpec {
  id: string;
  name: string;
  fontFamily: 'Plus Jakarta Sans' | 'JetBrains Mono';
  sizeClampOrPx: string;
  weight: string;
  tracking: string;
  lineHeight: string;
  sampleText: string;
  usage: string;
}

export interface RadiusAndSurfaceSpec {
  id: string;
  name: string;
  cssClass: string;
  radiusValue: string;
  elevationOrBorder: string;
  usage: string;
}

export interface MoneyPageSectionSpec {
  stepNumber: string;
  id: string;
  name: string;
  surface: 'Grilă Alb Studio' | 'Alb Studio (#FFFFFF)' | 'Obsidian Dark (#050505)' | 'Colaj Puncte Studio';
  primitivesUsed: string[];
  conversionGoal: string;
}

export const ROGROWTH_COLOR_TOKENS: ColorTokenSpec[] = [
  {
    id: 'ink-primary',
    name: 'Studio Ink Primary',
    hex: '#141517',
    tailwindClass: 'bg-[#141517]',
    role: '60% Text & Contrast Structural Principal',
    usageRule: 'Titluri H1/H2, butonul principal din bara de sus și ramele hardware MacBook / iPhone.',
    textContrastClass: 'text-white',
  },
  {
    id: 'cobalt-electric',
    name: 'RoGrowth Electric Cobalt',
    hex: '#0D5FF9',
    tailwindClass: 'bg-[#0D5FF9]',
    role: '10% Accent Comercial de Conversie',
    usageRule: 'Butoane CTA principale, chenarele de selecție Figma, pașii activi și evidențierea prețurilor.',
    textContrastClass: 'text-white',
  },
  {
    id: 'cobalt-hover',
    name: 'Cobalt Deep Press',
    hex: '#004AD9',
    tailwindClass: 'bg-[#004AD9]',
    role: 'Stare Interactivă Hover & Active',
    usageRule: 'Starea hover pentru butoanele #0D5FF9 și ancora de gradient pe cardurile de pachete.',
    textContrastClass: 'text-white',
  },
  {
    id: 'indigo-electric',
    name: 'Electric FAQ Indigo',
    hex: '#1D1CFF',
    tailwindClass: 'bg-[#1D1CFF]',
    role: 'Suprafață Dedicată Clarificării Obiecțiilor',
    usageRule: 'Utilizat exclusiv pentru acordeonul de transparență comercială și întrebări frecvente (FAQ).',
    textContrastClass: 'text-white',
  },
  {
    id: 'obsidian-canvas',
    name: 'Obsidian Workshop Canvas',
    hex: '#050505',
    tailwindClass: 'bg-[#050505]',
    role: 'Secțiune de Imersiune Tehnică (Dark Mode)',
    usageRule: 'Fundal întunecat full-bleed („Ziua 1, nu Ziua 100”) pentru alternanța ritmică între secțiunile albe.',
    textContrastClass: 'text-white',
  },
  {
    id: 'obsidian-surface',
    name: 'Obsidian Elevated Bento',
    hex: '#131417',
    tailwindClass: 'bg-[#131417]',
    role: '30% Suprafață Card Structural Dark',
    usageRule: 'Combinat cu border-white/10 și rounded-[28px] în interiorul secțiunilor #050505.',
    textContrastClass: 'text-white',
  },
  {
    id: 'canvas-white',
    name: 'Studio Crisp White',
    hex: '#FFFFFF',
    tailwindClass: 'bg-white',
    role: '60% Pânză Luminoasă Dominantă',
    usageRule: 'Fundalul de bază al paginilor, cardurile de portofoliu și barele plutitoare de instrumente.',
    textContrastClass: 'text-[#141517]',
  },
  {
    id: 'emerald-cwv',
    name: 'Core Web Vitals Emerald',
    hex: '#10B981',
    tailwindClass: 'bg-[#10B981]',
    role: 'Dovadă Tehnică Cuantificabilă',
    usageRule: 'Scorurile 100/100 Google PageSpeed & Core Web Vitals, cursoarele de livrare rapidă și confirmările.',
    textContrastClass: 'text-white',
  },
];

export const ROGROWTH_TYPOGRAPHY_SCALE: TypographyTokenSpec[] = [
  {
    id: 'hero-display',
    name: 'Hero Canvas Display',
    fontFamily: 'Plus Jakarta Sans',
    sizeClampOrPx: 'clamp(4.2rem, 13vw, 12.6rem)',
    weight: '800 (ExtraBold)',
    tracking: '-0.055em',
    lineHeight: '0.86',
    sampleText: 'rogrowth.',
    usage: 'Piesa centrală din Hero pe homepage și ancora vizuală de brand.',
  },
  {
    id: 'money-page-h1',
    name: 'Money Page H1 Display',
    fontFamily: 'Plus Jakarta Sans',
    sizeClampOrPx: 'clamp(2.5rem, 5.2vw, 4.4rem)',
    weight: '800 (ExtraBold)',
    tracking: '-0.04em',
    lineHeight: '1.04',
    sampleText: 'Creare Site Web Orientat spre Conversie.',
    usage: 'Titlul H1 principal pe paginile dedicate (/creare-siteweb, /magazin-online), încadrat de FigmaSelectionFrame.',
  },
  {
    id: 'section-h2',
    name: 'Section Architecture H2',
    fontFamily: 'Plus Jakarta Sans',
    sizeClampOrPx: 'clamp(2rem, 4vw, 3.5rem)',
    weight: '800 (ExtraBold)',
    tracking: '-0.035em',
    lineHeight: '1.06',
    sampleText: 'Site-uri și platforme web care generează clienți',
    usage: 'Titlurile principale de secțiune, însoțite de o etichetă tehnică JetBrains Mono deasupra.',
  },
  {
    id: 'card-h3',
    name: 'Package & Case Study H3',
    fontFamily: 'Plus Jakarta Sans',
    sizeClampOrPx: '21px – 23px',
    weight: '700 (Bold)',
    tracking: '-0.025em',
    lineHeight: '1.2',
    sampleText: 'Site avansat orientat spre conversie (Lead-Gen)',
    usage: 'Titlurile pachetelor comerciale Cobalt, pașii de lucru și ghidurile SEO.',
  },
  {
    id: 'body-prose',
    name: 'Commercial Body Copy',
    fontFamily: 'Plus Jakarta Sans',
    sizeClampOrPx: '15px – 16px',
    weight: '400 (Regular)',
    tracking: '0em',
    lineHeight: '1.6',
    sampleText: 'Proiectăm fiecare pagină din perspectiva vizitatorului final: claritate vizuală imediată și viteză 100/100.',
    usage: 'Paragrafe explicative cu lățime optimă de citire (60–70 caractere pe rând).',
  },
  {
    id: 'mono-eyebrow',
    name: 'Technical & Commercial Kicker',
    fontFamily: 'JetBrains Mono',
    sizeClampOrPx: '11px – 12px',
    weight: '500 / 700',
    tracking: '0.08em (widest)',
    lineHeight: '1.2',
    sampleText: 'PACHETE TRANSPARENTE · FĂRĂ COSTURI ASCUNSE',
    usage: 'Etichete deasupra secțiunilor, numerele pachetelor (01. PACHET), termene de livrare și telemetrie CWV.',
  },
];

export const ROGROWTH_SURFACES_AND_RADII: RadiusAndSurfaceSpec[] = [
  {
    id: 'surface-grid',
    name: 'Grilă Arhitecturală Studio (.bg-onlines-grid)',
    cssClass: 'bg-onlines-grid',
    radiusValue: '0px (Full Viewport Bleed)',
    elevationOrBorder: 'Grilă fină 96px × 96px (rgba(20,21,23,0.055))',
    usage: 'Secțiunile Hero pe homepage ("/") și pe paginile de vânzare ("/creare-siteweb") cu Mod Studio activ.',
  },
  {
    id: 'surface-dots',
    name: 'Matrice de Puncte Colaj (.bg-onlines-dots)',
    cssClass: 'bg-onlines-dots',
    radiusValue: 'rounded-3xl (24px)',
    elevationOrBorder: 'Matrice radială 18px × 18px + border-neutral-200/60',
    usage: 'Colajele vizuale interactive de lângă formularele de ofertă și demonstrațiile mobile.',
  },
  {
    id: 'card-showcase',
    name: 'Card Portofoliu Browser & Studiu de Caz',
    cssClass: 'rounded-[24px] bg-white border border-neutral-200/90',
    radiusValue: '24px',
    elevationOrBorder: 'shadow-[0_12px_35px_rgba(0,0,0,0.05)] hover:border-[#0D5FF9]/40',
    usage: 'Cardurile de portofoliu cu bară de browser, preț vizibil și comutator Desktop + Mobil.',
  },
  {
    id: 'card-dark-bento',
    name: 'Container Metodologie Obsidian',
    cssClass: 'rounded-[28px] bg-[#131417] border border-white/10',
    radiusValue: '28px – 32px',
    elevationOrBorder: '1px solid rgba(255,255,255,0.10)',
    usage: 'Containerele de flux tehnic și demonstrație Core Web Vitals din secțiunile întunecate #050505.',
  },
];

export interface MinimalismRuleSpec {
  id: string;
  number: string;
  title: string;
  doRule: string;
  forbidRule: string;
}

export const ROGROWTH_MINIMALISM_RULES: MinimalismRuleSpec[] = [
  {
    id: 'rule-pure-whitespace',
    number: '01',
    title: 'Spațiu Alb Pur (#FFFFFF) fără Zgomot de Fundal',
    doRule:
      'Secțiunile vizuale interactive (precum <ArcCardCarousel />) și declarațiile editoriale stau pe fundal #FFFFFF pur, cu minimum 40% spațiu liber și fără antete redundante.',
    forbidRule:
      'Nu repeta grila .bg-onlines-grid în interiorul secțiunilor de mijloc (grila este rezervată exclusiv pentru Hero).',
  },
  {
    id: 'rule-clean-imagery',
    number: '02',
    title: 'Imagini 100% Curate & Spațiu Generos între Carduri',
    doRule:
      'Cardurile din carusel (<ArcCardCarousel step={19} radius={12} />) afișează exclusiv imaginea curată, cu umbră fină și spațiu alb vizibil între fiecare card de pe arc.',
    forbidRule:
      'Interzis: bare false de browser pe cardurile din roată, texte/prețuri suprapuse peste imagine (overlays), contururi colorate stridente sau carduri înghesuite.',
  },
  {
    id: 'rule-three-element-cap',
    number: '03',
    title: 'Maximum 3 Elemente în Coloanele de Text Focale',
    doRule:
      'Lângă un carusel vizual se afișează strict 3 elemente: indexul discret (01 / 08), titlul mare aerisit (clamp(34px, 5vw, 76px), font-weight 500) și o singură linie scurtă de meta.',
    forbidRule:
      'Interzis: cutii cu zeci de tab-uri, șiruri de badge-uri, paragrafe lungi, liste cu bife sau grupuri aglomerate de butoane lângă roata interactivă.',
  },
  {
    id: 'rule-smooth-scroll-60fps',
    number: '04',
    title: 'Fizică de Scroll Fluidă la 60fps (Zero Re-Render pe Cadru)',
    doRule:
      'Transformările (translate3d + rotate) se scriu direct pe referințele DOM cu backface-visibility: hidden și amortizare exponențială (clampedDt / 68 + power3.out).',
    forbidRule:
      'Interzis: apelarea setState sau setAttribute pe fiecare cadru din gsap.ticker; starea React se actualizează doar când indexul întreg se schimbă.',
  },
];

export const MONEY_PAGE_BLUEPRINT_STEPS: MoneyPageSectionSpec[] = [
  {
    stepNumber: '01',
    id: 'hero-studio',
    name: 'Hero Studio de Serviciu + Chenar Figma',
    surface: 'Grilă Alb Studio',
    primitivesUsed: ['FigmaSelectionFrame', 'MultiplayerCursor', 'MacBookHardwareFrame', 'IPhoneHardwareFrame'],
    conversionGoal: 'Comunică serviciul, prețul de pornire (€300), livrarea în 2–4 săptămâni și proprietatea 100% în primele 3 secunde.',
  },
  {
    stepNumber: '02',
    id: 'packages-cobalt',
    name: 'Manifesto, Pachete Cobalt & Carusel Minimalist pe Domenii',
    surface: 'Alb Studio (#FFFFFF)',
    primitivesUsed: ['SectionHeader', 'PricingTierCard', 'ArcCardCarousel'],
    conversionGoal: 'Elimină ambiguitatea de preț (€300–€2.300+) și lasă vizitatorul să observe vizual tipul de site pe un fundal alb minimalist.',
  },
  {
    stepNumber: '03',
    id: 'dark-anatomy',
    name: 'Imersiune Obsidian: „Anatomia unui Site care Vinde”',
    surface: 'Obsidian Dark (#050505)',
    primitivesUsed: ['FigmaSelectionFrame (Dark)', 'MacBookHardwareFrame', 'CoreWebVitalsCard'],
    conversionGoal: 'Demonstrează execuția tehnică superioară (100/100 Core Web Vitals, Search Console din Ziua 1, testare pe iOS & Android).',
  },
  {
    stepNumber: '04',
    id: 'niche-proof',
    name: 'Studii de Caz Reale pe Industrii (Rame Browser + Mobil)',
    surface: 'Alb Studio (#FFFFFF)',
    primitivesUsed: ['SectionHeader', 'BrowserProjectCard'],
    conversionGoal: 'Dovedește experiența pe verticale reale din România (Clinici medicale, Imobiliare, Închirieri auto, Magazine online).',
  },
  {
    stepNumber: '05',
    id: 'electric-faq',
    name: 'Acordeonul Electric (#1D1CFF) pentru Obiecții Comerciale',
    surface: 'Obsidian Dark (#050505)',
    primitivesUsed: ['ElectricFaqAccordion', 'CoreWebVitalsCard'],
    conversionGoal: 'Răspunde direct în scris la întrebările despre avans (30%/70%), cele 2 runde de revizii, găzduire și drepturile asupra codului.',
  },
  {
    stepNumber: '06',
    id: 'diagnostic-form',
    name: 'Colaj Studio pe Matrice de Puncte + Formular Rapid de Ofertă',
    surface: 'Colaj Puncte Studio',
    primitivesUsed: ['ToolSquircle', 'WireframeBrowserCard', 'Formular Validat cu Pachet Preselectat'],
    conversionGoal: 'Convertește vizitatorii cu intenție ridicată printr-un formular fără fricțiune, cu serviciul paginii deja preselectat.',
  },
];

export function resolveAppRoute(pathname: string): AppRoute {
  const normalized = (pathname || '/').trim().toLowerCase().replace(/\/+$/, '') || '/';
  if (normalized === '/design-system' || normalized === '/ui-system') {
    return '/design-system';
  }
  if (
    normalized === '/creare-siteweb' ||
    normalized === '/creare-site-web' ||
    normalized === '/creare-site'
  ) {
    return '/creare-siteweb';
  }
  return '/';
}

export function getPricingVariantClasses(variant: PricingCardVariant): string {
  if (variant === 'periwinkle') {
    return 'bg-gradient-to-br from-[#2B59F5] via-[#3A66FA] to-[#1E47DC] hover:from-[#0D5FF9] hover:to-[#0044CC]';
  }
  if (variant === 'cobalt-deep') {
    return 'bg-gradient-to-br from-[#0043D6] via-[#0B55F0] to-[#0035B3]';
  }
  return 'bg-gradient-to-br from-[#054CE6] via-[#0D5FF9] to-[#0042CE]';
}
