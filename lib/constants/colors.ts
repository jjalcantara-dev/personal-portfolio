// Semantic color tokens — maps design intent to Tailwind classes.
// Import as: import { clr, focusRing, btnPrimary, ... } from '@/lib/constants/colors';

export const clr = {
  text: {
    primary: 'text-black',
    strong:  'text-gray-800',
    body:    'text-gray-700',
    muted:   'text-gray-600',
    subtle:  'text-gray-500',
    faint:   'text-gray-400',
    ghost:   'text-gray-300',
    white:   'text-white',
    error:   'text-red-600',
  },
  bg: {
    primary:    'bg-black',
    dark:       'bg-gray-900',
    white:      'bg-white',
    frosted:    'bg-white/85',
    frostLight: 'bg-white/80',
    soft:       'bg-gray-50',
    subtle:     'bg-gray-100',
  },
  border: {
    base:    'border-gray-200',
    baseOpa: 'border-gray-200/70',
    strong:  'border-black',
    soft:    'border-gray-100',
    muted:   'border-gray-300',
    faint:   'border-gray-400',
    error:   'border-red-500',
  },
} as const;

export const focusRing = 'focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-sm';

export const btnPrimary = 'inline-block px-8 py-3 sm:py-3.5 bg-black text-white text-sm font-medium hover:bg-gray-800 hover:-translate-y-px hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2';

export const btnOutline = 'inline-block px-8 py-3 sm:py-3.5 border-2 border-black text-black text-sm font-medium hover:bg-black hover:text-white hover:-translate-y-px hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2';

export const btnGhost = 'inline-block px-8 py-3 sm:py-3.5 border-2 border-gray-200 text-gray-500 text-sm font-medium hover:border-black hover:text-black hover:-translate-y-px transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2';

export const externalLink = 'inline-flex items-center gap-2 px-4 py-2 border-2 border-gray-300 hover:border-black hover:-translate-y-px hover:shadow-md transition-all duration-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2';

export const skillTag = 'inline-block text-sm text-gray-800 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-sm transition-all duration-150 hover:bg-black hover:text-white hover:border-black cursor-default select-none';
