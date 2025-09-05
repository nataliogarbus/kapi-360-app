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
        'kapi-gris-claro': '#E5E7EB', // Títulos/Texto Principal
        'kapi-gris-medio': '#9CA3AF', // Cuerpo de Texto/Secundario
        'kapi-gris-oscuro': '#4B5563', // Bordes/Divisores
        'kapi-negro-input': '#1A1A1A', // Texto sobre fondos claros
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
