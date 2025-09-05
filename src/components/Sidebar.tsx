'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoutButton from './LogoutButton'
import { FiHome, FiBarChart2, FiUser } from 'react-icons/fi'

// Definimos un tipo para los datos del perfil que recibirá el componente
type ProfileData = {
  full_name: string | null;
  company_name: string | null;
} | null;

export default function Sidebar({ profile }: { profile: ProfileData }) {
  const pathname = usePathname()

  const navLinks = [
    {
      href: '/dashboard/proyectos',
      icon: FiHome,
      label: 'Proyectos',
    },
    {
      href: '/dashboard/metricas',
      icon: FiBarChart2,
      label: 'Métricas',
    },
    {
      href: '/dashboard/perfil',
      icon: FiUser,
      label: 'Mi Perfil',
    },
  ]

  return (
    <div className="flex h-full flex-col bg-kapi-negro-suave text-kapi-gris-claro">
      <div className="p-6 border-b border-kapi-gris-oscuro">
        <h2 className="text-xl font-bold">{profile?.company_name ?? 'Cliente'}</h2>
        <p className="text-sm text-kapi-gris-medio">{profile?.full_name ?? ''}</p>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href)
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-2 transition-colors ${ 
                    isActive 
                    ? 'bg-kapi-azul-electrico text-kapi-gris-claro' 
                    : 'text-kapi-gris-medio hover:bg-kapi-gris-oscuro hover:text-kapi-gris-claro'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <link.icon className="h-5 w-5" />
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="p-4 mt-auto border-t border-kapi-gris-oscuro">
        <LogoutButton />
      </div>
    </div>
  )
}