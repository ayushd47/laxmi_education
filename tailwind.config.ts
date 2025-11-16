import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette
        'primary-yellow': '#FFF200',
        'deep-red': '#E30613',
        'royal-blue': '#0057A5',
        'dark-navy': '#002147',
        'brand-white': '#FFFFFF',

        // Backwards-compat (old tokens mapped to new)
        'highlight-yellow': '#FFF200',
        'navbar-blue': '#0057A5',
        'cta-red': '#E30613',
        'light-gray': '#F5F5F5',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config

