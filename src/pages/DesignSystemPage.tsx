import React, { useState } from 'react';
import {
  PORTFOLIO_PROJECTS,
  PortfolioProject,
  SERVICE_CARDS,
  ServiceCardItem,
  WORKSHOP_FAQ_ITEMS,
} from '../data/studioData';
import {
  MONEY_PAGE_BLUEPRINT_STEPS,
  ROGROWTH_COLOR_TOKENS,
  ROGROWTH_MINIMALISM_RULES,
  ROGROWTH_SURFACES_AND_RADII,
  ROGROWTH_TYPOGRAPHY_SCALE,
} from '../design-system/tokens';
import {
  BrowserProjectCard,
  CoreWebVitalsCard,
  ElectricFaqAccordion,
  FigmaSelectionFrame,
  IPhoneHardwareFrame,
  MacBookHardwareFrame,
  PricingTierCard,
  SectionHeader,
} from '../components/ui/StudioPrimitives';
import {
  MultiplayerCursor,
  OnlinesNotificationBubble,
  ToolSquircle,
  WireframeBrowserCard,
} from '../components/StudioIcons';
import { PROCESS_STEPS } from '../components/DarkMethodologySection';
import { RoGrowthWordmarkFooter } from '../components/ui/wordmark-footer';
import { ArrowLeft, ArrowRight, Check, Layers } from 'lucide-react';

interface DesignSystemPageProps {
  onNavigateHome: () => void;
  onOpenContact: (presetService?: string) => void;
  onOpenServiceModal: (service: ServiceCardItem) => void;
  onSelectProject: (project: PortfolioProject) => void;
  onOpenLegalModal: (type: 'terminos' | 'privacidad') => void;
}

export function DesignSystemPage({
  onNavigateHome,
  onOpenContact,
  onOpenServiceModal,
  onSelectProject,
  onOpenLegalModal,
}: DesignSystemPageProps) {
  const [framePreviewMode, setFramePreviewMode] = useState<'light' | 'dark'>(
    'light'
  );
  const [activeBlueprintIdx, setActiveBlueprintIdx] = useState<number>(0);
  const [activeMacStep, setActiveMacStep] = useState<number>(0);
  const [copiedTokenId, setCopiedTokenId] = useState<string | null>(null);

  const handleCopyToken = (id: string, value: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => { });
    }
    setCopiedTokenId(id);
    setTimeout(() => {
      setCopiedTokenId((prev) => (prev === id ? null : prev));
    }, 1800);
  };

  const activeBlueprint = MONEY_PAGE_BLUEPRINT_STEPS[activeBlueprintIdx];

  return (
    <div className="min-h-screen bg-white text-[#141517]">
      {/* 1. Studio Hero Header for the Locked-In Design System */}
      <section
        aria-labelledby="ds-hero-heading"
        className="relative pt-32 pb-20 px-6 md:px-12 lg:px-20 bg-onlines-grid border-b border-neutral-200/80 overflow-hidden"
      >
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <button
              type="button"
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 text-xs font-mono-code font-semibold text-neutral-600 hover:text-[#0D5FF9] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Înapoi la Homepage (rogrowth.ro)</span>
            </button>

            <div className="text-xs font-mono-code text-neutral-500">
              <span>SISTEM UI & REGULI AI MINIMALISTE</span>
              <span aria-hidden="true"> · </span>
              <span className="text-[#0D5FF9] font-bold">V2.0 MINIMAL STUDIO</span>
            </div>
          </div>

          <div className="max-w-[920px]">
            <FigmaSelectionFrame
              mode="light"
              badgeLabel="Pregătit pentru /creare-siteweb & paginile de conversie →"
              onBadgeClick={() => {
                const el = document.getElementById('money-page-blueprint');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-block px-6 md:px-10 pt-5 pb-9 bg-white/90 backdrop-blur-sm"
            >
              <p className="text-xs font-mono-code uppercase tracking-widest text-[#0D5FF9] mb-3">
                Arhitectură Vizuală, Minimalism & Componente Reutilizabile
              </p>
              <h1
                id="ds-hero-heading"
                className="text-[clamp(2.35rem,5vw,4.25rem)] font-extrabold tracking-[-0.04em] leading-[1.03] text-[#141517] text-balance"
              >
                Sistemul de Design RoGrowth.ro
              </h1>
              <p className="mt-4 text-[15px] md:text-[17px] text-neutral-600 leading-[1.6] max-w-[680px]">
                Constituția vizuală și regulile stricte de minimalism pentru AI:{' '}
                spațiu alb pur, imagini 100% curate fără suprapuneri, maximum 3
                elemente în coloanele focale și scroll fluid la 60fps.
              </p>
            </FigmaSelectionFrame>
          </div>

          {/* Quick Jump Anchor Bar */}
          <div className="mt-12 flex flex-wrap items-center gap-2">
            {[
              { href: '#ds-minimalism-rules', label: '00. Reguli AI Minimalism' },
              { href: '#ds-tokens', label: '01. Culori & Suprafețe' },
              { href: '#ds-typography', label: '02. Tipografie' },
              { href: '#ds-studio-primitives', label: '03. Elemente Mod Studio' },
              { href: '#ds-commercial-cards', label: '04. Carduri Preț & Conversie' },
              { href: '#ds-hardware-frames', label: '05. Rame Hardware & Proiecte' },
              { href: '#money-page-blueprint', label: '06. Șablonul Money Page' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-full bg-white border border-neutral-200/90 hover:border-[#0D5FF9] text-xs font-semibold text-[#141517] hover:text-[#0D5FF9] transition-colors whitespace-nowrap shadow-xs"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Section 00: Non-Negotiable AI Minimalism & Anti-Clutter Rules */}
      <section
        id="ds-minimalism-rules"
        aria-labelledby="ds-minimalism-heading"
        className="py-20 px-6 md:px-12 lg:px-20 max-w-[1280px] mx-auto border-b border-neutral-100"
      >
        <SectionHeader
          id="ds-minimalism-heading"
          eyebrow="00. Mandatul de Minimalism & Anti-Clutter (Reguli AI Obligatorii)"
          title="Spațiu alb pur, imagini neîncărcate și scroll fluid la 60fps"
          description="Aceste 4 reguli din UI_DESIGN_SYSTEM.md sunt obligatorii pentru toate secțiunile și paginile viitoare construite în RoGrowth.ro."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {ROGROWTH_MINIMALISM_RULES.map((rule) => (
            <div
              key={rule.id}
              className="rounded-[24px] bg-white border border-neutral-200/80 p-7 flex flex-col justify-between gap-4 shadow-[0_8px_25px_rgba(0,0,0,0.02)]"
            >
              <div>
                <span className="text-xs font-mono-code font-bold text-[#0D5FF9]">
                  REGULA {rule.number} / 04
                </span>
                <h3 className="mt-2 text-xl font-bold text-[#141517] tracking-tight">
                  {rule.title}
                </h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  {rule.doRule}
                </p>
              </div>
              <div className="pt-3 border-t border-neutral-100 text-xs font-mono-code text-neutral-500">
                {rule.forbidRule}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Section 01: Color Palette & Surface Rhythm (60-30-10 Discipline) */}
      <section
        id="ds-tokens"
        aria-labelledby="ds-tokens-heading"
        className="py-20 md:py-24 px-6 md:px-12 lg:px-20 max-w-[1280px] mx-auto"
      >
        <SectionHeader
          id="ds-tokens-heading"
          eyebrow="01. Paleta & Ritmul Suprafețelor (60-30-10)"
          title="Contrast arhitectural: Alb Studio, Cobalt Electric și Obsidian"
          description="Fiecare pagină de serviciu alternează deliberat între pânza luminoasă cu grilă de studio (#FFFFFF), cardurile comerciale Cobalt (#0D5FF9) și secțiunea tehnică întunecată (#050505)."
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ROGROWTH_COLOR_TOKENS.map((token) => (
            <div
              key={token.id}
              className="rounded-[24px] bg-white border border-neutral-200/90 p-5 flex flex-col justify-between shadow-[0_8px_25px_rgba(0,0,0,0.03)]"
            >
              <div>
                <div
                  className={`h-24 w-full rounded-2xl ${token.tailwindClass} border border-neutral-200/40 p-3.5 flex items-end justify-between mb-4`}
                >
                  <span
                    className={`text-xs font-mono-code font-bold ${token.textContrastClass}`}
                  >
                    {token.hex}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyToken(token.id, token.hex)}
                    aria-label={`Copiază codul hex ${token.hex}`}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono-code font-semibold cursor-pointer transition-colors ${token.textContrastClass === 'text-white'
                        ? 'bg-white/15 text-white hover:bg-white/25'
                        : 'bg-neutral-900/10 text-[#141517] hover:bg-neutral-900/20'
                      }`}
                  >
                    {copiedTokenId === token.id ? 'Copiat!' : 'Copiază'}
                  </button>
                </div>

                <p className="text-[11px] font-mono-code text-[#0D5FF9] mb-1">
                  {token.role}
                </p>
                <h3 className="text-[17px] font-bold text-[#141517] tracking-tight mb-1.5">
                  {token.name}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {token.usageRule}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono-code text-neutral-400">
                <span>Clasă Tailwind</span>
                <span className="text-[#141517] font-semibold">
                  {token.tailwindClass}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Surface Textures & Border Radius Contract */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {ROGROWTH_SURFACES_AND_RADII.map((surface) => (
            <div
              key={surface.id}
              className="rounded-2xl bg-neutral-50 border border-neutral-200/80 p-5 flex flex-col justify-between"
            >
              <div>
                <div className="text-[11px] font-mono-code text-[#0D5FF9] mb-1.5">
                  Rază: {surface.radiusValue}
                </div>
                <h4 className="text-base font-bold text-[#141517] mb-2">
                  {surface.name}
                </h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {surface.usage}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-200/70 text-[11px] font-mono-code text-neutral-600 truncate">
                {surface.cssClass}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Section 02: Typography Scale (Plus Jakarta Sans + JetBrains Mono) */}
      <section
        id="ds-typography"
        aria-labelledby="ds-typography-heading"
        className="py-20 md:py-24 px-6 md:px-12 lg:px-20 bg-neutral-50/70 border-y border-neutral-200/70"
      >
        <div className="max-w-[1280px] mx-auto">
          <SectionHeader
            id="ds-typography-heading"
            eyebrow="02. Sistemul Tipografic (Regula 2+1 Fonturi)"
            title="Plus Jakarta Sans pentru impact comercial + JetBrains Mono pentru precizie"
            description="Titlurile folosesc tracking strâns (-0.035em până la -0.055em) și text-balance, în timp ce prețurile, termenele și metricile tehnice folosesc cifre tabulare și JetBrains Mono."
          />

          <div className="mt-12 divide-y divide-neutral-200/80 rounded-[28px] bg-white border border-neutral-200/90 p-6 md:p-10 shadow-[0_12px_35px_rgba(0,0,0,0.03)]">
            {ROGROWTH_TYPOGRAPHY_SCALE.map((typeSpec) => (
              <div
                key={typeSpec.id}
                className="py-6 first:pt-0 last:pb-0 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
              >
                <div className="lg:col-span-4 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono-code text-[#0D5FF9]">
                    <span>{typeSpec.fontFamily}</span>
                    <span aria-hidden="true">·</span>
                    <span>{typeSpec.weight}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#141517]">
                    {typeSpec.name}
                  </h3>
                  <p className="text-xs font-mono-code text-neutral-400">
                    Dimensiune: {typeSpec.sizeClampOrPx} · Tracking:{' '}
                    {typeSpec.tracking}
                  </p>
                  <p className="text-xs text-neutral-500 pt-1">
                    {typeSpec.usage}
                  </p>
                </div>

                <div className="lg:col-span-8 overflow-hidden">
                  {typeSpec.id === 'hero-display' && (
                    <p className="text-[clamp(3rem,6vw,5.2rem)] font-extrabold tracking-[-0.055em] leading-[0.9] text-[#141517]">
                      {typeSpec.sampleText}
                    </p>
                  )}
                  {typeSpec.id === 'money-page-h1' && (
                    <p className="text-[clamp(1.85rem,3.4vw,3rem)] font-extrabold tracking-[-0.04em] leading-[1.05] text-[#141517] text-balance">
                      {typeSpec.sampleText}
                    </p>
                  )}
                  {typeSpec.id === 'section-h2' && (
                    <p className="text-[clamp(1.6rem,2.8vw,2.4rem)] font-extrabold tracking-[-0.035em] leading-[1.08] text-[#141517]">
                      {typeSpec.sampleText}
                    </p>
                  )}
                  {typeSpec.id === 'card-h3' && (
                    <p className="text-[21px] font-bold tracking-[-0.025em] leading-[1.2] text-[#141517]">
                      {typeSpec.sampleText}
                    </p>
                  )}
                  {typeSpec.id === 'body-prose' && (
                    <p className="text-[15.5px] font-normal leading-[1.6] text-neutral-600 max-w-2xl">
                      {typeSpec.sampleText}
                    </p>
                  )}
                  {typeSpec.id === 'mono-eyebrow' && (
                    <p className="text-xs font-mono-code uppercase tracking-widest text-[#0D5FF9]">
                      {typeSpec.sampleText}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Section 03: Studio Craft Primitives (Interactive Showcase) */}
      <section
        id="ds-studio-primitives"
        aria-labelledby="ds-primitives-heading"
        className="py-20 md:py-24 px-6 md:px-12 lg:px-20 max-w-[1280px] mx-auto"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <SectionHeader
            id="ds-primitives-heading"
            eyebrow="03. Elementele Vizuale „Mod Studio”"
            title="Componente care dau personalitate paginilor de vânzare"
            description="Fiecare money page folosește aceeași cutie de selecție Figma, cursoare multiplayer cu beneficii cuantificabile, bule de notificare și pictograme squircle."
          />

          {/* Interactive Surface Switcher for FigmaSelectionFrame preview */}
          <div className="flex items-center gap-1 bg-neutral-100 p-1.5 rounded-full self-start lg:self-end shrink-0">
            <button
              type="button"
              onClick={() => setFramePreviewMode('light')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${framePreviewMode === 'light'
                  ? 'bg-[#141517] text-white'
                  : 'text-neutral-600 hover:text-[#141517]'
                }`}
            >
              Suprafață Light Studio
            </button>
            <button
              type="button"
              onClick={() => setFramePreviewMode('dark')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${framePreviewMode === 'dark'
                  ? 'bg-[#0D5FF9] text-white'
                  : 'text-neutral-600 hover:text-[#141517]'
                }`}
            >
              Suprafață Dark Obsidian
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: FigmaSelectionFrame + MultiplayerCursors Live Preview */}
          <div
            className={`lg:col-span-7 rounded-[28px] p-8 md:p-12 border transition-colors flex flex-col items-center justify-center relative min-h-[380px] ${framePreviewMode === 'dark'
                ? 'bg-[#050505] border-neutral-800 text-white'
                : 'bg-onlines-grid border-neutral-200/90 text-[#141517]'
              }`}
          >
            <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
              <MultiplayerCursor
                label="100/100 Google Speed"
                color="#0891B2"
                onClick={() =>
                  onOpenContact(
                    'Site avansat orientat spre conversie (€700 – €1.200)'
                  )
                }
              />
              <MultiplayerCursor
                label="Livrare în 2–4 săpt."
                color="#10B981"
                onClick={() =>
                  onOpenContact('Site de prezentare simplu (€300 – €400)')
                }
              />
              <MultiplayerCursor
                label="100% Codul Tău"
                color="#5E5CE6"
                onClick={() => onOpenContact()}
              />
            </div>

            <FigmaSelectionFrame
              mode={framePreviewMode}
              badgeLabel="Creare Site Web · De la €300 →"
              onBadgeClick={() =>
                onOpenContact('Site de prezentare simplu (€300 – €400)')
              }
              className="px-8 py-6 text-center"
            >
              <h3
                className={`text-[clamp(1.85rem,3.5vw,3rem)] font-extrabold tracking-[-0.04em] leading-none ${framePreviewMode === 'dark' ? 'text-white' : 'text-[#141517]'
                  }`}
              >
                /creare-siteweb
              </h3>
            </FigmaSelectionFrame>

            <p
              className={`mt-10 text-xs font-mono-code ${framePreviewMode === 'dark'
                  ? 'text-neutral-400'
                  : 'text-neutral-500'
                }`}
            >
              Componentă: &lt;FigmaSelectionFrame mode=&quot;{framePreviewMode}
              &quot; /&gt; + &lt;MultiplayerCursor /&gt;
            </p>
          </div>

          {/* Right: ToolSquircle + OnlinesNotificationBubble + WireframeBrowserCard */}
          <div className="lg:col-span-5 rounded-[28px] bg-onlines-dots border border-neutral-200/80 p-8 flex flex-col justify-between gap-6">
            <div>
              <p className="text-xs font-mono-code uppercase tracking-widest text-[#0D5FF9] mb-2">
                Elemente de Colaj & Notificări
              </p>
              <h3 className="text-xl font-bold text-[#141517] tracking-tight">
                ToolSquircle, NotificationBubble & WireframeCard
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <ToolSquircle tool="nextjs" />
              <ToolSquircle tool="figma" />
              <ToolSquircle tool="vscode" />
              <ToolSquircle tool="gdocs" />
              <ToolSquircle tool="cube" />
            </div>

            <div className="space-y-3">
              <OnlinesNotificationBubble
                compact
                timeAgo="Ziua 1"
                message="Indexare Google Search Console activată."
              />
              <OnlinesNotificationBubble
                compact
                timeAgo="QA Mobil"
                message="Testat pe iOS Safari & Android Chrome (100/100)."
              />
            </div>

            <WireframeBrowserCard variant="grid" className="max-w-[280px]" />
          </div>
        </div>
      </section>

      {/* 5. Section 04: Commercial & Conversion Primitives (3 Cobalt Cards) */}
      <section
        id="ds-commercial-cards"
        aria-labelledby="ds-commercial-heading"
        className="py-20 md:py-24 px-6 md:px-12 lg:px-20 bg-neutral-50/70 border-t border-neutral-200/70"
      >
        <div className="max-w-[1240px] mx-auto">
          <SectionHeader
            id="ds-commercial-heading"
            eyebrow="04. Carduri Comerciale & Pachete Transparente"
            title="Componenta <PricingTierCard /> în cele 3 variante Cobalt"
            description="Orice pagină de serviciu (/creare-siteweb, /magazin-online, /optimizare-seo) folosește această componentă pentru a afișa prețul, avansul de 30%, timpul de livrare și livrabilele concrete."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 items-stretch">
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

      {/* 6. Obsidian Dark Mode Primitives: CWV Card + Electric FAQ + MacBook Frame */}
      <section
        aria-labelledby="ds-dark-primitives-heading"
        className="bg-[#050505] text-white py-24 px-6 md:px-12 lg:px-20"
      >
        <div className="max-w-[1240px] mx-auto space-y-16">
          <SectionHeader
            id="ds-dark-primitives-heading"
            theme="dark"
            eyebrow="05. Secțiunea Dark Mode & Rame Hardware"
            title="Imersiune Obsidian (#050505), MacBook Interactive & Acorduri Electrice (#1D1CFF)"
            description="Pe fiecare money page, această secțiune rupe monotonia fundalului alb și demonstrează execuția tehnică (100/100 Core Web Vitals) și răspunsurile la obiecțiile comerciale."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <CoreWebVitalsCard />

              <MacBookHardwareFrame>
                <div className="pt-2 flex items-center justify-between text-xs font-mono-code text-white/80">
                  <span>COMPONENTĂ: &lt;MacBookHardwareFrame /&gt;</span>
                  <span>ETAPA {PROCESS_STEPS[activeMacStep].step}/04</span>
                </div>
                <div className="my-auto py-3 space-y-2">
                  <p className="text-xs font-mono-code uppercase tracking-wider text-sky-200">
                    {PROCESS_STEPS[activeMacStep].label} ·{' '}
                    {PROCESS_STEPS[activeMacStep].deliverable}
                  </p>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {PROCESS_STEPS[activeMacStep].title}
                  </h3>
                  <p className="text-xs text-white/90 leading-relaxed">
                    {PROCESS_STEPS[activeMacStep].detail}
                  </p>
                </div>
                <div className="grid grid-cols-4 gap-1.5 pt-2.5 border-t border-white/20">
                  {PROCESS_STEPS.map((s, idx) => (
                    <button
                      key={s.step}
                      type="button"
                      onClick={() => setActiveMacStep(idx)}
                      className={`px-2 py-1.5 rounded-md text-left transition-colors cursor-pointer ${activeMacStep === idx
                          ? 'bg-white text-[#0D5FF9] font-semibold'
                          : 'bg-white/10 text-white/80 hover:bg-white/20'
                        }`}
                    >
                      <span className="block text-[10px] font-mono-code leading-none mb-0.5">
                        {s.step}
                      </span>
                      <span className="block text-[11px] truncate">
                        {s.label}
                      </span>
                    </button>
                  ))}
                </div>
              </MacBookHardwareFrame>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center">
              <ElectricFaqAccordion items={WORKSHOP_FAQ_ITEMS} />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Hardware & Browser Project Showcase Primitives */}
      <section
        id="ds-hardware-frames"
        aria-labelledby="ds-portfolio-primitives-heading"
        className="py-20 md:py-24 px-6 md:px-12 lg:px-20 max-w-[1280px] mx-auto"
      >
        <SectionHeader
          id="ds-portfolio-primitives-heading"
          eyebrow="05B. Carduri de Portofoliu & Previzualizare Mobilă"
          title="Componentele <BrowserProjectCard /> și <IPhoneHardwareFrame />"
          description="Folosite pe paginile de servicii pentru a arăta proiecte reale din nișa clientului (Clinici, Imobiliare, Închirieri Auto, E-Commerce) cu preț și timp de livrare."
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-7">
            {PORTFOLIO_PROJECTS.slice(0, 2).map((project) => (
              <BrowserProjectCard
                key={project.id}
                project={project}
                onSelect={onSelectProject}
              />
            ))}
          </div>

          <div className="lg:col-span-4 rounded-[28px] bg-onlines-dots border border-neutral-200/80 p-8 flex flex-col items-center justify-center text-center">
            <IPhoneHardwareFrame
              imageSrc="/assets/aistudio/Club_de_course_Energized_en_mouvement_e400c86f.webp"
              imageAlt="Baristas Coffee — Design mobil full-screen"
              ariaLabel="Deschide studiul de caz Baristas Coffee"
              onClick={() => onSelectProject(PORTFOLIO_PROJECTS[2])}
              className="max-w-[185px]"
            />
            <p className="mt-4 text-xs font-mono-code text-neutral-500">
              &lt;IPhoneHardwareFrame /&gt; · Aspect 9:15.6
            </p>
          </div>
        </div>
      </section>

      {/* 8. Section 06: Interactive Money Page Blueprint (Ready for /creare-siteweb) */}
      <section
        id="money-page-blueprint"
        aria-labelledby="blueprint-heading"
        className="py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-neutral-50 border-t border-neutral-200/80"
      >
        <div className="max-w-[1280px] mx-auto">
          <SectionHeader
            id="blueprint-heading"
            eyebrow="06. Arhitectura „Money Page” (Șablonul pentru /creare-siteweb)"
            title="Cele 6 blocuri standardizate pentru fiecare pagină de vânzare"
            description="Selectează oricare dintre cele 6 secțiuni de mai jos pentru a vedea ce componente din sistemul UI folosește și care este rolul ei de conversie."
          />

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: 6-Block Selector */}
            <div className="lg:col-span-5 space-y-2.5">
              {MONEY_PAGE_BLUEPRINT_STEPS.map((step, idx) => {
                const isSelected = activeBlueprintIdx === idx;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveBlueprintIdx(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${isSelected
                        ? 'bg-[#141517] border-[#141517] text-white shadow-md'
                        : 'bg-white border-neutral-200/90 text-[#141517] hover:border-[#0D5FF9]'
                      }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span
                        className={`text-xs font-mono-code font-bold px-2.5 py-1 rounded-lg ${isSelected
                            ? 'bg-[#0D5FF9] text-white'
                            : 'bg-neutral-100 text-neutral-600'
                          }`}
                      >
                        {step.stepNumber}
                      </span>
                      <span className="text-sm font-bold truncate">
                        {step.name}
                      </span>
                    </div>
                    <span
                      className={`text-[11px] font-mono-code shrink-0 ${isSelected ? 'text-sky-300' : 'text-neutral-400'
                        }`}
                    >
                      {step.surface.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right: Detailed Blueprint Inspector Card */}
            <div className="lg:col-span-7 rounded-[28px] bg-white border border-neutral-200/90 p-8 md:p-10 shadow-[0_16px_45px_rgba(0,0,0,0.05)] space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-neutral-100">
                <span className="text-xs font-mono-code font-bold text-[#0D5FF9]">
                  BLOCUL {activeBlueprint.stepNumber} / 06 · ȘABLON MONEY PAGE
                </span>
                <span className="text-xs font-mono-code text-neutral-500">
                  Suprafață: {activeBlueprint.surface}
                </span>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#141517] tracking-tight mb-3">
                  {activeBlueprint.name}
                </h3>
                <p className="text-[15px] text-neutral-600 leading-relaxed">
                  {activeBlueprint.conversionGoal}
                </p>
              </div>

              <div className="rounded-2xl bg-neutral-50 border border-neutral-200/70 p-5 space-y-3">
                <p className="text-xs font-mono-code uppercase tracking-wider text-neutral-500">
                  Componente UI folosite în acest bloc:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeBlueprint.primitivesUsed.map((prim) => (
                    <li
                      key={prim}
                      className="flex items-center gap-2 text-xs font-mono-code font-semibold text-[#141517]"
                    >
                      <Check className="w-4 h-4 text-[#0D5FF9] shrink-0" />
                      <span>&lt;{prim} /&gt;</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() =>
                    onOpenContact('Site de prezentare simplu (€300 – €400)')
                  }
                  className="px-6 py-3 rounded-full bg-[#0D5FF9] hover:bg-[#004AD9] text-white text-xs font-semibold tracking-tight transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Testează Modalul de Ofertă Global</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="px-5 py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-[#141517] text-xs font-semibold transition-colors cursor-pointer"
                >
                  Vezi Homepage-ul activ
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shared Branded Wordmark Footer */}
      <RoGrowthWordmarkFooter
        onOpenLegalModal={onOpenLegalModal}
        onNavigate={(path) => {
          if (path === '/') {
            onNavigateHome();
          } else if (path === '/design-system') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (typeof window !== 'undefined') {
            window.location.href = path;
          }
        }}
      />

      {/* Floating Bottom-Left Studio Route Switcher */}
      <div
        role="toolbar"
        aria-label="Navigare rapidă Studio RoGrowth"
        className="fixed bottom-5 left-5 z-40 bg-white/95 backdrop-blur-md border border-neutral-200/90 rounded-full p-1.5 shadow-[0_8px_25px_rgba(0,0,0,0.08)] flex items-center gap-1.5"
      >
        <button
          type="button"
          onClick={onNavigateHome}
          className="px-3.5 h-8 rounded-full bg-neutral-100 hover:bg-[#141517] hover:text-white text-[#141517] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Homepage</span>
        </button>
        <span className="px-3 h-8 rounded-full bg-[#0D5FF9] text-white text-xs font-mono-code font-semibold flex items-center gap-1.5 whitespace-nowrap">
          <Layers className="w-3.5 h-3.5" />
          <span>Sistem UI</span>
        </span>
      </div>
    </div>
  );
}
