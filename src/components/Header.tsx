import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="w-full p-4 absolute top-0 left-0 z-20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/logo-kapi-verde.svg" 
              alt="Logo de Kapi"
              width={150} 
              height={42}
              priority
            />
        </Link>
        <div className="hidden md:flex items-center space-x-8">
            <Link href="#servicios" className="text-gray-300 hover:text-white transition-colors duration-300">Servicios</Link>
            <Link href="#como-funciona" className="text-gray-300 hover:text-white transition-colors duration-300">Cómo Trabajamos</Link>
            <Link href="#casos-exito" className="text-gray-300 hover:text-white transition-colors duration-300">Casos de Éxito</Link>
            <Link href="/blog" className="text-gray-300 hover:text-white transition-colors duration-300">Blog</Link>
            <Link href="#faq" className="text-gray-300 hover:text-white transition-colors duration-300">FAQ</Link>
            <Link href="/diagnostico" className="text-gray-300 hover:text-white transition-colors duration-300">Diagnóstico IA</Link>
            <Link href="#contact" className="bg-white/10 text-white py-2 px-5 rounded-lg hover:bg-white/20 transition-colors duration-300">Contacto</Link>
        </div>
      </nav>
    </header>
  );
};

// Forzando un re-deploy para que Vercel tome las nuevas variables de entorno
export default Header;