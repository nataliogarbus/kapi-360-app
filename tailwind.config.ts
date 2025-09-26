import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'kapi-azul-electrico': '#0057FF',
        'kapi-azul-hover': '#0044CC',
        'kapi-verde-menta': '#00DD82',
        'kapi-negro-suave': '#1A1A1A',
        'kapi-gris-claro': '#E5E7EB', 
        'kapi-gris-medio': '#9CA3AF', 
        'kapi-gris-oscuro': '#4B5563', 
        'kapi-negro-input': '#1A1A1A',
        // Colores específicos para la propuesta Kopruch
        'kopruch-green': '#006400',
        'sub-climacontrol': '#FFD700',
        'sub-biosecure': '#000080',
        'sub-infraprotect': '#DD0000',
        'sub-prosystem': '#4A4A4A',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
