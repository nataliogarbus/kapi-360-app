'use client';

import { createClient } from '@/lib/supabase/client';
import useSWR from 'swr';
import ProjectCard from '@/components/ProjectCard';
import ProjectCardSkeleton from '@/components/ProjectCardSkeleton';
import DashboardSection from '@/components/DashboardSection';

export default function ProyectosPage() {
  const supabase = createClient();

  const fetcher = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('id, name, status');
    if (error) throw error;
    return data;
  };

  const { data: projects, error, isLoading } = useSWR('projectsData', fetcher);

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-kapi-gris-claro">Mis Proyectos</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => <ProjectCardSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  if (error) {
    console.error('Error fetching projects:', error);
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-kapi-gris-claro">Mis Proyectos</h1>
        </div>
        <p className="text-red-400 bg-red-900/50 p-4 rounded-lg">Error al cargar los proyectos.</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-kapi-gris-claro">Mis Proyectos</h1>
      </div>

      {projects.length === 0 ? (
        <DashboardSection className="text-center !py-12">
          <h3 className="text-lg font-medium text-kapi-gris-claro">No hay proyectos todavía</h3>
          <p className="mt-1 text-sm text-kapi-gris-medio">Cuando se te asigne un proyecto, aparecerá aquí.</p>
        </DashboardSection>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              id={project.id} 
              name={project.name} 
              // @ts-ignore
              status={project.status} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

