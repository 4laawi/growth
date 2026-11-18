import { ServiceCardItem, WorkshopFaqItem } from './studioData';

export interface GuaranteeMetricItem {
  id: string;
  value: string;
  label: string;
  detail: string;
}

export interface WebsiteTypeSpec {
  id: string;
  index: string;
  shortTitle: string;
  title: string;
  roSubtitle: string;
  targetClients: string;
  purpose: string;
  keyFeatures: string[];
  priceRange: string;
  timeline: string;
  recommendedStack: string;
  caseStudyId: string;
  caseStudyDomain: string;
  caseStudySummary: string;
  presetServiceOption: string;
}

export interface TechPlatformSpec {
  id: string;
  name: string;
  badge: string;
  usedFor: string;
  benefits: string;
}

export interface TechnicalAnatomyPillar {
  step: string;
  label: string;
  title: string;
  deliverable: string;
  detail: string;
  checklist: string[];
  guardrailNote: string;
}

export const ROGROWTH_GUARANTEE_METRICS: GuaranteeMetricItem[] = [
  {
    id: 'ownership',
    value: '100%',
    label: 'Proprietate Deplină',
    detail: 'Domeniul (.ro/.com), codul sursă, baza de date și activele îți aparțin integral la plata finală.',
  },
  {
    id: 'hidden-costs',
    value: '0 €',
    label: 'Costuri Ascunse',
    detail: 'Preț fix și scop agreat în scris înainte de începerea lucrului. Fără facturi surpriză.',
  },
  {
    id: 'experience',
    value: '8+ Ani',
    label: 'Experiență Cumulată',
    detail: 'Echipă cu istoric dovedit în dezvoltare web, arhitectură SEO și optimizarea conversiilor.',
  },
  {
    id: 'response-time',
    value: '< 24h',
    label: 'Timp de Răspuns',
    detail: 'Comunicare directă pe WhatsApp și telefon, cu actualizări clare în mai puțin de 24 de ore.',
  },
  {
    id: 'revisions',
    value: '2 Runde',
    label: 'Revizii Structurate',
    detail: 'Incluse în fiecare contract pentru modificări majore, plus ajustări mici flexibile pe parcurs.',
  },
];

export const CREARE_SITE_PACKAGES: ServiceCardItem[] = [
  {
    id: 'pkg-prezentare',
    number: '01',
    title: 'Site de Prezentare Simplu',
    priceBadge: '€300 – €400',
    deliveryBadge: '2 – 4 săptămâni',
    cardDescription:
      'Ideal pentru afaceri locale, clinici, prestatori de servicii și profesioniști independenți care au nevoie de o prezență online curată, rapidă și credibilă.',
    bottomCaption:
      'Plată standard: 30% avans / 70% la finalizare · 2 runde structurate de revizii incluse · 100% proprietatea clientului.',
    variant: 'cobalt',
    hasCta: true,
    ctaLabel: 'Solicită pachetul Prezentare →',
    deliverables: [
      '~5 pagini structurate (Acasă, Servicii, Despre, Tarife/Prețuri, Contact) mobile-first',
      'Butoane rapide Click-to-Call, formular de contact și certificat de securitate SSL (HTTPS)',
      'Configurare SEO tehnic de bază, Google Search Console & Google Business Profile',
      'HTML5 semantic (un singur H1 pe pagină), sitemap.xml dinamic și viteză Core Web Vitals',
      '2 runde majore de revizii incluse + predare completă domeniu și cod sursă',
    ],
    timeline: '2 – 4 săptămâni · €300 – €400 (30% avans / 70% la lansare)',
  },
  {
    id: 'pkg-leadgen',
    number: '02',
    title: 'Site Avansat pentru Lead-uri & Programări',
    priceBadge: '€700 – €1.200',
    deliveryBadge: '3 – 5 săptămâni',
    cardDescription:
      'Proiectat pentru clinici medicale, companii B2B, construcții, imobiliare, saloane și închirieri auto care urmăresc captarea constantă de cereri calificate.',
    bottomCaption:
      'Plată standard: 30% avans / 70% la finalizare · Subpagini individuale SEO + integrare WhatsApp Business.',
    variant: 'cobalt-deep',
    hasCta: true,
    ctaLabel: 'Solicită pachetul Lead-Gen →',
    deliverables: [
      'Design UI/UX personalizat și subpagini dedicate fiecărui serviciu (avantaj major SEO)',
      'Formulare interactive de calificare a lead-urilor sau sistem de programări online în calendar',
      'Integrare directă WhatsApp Business și trasee de conversie analizate față de competitori',
      'Optimizare avansată a vitezei pe mobil (FCP, LCP, CLS, TBT) și structură OpenGraph',
      'Link privat de preview pe parcursul dezvoltării + verificare tehnică post-lansare',
    ],
    timeline: '3 – 5 săptămâni · €700 – €1.200 (30% avans / 70% la lansare)',
  },
  {
    id: 'pkg-ecommerce-custom',
    number: '03',
    title: 'Magazin Online & Sisteme Web Custom',
    priceBadge: '€1.000 – €2.300+',
    deliveryBadge: '5 – 8 săptămâni',
    cardDescription:
      'Pentru branduri D2C, retaileri naționali și companii cu fluxuri operaționale specifice (portaluri clienți, calculatoare dinamice de preț, baze de date custom).',
    bottomCaption:
      'Plată etapizată pentru proiecte ample: 30% avans / 40% după aprobarea vizuală / 30% înainte de lansarea live.',
    variant: 'periwinkle',
    hasCta: true,
    ctaLabel: 'Solicită ofertă E-Commerce / Custom →',
    deliverables: [
      'Catalog rapid de produse cu variații, filtrare intuitivă și flux de checkout fără fricțiune',
      'Plăți securizate cu cardul (Netopia, Stripe) și generare automată AWB (Fan Courier, Sameday)',
      'Sisteme custom pe Next.js & Supabase/PostgreSQL: portaluri clienți și dashboard-uri admin',
      'Training complet pentru administrarea comenzilor și a catalogului de către echipa ta',
      'Zero comisioane din vânzări către agenție și zero vendor lock-in (cod 100% al tău)',
    ],
    timeline: '5 – 8 săptămâni (2–4+ luni pt. software complex) · Plată 30% / 40% / 30%',
  },
];

export const WEBSITE_TYPES_CATALOG: WebsiteTypeSpec[] = [
  {
    id: 'type-prezentare',
    index: '01',
    shortTitle: 'Prezentare',
    title: 'Site de Prezentare Profesionist',
    roSubtitle: 'Afaceri locale, clinici, prestatori servicii & profesioniști',
    targetClients: 'Afaceri locale, prestatori de servicii, cabinete medicale, avocați, consultanți și profesioniști independenți.',
    purpose:
      'Construiește o prezență online credibilă, explică clar serviciile și tarifele, inspiră încredere din primele secunde și oferă opțiuni imediate de contact (Click-to-Call și formular rapid).',
    keyFeatures: [
      'Structură clară de ~5 pagini (Acasă, Servicii, Despre, Tarife, Contact)',
      'Butoane vizibile Click-to-Call și WhatsApp pe telefon',
      'Indexare Google Search Console & asistență Google Business Profile',
    ],
    priceRange: '€300 – €400',
    timeline: '2 – 4 săptămâni',
    recommendedStack: 'Next.js & React sau WordPress (în funcție de frecvența editării)',
    caseStudyId: 'dental-crown-health',
    caseStudyDomain: 'dentalcrownhealth.ro',
    caseStudySummary: 'Platformă bilingvă pentru clinică stomatologică cu prezentarea tratamentelor, tarife transparente și programări.',
    presetServiceOption: 'Site de prezentare simplu (€300 – €400)',
  },
  {
    id: 'type-leadgen',
    index: '02',
    shortTitle: 'Lead-Gen & SEO',
    title: 'Site Avansat pentru Generare de Lead-uri',
    roSubtitle: 'Clinici medicale, B2B, construcții, imobiliare & renovări',
    targetClients: 'Clinici medicale, companii B2B, firme de construcții, agenții imobiliare și servicii de amenajări/renovări.',
    purpose:
      'Transformă căutările organice și vizitatorii în cereri de ofertă calificate prin subpagini individuale dedicate fiecărui serviciu (pentru SEO) și formulare interactive de calificare.',
    keyFeatures: [
      'Subpagini individuale per serviciu optimizate semantic pentru Google',
      'Formulare interactive de calificare a cererilor și filtrare avansată',
      'Arhitectură de conversie proiectată prin analiza competitorilor direcți',
    ],
    priceRange: '€700 – €1.200',
    timeline: '3 – 5 săptămâni',
    recommendedStack: 'Next.js, React & Tailwind CSS (viteză maximă pe mobil)',
    caseStudyId: 'kasata-imobiliare',
    caseStudyDomain: 'kasata.ro',
    caseStudySummary: 'Portal imobiliar pentru București și Ilfov construit pe Next.js cu filtre de căutare proprietăți și pâlnii de captare lead-uri.',
    presetServiceOption: 'Site avansat orientat spre conversie (€700 – €1.200)',
  },
  {
    id: 'type-ecommerce',
    index: '03',
    shortTitle: 'Magazin Online',
    title: 'Magazin Online / E-Commerce Complet',
    roSubtitle: 'Branduri D2C, retaileri & comercianți la nivel național',
    targetClients: 'Branduri Direct-to-Consumer (D2C), distribuitori, retaileri și comercianți care vând în toată România.',
    purpose:
      'Vânzare online rapidă și automatizată: catalog de produse cu filtre instantanee, plăți securizate cu cardul și generare automată de AWB-uri pentru curierii din România.',
    keyFeatures: [
      'Plăți online cu cardul prin Netopia Payments sau Stripe',
      'Integrare automatizată AWB cu Fan Courier, Sameday și locker',
      'Training inclus pentru gestionarea stocurilor, reducerilor și comenzilor',
    ],
    priceRange: '€1.000 – €2.300+',
    timeline: '5 – 8 săptămâni',
    recommendedStack: 'WooCommerce, Shopify sau Next.js E-Commerce',
    caseStudyId: 'baristas-coffee',
    caseStudyDomain: 'baristas.ro',
    caseStudySummary: 'Magazin online de cafea de specialitate și echipamente construit pe WordPress & WooCommerce cu plăți card și expediere automatizată.',
    presetServiceOption: 'Magazin online / Aplicație web (€1.000 – €2.300+)',
  },
  {
    id: 'type-landing',
    index: '04',
    shortTitle: 'Landing Page Ads',
    title: 'Landing Page Dedicat Campaniilor Google & Meta Ads',
    roSubtitle: 'Trafic plătit (Google Ads, Meta Ads) & lansări de servicii',
    targetClients: 'Companii care rulează reclame plătite în Google Ads sau Facebook/Instagram Ads și lansează produse sau oferte.',
    purpose:
      'Pagină cu un singur obiectiv comercial, fără meniuri sau distrageri inutile, construită exclusiv pentru a maximiza rata de conversie din clicurile plătite.',
    keyFeatures: [
      'Încărcare instantanee pe telefon pentru scor de calitate ridicat în Google Ads',
      'Structură persuasivă cu dovadă socială, ofertă clară și CTA direct',
      'Configurare evenimente de conversie (Google Tag, Meta Pixel)',
    ],
    priceRange: '€300 – €400',
    timeline: '2 – 3 săptămâni',
    recommendedStack: 'Next.js & React (scor 100/100 PageSpeed pe mobil)',
    caseStudyId: 'dubai-rent-luxury',
    caseStudyDomain: 'dubairent.ro',
    caseStudySummary: 'Landing page de mare viteză pentru rezervări auto, proiectat pentru conversie directă din trafic Google Ads și Meta Ads.',
    presetServiceOption: 'Site cu programări online / Landing Page Ads',
  },
  {
    id: 'type-booking',
    index: '05',
    shortTitle: 'Programări Online',
    title: 'Site Web cu Sistem de Programări & Rezervări',
    roSubtitle: 'Clinici, saloane, consultanți, închirieri auto & service-uri',
    targetClients: 'Clinici medicale și stomatologice, saloane, consultanți, companii de închirieri auto și service-uri auto.',
    purpose:
      'Permite clienților să verifice disponibilitatea în timp real, să aleagă serviciul, specialistul sau mașina dorită și să primească confirmarea automat — reducând apelurile telefonice manuale.',
    keyFeatures: [
      'Calendar interactiv cu sloturi orare sau perioade de închiriere',
      'Selecție serviciu, medic/specialist sau flotă auto cu preț calculat',
      'Confirmări automate și preluare rapidă pe WhatsApp',
    ],
    priceRange: '€700 – €1.200',
    timeline: '3 – 5 săptămâni',
    recommendedStack: 'Next.js sau WordPress cu motor de rezervări personalizat',
    caseStudyId: 'rentdacia-bucuresti',
    caseStudyDomain: 'rentdacia.ro',
    caseStudySummary: 'Platformă de închirieri auto pentru București și Aeroportul Otopeni cu selector de vehicule și rezervări rapide RO/EN.',
    presetServiceOption: 'Site cu programări online / Landing Page Ads',
  },
  {
    id: 'type-custom',
    index: '06',
    shortTitle: 'Sisteme Custom',
    title: 'Sisteme Custom, Portaluri Clienți & Aplicații Web',
    roSubtitle: 'Companii cu fluxuri interne sau operaționale specifice',
    targetClients: 'Companii în creștere care au nevoie de automatizarea unor procese interne, portaluri cu cont de client sau calculatoare complexe.',
    purpose:
      'Digitalizează operațiunile companiei prin aplicații web rapide, baze de date relaționale sigure, autentificare utilizatori și panouri de administrare create exact pe fluxul tău.',
    keyFeatures: [
      'Portaluri pentru clienți și parteneri cu autentificare securizată',
      'Calculatoare dinamice de preț și configuratoare de ofertă',
      'Baze de date PostgreSQL / Supabase și panouri de administrare custom',
    ],
    priceRange: '€1.000 – €2.300+',
    timeline: '5 – 8 săptămâni (2–4+ luni complex)',
    recommendedStack: 'Next.js, TypeScript, Tailwind CSS & Supabase / PostgreSQL',
    caseStudyId: 'kasata-imobiliare',
    caseStudyDomain: 'kasata.ro',
    caseStudySummary: 'Arhitectură custom pe Next.js cu filtrare dinamică în timp real și gestiune structurată a ofertelor.',
    presetServiceOption: 'Magazin online / Aplicație web (€1.000 – €2.300+)',
  },
];

export interface WebsiteTypeCarouselItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  meta: string;
  categoryBadge: string;
  description: string;
  highlights: string[];
  priceBadge: string;
  deliveryBadge: string;
  exampleDomain: string;
  slotFileName: string;
  presetServiceOption: string;
  caseStudyId: string;
}

export const WEBSITE_TYPE_CAROUSEL_ITEMS: WebsiteTypeCarouselItem[] = [
  {
    id: 'arc-inchirieri-auto',
    src: '/assets/aistudio/rentdacia_dfda43e0.webp',
    alt: 'Site web pentru închirieri auto și flote rent a car în România',
    title: 'Închirieri Auto & Flote',
    meta: 'Calendar Rezervări · Flotă Auto RO/EN · €700 – €1.200',
    categoryBadge: 'MOBILITATE & RENT A CAR',
    description:
      'Platforme rapide pentru firme de închirieri auto (Rent a Car) și transfer aeroport: filtrare după clasă vehicul, calcul automat al tarifului pe zile și rezervare directă pe WhatsApp.',
    highlights: [
      'Calculator automat de tarif în funcție de perioada și clasa auto aleasă',
      'Comutator bilingv RO / EN pentru turiști străini și diaspora (Aeroport Otopeni / regional)',
      'Rezervare rapidă fără cont obligatoriu + preluare instantanee pe WhatsApp',
    ],
    priceBadge: '€700 – €1.200',
    deliveryBadge: '3 – 5 săptămâni',
    exampleDomain: 'rentdacia.ro',
    slotFileName: '01-inchirieri-auto.webp',
    presetServiceOption: 'Site cu programări online / Landing Page Ads',
    caseStudyId: 'rentdacia-bucuresti',
  },
  {
    id: 'arc-cabinete-medicale',
    src: '/assets/aistudio/dentalcrownhealth_1219211c.webp',
    alt: 'Site web pentru cabinete medicale și clinici stomatologice',
    title: 'Cabinete Medicale & Clinici',
    meta: 'Programări Pacienți · Medici & Tarife · €400 – €900',
    categoryBadge: 'SĂNĂTATE & STOMATOLOGIE',
    description:
      'Site-uri de autoritate medicală pentru clinici dentare, dermatologie, estetică și cabinete individuale: profilul medicilor, listă transparentă de tarife și programări online.',
    highlights: [
      'Subpagini dedicate fiecărei specializări și intervenții (optimizate SEO local)',
      'Tabel clar de tarife, portofoliu cazuri Înainte / După și întrebări frecvente pacienți',
      'Formular de programare rapidă în calendar + buton permanent pentru Urgențe',
    ],
    priceBadge: '€400 – €900',
    deliveryBadge: '2 – 4 săptămâni',
    exampleDomain: 'dentalcrownhealth.ro',
    slotFileName: '02-cabinete-medicale.webp',
    presetServiceOption: 'Site avansat orientat spre conversie (€700 – €1.200)',
    caseStudyId: 'dental-crown-health',
  },
  {
    id: 'arc-imobiliare',
    src: '/assets/aistudio/kasataaa_b747262d.webp',
    alt: 'Site web pentru agenții imobiliare și ansambluri rezidențiale',
    title: 'Imobiliare & Rezidențial',
    meta: 'Căutare Proprietăți · Filtre & Schițe · €700 – €1.200',
    categoryBadge: 'IMOBILIARE & DEZVOLTATORI',
    description:
      'Portaluri pentru agenții imobiliare și dezvoltatori de ansambluri rezidențiale: filtrare instantanee după zonă, număr de camere, suprafață, buget și comision 0%.',
    highlights: [
      'Motor rapid de filtrare (Vânzare / Închiriere, Cartier, Preț, Număr camere)',
      'Fișe detaliate de proprietate cu galerii foto, schițe PDF și localizare pe hartă',
      'Alocare directă a cererii către agentul imobiliar pe WhatsApp și telefon',
    ],
    priceBadge: '€700 – €1.200',
    deliveryBadge: '3 – 5 săptămâni',
    exampleDomain: 'kasata.ro',
    slotFileName: '03-imobiliare-rezidential.webp',
    presetServiceOption: 'Site avansat orientat spre conversie (€700 – €1.200)',
    caseStudyId: 'kasata-imobiliare',
  },
  {
    id: 'arc-ecommerce',
    src: '/assets/aistudio/BARSITAS_bc81f494.webp',
    alt: 'Magazin online e-commerce cu plăți card și curieri în România',
    title: 'Magazine Online E-Commerce',
    meta: 'Plăți Card Netopia/Stripe · AWB Curieri · €1.000 – €2.300+',
    categoryBadge: 'RETAIL & BRANDURI D2C',
    description:
      'Magazine online construite pentru viteză și conversie pe telefon: filtre de produse fără reîncărcare, checkout simplificat, plăți cu cardul și generare automată AWB.',
    highlights: [
      'Plăți securizate cu cardul (Netopia Payments, Stripe, Apple Pay & Google Pay)',
      'Generare automată AWB pentru Fan Courier, Sameday și Easybox Locker',
      'Zero comision din vânzări către agenție + training complet administrare stocuri',
    ],
    priceBadge: '€1.000 – €2.300+',
    deliveryBadge: '5 – 8 săptămâni',
    exampleDomain: 'baristas.ro',
    slotFileName: '04-magazin-online-ecommerce.webp',
    presetServiceOption: 'Magazin online / Aplicație web (€1.000 – €2.300+)',
    caseStudyId: 'baristas-coffee',
  },
  {
    id: 'arc-showroom-auto',
    src: '/assets/aistudio/prject_a99b37d9.webp',
    alt: 'Site web pentru showroom auto, detailing și service auto',
    title: 'Showroom & Service Auto',
    meta: 'Prezentare Flotă · Programări ITP & Service · €400 – €900',
    categoryBadge: 'AUTO, DETAILING & SERVICE',
    description:
      'Pagini cu impact vizual puternic pentru parcuri auto, ateliere de detailing, tuning și service-uri multimarcă, pregătite pentru trafic din Google Ads și Meta Ads.',
    highlights: [
      'Catalog auto cu specificații tehnice, istoric verificat și opțiuni de leasing',
      'Programare online pentru revizie, ITP, mecanică, vopsitorie sau detailing',
      'Viteză maximă pe mobil pentru un scor de calitate ridicat în campaniile Google Ads',
    ],
    priceBadge: '€400 – €900',
    deliveryBadge: '2 – 4 săptămâni',
    exampleDomain: 'dubairent.ro',
    slotFileName: '05-showroom-service-auto.webp',
    presetServiceOption: 'Site cu programări online / Landing Page Ads',
    caseStudyId: 'dubai-rent-luxury',
  },
  {
    id: 'arc-horeca-restaurante',
    src: '/assets/aistudio/web_project_1_1b2ab729.jpg',
    alt: 'Site web pentru restaurante, cafenele, bistro și producători locali',
    title: 'Restaurante, HoReCa & Crame',
    meta: 'Meniu Digital QR · Rezervări Mese & Evenimente · €300 – €700',
    categoryBadge: 'GASTRONOMIE & HORECA',
    description:
      'Experiențe vizuale apetisante pentru restaurante, cafenele de specialitate, saloane de evenimente și producători artizanali: meniu digital, rezervări de mese și povestea brandului.',
    highlights: [
      'Meniu digital interactiv conform cerințelor ANPC (gramaje, alergeni, valori nutriționale)',
      'Formular rapid pentru rezervarea mesei sau ofertare evenimente private / corporate',
      'Direcție artistică editorială și galerii foto optimizate WebP cu încărcare instantanee',
    ],
    priceBadge: '€300 – €700',
    deliveryBadge: '2 – 4 săptămâni',
    exampleDomain: 'agrumea.ro',
    slotFileName: '06-restaurante-horeca.webp',
    presetServiceOption: 'Site de prezentare simplu (€300 – €400)',
    caseStudyId: 'agrumea-farm',
  },
  {
    id: 'arc-constructii-arhitectura',
    src: '/assets/extracted/work_2.png',
    alt: 'Site web pentru firme de construcții, arhitectură și amenajări interioare',
    title: 'Construcții & Arhitectură',
    meta: 'Portofoliu Șantiere · Calculator Deviz B2B · €500 – €1.100',
    categoryBadge: 'CONSTRUCȚII, INSTALAȚII & DESIGN',
    description:
      'Site-uri de portofoliu și ofertare tehnică pentru firme de construcții civile, birouri de arhitectură, panouri fotovoltaice și amenajări interioare la cheie.',
    highlights: [
      'Galerie de proiecte finalizate filtrată pe categorii (Rezidențial, Industrial, Amenajări)',
      'Formular interactiv de calificare pentru estimare deviz și suprafață în metri pătrați',
      'Secțiuni clare pentru certificări ISO, utilaje proprii, etape de execuție și garanție',
    ],
    priceBadge: '€500 – €1.100',
    deliveryBadge: '3 – 5 săptămâni',
    exampleDomain: 'constructii-b2b.ro',
    slotFileName: '07-constructii-arhitectura.webp',
    presetServiceOption: 'Site avansat orientat spre conversie (€700 – €1.200)',
    caseStudyId: 'kasata-imobiliare',
  },
  {
    id: 'arc-avocatura-consultanta',
    src: '/assets/extracted/work_4.png',
    alt: 'Site web pentru cabinete de avocatură, contabilitate și consultanță B2B',
    title: 'Avocatură & Consultanță B2B',
    meta: 'Arii de Practică · Programare Consultație · €300 – €600',
    categoryBadge: 'JURIDIC, CONTABILITATE & B2B',
    description:
      'Prezență digitală sobră, clară și credibilă pentru cabinete de avocatură, societăți de contabilitate, audit financiar, fonduri europene și consultanță în afaceri.',
    highlights: [
      'Structură ordonată pe arii de practică, industrii deservite și echipa de specialiști',
      'Sistem de programare a consultației (la sediu sau online) + contact rapid WhatsApp',
      'Secțiune de blog și articole legislative optimizată semantic pentru căutările din Google',
    ],
    priceBadge: '€300 – €600',
    deliveryBadge: '2 – 4 săptămâni',
    exampleDomain: 'cabinet-avocatura.ro',
    slotFileName: '08-avocatura-consultanta-b2b.webp',
    presetServiceOption: 'Site de prezentare simplu (€300 – €400)',
    caseStudyId: 'dental-crown-health',
  },
];

export const TECH_PLATFORM_STANDARDS: TechPlatformSpec[] = [
  {
    id: 'nextjs',
    name: 'Next.js & React',
    badge: 'Performanță Maximă',
    usedFor: 'Site-uri de servicii de înaltă performanță, portaluri, landing page-uri cu impact puternic și aplicații web moderne.',
    benefits: 'Viteză ultra-rapidă de încărcare, performanță superioară pe mobil, libertate arhitecturală totală și cod curat.',
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    badge: 'Editare Simplă',
    usedFor: 'Afaceri locale, bloguri de companie și site-uri care necesită publicare frecventă de conținut de către personal non-tehnic.',
    benefits: 'Panou de administrare familiar, gestionare ușoară a articolelor și paginilor fără cunoștințe de programare.',
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    badge: '0% Comision Vânzări',
    usedFor: 'Magazine online flexibile integrate în WordPress, cu conexiuni native la procesatorii de plăți și curierii din România.',
    benefits: 'Zero comisioane recurente pe vânzări către platformă și ecosistem matur de module Netopia, Stripe, Fan Courier și Sameday.',
  },
  {
    id: 'shopify',
    name: 'Shopify',
    badge: 'SaaS E-Commerce',
    usedFor: 'Branduri D2C și retaileri care preferă o platformă e-commerce administrată (SaaS) cu checkout nativ și scalare rapidă.',
    benefits: 'Infrastructură găzduită integral, securitate administrată și lansare rapidă pentru cataloage comerciale moderne.',
  },
  {
    id: 'supabase',
    name: 'Supabase / PostgreSQL',
    badge: 'Baze de Date & Portaluri',
    usedFor: 'Aplicații web bazate pe date, autentificare utilizatori, portaluri pentru clienți și logică de business personalizată.',
    benefits: 'Bază de date relațională PostgreSQL scalabilă, securitate la nivel de rând (RLS) și API-uri rapide în timp real.',
  },
];

export const TECHNICAL_ANATOMY_PILLARS: TechnicalAnatomyPillar[] = [
  {
    step: '01',
    label: 'Diagnostic & Stack',
    title: 'Alegem Tehnologia după Nevoia Operațională',
    deliverable: 'Next.js · WordPress · WooCommerce · Shopify · Supabase',
    detail:
      'Nu forțăm aceeași platformă pentru orice proiect. Diagnosticăm mai întâi cine va administra site-ul, ce volum de trafic și ce flux comercial ai, apoi alegem tehnologia potrivită.',
    checklist: [
      'Next.js & React pentru viteză extremă pe mobil, portaluri și landing page-uri',
      'WordPress & WooCommerce pentru editare facilă și magazine online fără comision pe vânzări',
      'Shopify pentru branduri D2C SaaS și Supabase/PostgreSQL pentru aplicații web custom',
    ],
    guardrailNote: 'Filozofia RoGrowth: dacă un site simplu de €300–€400 îți rezolvă problema, nu îți vom recomanda un pachet scump.',
  },
  {
    step: '02',
    label: 'SEO & GEO Inclus',
    title: 'SEO Tehnic & Optimizare GEO Incluse Gratuit',
    deliverable: 'HTML5 Semantic · Search Console · Core Web Vitals',
    detail:
      'Fiecare site construit de RoGrowth pleacă din Ziua 1 cu fundația tehnică completă pentru Google și pentru motoarele conversaționale AI (GEO — Generative Engine Optimization).',
    checklist: [
      'Structură semantică HTML5 (strict un singur <h1> pe pagină și ierarhie logică <h2>/<h3>)',
      'Meta-titluri și meta-descrieri unice, OpenGraph tags, sitemap.xml dinamic și robots.txt validat',
      'Certificat SSL (HTTPS), conectare Google Search Console + trimitere sitemap și scoruri FCP/LCP/CLS/TBT excelente',
    ],
    guardrailNote: 'Date structurate Schema.org (JSON-LD) incluse pentru vizibilitate clară în Google și răspunsurile AI.',
  },
  {
    step: '03',
    label: 'Garda de Onestitate',
    title: 'Ce NU Promitem (Fără Iluzii sau Garanții False SEO)',
    deliverable: 'Transparență Comercială 100%',
    detail:
      'Respectăm banii și așteptările clienților noștri. Construim o fundație tehnică impecabilă și propunem proactiv structura de vânzare, dar refuzăm promisiunile înșelătoare din piață.',
    checklist: [
      'Nu garantăm niciodată „Locul #1 în Google”, creșteri bruște peste noapte sau termene fixe de clasare',
      'SEO-ul tehnic on-page la creare este inclus gratuit în fiecare site livrat',
      'Serviciul de SEO lunar (articole, link building, monitorizare poziții, analiză competitori) este un abonament separat, opțional',
    ],
    guardrailNote: 'De asemenea, nu promovăm „revizii nelimitate” — includem 2 runde majore structurate pentru a păstra termenele ferme.',
  },
  {
    step: '04',
    label: 'Predare & Garanție',
    title: 'Link Privat de Preview, Predare 100% & Suport Post-Lansare',
    deliverable: 'Zero Vendor Lock-In · Garanție Tehnică',
    detail:
      'Urmărești evoluția site-ului pe un URL privat de staging înainte ca ceva să devină public. La final, primești controlul complet și asistență tehnică post-lansare.',
    checklist: [
      'Link privat de preview (staging) pentru testare și cele 2 runde de revizii înainte de lansare',
      'Verificare completă post-lansare: testarea formularelor, înregistrărilor DNS și a indexării în Google Search Console',
      'Garanție tehnică post-lansare pentru orice eroare sau glitch de afișare + pachete opționale de mentenanță',
    ],
    guardrailNote: 'Domeniul web (.ro, .com) se înregistrează strict pe numele companiei tale. Codul sursă îți aparține 100%.',
  },
];

export const CREARE_SITE_FAQ_ITEMS: WorkshopFaqItem[] = [
  {
    id: 'faq-ownership-lockin',
    question: 'Cine deține domeniul (.ro/.com), codul sursă și găzduirea site-ului?',
    dutchSublabel: '100% Proprietatea Clientului · Zero Lock-In',
    answer:
      'Domeniul web (.ro, .com etc.) este înregistrat strict pe numele tău sau al firmei tale. La plata finală, deții 100% codul sursă, baza de date, imaginile și toate fișierele proiectului. Nu blocăm niciodată clienții în constructori proprietari sau contracte forțate: poți găzdui site-ul pe propriul server sau poți opta pentru găzduirea administrată de RoGrowth (monitorizare uptime, actualizări de securitate și backup-uri).',
    metricsHighlight: '0% Vendor Lock-In · Poți prelua oricând toate credențialele și fișierele.',
  },
  {
    id: 'faq-pricing-payments',
    question: 'Cum funcționează prețurile, avansul și rundele de revizii?',
    dutchSublabel: '0 Costuri Ascunse · Contract Clar',
    answer:
      'Agreăm în scris prețul fix și lista de livrabile înainte de a începe lucrul: €300–€400 pentru site de prezentare simplu (2–4 săptămâni), €700–€1.200 pentru site avansat de lead-uri/programări (3–5 săptămâni) și €1.000–€2.300+ pentru magazin online sau sisteme custom (5–8 săptămâni). Plata se face 30% avans / 70% la predare (sau 30% / 40% / 30% pentru proiecte mari). Fiecare contract include 2 runde structurate de revizii majore, plus ajustări mici flexibile pe parcurs.',
    metricsHighlight: '30% Avans / 70% la Lansare · 2 Runde Majore de Revizii Incluse.',
  },
  {
    id: 'faq-seo-included',
    question: 'Ce optimizare SEO este inclusă gratuit și ce nu promiteți?',
    dutchSublabel: 'SEO Tehnic Inclus vs. SEO Lunar',
    answer:
      'Fiecare site include gratuit: structură HTML5 semantică (un singur <h1> pe pagină, ierarhie <h2>/<h3>), meta-titluri și meta-descrieri unice, sitemap.xml dinamic, robots.txt validat, certificat SSL (HTTPS), OpenGraph tags, optimizare viteză Core Web Vitals pe mobil și conectare la Google Search Console. Nu garantăm niciodată „Locul #1 în Google” peste noapte; SEO-ul lunar continuu (articole, link building, monitorizare) este un serviciu separat.',
    metricsHighlight: 'Ghidaj Onest · Google Search Console & Sitemap configurate din Ziua 1.',
  },
  {
    id: 'faq-tech-choice',
    question: 'Cum alegeți între Next.js, WordPress, WooCommerce, Shopify și Supabase?',
    dutchSublabel: 'Tehnologie Aleasă pe Obiectiv',
    answer:
      'Alegem platforma care se potrivește nevoilor tale operaționale reale: Next.js & React pentru site-uri ultra-rapide, landing page-uri și aplicații web; WordPress pentru afaceri locale și bloguri care necesită editare simplă; WooCommerce pentru magazine online fără comision pe vânzări și cu integrare nativă Netopia/Stripe & Fan Courier/Sameday; Shopify pentru branduri D2C SaaS; și Supabase/PostgreSQL pentru portaluri de clienți și baze de date custom.',
    metricsHighlight: 'Cod Verificat Uman · Zero pagini generice lăsate neterminate.',
  },
  {
    id: 'faq-delivery-support',
    question: 'Cum testăm site-ul înainte de lansare și ce suport avem după?',
    dutchSublabel: 'Link Privat de Preview & Garanție',
    answer:
      'Pe tot parcursul construcției ai acces la un link privat de preview (staging URL) pentru a testa paginile pe telefon și desktop înainte de publicare. La lansarea live, verificăm toate formularele de contact, înregistrările DNS ale domeniului și indexarea în Google Search Console. Oferim garanție tehnică post-lansare pentru rezolvarea oricăror erori de afișare și comunicare directă pe WhatsApp cu răspuns în sub 24 de ore.',
    metricsHighlight: 'Răspuns < 24h pe WhatsApp & Telefon · Garanție Tehnică Post-Lansare.',
  },
];

export function buildCreareSiteWebJsonLd(canonicalUrl = 'https://rogrowth.ro/creare-siteweb') {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${canonicalUrl}#agency`,
        name: 'RoGrowth — Agenție de Creare Site Web & Marketing Digital',
        url: canonicalUrl,
        areaServed: [
          { '@type': 'City', name: 'București' },
          { '@type': 'Country', name: 'România' },
        ],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'București',
          addressCountry: 'RO',
        },
        priceRange: '€300 - €2300+',
        description:
          'Agenție de creare site web și marketing digital în București și toată România. Site de prezentare (€300–€400), site avansat pentru lead-uri (€700–€1.200), magazin online e-commerce și aplicații web custom (€1.000–€2.300+) cu 100% proprietatea clientului asupra codului.',
        knowsAbout: [
          'Creare site web de prezentare',
          'Creare magazin online WooCommerce și Shopify',
          'Dezvoltare web Next.js și React',
          'Optimizare SEO tehnic și Core Web Vitals',
          'Sisteme de programări online și aplicații web Supabase',
        ],
      },
      {
        '@type': 'Service',
        '@id': `${canonicalUrl}#service`,
        name: 'Creare Site Web Profesional & Magazin Online în România',
        provider: { '@id': `${canonicalUrl}#agency` },
        areaServed: 'RO',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Pachete Transparente Creare Site Web RoGrowth',
          itemListElement: CREARE_SITE_PACKAGES.map((pkg) => ({
            '@type': 'Offer',
            name: pkg.title,
            description: `${pkg.cardDescription} Termen de livrare: ${pkg.deliveryBadge}. Preț: ${pkg.priceBadge}.`,
            priceSpecification: {
              '@type': 'PriceSpecification',
              priceCurrency: 'EUR',
              description: pkg.priceBadge,
            },
          })),
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faq`,
        mainEntity: CREARE_SITE_FAQ_ITEMS.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };
}
