/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#B5CC22",
        secondary: "#677510",
        primaryGray: "#323232",
        secondaryGray: "#AEAEAE",
        tertiaryGray: "#F6F6F6",
        fourthGray: "#EBEBEB",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
