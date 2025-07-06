import type { Config } from 'tailwindcss';

import tailwindcss_animate from 'tailwindcss-animate';

export default {
  darkMode: 'class',
  content: ['*.{js,ts,jsx,tsx,mdx}'],
  plugins: [tailwindcss_animate],
} satisfies Config;
