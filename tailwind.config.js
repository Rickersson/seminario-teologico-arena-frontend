/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#26496f",
        accent: "#fc904f",
        "accent-hover": "#fc953f",
        grayLight: "#ececec",
        whiteAlpha: "#ffffff8a",
        darkText: "#333",
       
      },
    },
  },
  plugins: [],
};
