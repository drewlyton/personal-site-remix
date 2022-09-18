module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        13: "3.25rem"
      },
      rotate: {
        "-0.25": "-0.25deg",
        "-0.5": "-0.5deg"
      },
      lineHeight: {
        0.75: "0.75"
      },
      height: {
        124: "28rem"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require("@tailwindcss/typography")]
};
