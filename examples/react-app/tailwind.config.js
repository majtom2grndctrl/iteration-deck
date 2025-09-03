/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Include the parent project's shared styles and components
    "../../shared/**/*.{js,ts}",
    "../../src/**/*.{js,ts,jsx,tsx}",
  ],
  // Theme is now defined in CSS using @theme - no JavaScript config needed
  plugins: [],
};