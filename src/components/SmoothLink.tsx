'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

interface SmoothLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void; // Para poder pasar funciones como el cierre del menú móvil
}

const SmoothLink: React.FC<SmoothLinkProps> = ({ href, children, className, onClick }) => {
  const pathname = usePathname();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const isHomePage = pathname === '/';
    const isHashLink = href.startsWith('/#');

    // Si estamos en la home y es un link a una sección de la home, hacemos scroll suave
    if (isHomePage && isHashLink) {
      e.preventDefault();
      const targetId = href.substring(2); // Quitamos el '/#'
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
    // Si no estamos en la home, el Link se comportará de forma normal, navegando a la home y luego al ancla.
    
    // Si se pasó una función onClick (como para cerrar el menú móvil), la ejecutamos siempre
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link href={href} onClick={handleScroll} className={className}>
      {children}
    </Link>
  );
};

export default SmoothLink;
