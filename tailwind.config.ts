import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: 'var(--color-navy-950)',
          900: 'var(--color-navy-900)',
          800: 'var(--color-navy-800)',
          700: 'var(--color-navy-700)',
        },
        blue: {
          600: 'var(--color-blue-600)',
          500: 'var(--color-blue-500)',
          300: 'var(--color-blue-300)',
          100: 'var(--color-blue-100)',
          50:  'var(--color-blue-50)',
        },
        gray: {
          900: 'var(--color-gray-900)',
          700: 'var(--color-gray-700)',
          500: 'var(--color-gray-500)',
          300: 'var(--color-gray-300)',
          200: 'var(--color-gray-200)',
          100: 'var(--color-gray-100)',
          50:  'var(--color-gray-50)',
        },
        brand: {
          primary: 'var(--color-blue-600)',
          accent:  'var(--color-blue-500)',
          surface: 'var(--color-blue-100)',
          dark:    'var(--color-navy-950)',
        },
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        danger:  'var(--color-danger)',
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
      },
      fontSize: {
        display:  ['var(--text-display)',  { lineHeight: 'var(--leading-display)', letterSpacing: 'var(--tracking-display)' }],
        h1:       ['var(--text-h1)',       { lineHeight: 'var(--leading-h1)' }],
        h2:       ['var(--text-h2)',       { lineHeight: 'var(--leading-h2)' }],
        h3:       ['var(--text-h3)',       { lineHeight: 'var(--leading-h3)' }],
        body:     ['var(--text-body)',     { lineHeight: 'var(--leading-body)' }],
        'body-lg':['var(--text-body-lg)',  { lineHeight: 'var(--leading-body-lg)' }],
        small:    ['var(--text-small)',    { lineHeight: 'var(--leading-small)' }],
        caption:  ['var(--text-caption)',  { letterSpacing: 'var(--tracking-caption)' }],
      },
      fontWeight: {
        regular:  'var(--weight-regular)',
        medium:   'var(--weight-medium)',
        semibold: 'var(--weight-semibold)',
        bold:     'var(--weight-bold)',
      },
      maxWidth: {
        container: 'var(--container-max)',
      },
      borderRadius: {
        sm:   'var(--radius-sm)',
        md:   'var(--radius-md)',
        lg:   'var(--radius-lg)',
        xl:   'var(--radius-xl)',
        pill: 'var(--radius-pill)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
      transitionTimingFunction: {
        out:    'var(--ease-out)',
        'in-out': 'var(--ease-in-out)',
      },
      transitionDuration: {
        fast: 'var(--duration-fast)',
        base: 'var(--duration-base)',
        slow: 'var(--duration-slow)',
      },
    },
  },
} satisfies Config;
