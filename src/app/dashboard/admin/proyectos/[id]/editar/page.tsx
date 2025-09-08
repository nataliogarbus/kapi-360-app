'use client';

import { createClient } from '@/lib/supabase/client';
import EditProjectForm from '@/components/EditProjectForm';
import useSWR from 'swr';

interface EditProjectPageProps {
  params: { id: string };
}

const supabase = createClient();

// Fetcher gets all data needed for the edit form
const fetcher = async (projectId: string) => {
  const [projectData, usersData, assignmentsData] = await Promise.all([
    supabase.from('projects').select('*').eq('id', projectId).single(),
    supabase.from('profiles').select('id, full_name').eq('role', 'cliente'),
    supabase.from('project_users').select('user_id').eq('project_id', projectId)
  ]);

  const { data: project, error: projectError } = projectData;
  const { data: allUsers, error: usersError } = usersData;
  const { data: assignedUsers, error: assignmentsError } = assignmentsData;

  if (projectError) throw projectError;
  if (!project) throw new Error('Project not found');
  if (usersError) throw usersError;
  if (assignmentsError) throw assignmentsError;

  const assignedUserIds = assignedUsers.map(a => a.user_id);

  return { project, allUsers: allUsers || [], assignedUserIds };
};

export default function EditProjectPage({ params }: EditProjectPageProps) {
  const { data, error, isLoading } = useSWR(
    params.id ? ['edit-project', params.id] : null,
    () => fetcher(params.id)
  );

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto animate-pulse">
        <div className="h-8 bg-gray-600 rounded w-1/3 mb-8"></div>
        <div className="space-y-6 bg-gray-900/50 border border-gray-700 rounded-lg p-6">
          <div className="h-10 bg-gray-700 rounded"></div>
          <div className="h-20 bg-gray-700 rounded"></div>
          <div className="h-40 bg-gray-700 rounded"></div>
          <div className="h-12 bg-gray-600 rounded w-1/3 ml-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="p-8 text-center text-red-400">Error al cargar los datos de edición: {error.message}</p>;
  }

  if (!data) {
    return <p className="p-8 text-center text-kapi-gris-medio">No se encontraron datos para este proyecto.</p>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Editar Proyecto</h1>
      <EditProjectForm
        project={data.project}
        allUsers={data.allUsers}
        assignedUserIds={data.assignedUserIds}
      />
    </div>
  );
}