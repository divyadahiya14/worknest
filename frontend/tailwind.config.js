/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0F172A',      // Premium deep slate 900
          card: '#1E293B',    // Slate 800 card container
          border: '#334155',  // Slate 700 border accent
          text: '#F8FAFC',    // Slate 50 bright text
          muted: '#94A3B8'    // Slate 400 secondary text
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
