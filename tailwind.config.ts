/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['open-sans', 'nunito-sans', 'ui-sans-serif', 'system-ui'],
        },
        colors: {
          primary: {
            DEFAULT: '#070917',
            dark: '#000000',
          },
          secondary: '#0C0D1F',
          background: '#070917',
          surface: '#ffffff',
          muted: '#e5e7eb',
          accent: '#0ea5e9',
        },
        spacing: {
          '128': '32rem',
          '144': '36rem',
        },
        borderRadius: {
          xl: '1rem',
          '2xl': '1.5rem',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
        },
        animation: {
          fadeIn: 'fadeIn 0.5s ease-in-out',
        },
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          xl: '1280px',
        },
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
      require('@tailwindcss/forms'),
    ],
  }
  