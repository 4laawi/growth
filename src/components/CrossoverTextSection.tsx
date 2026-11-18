import React from 'react';
import { CrossoverScrollShowcase } from './ui/crossover-scroll-showcase';

interface CrossoverTextSectionProps {
  isDarkMode?: boolean;
}

export function CrossoverTextSection({ isDarkMode = false }: CrossoverTextSectionProps) {
  return (
    <section
      id="crossover-showcase"
      aria-labelledby="crossover-showcase-heading"
      className="relative w-full"
    >
      <CrossoverScrollShowcase
        line1="Site-uri"
        line2="responsive"
        seoHeading="Creare Site-uri Web Responsive & Optimizate pentru Conversii"
        seoSubtitle="Dezvoltăm platforme digitale moderne pentru companii din România. Arhitectură tehnică sigură, încărcare rapidă și experiență impecabilă pe mobil, tabletă și desktop."
        isDarkMode={isDarkMode}
      />
    </section>
  );
}
