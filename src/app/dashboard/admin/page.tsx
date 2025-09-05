'use client';

import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import DeleteProjectButton from '@/components/DeleteProjectButton';
import useSWR from 'swr';
import DashboardSection from '@/components/DashboardSection';

// Define the fetcher function outside the component
const supabase = createClient();
const fetcher = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export default function AdminPage() {
  const { data: projects, error, isLoading } = useSWR('admin-projects', fetcher);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-kapi-gris-claro">Panel de Administración</h1>
        <Link href="/dashboard/admin/proyectos/nuevo" className="inline-block bg-kapi-azul-electrico text-white font-bold py-2 px-4 rounded-lg hover:bg-kapi-azul-hover transition-colors">
          Crear Nuevo Proyecto
        </Link>
      </div>
      
      <DashboardSection className="!p-0 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-700">
          <thead className="bg-slate-800/50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-kapi-gris-medio uppercase tracking-wider">Nombre</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-kapi-gris-medio uppercase tracking-wider">Estado</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-kapi-gris-medio uppercase tracking-wider">Fecha de Creación</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {isLoading && (
              <tr>
                <td colSpan={4} className="text-center text-kapi-gris-medio py-8">Cargando proyectos...</td>
              </tr>
            )}
            {projects && projects.map((project) => (
              <tr key={project.id} className="hover:bg-slate-700/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-kapi-gris-claro">{project.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-kapi-gris-medio">{project.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-kapi-gris-medio">{new Date(project.created_at).toLocaleDateString('es-AR')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                  <Link href={`/dashboard/admin/proyectos/${project.id}/editar`} className="text-kapi-azul-electrico hover:text-kapi-azul-hover">
                    Editar
                  </Link>
                  <DeleteProjectButton projectId={project.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        { !isLoading && !error && (!projects || projects.length === 0) && (
          <p className="text-center text-kapi-gris-medio py-8">No hay proyectos para mostrar.</p>
        )}
        {error && (
          <p className="text-center text-red-400 py-8">Error al cargar los proyectos: {error.message}</p>
        )}
      </DashboardSection>
    </div>
  );
}