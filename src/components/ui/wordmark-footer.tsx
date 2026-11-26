"use client"

import * as React from "react"
import { MapPin, Phone, Plus } from "lucide-react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ROGROWTH_CONTACT } from "../../data/studioData"
import { WhatsAppIcon } from "../StudioIcons"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// at least 44 px tall wherever a finger taps it
const tap = "max-md:inline-flex max-md:min-h-11 max-md:items-center pointer-coarse:inline-flex pointer-coarse:min-h-11 pointer-coarse:items-center"
const serif = "var(--font-display, var(--font-serif, ui-serif, Georgia, serif))"

export type FooterLink = {
  label: string
  href?: string
  onClick?: (e: React.MouseEvent) => void
  external?: boolean
}

export type FooterColumn = {
  title: string
  links: FooterLink[]
}

export interface WordmarkFooterProps extends React.HTMLAttributes<HTMLElement> {
  /** The product name: the wordmark top left */
  name: string
  /** The large watermark at the bottom. Defaults to name. */
  wordmark?: string
  /** The name in the © line. */
  legalName?: string
  year: number
  description?: string
  address?: string
  email?: string
  phone?: string
  phoneHref?: string
  whatsappHref?: string
  /** A short status line next to a green dot, such as "All systems normal". */
  status?: string
  /** What screen readers call the footer navigation. */
  navLabel?: string
  columns: FooterColumn[]
  /** A small link at the end of the bottom line. */
  credit?: { label: string; href?: string; onClick?: (e: React.MouseEvent) => void }
}

/**
 * A footer with a short description, link columns that fold on phones, and the product name set large,
 * fading into the background.
 */
export function WordmarkFooter({
  name,
  wordmark,
  legalName,
  year,
  description,
  address,
  email,
  phone,
  phoneHref,
  whatsappHref,
  status,
  navLabel = "Footer",
  columns,
  credit,
  className,
  ...props
}: WordmarkFooterProps) {
  const displayWordmark = wordmark ?? name
  const resolvedPhoneHref = phoneHref || (phone ? `tel:${phone.replace(/\s+/g, "")}` : undefined)

  return (
    <footer className={cn("relative overflow-hidden bg-background text-foreground transition-colors duration-500 ease-out", className)} {...props}>
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-6 pt-16 pb-12 max-md:gap-8 max-md:pt-12 max-md:pb-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5 flex flex-col justify-between">
          <div>
            {/* Top Logo matching exact navbar style: bold sans-serif with tight tracking */}
            <a
              href="/"
              className="inline-block text-[20px] md:text-[22px] font-extrabold tracking-[-0.04em] leading-none text-[#141517] dark:text-white hover:opacity-80 transition-opacity"
            >
              {name}
            </a>
            {description && (
              <p className="mt-4 max-w-[280px] text-[13px] md:text-[14px] leading-relaxed text-muted-foreground font-normal">
                {description}
              </p>
            )}
            {address && (
              <address className="mt-3 flex max-w-[300px] items-start gap-2 not-italic text-[13px] leading-relaxed text-muted-foreground">
                <MapPin className="mt-0.5 size-3.5 shrink-0 text-muted-foreground/75" aria-hidden="true" />
                <span>{address}</span>
              </address>
            )}
            {(phone || whatsappHref) && (
              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                {whatsappHref && (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={phone ? `WhatsApp RoGrowth (${phone})` : "WhatsApp RoGrowth"}
                    className="inline-flex min-h-10 items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-[12.5px] font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
                  >
                    <WhatsAppIcon className="size-3.5 shrink-0" />
                    <span>WhatsApp</span>
                  </a>
                )}
                {phone && resolvedPhoneHref && (
                  <a
                    href={resolvedPhoneHref}
                    className={cn(
                      "inline-flex min-h-10 items-center gap-1.5 rounded-full border border-border/80 px-3.5 py-2 text-[12.5px] font-medium text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground",
                      tap
                    )}
                  >
                    <Phone className="size-3.5 shrink-0" aria-hidden="true" />
                    <span className="tabular-nums">{phone}</span>
                  </a>
                )}
              </div>
            )}
            {status && (
              <p className="mt-5 inline-flex items-center gap-2 text-[12px] text-muted-foreground">
                <span className="size-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" aria-hidden="true" />
                {status}
              </p>
            )}
          </div>
        </div>
        <nav aria-label={navLabel} className="grid grid-cols-2 gap-8 max-md:hidden md:col-span-6 md:col-start-7 lg:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground/75 uppercase font-medium">{col.title}</p>
              <ul className="mt-4 grid gap-2.5 pointer-coarse:mt-2 pointer-coarse:gap-0">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href || "#"}
                      onClick={(e) => {
                        if (l.onClick) {
                          e.preventDefault()
                          l.onClick(e)
                        }
                      }}
                      target={l.external ? "_blank" : undefined}
                      rel={l.external ? "noopener noreferrer" : undefined}
                      className={cn("text-[13px] md:text-[14px] text-muted-foreground transition-colors hover:text-foreground cursor-pointer font-normal", tap)}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        {/* phones: each column folds away; tap a heading to open it */}
        <nav aria-label={navLabel} className="-mx-4 grid gap-1 md:hidden">
          {columns.map((col) => (
            <details key={col.title} className="group rounded-2xl open:bg-foreground/[0.03]">
              <summary className="flex h-14 cursor-pointer list-none items-center justify-between px-4 [&::-webkit-details-marker]:hidden">
                <span className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase font-medium">{col.title}</span>
                <Plus className="size-4 text-muted-foreground/80 transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none" strokeWidth={1.75} aria-hidden="true" />
              </summary>
              <ul className="px-4 pb-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href || "#"}
                      onClick={(e) => {
                        if (l.onClick) {
                          e.preventDefault()
                          l.onClick(e)
                        }
                      }}
                      target={l.external ? "_blank" : undefined}
                      rel={l.external ? "noopener noreferrer" : undefined}
                      className="block py-3 text-[14px] text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </nav>
      </div>
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-2 px-6 pb-8 text-[12px] md:text-[13px] text-muted-foreground/75 sm:flex-row sm:items-center sm:gap-6 md:px-10">
        <p className="font-mono text-xs tabular-nums tracking-wide">
          © {year} {legalName ?? name}
        </p>
        {email && (
          <a href={`mailto:${email}`} className={cn("hover:text-foreground transition-colors font-medium", tap)}>
            {email}
          </a>
        )}
        {phone && resolvedPhoneHref && (
          <a href={resolvedPhoneHref} className={cn("hover:text-foreground transition-colors font-medium tabular-nums", tap)}>
            {phone}
          </a>
        )}
        {credit && (
          <a
            href={credit.href || "#"}
            onClick={(e) => {
              if (credit.onClick) {
                e.preventDefault()
                credit.onClick(e)
              }
            }}
            className={cn("hover:text-foreground sm:ml-auto transition-colors", tap)}
          >
            {credit.label}
          </a>
        )}
      </div>
      {/* the original huge wordmark, set large and fading into the background */}
      <p
        aria-hidden="true"
        className="pointer-events-none -mb-[0.2em] text-center text-[clamp(96px,24vw,360px)] leading-[0.9] tracking-[-0.04em] text-transparent select-none [background-clip:text] [-webkit-background-clip:text] [background-image:linear-gradient(to_bottom,color-mix(in_oklab,var(--color-primary)_32%,transparent),transparent_85%)] max-md:text-[30vw]"
        style={{ fontFamily: serif, fontWeight: 340 }}
      >
        {displayWordmark}
      </p>
    </footer>
  )
}

/**
 * RoGrowth-branded WordmarkFooter preset complying with RoGrowth design tokens and legal requirements.
 */
export interface RoGrowthWordmarkFooterProps extends Omit<Partial<WordmarkFooterProps>, 'columns'> {
  onOpenLegalModal?: (type: 'terminos' | 'privacidad') => void
  onNavigate?: (path: string) => void
  columns?: FooterColumn[]
}

export function RoGrowthWordmarkFooter({
  name = "rogrowth.ro",
  wordmark = "RoGrowth",
  legalName = "rogrowth.ro",
  year = 2026,
  description = "Studio de design și dezvoltare web.",
  address = ROGROWTH_CONTACT.addressFull,
  email = ROGROWTH_CONTACT.email,
  phone = ROGROWTH_CONTACT.phoneDisplay,
  phoneHref = ROGROWTH_CONTACT.phoneHref,
  whatsappHref = ROGROWTH_CONTACT.whatsappHref,
  status, // Removed to avoid AI dashboard slop
  credit = { label: "București, România", href: "#" },
  onOpenLegalModal,
  onNavigate,
  columns: customColumns,
  className,
  ...props
}: RoGrowthWordmarkFooterProps) {
  const defaultColumns: FooterColumn[] = [
    {
      title: "Servicii",
      links: [
        {
          label: "Creare Site Web",
          href: "/creare-siteweb",
          onClick: onNavigate ? () => onNavigate("/creare-siteweb") : undefined,
        },
        { label: "Site Prezentare", href: "#pachete-preturi" },
        { label: "Magazin Online", href: "#pachete-preturi" },
        { label: "Optimizare SEO", href: "#pachete-preturi" },
        { label: "Marketing Digital", href: "#pachete-preturi" },
      ],
    },
    {
      title: "Companie",
      links: [
        { label: "Despre Noi", href: "#about" },
        { label: "Portofoliu", href: "#portfolio" },
        { label: "Cariere", href: "#careers" },
        {
          label: "Sistem UI",
          href: "/design-system",
          onClick: onNavigate ? () => onNavigate("/design-system") : undefined,
        },
      ],
    },
    {
      title: "Legal",
      links: [
        {
          label: "Termeni Comerciali",
          href: "#termeni",
          onClick: onOpenLegalModal ? () => onOpenLegalModal("terminos") : undefined,
        },
        {
          label: "Confidențialitate",
          href: "#confidentialitate",
          onClick: onOpenLegalModal ? () => onOpenLegalModal("privacidad") : undefined,
        },
        {
          label: "Proprietate Cod 100%",
          href: "#proprietate",
          onClick: onOpenLegalModal ? () => onOpenLegalModal("terminos") : undefined,
        },
        {
          label: "ANPC",
          href: "https://anpc.ro",
          external: true,
        },
        {
          label: "Litigii Online (SOL)",
          href: "https://ec.europa.eu/consumers/odr",
          external: true,
        },
      ],
    },
  ]

  return (
    <WordmarkFooter
      name={name}
      wordmark={wordmark}
      legalName={legalName}
      year={year}
      description={description}
      address={address}
      email={email}
      phone={phone}
      phoneHref={phoneHref}
      whatsappHref={whatsappHref}
      status={status}
      credit={credit}
      columns={customColumns || defaultColumns}
      className={cn("border-t border-border/40", className)}
      {...props}
    />
  )
}

export default WordmarkFooter
