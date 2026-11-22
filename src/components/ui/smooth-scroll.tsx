'use client';
import 'lenis/dist/lenis.css';
import { ReactLenis } from 'lenis/react';
import React, { forwardRef } from 'react';

export interface SmoothScrollProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  options?: Record<string, unknown>;
}

export interface SmoothScrollSectionProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
  isCovering?: boolean;
  backgroundColor?: string;
}

export const SmoothScrollSection = forwardRef<HTMLElement, SmoothScrollSectionProps>(
  ({ children, className = '', isCovering = false, backgroundColor, style, ...props }, ref) => {
    return (
      <section
        ref={ref}
        style={{
          ...(backgroundColor ? { backgroundColor } : {}),
          ...style,
        }}
        className={`w-full sticky top-0 ${
          isCovering
            ? 'rounded-tr-2xl rounded-tl-2xl md:rounded-tr-3xl md:rounded-tl-3xl overflow-hidden shadow-[0_-25px_60px_-15px_rgba(0,0,0,0.18)] dark:shadow-[0_-25px_60px_-15px_rgba(0,0,0,0.6)]'
            : ''
        } ${className}`}
        {...props}
      >
        {children}
      </section>
    );
  }
);
SmoothScrollSection.displayName = 'SmoothScrollSection';

const Component = forwardRef<HTMLElement, SmoothScrollProps>(
  ({ children, options, className = '', ...props }, ref) => {
    return (
      <ReactLenis root options={options}>
        <main ref={ref} className={className} {...props}>
          {children ? (
            <article>{children}</article>
          ) : (
            <article>
              <section className="text-white h-screen w-full bg-slate-950 grid place-content-center sticky top-0">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
                <h1 className="2xl:text-7xl text-6xl px-8 font-semibold text-center tracking-tight leading-[120%]">
                  I Know What Exactly you're <br /> Looking For! Scroll Please 👇
                </h1>
              </section>

              <section className="bg-gray-300 text-black grid place-content-center h-screen sticky top-0 rounded-tr-2xl rounded-tl-2xl overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
                <h1 className="2xl:text-7xl text-4xl px-8 font-semibold text-center tracking-tight leading-[120%]">
                  here is it<br /> enjoy it!
                </h1>
              </section>

              <section className="text-white h-screen w-full bg-slate-950 grid place-content-center sticky top-0">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
                <h1 className="2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%]">
                  Thanks To Scroll.
                  <br /> Now Scroll Up Again☝️🏿
                </h1>
              </section>
            </article>
          )}
        </main>
      </ReactLenis>
    );
  }
);

Component.displayName = 'Component';

export { Component, ReactLenis };
export default Component;
