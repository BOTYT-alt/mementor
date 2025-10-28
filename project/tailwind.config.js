/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#6c5ce7',
        accentRed: '#FF3333',
        accentOrange: '#FFA07A',
        brandBlue: '#2196F3'
      }
    }
  },
  plugins: []
}
