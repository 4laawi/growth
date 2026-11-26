import React, { useState, useEffect } from 'react';
import {
  HIRING_NOTIFICATIONS,
  HiringNotification,
  PortfolioProject,
  ROGROWTH_CONTACT,
  SERVICE_CARDS,
  ServiceCardItem,
  validateContactInquiry,
} from '../data/studioData';
import { OnlinesAvatarIcon, WhatsAppIcon } from './StudioIcons';
import { X, CheckCircle2, ArrowUpRight, MapPin, Clock, Phone } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  initialService?: string;
  onClose: () => void;
  submittedCount: number;
  onInquirySubmitted: () => void;
}

export function ContactModal({
  isOpen,
  initialService = 'Site de prezentare simplu (€300 – €400)',
  onClose,
  submittedCount,
  onInquirySubmitted,
}: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [service, setService] = useState(initialService);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialService) setService(initialService);
  }, [initialService]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactInquiry({
      name,
      email,
      organization,
      service,
      message,
    });
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setSubmitted(true);
    onInquirySubmitted();
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setOrganization('');
    setMessage('');
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-xl rounded-[28px] bg-white p-7 md:p-10 shadow-2xl border border-neutral-200 max-h-[92vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          aria-label="Închide fereastra de ofertare"
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-[#141517] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <OnlinesAvatarIcon size={36} />
          <div>
            <p className="text-xs font-mono-code uppercase tracking-wider text-neutral-400">
              ROGROWTH.RO · BUCUREȘTI & TOATĂ ROMÂNIA
            </p>
            <h2
              id="contact-modal-title"
              className="text-2xl font-extrabold tracking-tight text-[#141517]"
            >
              Solicită diagnostic & ofertă clară
            </h2>
          </div>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#141517]">
              Am primit solicitarea ta, {name}!
            </h3>
            <p className="text-sm text-neutral-500 max-w-md mx-auto leading-relaxed">
              Vom analiza nevoile comerciale pentru{' '}
              <span className="font-semibold text-[#141517]">{organization}</span> și îți vom trimite o recomandare onestă și o ofertă defalcată la{' '}
              <span className="font-semibold text-[#141517]">{email}</span> în cel mai scurt timp.
            </p>
            <p className="text-xs font-mono-code text-neutral-400">
              Solicitări înregistrate în această sesiune: {submittedCount}
            </p>
            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2.5 rounded-full border border-neutral-200 text-xs font-semibold text-[#141517] hover:bg-neutral-50 cursor-pointer"
              >
                Trimite altă solicitare
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#141517] text-white text-xs font-semibold hover:bg-neutral-800 cursor-pointer"
              >
                Înapoi la site
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-semibold text-[#141517] mb-1.5"
                >
                  Nume și prenume
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex. Andrei Popescu"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#0D5FF9]"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-semibold text-[#141517] mb-1.5"
                >
                  Adresă de e-mail
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@afacereata.ro"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#0D5FF9]"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="contact-org"
                  className="block text-xs font-semibold text-[#141517] mb-1.5"
                >
                  Numele companiei / afacerii
                </label>
                <input
                  id="contact-org"
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="Ex. Clinica / Magazin / SRL"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#0D5FF9]"
                />
                {errors.organization && (
                  <p className="mt-1 text-xs text-red-600">{errors.organization}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-service"
                  className="block text-xs font-semibold text-[#141517] mb-1.5"
                >
                  Tipul de proiect / Pachet estimativ
                </label>
                <select
                  id="contact-service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm bg-white focus:outline-none focus:border-[#0D5FF9]"
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
                  <option value="Redesign, SEO, Google/Meta Ads sau Print">
                    Redesign, SEO, Google/Meta Ads sau Print
                  </option>
                </select>
                {errors.service && (
                  <p className="mt-1 text-xs text-red-600">{errors.service}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-xs font-semibold text-[#141517] mb-1.5"
              >
                Ce vinde afacerea ta și ce obiectiv ai?
              </label>
              <textarea
                id="contact-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Spune-ne pe scurt ce servicii/produse oferi, dacă ai deja un site și ce termene sau integrări (ex. Netopia, Fan Courier, programări) ai în vedere..."
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#0D5FF9]"
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-600">{errors.message}</p>
              )}
            </div>

            <div className="rounded-xl bg-neutral-50 border border-neutral-200/70 px-4 py-2.5 text-[11px] text-neutral-500 flex flex-wrap items-center justify-between gap-2">
              <span>✓ 30% avans / 70% la predarea finală</span>
              <span>✓ 2 runde revizii incluse</span>
              <span>✓ 100% proprietatea ta</span>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={ROGROWTH_CONTACT.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Scrie pe WhatsApp la ${ROGROWTH_CONTACT.phoneDisplay}`}
                  className="px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={ROGROWTH_CONTACT.phoneHref}
                  className="px-3.5 py-2.5 rounded-full border border-neutral-200 hover:border-neutral-300 text-xs font-semibold text-[#141517] inline-flex items-center gap-1.5 transition-colors tabular-nums whitespace-nowrap"
                >
                  <Phone className="w-3.5 h-3.5 text-[#0D5FF9] shrink-0" aria-hidden="true" />
                  <span>{ROGROWTH_CONTACT.phoneDisplay}</span>
                </a>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-full text-xs font-semibold text-neutral-500 hover:text-[#141517] cursor-pointer"
                >
                  Anulează
                </button>
                <button
                  type="submit"
                  className="px-7 py-3 rounded-full bg-[#0D5FF9] hover:bg-[#004AD9] text-white text-sm font-semibold shadow-[0_10px_25px_rgba(13,95,249,0.28)] transition-colors cursor-pointer"
                >
                  Trimite cererea de ofertă
                </button>
              </div>
            </div>

            <p className="pt-1 text-[11px] text-neutral-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{ROGROWTH_CONTACT.addressFull}</span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export function CareersModal({
  isOpen,
  selectedJob,
  onClose,
}: {
  isOpen: boolean;
  selectedJob: HiringNotification | null;
  onClose: () => void;
}) {
  const [activeJob, setActiveJob] = useState<HiringNotification>(
    selectedJob || HIRING_NOTIFICATIONS[0]
  );
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [formError, setFormError] = useState('');
  const [appliedIds, setAppliedIds] = useState<string[]>([]);

  useEffect(() => {
    if (selectedJob) setActiveJob(selectedJob);
  }, [selectedJob]);

  if (!isOpen) return null;

  const hasApplied = appliedIds.includes(activeJob.id);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim() || !applicantEmail.includes('@')) {
      setFormError('Te rugăm să completezi numele și o adresă de e-mail validă.');
      return;
    }
    setFormError('');
    setAppliedIds((prev) => [...prev, activeJob.id]);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="careers-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-3xl rounded-[28px] bg-white p-7 md:p-10 shadow-2xl border border-neutral-200 max-h-[92vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          aria-label="Închide fereastra de competențe și colaborări"
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-[#141517] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <p className="text-xs font-mono-code uppercase tracking-wider text-[#0D5FF9] mb-1">
          ROGROWTH.RO · BUCUREȘTI & ACOPERIRE NAȚIONALĂ
        </p>
        <h2
          id="careers-modal-title"
          className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#141517] mb-6"
        >
          Competențe & Colaborări RoGrowth
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Role Selector */}
          <div className="md:col-span-5 space-y-2.5">
            {HIRING_NOTIFICATIONS.map((job) => {
              const isSelected = job.id === activeJob.id;
              return (
                <button
                  key={job.id}
                  type="button"
                  onClick={() => {
                    setActiveJob(job);
                    setFormError('');
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#0D5FF9] bg-[#0D5FF9]/5'
                      : 'border-neutral-200 hover:border-neutral-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1">
                    <span>{job.department}</span>
                    <span>{job.timeAgo}</span>
                  </div>
                  <p className="text-sm font-bold text-[#141517]">{job.title}</p>
                  <p className="text-xs text-neutral-500 mt-1">{job.location}</p>
                </button>
              );
            })}
          </div>

          {/* Right Role Details & Quick Apply */}
          <div className="md:col-span-7 rounded-2xl bg-neutral-50 p-6 border border-neutral-200/80 space-y-5">
            <div>
              <div className="flex items-center gap-3 text-xs text-neutral-500 mb-2">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#0D5FF9]" />
                  {activeJob.modality}
                </span>
                <span>·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#0D5FF9]" />
                  RoGrowth Standard
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#141517]">{activeJob.title}</h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                {activeJob.description}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono-code uppercase tracking-wider text-neutral-500 mb-2">
                Piloni de execuție
              </h4>
              <ul className="space-y-1.5 text-xs md:text-sm text-neutral-700 list-disc pl-4">
                {activeJob.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>

            {hasApplied ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  Mesaj înregistrat pentru <strong>{activeJob.title}</strong>! Revenim în curând.
                </span>
              </div>
            ) : (
              <form onSubmit={handleApply} className="pt-2 border-t border-neutral-200 space-y-3">
                <p className="text-xs font-semibold text-[#141517]">
                  Ia legătura cu echipa pe această arie
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    placeholder="Numele tău"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    aria-label="Numele solicitantului"
                    className="px-3.5 py-2 rounded-xl border border-neutral-200 bg-white text-xs focus:outline-none focus:border-[#0D5FF9]"
                  />
                  <input
                    type="email"
                    placeholder="Adresa ta de e-mail"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    aria-label="Emailul solicitantului"
                    className="px-3.5 py-2 rounded-xl border border-neutral-200 bg-white text-xs focus:outline-none focus:border-[#0D5FF9]"
                  />
                </div>
                <input
                  type="url"
                  placeholder="Link către site-ul actual, LinkedIn sau portofoliu (opțional)"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  aria-label="URL site sau LinkedIn"
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 bg-white text-xs focus:outline-none focus:border-[#0D5FF9]"
                />
                {formError && <p className="text-xs text-red-600">{formError}</p>}
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#0D5FF9] hover:bg-[#004AD9] text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Trimite datele de contact
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectCaseModal({
  project,
  onClose,
  onOpenContact,
}: {
  project: PortfolioProject | null;
  onClose: () => void;
  onOpenContact: (presetService?: string) => void;
}) {
  const [viewDevice, setViewDevice] = useState<'desktop' | 'mobile'>('desktop');

  useEffect(() => {
    setViewDevice('desktop');
  }, [project]);

  if (!project) return null;

  const activeImage =
    viewDevice === 'mobile' && project.mobileImage
      ? project.mobileImage
      : project.image;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-4xl rounded-[28px] bg-white overflow-hidden shadow-2xl border border-neutral-200 max-h-[92vh] flex flex-col md:flex-row">
        <button
          type="button"
          onClick={onClose}
          aria-label="Închide detalii proiect"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-[#141517] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="md:w-1/2 bg-neutral-100 min-h-[280px] md:min-h-[440px] flex flex-col justify-between relative">
          {project.mobileImage && (
            <div className="p-3 bg-[#141517] flex items-center justify-between text-xs text-white">
              <span className="font-mono-code text-[11px] text-neutral-300">
                Previzualizare Proiect
              </span>
              <div className="flex items-center gap-1 bg-white/10 p-1 rounded-full">
                <button
                  type="button"
                  onClick={() => setViewDevice('desktop')}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
                    viewDevice === 'desktop'
                      ? 'bg-[#0D5FF9] text-white'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  Desktop
                </button>
                <button
                  type="button"
                  onClick={() => setViewDevice('mobile')}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
                    viewDevice === 'mobile'
                      ? 'bg-[#0D5FF9] text-white'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  Mobil
                </button>
              </div>
            </div>
          )}
          <div className="flex-1 overflow-hidden">
            <img
              src={activeImage}
              alt={`${project.title} (${viewDevice})`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        <div className="md:w-1/2 p-7 md:p-9 flex flex-col justify-between space-y-6 overflow-y-auto">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono-code">
              <span>{project.categoryLabel}</span>
              <span>·</span>
              <span>{project.year}</span>
            </div>

            <h2
              id="project-modal-title"
              className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#141517]"
            >
              {project.title}
            </h2>

            <p className="text-xs font-semibold text-[#0D5FF9]">
              Client: {project.client}
            </p>

            <p className="text-sm text-neutral-600 leading-relaxed">
              {project.summary}
            </p>

            <div className="p-4 rounded-2xl bg-[#0D5FF9]/5 border border-[#0D5FF9]/15">
              <p className="text-[11px] font-mono-code uppercase text-[#0D5FF9] mb-1">
                Impact & Încadrare Comercială ({project.priceTier})
              </p>
              <p className="text-sm font-bold text-[#141517]">
                {project.impactMetric}
              </p>
            </div>

            <div>
              <p className="text-xs font-mono-code uppercase text-neutral-400 mb-1.5">
                Tehnologii & integrări implementate
              </p>
              <p className="text-xs text-neutral-600">
                {project.stack.join(' · ')}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenContact(project.title);
              }}
              className="px-6 py-3 rounded-full bg-[#0D5FF9] hover:bg-[#004AD9] text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Cere ofertă pentru un proiect similar</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ServiceDetailModal({
  service,
  onClose,
  onOpenContact,
}: {
  service: ServiceCardItem | null;
  onClose: () => void;
  onOpenContact: (presetService?: string) => void;
}) {
  const [selectedTab, setSelectedTab] = useState<ServiceCardItem>(
    service || SERVICE_CARDS[0]
  );

  useEffect(() => {
    if (service) setSelectedTab(service);
  }, [service]);

  if (!service) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-2xl rounded-[28px] bg-white p-7 md:p-10 shadow-2xl border border-neutral-200">
        <button
          type="button"
          onClick={onClose}
          aria-label="Închide detalii pachet"
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-[#141517] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-wrap gap-2 mb-6 pr-10">
          {SERVICE_CARDS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelectedTab(s)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                selectedTab.id === s.id
                  ? 'bg-[#0D5FF9] text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:text-[#141517]'
              }`}
            >
              {s.number}. {s.title}
            </button>
          ))}
        </div>

        <h2
          id="service-modal-title"
          className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#141517] mb-3"
        >
          {selectedTab.title}
        </h2>

        <p className="text-sm md:text-base text-neutral-600 leading-relaxed mb-6">
          {selectedTab.cardDescription}
        </p>

        <div className="rounded-2xl bg-neutral-50 border border-neutral-200/80 p-5 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-code uppercase text-neutral-400 mb-3">
            <span>Livrabile incluse</span>
            <span>{selectedTab.timeline}</span>
          </div>
          <ul className="space-y-2 text-sm text-[#141517]">
            {selectedTab.deliverables.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0D5FF9] shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-xs font-semibold text-neutral-500 hover:text-[#141517] cursor-pointer"
          >
            Închide
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenContact(selectedTab.title);
            }}
            className="px-7 py-3 rounded-full bg-[#0D5FF9] hover:bg-[#004AD9] text-white text-xs font-semibold cursor-pointer"
          >
            Solicită ofertă pentru acest pachet
          </button>
        </div>
      </div>
    </div>
  );
}
