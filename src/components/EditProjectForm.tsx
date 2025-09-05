'use client';

import { updateProject } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import toast from 'react-hot-toast';
import DashboardSection from './DashboardSection';

// Define types for the props
interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
}

interface Project {
  id: string;
  name: string;
  status: string;
}

interface EditProjectFormProps {
  project: Project;
  allUsers: UserProfile[];
  assignedUserIds: string[];
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50">
      {pending ? 'Guardando Cambios...' : 'Guardar Cambios'}
    </button>
  );
}

export default function EditProjectForm({ project, allUsers, assignedUserIds }: EditProjectFormProps) {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const result = await updateProject(formData);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success('Proyecto actualizado con éxito');
      router.push('/dashboard/admin');
    }
  };

  return (
    <form action={handleSubmit} className="space-y-8">
      <input type="hidden" name="projectId" value={project.id} />
      
      <DashboardSection title="Detalles del Proyecto">
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Nombre del Proyecto</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              defaultValue={project.name}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white"
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-2">Estado</label>
            <select
              id="status"
              name="status"
              required
              defaultValue={project.status}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white"
            >
              <option>Pendiente</option>
              <option>Activo</option>
              <option>En Pausa</option>
              <option>Finalizado</option>
            </select>
          </div>
        </div>
      </DashboardSection>

      <DashboardSection title="Asignar Usuarios">
        <ul className="space-y-4">
          {allUsers.map(user => (
            <li key={user.id}>
              <label className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg cursor-pointer hover:bg-gray-900 transition-colors">
                <div>
                  <p className="font-medium text-white">{user.full_name}</p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
                <input
                  type="checkbox"
                  name="userIds"
                  value={user.id}
                  defaultChecked={assignedUserIds.includes(user.id)}
                  className="h-5 w-5 rounded border-gray-600 text-indigo-600 focus:ring-indigo-500 bg-gray-800"
                />
              </label>
            </li>
          ))}
        </ul>
      </DashboardSection>

      <SubmitButton />
    </form>
  );
}

