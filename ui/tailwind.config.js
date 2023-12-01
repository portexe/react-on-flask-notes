/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        128: "32rem",
        160: "38rem",
      },
      maxHeight: {
        comfortable: "97%",
      },
    },
  },
  plugins: [],
};
