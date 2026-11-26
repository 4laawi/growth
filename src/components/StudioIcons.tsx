import React from 'react';

export function WhatsAppIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.82 14.01c-.24.68-1.41 1.3-1.95 1.38-.51.08-1.15.11-1.85-.11-.43-.14-.98-.32-1.69-.63-2.97-1.28-4.91-4.27-5.06-4.47-.15-.2-1.21-1.61-1.21-3.07 0-1.46.77-2.18 1.04-2.48.27-.3.59-.37.79-.37.2 0 .4 0 .57.01.18.01.43-.07.67.51.24.59.84 2.04.91 2.19.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.61.17.3.77 1.27 1.65 2.05 1.13 1.01 2.09 1.32 2.39 1.47.3.15.47.13.65-.07.18-.2.74-.86.94-1.16.2-.3.4-.25.67-.15.27.1 1.74.82 2.04.97.3.15.5.22.57.34.07.12.07.7-.17 1.38z" />
    </svg>
  );
}

export function OnlinesAvatarIcon({ size = 34 }: { size?: number }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full bg-[#141517] text-white flex items-center justify-center shrink-0 select-none font-mono-code font-bold text-xs tracking-tighter"
      aria-hidden="true"
    >
      <span className="inline-flex items-baseline leading-none">
        <span className="text-[11px] -translate-y-[2px]">'</span>
        <span className="text-[12px]">_</span>
      </span>
    </div>
  );
}

export function OnlinesNotificationBubble({
  timeAgo,
  message,
  className = '',
  onClick,
  compact = false,
}: {
  timeAgo: string;
  message: string;
  className?: string;
  onClick?: () => void;
  compact?: boolean;
}) {
  const Wrapper = onClick ? 'button' : 'div';
  return (
    <Wrapper
      onClick={onClick}
      className={`bg-white/95 backdrop-blur-md rounded-t-[18px] rounded-br-[18px] rounded-bl-[4px] ${
        compact ? 'px-3.5 py-2.5 gap-2.5' : 'pl-4 pr-9 py-3.5 gap-3 min-w-[255px]'
      } shadow-[0_8px_26px_rgba(0,0,0,0.055)] border border-neutral-200/60 flex items-center text-left transition-transform duration-200 ${
        onClick ? 'hover:scale-[1.02] hover:border-[#0D5FF9]/40 cursor-pointer' : ''
      } ${className}`}
    >
      <OnlinesAvatarIcon size={compact ? 26 : 30} />
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 text-[11px] leading-none mb-1.5">
          <span className="font-bold text-[#141517]">RoGrowth</span>
          <span className="text-neutral-400 font-normal">{timeAgo}</span>
        </div>
        <p
          className={`${
            compact ? 'text-[11.5px]' : 'text-[12.5px]'
          } font-medium text-[#141517] leading-none whitespace-nowrap`}
        >
          {message}
        </p>
      </div>
    </Wrapper>
  );
}

export function MultiplayerCursor({
  label,
  sublabel,
  color,
  textColor = '#ffffff',
  className = '',
  pointerDirection = 'top-left',
  onClick,
}: {
  label: string;
  sublabel?: string;
  color: string;
  textColor?: string;
  className?: string;
  pointerDirection?: 'top-left' | 'top-right';
  onClick?: () => void;
}) {
  const Wrapper = onClick ? 'button' : 'div';
  return (
    <Wrapper
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`select-none z-20 text-left ${
        onClick ? 'pointer-events-auto cursor-pointer group' : 'pointer-events-none'
      } ${className}`}
      aria-label={onClick ? `${label}${sublabel ? ` — ${sublabel}` : ''}` : undefined}
      aria-hidden={onClick ? undefined : 'true'}
    >
      <div className="relative inline-flex flex-col items-start">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={
            pointerDirection === 'top-right'
              ? 'self-end -mr-2 -mb-1 rotate-90'
              : '-ml-2.5 -mb-1'
          }
        >
          <path
            d="M2.2 1.8L14.2 6.5L8.4 8.9L6.1 14.6L2.2 1.8Z"
            fill={color}
            stroke="white"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </svg>
        <div
          style={{ backgroundColor: color, color: textColor }}
          className={`px-3 py-1.5 rounded-t-[10px] rounded-br-[10px] rounded-bl-[4px] text-[12px] font-semibold tracking-tight leading-tight shadow-[0_6px_18px_rgba(0,0,0,0.12)] whitespace-nowrap transition-transform duration-200 ${
            onClick ? 'group-hover:scale-[1.04]' : ''
          }`}
        >
          <div className="flex items-center gap-1.5">
            {sublabel ? (
              <>
                <span className="opacity-80 font-mono-code text-[10px] uppercase tracking-wider">
                  {label}
                </span>
                <span className="opacity-50">·</span>
                <span className="font-semibold">{sublabel}</span>
              </>
            ) : (
              <span>{label}</span>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export function ToolSquircle({
  tool,
  className = '',
}: {
  tool:
    | 'vscode'
    | 'figma'
    | 'framer'
    | 'notion'
    | 'nextjs'
    | 'wordpress'
    | 'gdocs'
    | 'cube';
  className?: string;
}) {
  if (tool === 'figma' || tool === 'framer') {
    const src =
      tool === 'figma'
        ? '/assets/aistudio/image-removebg-preview__1__3bdc6261.webp'
        : '/assets/aistudio/image-removebg-preview_60b15c00.webp';
    return (
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center select-none ${className}`}
        aria-hidden="true"
      >
        <img
          src={src}
          alt=""
          referrerPolicy="no-referrer"
          className="w-14 h-14 object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
        />
      </div>
    );
  }

  return (
    <div
      className={`w-14 h-14 rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-neutral-100 flex items-center justify-center select-none ${className}`}
      aria-hidden="true"
    >
      {tool === 'vscode' && (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path
            d="M17.5 2L7.2 11.4L3.2 8.3L1.5 9.2V14.8L3.2 15.7L7.2 12.6L17.5 22L22.5 19.9V4.1L17.5 2ZM17.5 16.8L10.8 12L17.5 7.2V16.8Z"
            fill="#007ACC"
          />
        </svg>
      )}
      {tool === 'notion' && (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="3" stroke="#141517" strokeWidth="1.8" />
          <path d="M8 16V8L15.5 16V8" stroke="#141517" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {tool === 'nextjs' && (
        <div className="w-8 h-8 rounded-full bg-[#141517] text-white flex items-center justify-center font-bold text-sm tracking-tighter">
          N
        </div>
      )}
      {tool === 'wordpress' && (
        <div className="w-8 h-8 rounded-full border-2 border-[#141517] text-[#141517] flex items-center justify-center font-serif font-bold text-sm">
          W
        </div>
      )}
      {tool === 'gdocs' && (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="2" width="16" height="20" rx="2.5" fill="#2563EB" />
          <path d="M8 8H16M8 12H16M8 16H13" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )}
      {tool === 'cube' && (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" fill="#141517" />
          <path d="M12 12L21 7M12 12V22M12 12L3 7" stroke="white" strokeWidth="1.6" />
        </svg>
      )}
    </div>
  );
}

export function WireframeBrowserCard({
  variant = 'grid',
  className = '',
}: {
  variant?: 'grid' | 'chat';
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl bg-white/95 border border-neutral-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      <div className="h-6 px-3 bg-neutral-100/80 border-b border-neutral-200/80 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full border border-neutral-300" />
        <span className="w-2 h-2 rounded-full border border-neutral-300" />
        <span className="w-2 h-2 rounded-full border border-neutral-300" />
      </div>
      {variant === 'grid' ? (
        <div className="p-4 grid grid-cols-12 gap-2.5">
          <div className="col-span-3 flex flex-col gap-2">
            <div className="w-9 h-9 rounded-full bg-neutral-200/70" />
            <div className="h-2 w-full rounded bg-neutral-200/70" />
            <div className="h-2 w-4/5 rounded bg-neutral-200/70" />
          </div>
          <div className="col-span-4 flex flex-col gap-2">
            <div className="h-12 rounded-md bg-neutral-200/60" />
            <div className="h-14 rounded-md bg-neutral-200/60" />
          </div>
          <div className="col-span-5 flex flex-col gap-2">
            <div className="h-7 rounded-md bg-neutral-200/60" />
            <div className="h-20 rounded-md bg-neutral-200/60" />
          </div>
        </div>
      ) : (
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-neutral-200" />
            <div className="h-2 w-12 rounded bg-neutral-200" />
          </div>
          <div className="pl-5 space-y-2">
            <div className="h-2 w-32 rounded bg-neutral-200/80" />
            <div className="h-2 w-24 rounded bg-neutral-200/80" />
          </div>
          <div className="pt-2 flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-neutral-200" />
            <div className="h-6 flex-1 rounded-md border border-neutral-200 bg-neutral-50/60" />
          </div>
        </div>
      )}
    </div>
  );
}
