'use client';

import { createClient } from '@/lib/supabase/client';
import MessageForm from '@/components/MessageForm';
import { addMessageToProject } from '@/app/actions';
import { Tables } from '@/lib/database.types';

// Define the Message type from the database schema
type Message = Tables<'messages'>;
import RealtimeMessages from '@/components/RealtimeMessages';
import useSWR from 'swr';
import DashboardSection from '@/components/DashboardSection';

interface ProjectDetailPageProps {
  params: {
    id: string;
  };
}

const supabase = createClient();

// Fetcher now gets both project and messages
const fetcher = async (projectId: string) => {
  const { data: project, error: projectError } = await supabase
    .from('projects')
    .select('id, name')
    .eq('id', projectId)
    .single();

  if (projectError) throw projectError;
  if (!project) throw new Error('Project not found');

  const { data: messages, error: messagesError } = await supabase
    .from('messages')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: true });

  if (messagesError) throw messagesError;

  return { project, messages: messages as Message[] };
};

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { data, error, isLoading } = useSWR(
    params.id ? ['project-details', params.id] : null,
    () => fetcher(params.id)
  );

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto animate-pulse">
        <div className="mb-8">
          <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
          <div className="h-8 bg-gray-600 rounded w-1/2"></div>
        </div>
        <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
          <div className="h-40 bg-gray-800 rounded"></div>
          <div className="mt-8 border-t border-gray-700 pt-6">
            <div className="h-10 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="p-8 text-center text-red-400">Error al cargar el proyecto: {error.message}</p>;
  }

  if (!data) {
    return <p className="p-8 text-center text-kapi-gris-medio">Proyecto no encontrado.</p>;
  }

  const { project, messages } = data;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <p className="text-sm text-gray-400">Proyecto</p>
        <h1 className="text-3xl font-bold text-white">{project.name}</h1>
      </div>

      <DashboardSection>
        <RealtimeMessages 
          serverMessages={messages}
          projectId={project.id}
        />
        <div className="mt-8 border-t border-gray-700 pt-6">
          <MessageForm 
            projectId={project.id}
            addMessageAction={addMessageToProject}
          />
        </div>
      </DashboardSection>
    </div>
  );
}