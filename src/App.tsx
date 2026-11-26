/**
 * ROGROWTH.RO — ROOT APPLICATION & ROUTER SHELL
 * IMPORTANT FOR AI AGENTS: Before creating or editing pages (e.g. /creare-siteweb),
 * read `/UI_DESIGN_SYSTEM.md`, `/src/design-system/tokens.ts`, and `/src/components/ui/StudioPrimitives.tsx`.
 */
import React, { useState, useEffect } from 'react';
import {
  HiringNotification,
  PORTFOLIO_PROJECTS,
  PortfolioProject,
  ROGROWTH_CONTACT,
  ServiceCardItem,
} from './data/studioData';
import { AppRoute, resolveAppRoute } from './design-system/tokens';
import { HeroCanvas } from './components/HeroCanvas';
import { ServicesSection, PricingTablesSection } from './components/ServicesSection';
import { CrossoverTextSection } from './components/CrossoverTextSection';
import { DarkMethodologySection } from './components/DarkMethodologySection';
import { TeamSection } from './components/TeamSection';
import { DetailsAndPortfolioSection } from './components/DetailsAndPortfolioSection';
import { InsightsAndContactSection } from './components/InsightsAndContactSection';
import { StaggerTestimonialsSection } from './components/ui/stagger-testimonials';
import { FigmaFramerShowcaseSection } from './components/ui/figma-framer-showcase';
import { DesignSystemPage } from './pages/DesignSystemPage';
import { CreareSiteWebPage } from './pages/CreareSiteWebPage';
import {
  CareersModal,
  ContactModal,
  ProjectCaseModal,
  ServiceDetailModal,
} from './components/StudioModals';
import { WhatsAppIcon } from './components/StudioIcons';
import { X } from 'lucide-react';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(() =>
    typeof window !== 'undefined'
      ? resolveAppRoute(window.location.pathname)
      : '/'
  );
  const [scrolled, setScrolled] = useState(false);
  const [isDarkSectionActive, setIsDarkSectionActive] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactServicePreset, setContactServicePreset] = useState<string>(
    'Site de prezentare simplu (€300 – €400)'
  );
  const [submittedInquiriesCount, setSubmittedInquiriesCount] = useState(0);

  const [careersModalOpen, setCareersModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<HiringNotification | null>(null);

  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(
    null
  );
  const [selectedService, setSelectedService] = useState<ServiceCardItem | null>(
    null
  );
  const [legalModalType, setLegalModalType] = useState<
    'terminos' | 'privacidad' | null
  >(null);

  const effectiveDarkMode =
    (currentRoute === '/' || currentRoute === '/creare-siteweb') &&
    isDarkSectionActive;

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', effectiveDarkMode);
    }
  }, [effectiveDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120);
    };
    const handlePopState = () => {
      setCurrentRoute(resolveAppRoute(window.location.pathname));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigateToRoute = (route: AppRoute, anchorId?: string) => {
    if (typeof window !== 'undefined' && window.location.pathname !== route) {
      window.history.pushState({}, '', anchorId ? `${route}#${anchorId}` : route);
    }
    setIsDarkSectionActive(false);
    setCurrentRoute(route);
    if (anchorId) {
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 40);
    } else if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSectionNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    anchorId: string
  ) => {
    if (currentRoute !== '/') {
      e.preventDefault();
      navigateToRoute('/', anchorId);
    }
  };

  const handleOpenContact = (presetService?: string) => {
    if (presetService) setContactServicePreset(presetService);
    setContactModalOpen(true);
  };

  const handleOpenCareers = (job?: HiringNotification) => {
    setSelectedJob(job || null);
    setCareersModalOpen(true);
  };

  const handleSelectProjectById = (projectId: string) => {
    const found = PORTFOLIO_PROJECTS.find((p) => p.id === projectId);
    if (found) setSelectedProject(found);
  };

  return (
    <div
      data-theme-mode={effectiveDarkMode ? 'dark' : 'light'}
      className={`min-h-screen transition-colors duration-500 ease-out ${effectiveDarkMode
          ? 'bg-[#050505] text-white'
          : 'bg-white text-[#141517]'
        }`}
    >
      {/* Sticky 3-Zone Top Bar (Shared Across All Routes) */}
      <header
        className={`fixed top-0 inset-x-0 z-40 flex items-center justify-between gap-8 px-6 md:px-10 py-4 backdrop-blur-md border-b transition-colors duration-500 ease-out ${effectiveDarkMode
            ? 'bg-[#050505]/85 border-white/10'
            : 'bg-white/85 border-neutral-100/80'
          }`}
      >
        {/* Zone 1: Single text element wordmark (morphs between 'rogrowth.ro' and "'_" on scroll) */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigateToRoute('/');
          }}
          aria-label="RoGrowth.ro Acasă"
          className={`text-[20px] font-extrabold tracking-[-0.04em] whitespace-nowrap shrink-0 ${effectiveDarkMode ? 'text-white' : 'text-[#141517]'
            }`}
        >
          {scrolled ? "'_" : 'rogrowth.ro'}
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Navigare principală RoGrowth.ro"
          className={`hidden md:flex items-center gap-7 text-[13px] font-medium ${effectiveDarkMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}
        >
          <a
            href="/creare-siteweb"
            onClick={(e) => {
              e.preventDefault();
              navigateToRoute('/creare-siteweb');
            }}
            className={`hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 ${effectiveDarkMode ? 'hover:text-white' : 'hover:text-[#141517]'
              } ${currentRoute === '/creare-siteweb'
                ? 'text-[#0D5FF9] font-semibold underline'
                : ''
              }`}
          >
            Creare Site Web
          </a>
          <a
            href={currentRoute === '/creare-siteweb' ? '#grila-preturi-site' : '#metodologia'}
            onClick={(e) => {
              if (currentRoute === '/creare-siteweb') {
                e.preventDefault();
                const el = document.getElementById('grila-preturi-site');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              } else {
                handleSectionNavClick(e, 'metodologia');
              }
            }}
            className={`hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 ${effectiveDarkMode ? 'hover:text-white' : 'hover:text-[#141517]'
              }`}
          >
            Servicii
          </a>
          <a
            href="#equipo"
            onClick={(e) => handleSectionNavClick(e, 'equipo')}
            className={`hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 ${effectiveDarkMode ? 'hover:text-white' : 'hover:text-[#141517]'
              }`}
          >
            Echipă
          </a>
          <a
            href={currentRoute === '/creare-siteweb' ? '#referinte-portofoliu' : '#portfolio'}
            onClick={(e) => {
              if (currentRoute === '/creare-siteweb') {
                e.preventDefault();
                const el = document.getElementById('referinte-portofoliu');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              } else {
                handleSectionNavClick(e, 'portfolio');
              }
            }}
            className={`hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 ${effectiveDarkMode ? 'hover:text-white' : 'hover:text-[#141517]'
              }`}
          >
            Portofoliu
          </a>
          <a
            href="/design-system"
            onClick={(e) => {
              e.preventDefault();
              navigateToRoute('/design-system');
            }}
            className={`hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 ${effectiveDarkMode ? 'hover:text-white' : 'hover:text-[#141517]'
              } ${currentRoute === '/design-system'
                ? 'text-[#0D5FF9] font-semibold underline'
                : ''
              }`}
          >
            Sistem UI
          </a>
        </nav>

        {/* Zone 3: 1 primary action button ("Cere o ofertă" pill) */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => handleOpenContact()}
            className={`px-5 py-2 text-[13px] font-semibold text-white rounded-full transition-colors duration-300 whitespace-nowrap shrink-0 cursor-pointer ${effectiveDarkMode
                ? 'bg-[#0D5FF9] hover:bg-[#256EFF]'
                : 'bg-[#141517] hover:bg-[#0D5FF9]'
              }`}
          >
            Cere o ofertă
          </button>
        </div>
      </header>

      <main>
        {currentRoute === '/design-system' ? (
          <DesignSystemPage
            onNavigateHome={() => navigateToRoute('/')}
            onOpenContact={handleOpenContact}
            onOpenServiceModal={(service) => setSelectedService(service)}
            onOpenLegalModal={(type) => setLegalModalType(type)}
            onSelectProject={(project) => setSelectedProject(project)}
          />
        ) : currentRoute === '/creare-siteweb' ? (
          <CreareSiteWebPage
            onNavigateHome={() => navigateToRoute('/')}
            onNavigateDesignSystem={() => navigateToRoute('/design-system')}
            onOpenContact={handleOpenContact}
            onOpenServiceModal={(service) => setSelectedService(service)}
            onSelectProject={(project) => setSelectedProject(project)}
            onOpenLegalModal={(type) => setLegalModalType(type)}
            isDarkMode={effectiveDarkMode}
            onDarkModeChange={setIsDarkSectionActive}
          />
        ) : (
          <>
            {/* 1. Interactive Hero Canvas ("rogrowth." + Mod Studio) */}
            <HeroCanvas
              onOpenContact={() => handleOpenContact()}
              onSelectProject={handleSelectProjectById}
              onNavigateDesignSystem={() => navigateToRoute('/design-system')}
              onNavigateCreareSite={() => navigateToRoute('/creare-siteweb')}
            />

            {/* 2. Scroll-Illuminated Manifesto */}
            <ServicesSection
              onOpenServiceModal={(service) => setSelectedService(service)}
            />

            {/* 2A. Revealing Tilted Figma & Framer Showcase + Interactive "Pick Two" Configurator */}
            <FigmaFramerShowcaseSection
              variant="homepage"
              onOpenContact={handleOpenContact}
              onSelectProjectById={handleSelectProjectById}
            />

            {/* 2B. Scroll-Driven Crossover Typography & 3-Image Parallax Showcase ("Ninety minutes") */}
            <CrossoverTextSection isDarkMode={effectiveDarkMode} />

            {/* 3. Methodology ("Ziua 1, nu Ziua 100" + 4-Step Transparent Workflow) */}
            <DarkMethodologySection
              onOpenContact={handleOpenContact}
            />

            {/* 4. Team & Frameworks Architecture ("O arhitectură construită pe performanță și claritate.") */}
            <TeamSection
              onOpenCareersModal={handleOpenCareers}
              isDarkMode={false}
            />

            {/* 5. Real Portfolio Projects & Case Studies Showcase */}
            <DetailsAndPortfolioSection
              onSelectProject={(project) => setSelectedProject(project)}
            />

            {/* 5A. 3 Cobalt Service & Pricing Tables */}
            <PricingTablesSection
              onOpenServiceModal={(service) => setSelectedService(service)}
            />

            {/* 5B. What People Say / Impressions Section (Stagger Testimonials) */}
            <StaggerTestimonialsSection />

            {/* 6. "Construim site-ul afacerii tale?" Collage & Bucharest/National Footer */}
            <InsightsAndContactSection
              onOpenContact={() => handleOpenContact()}
              onOpenLegalModal={(type) => setLegalModalType(type)}
              onNavigateDesignSystem={() => navigateToRoute('/design-system')}
            />
          </>
        )}
      </main>

      {/* Interactive Modals (Shared Across All Routes) */}
      <ContactModal
        isOpen={contactModalOpen}
        initialService={contactServicePreset}
        onClose={() => setContactModalOpen(false)}
        submittedCount={submittedInquiriesCount}
        onInquirySubmitted={() =>
          setSubmittedInquiriesCount((prev) => prev + 1)
        }
      />

      <CareersModal
        isOpen={careersModalOpen}
        selectedJob={selectedJob}
        onClose={() => setCareersModalOpen(false)}
      />

      <ProjectCaseModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenContact={handleOpenContact}
      />

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onOpenContact={handleOpenContact}
      />

      {legalModalType && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-lg rounded-[24px] bg-white p-7 shadow-2xl border border-neutral-200">
            <button
              type="button"
              onClick={() => setLegalModalType(null)}
              aria-label="Închide nota legală"
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-[#141517] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <h2
              id="legal-modal-title"
              className="text-xl font-bold text-[#141517] mb-3"
            >
              {legalModalType === 'terminos'
                ? 'Termeni Comerciali & Drepturi de Proprietate'
                : 'Politica de Confidențialitate'}
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {legalModalType === 'terminos'
                ? `RoGrowth.ro (${ROGROWTH_CONTACT.addressFull}, România · ${ROGROWTH_CONTACT.phoneDisplay}) operează pe principii de transparență totală: 100% proprietatea clientului asupra domeniului, codului sursă și bazei de date la plata finală (fără vendor lock-in). Termeni standard: 30% avans / 70% la predare (sau 30% / 40% / 30% pentru proiecte mari), 2 runde structurate de revizii majore incluse și garanție tehnică post-lansare.`
                : 'Respectăm confidențialitatea fiecărui antreprenor și IMM care ne contactează. Datele transmise prin formularul de ofertare sunt utilizate exclusiv pentru evaluarea nevoilor proiectului, recomandarea tehnică și întocmirea ofertei comerciale.'}
            </p>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Direct Button */}
      <a
        href={ROGROWTH_CONTACT.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Contactează-ne pe WhatsApp (${ROGROWTH_CONTACT.phoneDisplay})`}
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 sm:py-2.5 text-xs font-semibold shadow-[0_10px_28px_rgba(5,150,105,0.28)] transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
      >
        <WhatsAppIcon className="w-4 h-4 shrink-0" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}
