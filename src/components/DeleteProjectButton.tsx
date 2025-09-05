'use client';

import { deleteProject } from "@/app/actions";
import toast from "react-hot-toast";

interface DeleteProjectButtonProps {
  projectId: string;
}

export default function DeleteProjectButton({ projectId }: DeleteProjectButtonProps) {
  const handleClick = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este proyecto? Esta acción es irreversible.')) {
      const result = await deleteProject(projectId);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success('Proyecto eliminado con éxito');
        // The page will be revalidated by the server action
      }
    }
  };

  return (
    <button 
      onClick={handleClick}
      className="text-red-500 hover:text-red-400 transition-colors"
    >
      Eliminar
    </button>
  );
}
