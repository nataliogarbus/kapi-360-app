'use client';

import { useRef } from 'react';
import { useFormStatus } from 'react-dom';
import toast from 'react-hot-toast';

interface MessageFormProps {
  projectId: string;
  addMessageAction: (formData: FormData) => Promise<{ success: boolean; error?: string }>;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      aria-disabled={pending}
      disabled={pending}
      className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {pending ? 'Enviando...' : 'Enviar'}
    </button>
  );
}

export default function MessageForm({ projectId, addMessageAction }: MessageFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    if (!formData.get('content')?.toString().trim()) {
      toast.error('El mensaje no puede estar vacío.');
      return;
    }

    const result = await addMessageAction(formData);

    if (result.success) {
      toast.success('Mensaje enviado');
      formRef.current?.reset();
    } else {
      toast.error(result.error || 'Ocurrió un error al enviar el mensaje.');
    }
  };

  return (
    <form 
      ref={formRef}
      action={handleSubmit}
      className="mt-6 flex items-start space-x-4"
    >
      <input type="hidden" name="project_id" value={projectId} />
      <div className="flex-1">
        <label htmlFor="messageContent" className="sr-only">Escribe tu mensaje aquí...</label>
        <textarea
          id="messageContent"
          name="content"
          required
          rows={3}
          className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-white"
          placeholder="Escribe tu mensaje aquí..."
        ></textarea>
      </div>
      <SubmitButton />
    </form>
  );
}
