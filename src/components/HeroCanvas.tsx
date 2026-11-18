import React, { useState } from 'react';
import {
  MultiplayerCursor,
  OnlinesNotificationBubble,
  ToolSquircle,
  WireframeBrowserCard,
} from './StudioIcons';
import {
  Grid,
  MousePointer,
  MessageSquarePlus,
  Sparkles,
} from 'lucide-react';

interface HeroCanvasProps {
  onOpenContact: (presetService?: string) => void;
  onSelectProject: (projectId: string) => void;
  onNavigateDesignSystem?: () => void;
  onNavigateCreareSite?: () => void;
}

interface CustomComment {
  id: string;
  x: number;
  y: number;
  text: string;
}

export function HeroCanvas({
  onOpenContact,
  onSelectProject,
  onNavigateDesignSystem,
  onNavigateCreareSite,
}: HeroCanvasProps) {
  const [aiMode, setAiMode] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [activeTool, setActiveTool] = useState<'select' | 'comment'>('select');
  const [customComments, setCustomComments] = useState<CustomComment[]>([]);
  const [commentDraft, setCommentDraft] = useState('');
  const [showCommentInput, setShowCommentInput] = useState(false);

  const handleAddCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentDraft.trim()) return;
    setCustomComments((prev) => [
      ...prev,
      {
        id: `c-${Date.now()}`,
        x: 52 + ((prev.length * 7) % 24),
        y: 68 - ((prev.length * 6) % 20),
        text: commentDraft.trim(),
      },
    ]);
    setCommentDraft('');
    setShowCommentInput(false);
    setActiveTool('select');
  };

  return (
    <section
      id="inicio"
      aria-label="Canvas principal interactiv RoGrowth.ro"
      className={`relative min-h-[820px] lg:h-[880px] w-full overflow-hidden flex flex-col items-center justify-center pt-20 pb-20 transition-colors duration-500 ${
        aiMode && showGrid ? 'bg-onlines-grid' : 'bg-white'
      }`}
    >
      {/* Top Mod Studio Toggle Control */}
      <div className="relative z-30 mb-8 md:mb-10 flex flex-col items-center">
        <div className="bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-neutral-200/70 flex items-center gap-3.5">
          <span
            id="modo-ia-label"
            className="text-[13px] font-semibold text-[#141517] tracking-tight select-none"
          >
            Mod Studio
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={aiMode}
            aria-labelledby="modo-ia-label"
            onClick={() => setAiMode((prev) => !prev)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D5FF9] ${
              aiMode ? 'bg-[#0D5FF9]' : 'bg-neutral-200'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                aiMode ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Central "rogrowth." wordmark with Figma bounding box & concise value focal point */}
      <div className="relative z-20 flex flex-col items-center">
        <div className="relative px-8 md:px-16 pt-4 pb-8 md:pt-6 md:pb-11">
          {aiMode && (
            <>
              <div
                className="absolute inset-0 border border-[#0D5FF9]/35 pointer-events-none"
                aria-hidden="true"
              >
                <span className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-white border border-[#0D5FF9]" />
                <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border border-[#0D5FF9]" />
                <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-white border border-[#0D5FF9]" />
                <span className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 bg-white border border-[#0D5FF9]" />
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border border-[#0D5FF9]" />
                <span className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 bg-white border border-[#0D5FF9]" />
              </div>

              {/* Primary Value & Action Pill on the Bounding Box */}
              <button
                type="button"
                onClick={() => onOpenContact()}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-30 px-5 py-1.5 rounded-full bg-[#0D5FF9] hover:bg-[#004AD9] text-white text-[12px] font-semibold tracking-tight shadow-[0_8px_22px_rgba(13,95,249,0.28)] whitespace-nowrap cursor-pointer transition-transform duration-200 hover:scale-105"
              >
                Site-uri Web & E-Commerce · De la €300 →
              </button>
            </>
          )}

          {/* Minimalist Cursor #1: Speed */}
          {aiMode && (
            <div className="hidden md:block absolute -top-10 left-4 z-30">
              <MultiplayerCursor
                label="100/100 Google Speed"
                color="#0891B2"
                onClick={() => onOpenContact('Site avansat orientat spre conversie (€700 – €1.200)')}
              />
            </div>
          )}

          {/* Minimalist Cursor #2: Delivery */}
          {aiMode && (
            <div className="hidden md:block absolute -top-10 right-8 z-30">
              <MultiplayerCursor
                label="Livrare în 2–4 săpt."
                color="#10B981"
                onClick={() => onOpenContact('Site de prezentare simplu (€300 – €400)')}
              />
            </div>
          )}

          {/* Minimalist Cursor #3: Ownership */}
          {aiMode && (
            <div className="hidden md:block absolute -bottom-11 right-10 z-30">
              <MultiplayerCursor
                label="100% Codul Tău"
                color="#5E5CE6"
                onClick={() => onOpenContact()}
              />
            </div>
          )}

          <h1 className="text-[clamp(4.2rem,13vw,12.6rem)] font-extrabold tracking-[-0.055em] leading-[0.86] text-[#141517] select-none text-center">
            rogrowth.
            <span className="sr-only">
              {' '}
              — Agenție de Creare Site Web, Web Design, Magazine Online și Marketing Digital în București și toată România
            </span>
          </h1>
        </div>
      </div>

      {/* Minimalist Studio Canvas Framing (Clean visual showcases at the 4 corners, zero text clutter) */}
      {aiMode && (
        <div className="w-full max-w-[1440px] mx-auto pointer-events-auto">
          {/* TOP-LEFT: Subtle Wireframe Window + VS Code Squircle */}
          <div className="hidden lg:block absolute top-[11%] left-[2%] w-[225px] xl:w-[250px] -rotate-6 opacity-90 transition-transform duration-300 hover:rotate-0">
            <WireframeBrowserCard variant="grid" />
          </div>

          <div className="hidden lg:block absolute top-[10%] left-[31%] animate-float-slow">
            <ToolSquircle tool="framer" />
          </div>

          {/* TOP-RIGHT: Figma Squircle + Clean Project Showcase */}
          <div className="hidden lg:block absolute top-[9%] right-[30%] animate-float-slow">
            <ToolSquircle tool="figma" />
          </div>

          <div className="hidden lg:block absolute top-[9%] right-[2%] w-[265px] xl:w-[305px] rotate-3 z-10">
            <button
              type="button"
              onClick={() => onSelectProject('kasata-imobiliare')}
              aria-label="Vezi proiectul Kasata Imobiliare"
              className="group block w-full rounded-[24px] bg-white p-2.5 shadow-[0_18px_45px_rgba(0,0,0,0.08)] border border-neutral-200/80 overflow-hidden text-left transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <div className="relative rounded-[18px] overflow-hidden aspect-[16/9] bg-neutral-100">
                <img
                  src="/assets/aistudio/Glow-Up_Guide_Website_in_Light_Blue_Beige_Yellow_Style__4__5561b0a4.webp"
                  alt="Kasata Imobiliare — Platformă web construită de RoGrowth"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </button>
          </div>

          {/* BOTTOM-LEFT: Clean MacBook Pro Showcase + Next.js Squircle */}
          <div className="hidden lg:block absolute bottom-[6%] left-[2%] w-[245px] xl:w-[280px] z-10">
            <button
              type="button"
              onClick={() => onSelectProject('dental-crown-health')}
              aria-label="Vezi proiectul Dental Crown Health pe laptop"
              className="group block w-full text-left cursor-pointer transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="rounded-t-2xl bg-[#141517] p-2.5 pb-0 shadow-2xl border border-neutral-700">
                <div className="rounded-t-lg overflow-hidden aspect-[16/9.6] bg-neutral-900">
                  <img
                    src="/assets/aistudio/Glow-Up_Guide_Website_in_Light_Blue_Beige_Yellow_Style__2__f23e9e6c.webp"
                    alt="Dental Crown Health — Design web pe laptop"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="h-3 bg-gradient-to-b from-neutral-300 to-neutral-400 rounded-b-xl mx-[-8px] shadow-md border-t border-white/60" />
            </button>
          </div>

          <div className="hidden lg:block absolute bottom-[12%] left-[24%] z-20 animate-float-slow">
            <ToolSquircle tool="nextjs" />
          </div>

          {/* BOTTOM-RIGHT: Minimal iPhone Frame — Full-Bleed Mobile Preview */}
          <div className="hidden lg:block absolute bottom-[5%] right-[2.5%] w-[172px] xl:w-[186px] -rotate-3 z-20">
            <button
              type="button"
              onClick={() => onSelectProject('baristas-coffee')}
              aria-label="Vezi magazinul online Baristas Coffee pe mobil"
              className="group block w-full rounded-[34px] bg-[#141517] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.22)] border border-neutral-700/90 cursor-pointer transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative w-full aspect-[9/15.6] rounded-[26px] overflow-hidden bg-[#141517]">
                <img
                  src="/assets/aistudio/Club_de_course_Energized_en_mouvement_e400c86f.webp"
                  alt="Baristas Coffee — Design mobil full-screen"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Custom User-Added Canvas Comments */}
      {customComments.map((c) => (
        <div
          key={c.id}
          style={{ left: `${c.x}%`, top: `${c.y}%` }}
          className="hidden md:block absolute z-30"
        >
          <OnlinesNotificationBubble timeAgo="acum" message={c.text} />
        </div>
      ))}

      {/* Popover input for adding a canvas comment */}
      {showCommentInput && (
        <div className="fixed bottom-20 left-6 z-50 bg-white rounded-2xl p-4 shadow-2xl border border-neutral-200 w-72">
          <form onSubmit={handleAddCommentSubmit} className="space-y-2.5">
            <label htmlFor="canvas-comment-input" className="block text-xs font-semibold text-[#141517]">
              Lasă o notă pe canvas-ul RoGrowth.ro
            </label>
            <input
              id="canvas-comment-input"
              type="text"
              value={commentDraft}
              onChange={(e) => setCommentDraft(e.target.value)}
              placeholder="Ex: Vreau ofertă pentru site prezentare!"
              className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-200 focus:outline-none focus:border-[#0D5FF9]"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowCommentInput(false)}
                className="px-2.5 py-1 text-xs text-neutral-500 hover:text-neutral-800"
              >
                Anulează
              </button>
              <button
                type="submit"
                className="px-3 py-1 rounded-full bg-[#0D5FF9] text-white text-xs font-medium hover:bg-[#004AD9]"
              >
                Publică nota
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Bottom-Left Floating Studio Canvas Toolbar */}
      <div
        role="toolbar"
        aria-label="Instrumente canvas RoGrowth"
        className="fixed bottom-5 left-5 z-40 bg-white/90 backdrop-blur-md border border-neutral-200/80 rounded-full p-1.5 shadow-[0_8px_25px_rgba(0,0,0,0.07)] flex items-center gap-1"
      >
        <button
          type="button"
          onClick={() => setActiveTool('select')}
          aria-label="Instrument selectare"
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
            activeTool === 'select'
              ? 'bg-[#141517] text-white'
              : 'text-neutral-500 hover:bg-neutral-100'
          }`}
        >
          <MousePointer className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setShowGrid((prev) => !prev)}
          aria-label="Comută grila arhitecturală"
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
            showGrid ? 'bg-neutral-100 text-[#0D5FF9]' : 'text-neutral-400 hover:bg-neutral-100'
          }`}
        >
          <Grid className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTool('comment');
            setShowCommentInput((prev) => !prev);
          }}
          aria-label="Adaugă comentariu pe canvas"
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
            showCommentInput
              ? 'bg-[#0D5FF9] text-white'
              : 'text-neutral-500 hover:bg-neutral-100'
          }`}
        >
          <MessageSquarePlus className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setAiMode((prev) => !prev)}
          aria-label="Comută Mod Studio din bară"
          className={`px-2.5 h-8 rounded-full flex items-center gap-1 text-[11px] font-semibold transition-colors cursor-pointer ${
            aiMode
              ? 'bg-violet-100 text-violet-700'
              : 'bg-neutral-100 text-neutral-500'
          }`}
        >
          <Sparkles className="w-3 h-3" />
          <span>IA</span>
        </button>
        {onNavigateCreareSite && (
          <button
            type="button"
            onClick={onNavigateCreareSite}
            aria-label="Deschide pagina dedicată Creare Site Web"
            className="px-3 h-8 rounded-full bg-[#0D5FF9] hover:bg-[#004AD9] text-white text-[11px] font-mono-code font-semibold transition-colors cursor-pointer whitespace-nowrap"
          >
            /creare-siteweb
          </button>
        )}
        {onNavigateDesignSystem && (
          <button
            type="button"
            onClick={onNavigateDesignSystem}
            aria-label="Deschide Sistemul UI și Arhitectura de Componente"
            className="px-3 h-8 rounded-full bg-neutral-100 hover:bg-[#0D5FF9] hover:text-white text-[#141517] text-[11px] font-mono-code font-semibold transition-colors cursor-pointer whitespace-nowrap"
          >
            Sistem UI
          </button>
        )}
      </div>
    </section>
  );
}
