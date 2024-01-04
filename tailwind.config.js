/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        mobileBg: "'./src/images/bg-sidebar-mobile.svg'",
      },
      fontFamily: {
        default: ['"Ubuntu"', '"sans-serif"'],
      },
      colors: {
        red: "hsl(354, 84%, 57%)",
        marineBlue: "hsl(213, 96%, 18%)",
        blue: "hsl(243, 100%, 62%)",
        pastelBlue: "hsl(228, 100%, 84%)",
        lightBlue: "hsl(206, 94%, 87%)",
        gray: {
          coolGray: "hsl(231, 11%, 63%)",
          lightGray: "hsl(229, 24%, 87%)",
          magnolia: "hsl(217, 100%, 97%)",
          alabaster: " hsl(231, 100%, 99%)",
        },
      },
    },
    screens: {
      laptop: "800px",
    },
  },
  plugins: [],
};
