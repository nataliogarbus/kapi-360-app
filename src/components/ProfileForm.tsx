'use client'

import { useState } from 'react'
import { updateProfile } from '@/app/actions'

// Definimos un tipo para los datos del perfil que el formulario espera
type Profile = {
  full_name: string | null;
  company_name: string | null;
};

export default function ProfileForm({ profile }: { profile: Profile }) {
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const result = await updateProfile(formData);
    if (result.error) {
      setMessage({ type: 'error', text: result.error });
    } else if (result.success && result.message) {
      setMessage({ type: 'success', text: result.message });
    }
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-kapi-gris-medio mb-2">
          Nombre Completo
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          defaultValue={profile.full_name ?? ''}
          className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-kapi-azul-electrico text-white"
        />
      </div>

      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-kapi-gris-medio mb-2">
          Nombre de la Empresa
        </label>
        <input
          id="companyName"
          name="companyName"
          type="text"
          defaultValue={profile.company_name ?? ''}
          className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-kapi-azul-electrico text-white"
        />
      </div>

      <div className="flex items-center justify-end gap-4">
        {message && (
          <p 
            role="status"
            className={`${message.type === 'success' ? 'text-green-400' : 'text-red-400'} text-sm`}>
            {message.text}
          </p>
        )}
        <button
          type="submit"
          className="inline-flex justify-center rounded-lg border border-transparent bg-kapi-azul-electrico py-2 px-4 text-sm font-bold text-white shadow-sm hover:bg-kapi-azul-hover focus:outline-none focus:ring-2 focus:ring-kapi-azul-electrico focus:ring-offset-2 focus:ring-offset-kapi-negro-suave"
        >
          Guardar Cambios
        </button>
      </div>
    </form>
  );
}
