// Semantic typography tokens — maps design intent to Tailwind classes.
// Import as: import { tx } from '@/lib/constants/typography';

export const tx = {
  // Headings
  h1:     'text-4xl sm:text-5xl md:text-6xl font-light tracking-tight',
  h1Hero: 'text-4xl sm:text-6xl md:text-7xl font-light tracking-tight',
  h2:     'text-2xl sm:text-3xl font-light',
  h3:     'text-xl sm:text-2xl font-medium',
  h3sm:   'text-lg font-medium',

  // Body text
  bodyXl: 'text-lg sm:text-xl leading-relaxed',
  bodyLg: 'text-base sm:text-lg leading-relaxed',
  body:   'text-base leading-relaxed',
  small:  'text-sm',
  xs:     'text-xs',

  // UI text
  label:        'text-xs font-medium uppercase tracking-widest',
  captionLabel: 'text-[10px] font-semibold uppercase tracking-[0.14em]',
  nav:          'text-xs sm:text-sm font-medium',
  navMobile:    'text-[10px] font-medium leading-none tracking-wide',
  subtitle:     'text-sm font-medium tracking-wider uppercase',
} as const;
