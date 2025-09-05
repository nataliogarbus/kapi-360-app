import React from 'react';
import Link from 'next/link'; // Import Link

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full max-w-3xl mx-auto mt-16 mb-8 text-center text-gray-500">
      <div className="border-t border-gray-700 my-8"></div>
      <p>&copy; {currentYear} Kapi. Todos los derechos reservados.</p>
      <p className="text-sm mt-1">Potenciado por IA para acelerar tu crecimiento.</p>
      <div className="mt-4 text-sm"> {/* New div for policy link */}
        <Link href="/politica-privacidad" className="text-gray-400 hover:text-white transition-colors">
          Política de Privacidad
        </Link>
      </div>
    </footer>
  );
};

export default Footer;