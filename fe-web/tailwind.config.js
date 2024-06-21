/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'primary': 'var(--primary-color)',
      },
      extend: {
        colors: {
          primary: 'var(--primary-color)',
          'primary-hover': 'var(--primary-color-hover)',
          secondary: 'var(--secondary-color)',
          red: {
            100: '#FCD9DF',
          },
          blue: {
            600: '#2D5DD9',
          },
          orange: {
            100: '#FFE7D7', //GEST
            500: '#F67800',
          },
          fontFamily: {
            'myriad-pro': ['Myriad Pro', 'Inter', 'sans-serif'],
          },
        }
      }

    },
  },
  plugins: [],
}
