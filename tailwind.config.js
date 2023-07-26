/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: colors.green,
        // secondary: colors.green,
        // accent: colors.zinc,
        // brand: colors.green,
        // primary: colors.indigo,
      },
    },
  },
  plugins: [],
};
