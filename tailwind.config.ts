import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
  theme: {
    extend: {
      colors: {
        primary: '#319795',
        secondary: '#A0AEC0',
      },
      width: {
        '10': '10%',
        '20': '20%',
        '30': '30%',
        '40': '40%',
        '50': '50%',
        '60': '60%',
        '70': '70%',
        '80': '80%',
        '90': '90%',
        '100': '100%',
      },
      boxShadow: {
        'custom-0': '0px 2px 8px 0px rgba(18, 2, 113, 0.21)',
        'custom-1': '0px 6px 18px 0px rgba(64, 62, 172, 0.16)',
        'custom-2': '0px 4px 15px 0px rgba(56, 29, 221, 0.15)',
        dropdown: '0px 1px 12px 0px rgba(40, 39, 99, 0.22)',
        header:
          '0px 4px 12px rgba(207, 214, 248, 0.28), 0px 0px 0px 4px rgba(255, 255, 255, 0.00)',
      },
    },
  },
};
export default config;
