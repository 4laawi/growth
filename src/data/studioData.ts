export interface ServiceCardItem {
  id: string;
  number: string;
  title: string;
  priceBadge: string;
  deliveryBadge: string;
  cardDescription: string;
  bottomCaption: string;
  variant: 'cobalt' | 'cobalt-deep' | 'periwinkle';
  hasCta?: boolean;
  ctaLabel?: string;
  deliverables: string[];
  timeline: string;
}

export interface WorkshopFaqItem {
  id: string;
  question: string;
  dutchSublabel: string;
  answer: string;
  metricsHighlight: string;
}

export interface TeamMember {
  id: string;
  role: string;
  name: string;
  avatar: string;
  metricBadge: string;
  iconType: 'architecture' | 'backend' | 'cro' | 'uiux' | 'seo' | 'ads';
  positionClass: string;
  specialty: string;
}

export interface HiringNotification {
  id: string;
  timeAgo: string;
  title: string;
  department: 'Ingeniería' | 'Diseño' | 'Gestión' | 'Operaciones';
  modality: string;
  location: string;
  description: string;
  requirements: string[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  category: 'gobierno' | 'producto' | 'identidad' | 'experiencia';
  categoryLabel: string;
  priceTier: string;
  year: string;
  image: string;
  mobileImage?: string;
  stepOffsetPx: number;
  cardHeightPx: number;
  summary: string;
  impactMetric: string;
  stack: string[];
  liveUrl: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  readTime: string;
  publishedAt: string;
  category: string;
  visualTheme: 'seo-growth' | 'pricing-clarity' | 'cwv-ownership';
  image: string;
  content: string[];
}

export interface ContactInquiryInput {
  name: string;
  email: string;
  organization: string;
  service: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export const SERVICE_CARDS: ServiceCardItem[] = [
  {
    id: 'site-prezentare',
    number: '01',
    title: 'Site de prezentare simplu & Landing Pages',
    priceBadge: '€300 – €400',
    deliveryBadge: '2 – 4 săptămâni',
    cardDescription:
      'Prezentare de brand curată și profesionistă pentru antreprenori și IMM-uri: explicarea clară a serviciilor, autoritate comercială și generare de apeluri, mesaje WhatsApp și cereri de ofertă.',
    bottomCaption:
      'Buget estimat: €300 – €400 · Livrare în 2 – 4 săptămâni · Ideal pentru start-up-uri și afaceri care au nevoie rapid de o amprentă digitală profesionistă.',
    variant: 'cobalt',
    hasCta: true,
    ctaLabel: 'Alege pachetul Prezentare →',
    deliverables: [
      '~5 pagini cu design responsive mobile-first (testat pe iOS Safari & Android Chrome)',
      'Viteză de încărcare ultra-rapidă și arhitectură SEO de bază din Ziua 1',
      'Configurare completă Google Search Console & Google Business Profile',
      'Landing page-uri dedicate pentru campanii Google Ads sau Meta Ads',
      '2 runde majore de revizii incluse + 100% proprietatea clientului asupra codului',
    ],
    timeline: '2 – 4 săptămâni · €300 – €400 (30% avans / 70% la finalizare)',
  },
  {
    id: 'site-conversie',
    number: '02',
    title: 'Site avansat orientat spre conversie (Lead-Gen)',
    priceBadge: '€700 – €1.200',
    deliveryBadge: '3 – 5 săptămâni',
    cardDescription:
      'Structurat strategic în jurul pâlniilor de conversie: îndemnuri la acțiune (CTA) clare, formulare fără fricțiune, programări online, filtre de catalog și vizibilitate organică în Google.',
    bottomCaption:
      'Buget estimat: €700 – €1.200 · Livrare în 3 – 5 săptămâni · Include sisteme de programări (clinici, saloane, închirieri auto) sau redesign tehnic complet.',
    variant: 'cobalt-deep',
    hasCta: true,
    ctaLabel: 'Alege pachetul Conversie →',
    deliverables: [
      'Design UI/UX personalizat și layout-uri adaptate parcursului vizitatorului',
      'SEO on-page aprofundat, mapare semantică a cuvintelor cheie și structură de conținut',
      'Pâlnii de captare lead-uri sau fluxuri interactive de programări online (sloturi orare)',
      'Configurare multilingvă opțională (RO / EN) și monitorizare conversii',
      'Redesign & salvare tehnică pentru site-uri învechite sau lente',
    ],
    timeline: '3 – 5 săptămâni · €700 – €1.200 (30% avans / 70% la finalizare)',
  },
  {
    id: 'ecommerce-apps',
    number: '03',
    title: 'Magazine online, Aplicații Web & Marketing Integrat',
    priceBadge: '€1.000 – €2.300+',
    deliveryBadge: '5 – 8 săptămâni',
    cardDescription:
      'Magazine e-commerce, panouri de administrare custom (Next.js & Supabase) și servicii de agenție full-service pe termen lung: SEO tehnic, Google & Meta Ads, automatizări și print.',
    bottomCaption:
      'Buget e-commerce / aplicații: €1.000 – €2.300+ · Livrare în 5 – 8 săptămâni. Fără vendor lock-in: găzduire proprie sau administrată de RoGrowth.',
    variant: 'periwinkle',
    hasCta: true,
    ctaLabel: 'Vezi pachete E-Commerce →',
    deliverables: [
      'Magazin online (stack custom Next.js, WooCommerce sau Shopify în funcție de catalog)',
      'Procesatoare de plăți (Netopia, Stripe) și API-uri curierat automatizate (Fan Courier, Sameday)',
      'Aplicații web, portaluri clienți, autentificare și baze de date PostgreSQL / Supabase',
      'Creștere continuă: audituri SEO, Google & Meta Ads, automatizări Zapier/Make & identitate/print',
    ],
    timeline: '5 – 8 săptămâni · €1.000 – €2.300+ (plată etapizată 30% / 40% / 30%)',
  },
];

export const WORKSHOP_FAQ_ITEMS: WorkshopFaqItem[] = [
  {
    id: 'problem',
    question: 'De ce eșuează site-urile făcute ca o simplă bifă?',
    dutchSublabel: 'Atenția la parcursul vizitatorului',
    answer:
      'Majoritatea agențiilor folosesc șabloane greoaie, fără structură comercială. Noi construim de la zero: pagini rapide pe mobil, mesaje directe și conversie reală.',
    metricsHighlight:
      'Focalizare pe conversie · Arhitectură curată orientată direct pe clienți.',
  },
  {
    id: 'missing',
    question: 'Care este politica noastră privind AI-ul și codul?',
    dutchSublabel: 'Fără șabloane generice',
    answer:
      'Folosim AI strict ca asistent de viteză pentru sarcini repetitive. Strategia, designul, copywriting-ul și verificarea calității sunt 100% umane.',
    metricsHighlight:
      'Cod modern & curat · Next.js și Tailwind fără cod rezidual.',
  },
  {
    id: 'audience',
    question: 'Cine deține domeniul, codul sursă și baza de date?',
    dutchSublabel: 'Zero vendor lock-in',
    answer:
      'Tu deții 100% din tot: domeniu, cod, imagini și date. Fără abonamente forțate sau blocaje pe platforme închise.',
    metricsHighlight:
      'Proprietate totală · Poți migra sau găzdui oriunde fără restricții.',
  },
  {
    id: 'outcome',
    question: 'Cum funcționează prețurile, plata și reviziile?',
    dutchSublabel: 'Claritate comercială în scris',
    answer:
      'Prețuri fixe agreate în scris: 30% avans și 70% la lansare. 2 runde complete de revizii incluse și zero costuri ascunse.',
    metricsHighlight:
      'Transparență totală · Prezentare €300–€400 · Conversie €700–€1.200 · E-commerce €1.000+.',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'tm-1',
    role: 'DIRECTOARE\nCREATIVĂ',
    name: 'Elena · Directoare Creativă',
    avatar: '/assets/extracted/team_1.png',
    metricBadge: '100/100 CWV',
    iconType: 'architecture',
    positionClass: 'top-[17%] left-[5.5%]',
    specialty: 'Direcție Vizuală & Arhitectură de Brand',
  },
  {
    id: 'tm-2',
    role: 'DEV',
    name: 'Andrei · Full-Stack Dev',
    avatar: '/assets/extracted/team_2.png',
    metricBadge: 'Next.js · Supabase',
    iconType: 'backend',
    positionClass: 'top-[6.5%] left-[33%]',
    specialty: 'Next.js App Router, TypeScript & Performanță Core Web Vitals',
  },
  {
    id: 'tm-3',
    role: 'BUSINESS\nDEVELOPER',
    name: 'Ioana · Business Developer',
    avatar: '/assets/extracted/team_3.png',
    metricBadge: 'Visitor-First UX',
    iconType: 'cro',
    positionClass: 'top-[17.5%] left-[66.5%]',
    specialty: 'Diagnostic Comercial, Pâlnii de Conversie & Analiză IMM',
  },
  {
    id: 'tm-4',
    role: 'UX/UI\nDESIGNER',
    name: 'Mara · UX/UI Designer',
    avatar: '/assets/extracted/team_4.png',
    metricBadge: 'iOS & Android QA',
    iconType: 'uiux',
    positionClass: 'bottom-[15%] left-[13%]',
    specialty: 'Design Mobile-First, Claritate Vizuală & Parcursul Vizitatorului',
  },
  {
    id: 'tm-5',
    role: 'PROJECT\nMANAGER',
    name: 'Diana · Project Manager',
    avatar: '/assets/extracted/team_5.png',
    metricBadge: 'Search Console Ziua 1',
    iconType: 'seo',
    positionClass: 'bottom-[3%] left-[30%]',
    specialty: 'Coordonare Proiecte, Livrabile & Asistență Lansare',
  },
  {
    id: 'tm-6',
    role: 'DEV',
    name: 'Radu · Front-End Dev',
    avatar: '/assets/extracted/team_6.png',
    metricBadge: 'ROI & Tracking',
    iconType: 'ads',
    positionClass: 'bottom-[12%] right-[14.5%]',
    specialty: 'Interfețe Web, E-Commerce & Integrări API',
  },
];

export const HIRING_NOTIFICATIONS: HiringNotification[] = [
  {
    id: 'job-frontend',
    timeAgo: 'ieri',
    title: 'Căutăm dezvoltator front-end',
    department: 'Ingeniería',
    modality: 'Fără vendor lock-in · Predare completă la finalizare',
    location: 'București / Național RO',
    description:
      'Construim interfețe ultra-rapide fără balast JavaScript, testate riguros pe iOS Safari și Android Chrome, cu țintă 100/100 Core Web Vitals și predare completă a codului sursă.',
    requirements: [
      'Arhitectură modernă Next.js (App Router), React și TypeScript',
      'Tailwind CSS cu clase utilitare curate și zero CSS inutil',
      'Optimizare LCP, CLS și INP + verificare indexare Google Search Console',
    ],
  },
  {
    id: 'job-pm',
    timeAgo: 'azi',
    title: 'Căutăm project manager',
    department: 'Gestión',
    modality: 'Consultanță directă · București & toată România',
    location: 'București / Online',
    description:
      'Nu împingem pachete scumpe dacă un landing page sau un site de prezentare rezolvă problema. Evaluăm ce vinde afacerea ta și stabilim în scris livrabilele și termenele.',
    requirements: [
      'Pasul 1: Descoperire & evaluarea nevoilor reale ale afacerii',
      'Pasul 2: Recomandare onestă a celei mai eficiente soluții tehnice',
      'Pasul 3 & 4: Acord ferm în scris (30% avans / 70% la predare), 2 revizii și lansare asistată',
    ],
  },
  {
    id: 'job-uxui',
    timeAgo: 'acum 2 săpt.',
    title: 'Căutăm designer UX/UI',
    department: 'Diseño',
    modality: 'Fără șabloane generice · 100% adaptat brandului',
    location: 'București / România',
    description:
      'Proiectăm fiecare pagină din papucii clientului tău: ierarhie tipografică clară, butoane vizibile de telefon și WhatsApp, formulare fără fricțiune și încredere comercială.',
    requirements: [
      'Structură clară a ofertei și îndemnuri la acțiune (CTA) vizibile pe mobil',
      'Fluxuri dedicate pentru programări online (clinici, saloane, închirieri auto, imobiliare)',
      'Zero promisiuni vagi sau texte robotice generate automat',
    ],
  },
  {
    id: 'job-office',
    timeAgo: 'acum 2 săpt.',
    title: 'Office manager',
    department: 'Operaciones',
    modality: 'Agenție integrată — București & acoperire națională',
    location: 'București, România',
    description:
      'Lansarea site-ului este Ziua 1 a creșterii continue. Pe măsură ce afacerea ta evoluează, acoperim SEO tehnic, campanii plătite, automatizări CRM și producție publicitară.',
    requirements: [
      'SEO tehnic, grupări semantice de cuvinte cheie și Google Search Console',
      'Campanii Google Ads (Search & PMax) și Meta Ads (Facebook & Instagram)',
      'Identitate vizuală, cărți de vizită, bannere și semnalistică stradală',
    ],
  },
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'kasata-imobiliare',
    title: 'Kasata Imobiliare — Platformă & Căutare Proprietăți',
    client: 'Kasata Imobiliare (București & Ilfov)',
    category: 'experiencia',
    categoryLabel: 'Lead-Gen & Imobiliare · €700 – €1.200',
    priceTier: '€700 – €1.200',
    year: 'Livrare 3 – 5 săpt.',
    image: '/assets/aistudio/kasataaa_b747262d.webp',
    mobileImage: '/assets/aistudio/kasataaa_mobile__b747262d.webp',
    stepOffsetPx: 45,
    cardHeightPx: 400,
    summary:
      'Platformă imobiliară modernă construită pentru vânzări și închirieri în București și Ilfov: motor rapid de filtrare după tip proprietate, zonă, construcții noi și comision 0%, fișe clare de proprietate cu preț și suprafață și contact direct pe WhatsApp și telefon.',
    impactMetric: 'Filtrare instantanee proprietăți + captare lead-uri WhatsApp & apel direct',
    stack: ['Next.js', 'Tailwind CSS', 'Motor Filtrare Proprietăți', 'SEO Local București & Ilfov'],
    liveUrl: '#contacto',
  },
  {
    id: 'dental-crown-health',
    title: 'Dental Crown Health — Clinică & Programări',
    client: 'Dental Crown Health (Servicii Stomatologice & CEREC)',
    category: 'gobierno',
    categoryLabel: 'Clinică Medicală & Prezentare · €400 – €900',
    priceTier: '€400 – €900',
    year: 'Livrare 2 – 4 săpt.',
    image: '/assets/aistudio/dentalcrownhealth_1219211c.webp',
    mobileImage: '/assets/aistudio/dentalcrownhealth_mobile__75075119.webp',
    stepOffsetPx: 120,
    cardHeightPx: 330,
    summary:
      'Site web de autoritate medicală pentru clinică stomatologică: structurarea clară a serviciilor (CEREC, Radiologie, Cazurile Noastre, Tarife, Echipă), CTA permanent „Programează-te” în bară și optimizare mobilă pentru pacienții care caută urgențe sau tratamente dentare.',
    impactMetric: 'Structură clară de tarife & programări online + indexare Google Business Profile',
    stack: ['Design Medical Mobile-First', 'Flux Programări Pacienți', 'Core SEO', 'Google Search Console'],
    liveUrl: '#contacto',
  },
  {
    id: 'baristas-coffee',
    title: 'Baristas Coffee Shop — Magazin Online Cafea & Aparate',
    client: 'Baristas Coffee Shop (Comerț Online România)',
    category: 'producto',
    categoryLabel: 'Magazin Online E-Commerce · €1.000 – €2.300+',
    priceTier: '€1.000 – €2.300+',
    year: 'Livrare 5 – 8 săpt.',
    image: '/assets/aistudio/BARSITAS_bc81f494.webp',
    mobileImage: '/assets/aistudio/BARSITAS_mobile__8aa0fb37.webp',
    stepOffsetPx: 90,
    cardHeightPx: 370,
    summary:
      'Magazin online dedicat pasionaților de cafea boabe, cafea măcinată și espressoare: căutare rapidă în catalog, cont client, coș de cumpărături fără fricțiune, integrare plăți cu cardul și generare automată AWB pentru livrare rapidă în toată țara.',
    impactMetric: 'Arhitectură E-Commerce completă · Plăți Netopia/Stripe & Curieri Automatizați',
    stack: ['E-Commerce Custom / WooCommerce', 'Netopia & Stripe', 'Fan Courier & Sameday API', 'SEO Produse'],
    liveUrl: '#contacto',
  },
  {
    id: 'rentdacia-bucuresti',
    title: 'RentDacia — Închirieri Auto București & Otopeni',
    client: 'RentDacia (Închirieri Auto RO / EN)',
    category: 'experiencia',
    categoryLabel: 'Rezervări Auto & Multilingv · €700 – €1.200',
    priceTier: '€700 – €1.200',
    year: 'Livrare 3 – 5 săpt.',
    image: '/assets/aistudio/rentdacia_dfda43e0.webp',
    mobileImage: '/assets/aistudio/rentdacia_mobile__a38acbc2.webp',
    stepOffsetPx: 60,
    cardHeightPx: 410,
    summary:
      'Platformă rapidă de închirieri auto pentru București și Aeroportul Otopeni: prezentare flotă (Renault Clio Hybrid, gama Dacia), comutator bilingv RO/EN pentru turiști și diaspora, apel rapid „Sună acum” și preluare instantanee a cererilor pe WhatsApp.',
    impactMetric: 'Arhitectură bilingvă RO/EN + conversie directă pe mobil pentru Aeroportul Otopeni',
    stack: ['Multilingv RO / EN', 'Prezentare Flotă Auto', 'Conversie WhatsApp & Apel', '100/100 CWV'],
    liveUrl: '#contacto',
  },
  {
    id: 'agrumea-farm',
    title: 'Agrumèa Farm — Brand Artizanal & Catalog Digital',
    client: 'Agrumèa Farm (Catalog Gourmet IT / EN)',
    category: 'identidad',
    categoryLabel: 'Design Editorial & Brand · €700 – €1.500',
    priceTier: '€700 – €1.500',
    year: 'Livrare 3 – 6 săpt.',
    image: '/assets/aistudio/web_project_1_1b2ab729.jpg',
    stepOffsetPx: 30,
    cardHeightPx: 455,
    summary:
      'Experiență digitală cu direcție artistică ridicată pentru un producător artizanal: tipografie editorială, prezentare de produs la nivel de galerie, interacțiuni fluide și comutator multilingv (IT / EN) fără compromis la viteza de încărcare.',
    impactMetric: 'Direcție vizuală premium + prezentare interactivă de produs fără șabloane',
    stack: ['UI/UX Editorial', 'Animații Fluide GPU', 'Catalog Multilingv', 'Optimizare Imagini WebP'],
    liveUrl: '#contacto',
  },
  {
    id: 'dubai-rent-luxury',
    title: 'Dubai Rent — Închirieri Auto de Lux & Landing Page',
    client: 'Dubai Rent (Luxury Fleet Showcase)',
    category: 'gobierno',
    categoryLabel: 'Landing Page & Prezentare Flotă · €300 – €700',
    priceTier: '€300 – €700',
    year: 'Livrare 2 – 4 săpt.',
    image: '/assets/aistudio/prject_a99b37d9.webp',
    stepOffsetPx: 0,
    cardHeightPx: 505,
    summary:
      'Landing page cu impact vizual puternic pentru rezervări auto sport și de lux: ierarhie tipografică îndrăzneață, navigare rapidă pe colecții și mărci și pâlnie scurtă de contact pentru rezervări rapide.',
    impactMetric: 'Landing page de mare viteză pregătit pentru campanii Google Ads & Meta Ads',
    stack: ['Landing Page Conversie', 'Next.js & Tailwind CSS', 'Optimizare Google Ads', 'Mobile-First'],
    liveUrl: '#contacto',
  },
];

export const CLIENT_LOGOS = [
  { id: 'baristas', name: 'Baristas', sub: 'COFFEE SHOP · E-COMMERCE', kind: 'client' },
  { id: 'dentalcrown', name: 'DENTAL CROWN', sub: 'CLINICĂ STOMATOLOGICĂ', kind: 'client' },
  { id: 'kasata', name: 'kasata', sub: 'IMOBILIARE BUCUREȘTI & ILFOV', kind: 'client' },
  { id: 'rentdacia', name: 'RentDacia', sub: 'ÎNCHIRIERI AUTO OTOPENI', kind: 'client' },
  { id: 'agrumea', name: 'AGRUMÈA', sub: 'ARTISAN FARM · IT/EN', kind: 'client' },
  { id: 'dubairent', name: 'DUBAI RENT', sub: 'LUXURY CAR COLLECTION', kind: 'client' },
  { id: 'nextjs', name: 'NEXT.JS', sub: 'APP ROUTER & TYPESCRIPT', kind: 'tech' },
  { id: 'supabase', name: 'supabase', sub: 'POSTGRESQL & AUTH', kind: 'tech' },
  { id: 'netopia', name: 'NETOPIA & STRIPE', sub: 'PLĂȚI CARD & AWB CURIERI', kind: 'tech' },
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'ziua-1-nu-ziua-100',
    title: 'Principiul „Ziua 1, nu Ziua 100”: de ce să lansezi site-ul devreme',
    excerpt:
      'Motoarele de căutare au nevoie de timp pentru a parcurge, indexa și construi autoritatea unui domeniu. Lansarea timpurie permite acumularea creșterii organice...',
    readTime: '4 min de citit',
    publishedAt: 'Ghid SEO RoGrowth',
    category: 'SEO & Creștere Organică',
    visualTheme: 'seo-growth',
    image: '/assets/aistudio/kasataaa_b747262d.webp',
    content: [
      'Multe afaceri amână lansarea site-ului luni de zile încercând să perfecționeze fiecare detaliu intern. Între timp, motoarele de căutare nu pot parcurge sau indexa un domeniu care încă nu există online.',
      'Filozofia RoGrowth este „Ziua 1, nu Ziua 100”: lansăm o fundație tehnică impecabilă devreme, conectată din prima zi la Google Search Console și Google Business Profile, astfel încât încrederea în domeniu să se acumuleze în timp ce competitorii încă așteaptă.',
      'Lansarea nu este linia de sosire, ci Ziua 1 a creșterii continue. Un site web este un activ comercial viu: urmărim indexarea, analizăm căutările reale ale utilizatorilor și optimizăm constant arhitectura semantică — fără promisiuni false de tipul „Locul #1 în Google în 7 zile”.',
    ],
  },
  {
    id: 'pret-creare-site-web-romania',
    title: 'Preț creare site web în România: ghid transparent de costuri și livrabile',
    excerpt:
      'Fără reduceri false și fără costuri ascunse: ce include un site de prezentare (€300–€400), un site orientat pe conversie (€700–€1.200) și un magazin online...',
    readTime: '5 min de citit',
    publishedAt: 'Transparență Comercială',
    category: 'Prețuri & Ofertare',
    visualTheme: 'pricing-clarity',
    image: '/assets/aistudio/BARSITAS_bc81f494.webp',
    content: [
      'La RoGrowth credem în claritate comercială încă de la prima discuție. Nu folosim cronometre false de urgență și nu forțăm clienții în pachete mai mari decât au nevoie în realitate.',
      'Un site de prezentare simplu (~5 pagini, design mobile-first, SEO de bază, Google Search Console) pornește de la €300 – €400 cu livrare în 2 – 4 săptămâni. Un site avansat orientat spre conversie sau cu programări online se încadrează între €700 – €1.200 (3 – 5 săptămâni), iar magazinele online sau aplicațiile web custom pornesc de la €1.000 – €2.300+ (5 – 8 săptămâni).',
      'Toate proiectele includ 2 runde structurate de revizii majore, termeni clari de plată (30% avans / 70% la predare sau 30% / 40% / 30% pentru proiecte complexe) și scop agreat în scris înainte de start.',
    ],
  },
  {
    id: 'fara-vendor-lock-in',
    title: 'Proprietate 100% asupra codului și arhitectură 100/100 Core Web Vitals',
    excerpt:
      'De ce refuzăm blocarea clienților în platforme proprietare (vendor lock-in) și cum construim site-uri rapide din perspectiva vizitatorului final...',
    readTime: '6 min de citit',
    publishedAt: 'Standard Tehnic',
    category: 'Arhitectură Web & Drepturi Client',
    visualTheme: 'cwv-ownership',
    image: '/assets/aistudio/dentalcrownhealth_1219211c.webp',
    content: [
      'O problemă frecventă în piața agențiilor este dependența forțată: clientul plătește pentru site, dar nu primește acces la codul sursă, la baza de date sau la propriul domeniu.',
      'La RoGrowth, la plata finală deții 100% domeniul, repository-ul de cod, baza de date și materialele vizuale. Site-ul poate fi migrat liber pe orice server sau întreținut de orice alt dezvoltator. Dacă dorești liniște operațională, poți opta pentru găzduirea administrată RoGrowth (monitorizare uptime, SSL, actualizări de securitate).',
      'Din punct de vedere tehnic, construim pe Next.js, TypeScript, Tailwind CSS și Supabase (sau WooCommerce / Shopify acolo unde se potrivește mai bine fluxului tău), vizând scoruri 100/100 în Core Web Vitals și o experiență impecabilă pe telefon.',
    ],
  },
];

export function validateContactInquiry(input: ContactInquiryInput): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input.name || input.name.trim().length < 2) {
    errors.name = 'Te rugăm să introduci numele tău complet.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailRegex.test(input.email.trim())) {
    errors.email = 'Te rugăm să introduci o adresă de e-mail validă.';
  }

  if (!input.organization || input.organization.trim().length < 2) {
    errors.organization = 'Indică numele afacerii sau al companiei tale.';
  }

  if (!input.service || input.service.trim().length === 0) {
    errors.service = 'Selectează tipul de proiect dorit.';
  }

  if (!input.message || input.message.trim().length < 10) {
    errors.message = 'Descrie pe scurt ce vinde afacerea ta și ce obiectiv ai (minim 10 caractere).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function filterPortfolioProjects(
  projects: PortfolioProject[],
  category: 'todos' | PortfolioProject['category']
): PortfolioProject[] {
  if (category === 'todos') {
    return projects;
  }
  return projects.filter((p) => p.category === category);
}

export function computeWordRevealProgress(
  scrollY: number,
  startY: number,
  endY: number,
  totalWords: number
): number {
  if (totalWords <= 0) return 0;
  if (endY <= startY) return totalWords;
  const rawProgress = (scrollY - startY) / (endY - startY);
  const clamped = Math.max(0, Math.min(1, rawProgress));
  return Math.round(clamped * totalWords);
}

export interface ManifestoScrollState {
  progress: number;
  revealedWords: number;
  isActive: boolean;
  isComplete: boolean;
}

export function computeManifestoScrollState(
  trackTop: number,
  trackHeight: number,
  viewportHeight: number,
  totalWords: number
): ManifestoScrollState {
  if (totalWords <= 0 || viewportHeight <= 0) {
    return { progress: 0, revealedWords: 0, isActive: false, isComplete: false };
  }

  // Wait until the user scrolls down to the section:
  // Start illuminating words only once the section top reaches 28% of the viewport height.
  const startTop = viewportHeight * 0.28;
  const pinnedTravel = Math.max(viewportHeight * 0.5, trackHeight - viewportHeight);
  // Finish illuminating all words at 82% of the sticky scroll distance so the completed
  // statement holds modestly before scrolling into the service cards below.
  const endTop = -pinnedTravel * 0.82;

  const rawProgress = (startTop - trackTop) / (startTop - endTop);
  const progress = Math.max(0, Math.min(1, rawProgress));
  const revealedWords = Math.round(progress * totalWords);

  return {
    progress,
    revealedWords,
    isActive: trackTop <= startTop && trackTop >= -pinnedTravel,
    isComplete: revealedWords >= totalWords,
  };
}

/**
 * Computes a continuous [0..1] Hermite smoothstep reveal weight for a single word
 * along a scroll progress wave, avoiding stepped binary snapping and keeping
 * animations strictly on compositor-friendly opacity/transform properties.
 */
export function computeWordSmoothReveal(
  progress: number,
  wordIndex: number,
  totalWords: number,
  overlap = 3.6
): number {
  if (totalWords <= 0 || progress <= 0) return 0;
  if (progress >= 1) return 1;

  const safeOverlap = Math.max(1, overlap);
  const virtualSpan = Math.max(1, totalWords - 1 + safeOverlap);
  const cursor = progress * virtualSpan;
  const linear = Math.max(0, Math.min(1, (cursor - wordIndex) / safeOverlap));

  // Hermite smoothstep: 3t^2 - 2t^3 for seamless acceleration and settling
  return linear * linear * (3 - 2 * linear);
}

export interface DarkModeScrollState {
  isDarkMode: boolean;
  immersionProgress: number;
  phase: 'before' | 'active' | 'after';
}

/**
 * Pure calculation for the scroll-triggered Dark Mode switch on the
 * "Ziua 1, nu Ziua 100" (#metodologia) section.
 *
 * - At the start (when sectionTop > viewportHeight * 0.58), the website and section
 *   remain in Light Mode (white background, isDarkMode = false, phase = 'before').
 * - When the user reaches the section (sectionTop <= viewportHeight * 0.58 and
 *   sectionBottom >= viewportHeight * 0.24), the website switches smoothly to
 *   Dark Mode (isDarkMode = true, phase = 'active').
 * - Only after the user finishes the dark section (sectionBottom < viewportHeight * 0.24,
 *   when the last dark bento card exits the top of the viewport) does the website
 *   leave Dark Mode and return to Light Mode (isDarkMode = false, phase = 'after').
 */
export function computeDarkModeScrollState(
  sectionTop: number,
  sectionBottom: number,
  viewportHeight: number
): DarkModeScrollState {
  if (viewportHeight <= 0 || sectionBottom <= sectionTop) {
    return { isDarkMode: false, immersionProgress: 0, phase: 'before' };
  }

  const enterTriggerTop = viewportHeight * 0.58;
  const exitTriggerBottom = viewportHeight * 0.24;

  // Entry ramp: 0 at 78% vh -> 1 at 34% vh
  const entryStart = viewportHeight * 0.78;
  const entryEnd = viewportHeight * 0.34;
  const rawEntry = (entryStart - sectionTop) / Math.max(1, entryStart - entryEnd);
  const clampedEntry = Math.max(0, Math.min(1, rawEntry));
  const smoothEntry = clampedEntry * clampedEntry * (3 - 2 * clampedEntry);

  // Exit ramp: 1 at 48% vh -> 0 at 14% vh
  const exitStart = viewportHeight * 0.48;
  const exitEnd = viewportHeight * 0.14;
  const rawExit = (sectionBottom - exitEnd) / Math.max(1, exitStart - exitEnd);
  const clampedExit = Math.max(0, Math.min(1, rawExit));
  const smoothExit = clampedExit * clampedExit * (3 - 2 * clampedExit);

  const immersionProgress = Number(
    Math.max(0, Math.min(1, Math.min(smoothEntry, smoothExit))).toFixed(3)
  );

  if (sectionTop > enterTriggerTop) {
    return {
      isDarkMode: false,
      immersionProgress,
      phase: 'before',
    };
  }

  if (sectionBottom < exitTriggerBottom) {
    return {
      isDarkMode: false,
      immersionProgress,
      phase: 'after',
    };
  }

  return {
    isDarkMode: true,
    immersionProgress,
    phase: 'active',
  };
}

/**
 * Pure calculation for pages with one or more dark-immersion sections
 * (e.g., `/creare-siteweb` with Block 03 `#standard-tehnic-seo` and Block 05 `#proprietate-si-faq`).
 * Syncs the page-wide dark mode state smoothly across all dark sections and restores
 * light mode seamlessly in the light sections before, between, and after them.
 */
export function computePageDarkModeState(
  sectionBounds: ReadonlyArray<{ top: number; bottom: number }>,
  viewportHeight: number
): DarkModeScrollState {
  if (!sectionBounds.length || viewportHeight <= 0) {
    return { isDarkMode: false, immersionProgress: 0, phase: 'before' };
  }

  let anyActive = false;
  let anyAfter = false;
  let maxProgress = 0;

  for (const bounds of sectionBounds) {
    const state = computeDarkModeScrollState(
      bounds.top,
      bounds.bottom,
      viewportHeight
    );
    if (state.immersionProgress > maxProgress) {
      maxProgress = state.immersionProgress;
    }
    if (state.isDarkMode) {
      anyActive = true;
    } else if (state.phase === 'after') {
      anyAfter = true;
    }
  }

  return {
    isDarkMode: anyActive,
    immersionProgress: maxProgress,
    phase: anyActive ? 'active' : anyAfter ? 'after' : 'before',
  };
}

export interface TeamSectionScrollState {
  /** True only after the user has finished the dark section and left dark mode */
  isRevealed: boolean;
  /** Target reveal weight (0 when waiting for dark section exit, 1 when unlocked) */
  revealTarget: number;
  /** Normalized scroll progress [0..1] across the pinned full-page stage */
  scrollProgress: number;
  phase: 'waiting-dark-exit' | 'active' | 'complete';
}

/**
 * Pure calculation for the full-page "O agenție construită pe claritate și meșteșug."
 * (#equipo) section that follows DarkMethodologySection (#metodologia).
 *
 * Guarantees that the section remains completely hidden (isRevealed = false, revealTarget = 0)
 * while the user is still inside the dark section or while Dark Mode is active, and only
 * unfades onto its 100svh full-page stage after the dark section has exited and Light Mode resumes.
 */
export function computeTeamSectionScrollState(
  trackTop: number,
  trackHeight: number,
  viewportHeight: number,
  isDarkMode: boolean
): TeamSectionScrollState {
  if (viewportHeight <= 0) {
    return {
      isRevealed: false,
      revealTarget: 0,
      scrollProgress: 0,
      phase: 'waiting-dark-exit',
    };
  }

  const unlockTop = viewportHeight * 0.24;

  // Never show while Dark Mode is active or before the dark section has finished exiting
  if (isDarkMode || trackTop > unlockTop) {
    return {
      isRevealed: false,
      revealTarget: 0,
      scrollProgress: 0,
      phase: 'waiting-dark-exit',
    };
  }

  const scrollable = Math.max(viewportHeight * 0.5, trackHeight - viewportHeight);
  const totalSpan = unlockTop + scrollable;
  const rawScroll = (unlockTop - trackTop) / Math.max(1, totalSpan);
  const scrollProgress = Number(Math.max(0, Math.min(1, rawScroll)).toFixed(3));

  return {
    isRevealed: true,
    revealTarget: 1,
    scrollProgress,
    phase: scrollProgress >= 0.92 ? 'complete' : 'active',
  };
}

/**
 * Pure calculation for lightweight IntersectionObserver-driven section unfade
 * across the sections following TeamSection.
 *
 * - Unfades when the block's top enters the main focus zone of the viewport
 *   (elementTop <= viewportHeight * 0.62), ensuring the previous section has cleared first.
 * - Uses hysteresis once revealed: stays revealed while in view or scrolled past above,
 *   and only resets to false if the user scrolls all the way back up so the block is
 *   completely below the viewport (elementTop > viewportHeight * 1.02).
 */
export function computeSectionRevealState(
  elementTop: number,
  elementBottom: number,
  viewportHeight: number,
  wasRevealed: boolean
): boolean {
  if (viewportHeight <= 0 || elementBottom <= elementTop) return wasRevealed;

  if (wasRevealed) {
    // Only reset if the element is completely below the viewport (user scrolled way back up)
    return elementTop <= viewportHeight * 1.02;
  }

  return elementTop <= viewportHeight * 0.62;
}

/**
 * Computes a bounded stagger delay in milliseconds for subtle multi-card unfades,
 * keeping total delay capped so animations always feel brisk and cohesive.
 */
export function computeStaggerDelayMs(
  index: number,
  stepMs = 75,
  maxDelayMs = 360
): number {
  if (index <= 0 || stepMs <= 0) return 0;
  return Math.min(maxDelayMs, Math.round(index * stepMs));
}


