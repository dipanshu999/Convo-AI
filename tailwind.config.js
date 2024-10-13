/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        screens:{
          'xsm':'400px',
          'mob':'650px',
          'tab':'800px',
          'lap':'1000px',
          'tab1':'950px',
          'lap1':'1150px',
        },
    },
  },
  plugins: [],
}

