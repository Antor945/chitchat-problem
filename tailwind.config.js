/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        overlay: 'rgba(0, 0, 0, 0.41);',
        primary:'#5F35F5;',
        halka:'rgba(77, 77, 77, 0.75)',
      },
      boxShadow:{
        boxShadow :'0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
      },
      fontFamily: {
        'nunito': [ 'Nunito','sans-serif'],
        'sans'  :['open Sans','sans-serif']
      }
    }
  },
  plugins: [],
}