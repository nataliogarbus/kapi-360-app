'use client';

import { createProject } from '@/app/actions';
import { useRouter } from 'next/navigation';
// Correct import for useFormStatus from react-dom
import { useFormStatus } from 'react-dom';
import toast from 'react-hot-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50">
      {pending ? 'Creando Proyecto...' : 'Crear Proyecto'}
    </button>
  );
}

export default function NewProjectPage() {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    // The server action now returns a result object
    const result = await createProject(formData);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success('Proyecto creado con éxito');
      router.push('/dashboard/admin');
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Crear Nuevo Proyecto</h1>
      <form action={handleSubmit} className="space-y-6 bg-gray-800/20 border border-gray-700 rounded-lg p-8">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Nombre del Proyecto</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white"
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-2">Estado</label>
          <select
            id="status"
            name="status"
            required
            defaultValue="Pendiente"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white"
          >
            <option>Pendiente</option>
            <option>Activo</option>
            <option>En Pausa</option>
            <option>Finalizado</option>
          </select>
        </div>
        <SubmitButton />
      </form>
    </div>
  );
}