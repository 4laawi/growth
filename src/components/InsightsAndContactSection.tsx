import React, { useState } from 'react';
import { ROGROWTH_CONTACT, validateContactInquiry } from '../data/studioData';
import {
  ToolSquircle,
  WhatsAppIcon,
  WireframeBrowserCard,
} from './StudioIcons';
import { useSectionReveal } from './ui/StudioPrimitives';
import { RoGrowthWordmarkFooter } from './ui/wordmark-footer';
import { Instagram, Linkedin, CheckCircle2, ArrowRight, Phone, MapPin } from 'lucide-react';

const EASE_OUT_EXPO = 'cubic-bezier(0.22, 1, 0.36, 1)';

interface InsightsAndContactSectionProps {
  onOpenContact: (presetService?: string) => void;
  onOpenLegalModal: (type: 'terminos' | 'privacidad') => void;
  onNavigateDesignSystem?: () => void;
}

export function InsightsAndContactSection({
  onOpenContact,
  onOpenLegalModal,
  onNavigateDesignSystem,
}: InsightsAndContactSectionProps) {
  const [inlineName, setInlineName] = useState('');
  const [inlineEmail, setInlineEmail] = useState('');
  const [inlineOrg, setInlineOrg] = useState('');
  const [inlineService, setInlineService] = useState(
    'Site de prezentare simplu (€300 – €400)'
  );
  const [inlineMessage, setInlineMessage] = useState('');
  const [inlineErrors, setInlineErrors] = useState<Record<string, string>>({});
  const [inlineSubmitted, setInlineSubmitted] = useState(false);

  const contactReveal = useSectionReveal<HTMLElement>();

  const handleInlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = validateContactInquiry({
      name: inlineName,
      email: inlineEmail,
      organization: inlineOrg,
      service: inlineService,
      message: inlineMessage,
    });
    if (!res.valid) {
      setInlineErrors(res.errors);
      return;
    }
    setInlineErrors({});
    setInlineSubmitted(true);
  };

  return (
    <div className="bg-transparent">
      {/* Part 1: "Construim site-ul afacerii tale?" Collage + Inline High-Conversion Form */}
      <section
        ref={contactReveal.ref}
        id="contacto"
        data-section-revealed={contactReveal.isRevealed ? 'true' : 'false'}
        aria-labelledby="hagamos-heading"
        className="pt-20 md:pt-24 pb-24 px-6 md:px-12 lg:px-16 max-w-[1340px] mx-auto border-t border-neutral-100"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Interactive Studio Collage with Real Projects & Search Console Chart */}
          <div
            style={{
              opacity: contactReveal.isRevealed ? 1 : 0,
              transform: contactReveal.isRevealed
                ? 'translate3d(0, 0, 0)'
                : 'translate3d(0, 22px, 0)',
              transition: `opacity 640ms ${EASE_OUT_EXPO}, transform 640ms ${EASE_OUT_EXPO}`,
            }}
            className="lg:col-span-6 relative min-h-[540px] md:min-h-[600px] bg-onlines-dots rounded-3xl p-4 flex items-center justify-center overflow-hidden border border-neutral-200/60"
          >
            {/* Subtle Outlined "Aa" Glyph in Background */}
            <svg
              viewBox="0 0 400 300"
              className="w-[380px] h-[280px] text-neutral-200/60 select-none pointer-events-none"
              fill="none"
              aria-hidden="true"
            >
              <text
                x="30"
                y="230"
                fontSize="240"
                fontWeight="800"
                stroke="currentColor"
                strokeWidth="2"
                fontFamily="Plus Jakarta Sans, sans-serif"
              >
                Aa
              </text>
            </svg>

            {/* Top-Left: Google Search Console Performance Chart Card */}
            <div className="absolute top-[5%] left-[3%] w-[280px] sm:w-[320px] rounded-2xl bg-white p-4 shadow-[0_12px_35px_rgba(0,0,0,0.06)] border border-neutral-200/80 z-10">
              <div className="flex items-center justify-between text-[10px] text-neutral-500 font-medium mb-2">
                <span>Clicuri (Search Console)</span>
                <span>Afișări Organice</span>
              </div>
              <div className="relative h-28 w-full">
                <div className="absolute left-0 inset-y-0 flex flex-col justify-between text-[9px] font-mono-code text-neutral-400 pr-2">
                  <span>Ziua 90</span>
                  <span>Ziua 60</span>
                  <span>Ziua 30</span>
                  <span>Ziua 1</span>
                </div>
                <div className="ml-9 h-full">
                  <svg viewBox="0 0 240 90" className="w-full h-full overflow-visible" fill="none">
                    <line x1="0" y1="10" x2="240" y2="10" stroke="#F3F4F6" strokeWidth="1" />
                    <line x1="0" y1="38" x2="240" y2="38" stroke="#F3F4F6" strokeWidth="1" />
                    <line x1="0" y1="65" x2="240" y2="65" stroke="#F3F4F6" strokeWidth="1" />
                    <path
                      d="M0 72 L15 65 L28 32 L40 60 L54 22 L68 52 L82 40 L95 45 L110 24 L126 36 L142 15 L158 34 L174 26 L190 42 L206 18 L224 25 L240 8"
                      stroke="#6366F1"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M0 78 L15 70 L28 56 L40 68 L54 48 L68 62 L82 54 L95 32 L110 42 L126 50 L142 36 L158 46 L174 34 L190 50 L206 30 L224 38 L240 20"
                      stroke="#0D5FF9"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-2 pl-9 flex items-center justify-between text-[9px] font-mono-code text-neutral-400">
                <span>Indexare</span>
                <span>Semantic SEO</span>
                <span>Autoritate</span>
                <span>Creștere</span>
              </div>
            </div>

            {/* Top-Right: Clean Real Project Card (Agrumèa Farm) */}
            <div className="absolute top-[6%] right-[4%] w-[210px] sm:w-[245px] -rotate-6 z-20">
              <div className="rounded-2xl bg-white p-2 shadow-[0_16px_40px_rgba(0,0,0,0.1)] border border-neutral-200/80">
                <div className="rounded-xl overflow-hidden aspect-[4/3] bg-neutral-100">
                  <img
                    src="/assets/aistudio/web_project_1_1b2ab729.jpg"
                    alt="Agrumèa Farm — Proiect de design web și brand"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Middle Floating Tool Squircles (Static after reveal — zero infinite keyframe CPU/GPU load) */}
            <div className="absolute top-[45%] left-[7%] z-20">
              <ToolSquircle tool="vscode" />
            </div>

            <div className="absolute top-[43%] right-[19%] z-20">
              <ToolSquircle tool="figma" />
            </div>

            <div className="absolute bottom-[30%] left-[1%] z-20">
              <ToolSquircle tool="gdocs" />
            </div>

            <div className="absolute bottom-[32%] right-[2%] z-30">
              <ToolSquircle tool="cube" />
            </div>

            {/* Bottom-Left: Clean Real Project Card (Dubai Rent Luxury) */}
            <div className="absolute bottom-[5%] left-[9%] w-[220px] sm:w-[255px] -rotate-3 z-20">
              <div className="rounded-2xl bg-white p-2 shadow-[0_16px_40px_rgba(0,0,0,0.09)] border border-neutral-200/80">
                <div className="rounded-xl overflow-hidden aspect-[16/10] bg-neutral-900">
                  <img
                    src="/assets/aistudio/prject_a99b37d9.webp"
                    alt="Dubai Rent — Landing page de conversie pentru închirieri auto"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            {/* Bottom-Right: Tilted Wireframe Chat Window */}
            <div className="hidden sm:block absolute bottom-[8%] right-[9%] w-[235px] rotate-6 z-10">
              <WireframeBrowserCard variant="chat" />
            </div>
          </div>

          {/* Right Column: "Construim site-ul afacerii tale?" + Frictionless Inline Quote Form */}
          <div
            style={{
              opacity: contactReveal.isRevealed ? 1 : 0,
              transform: contactReveal.isRevealed
                ? 'translate3d(0, 0, 0)'
                : 'translate3d(0, 22px, 0)',
              transition: `opacity 640ms ${EASE_OUT_EXPO} 110ms, transform 640ms ${EASE_OUT_EXPO} 110ms`,
            }}
            className="lg:col-span-6 lg:pl-6 space-y-6"
          >
            <div>
              <p className="text-xs font-mono-code uppercase tracking-widest text-[#0D5FF9] mb-2">
                Solicită Diagnostic & Ofertă · București & Național
              </p>
              <h2
                id="hagamos-heading"
                className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-extrabold tracking-[-0.04em] leading-[1.05] text-[#141517]"
              >
                Construim site-ul afacerii tale?
              </h2>
              <p className="mt-3 text-[15px] md:text-[16px] text-neutral-500 font-normal leading-[1.6]">
                Spune-ne ce vinde afacerea ta și ce obiectiv ai. Îți răspundem cu o recomandare onestă și o ofertă clară în scris (de la €300 pentru site de prezentare), fără costuri ascunse.
              </p>
            </div>

            {inlineSubmitted ? (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 space-y-3">
                <div className="flex items-center gap-2.5 text-emerald-800 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Am primit cererea ta, {inlineName}!</span>
                </div>
                <p className="text-sm text-emerald-900/80 leading-relaxed">
                  Analizăm detaliile pentru <strong>{inlineOrg}</strong> ({inlineService}) și revenim pe <strong>{inlineEmail}</strong> cu diagnosticul și propunerea comercială.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setInlineName('');
                    setInlineEmail('');
                    setInlineOrg('');
                    setInlineMessage('');
                    setInlineSubmitted(false);
                  }}
                  className="text-xs font-semibold text-emerald-800 underline cursor-pointer"
                >
                  Trimite o altă solicitare
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleInlineSubmit}
                noValidate
                aria-label="Formular rapid de ofertă RoGrowth.ro"
                className="rounded-[24px] bg-neutral-50 border border-neutral-200/80 p-6 space-y-4 shadow-sm"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label
                      htmlFor="inline-name"
                      className="block text-xs font-semibold text-[#141517] mb-1"
                    >
                      Nume și prenume
                    </label>
                    <input
                      id="inline-name"
                      type="text"
                      value={inlineName}
                      onChange={(e) => setInlineName(e.target.value)}
                      placeholder="Ex. Andrei Popescu"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-200 text-sm focus:outline-none focus:border-[#0D5FF9]"
                    />
                    {inlineErrors.name && (
                      <p className="mt-1 text-xs text-red-600">{inlineErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="inline-email"
                      className="block text-xs font-semibold text-[#141517] mb-1"
                    >
                      Adresă de e-mail
                    </label>
                    <input
                      id="inline-email"
                      type="email"
                      value={inlineEmail}
                      onChange={(e) => setInlineEmail(e.target.value)}
                      placeholder="contact@afacereata.ro"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-200 text-sm focus:outline-none focus:border-[#0D5FF9]"
                    />
                    {inlineErrors.email && (
                      <p className="mt-1 text-xs text-red-600">{inlineErrors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label
                      htmlFor="inline-org"
                      className="block text-xs font-semibold text-[#141517] mb-1"
                    >
                      Companie / Domeniu activitate
                    </label>
                    <input
                      id="inline-org"
                      type="text"
                      value={inlineOrg}
                      onChange={(e) => setInlineOrg(e.target.value)}
                      placeholder="Ex. Clinică / Magazin / Imobiliare"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-200 text-sm focus:outline-none focus:border-[#0D5FF9]"
                    />
                    {inlineErrors.organization && (
                      <p className="mt-1 text-xs text-red-600">
                        {inlineErrors.organization}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="inline-service"
                      className="block text-xs font-semibold text-[#141517] mb-1"
                    >
                      Pachet estimativ
                    </label>
                    <select
                      id="inline-service"
                      value={inlineService}
                      onChange={(e) => setInlineService(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-200 text-sm focus:outline-none focus:border-[#0D5FF9]"
                    >
                      <option value="Site de prezentare simplu (€300 – €400)">
                        Site de prezentare simplu (€300 – €400)
                      </option>
                      <option value="Site avansat orientat spre conversie (€700 – €1.200)">
                        Site avansat orientat spre conversie (€700 – €1.200)
                      </option>
                      <option value="Magazin online / Aplicație web (€1.000 – €2.300+)">
                        Magazin online / Aplicație web (€1.000 – €2.300+)
                      </option>
                      <option value="Site cu programări online / Landing Page Ads">
                        Site cu programări online / Landing Page Ads
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="inline-message"
                    className="block text-xs font-semibold text-[#141517] mb-1"
                  >
                    Pe scurt despre proiectul tău
                  </label>
                  <textarea
                    id="inline-message"
                    rows={2}
                    value={inlineMessage}
                    onChange={(e) => setInlineMessage(e.target.value)}
                    placeholder="Ce servicii sau produse oferi și ce ai vrea să obții cu noul site?"
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-neutral-200 text-sm focus:outline-none focus:border-[#0D5FF9]"
                  />
                  {inlineErrors.message && (
                    <p className="mt-1 text-xs text-red-600">
                      {inlineErrors.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      type="submit"
                      className="px-7 py-3.5 rounded-full bg-[#0D5FF9] hover:bg-[#004AD9] text-white text-sm font-semibold tracking-tight transition-all duration-200 shadow-[0_10px_25px_rgba(13,95,249,0.25)] inline-flex items-center gap-2 cursor-pointer whitespace-nowrap"
                    >
                      <span>Trimite cererea de ofertă</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <a
                      href={ROGROWTH_CONTACT.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Scrie pe WhatsApp la ${ROGROWTH_CONTACT.phoneDisplay}`}
                      className="px-5 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold tracking-tight transition-colors shadow-[0_8px_20px_rgba(5,150,105,0.22)] inline-flex items-center gap-2 whitespace-nowrap"
                    >
                      <WhatsAppIcon className="w-4 h-4 shrink-0" />
                      <span>WhatsApp</span>
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenContact()}
                      className="px-3.5 py-2 rounded-full text-xs font-semibold text-neutral-600 hover:text-[#141517] cursor-pointer whitespace-nowrap"
                    >
                      Deschide în fereastră mare
                    </button>
                    <a
                      href="https://www.instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram RoGrowth.ro"
                      className="w-9 h-9 rounded-full flex items-center justify-center text-[#0D5FF9] hover:bg-[#0D5FF9]/10 transition-colors"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a
                      href="https://www.linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn RoGrowth.ro"
                      className="w-9 h-9 rounded-full flex items-center justify-center text-[#0D5FF9] hover:bg-[#0D5FF9]/10 transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </form>
            )}

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs text-neutral-500">
              <a
                href={ROGROWTH_CONTACT.phoneHref}
                className="inline-flex items-center gap-1.5 font-semibold text-[#141517] hover:text-[#0D5FF9] transition-colors tabular-nums"
              >
                <Phone className="w-3.5 h-3.5 text-[#0D5FF9] shrink-0" aria-hidden="true" />
                <span>{ROGROWTH_CONTACT.phoneDisplay}</span>
              </a>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" aria-hidden="true" />
                <span>{ROGROWTH_CONTACT.addressFull}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Part 2: Branded Wordmark Footer */}
      <RoGrowthWordmarkFooter
        onOpenLegalModal={onOpenLegalModal}
        onNavigate={(path) => {
          if (path === '/design-system' && onNavigateDesignSystem) {
            onNavigateDesignSystem();
          } else if (typeof window !== 'undefined') {
            window.location.href = path;
          }
        }}
      />
    </div>
  );
}
