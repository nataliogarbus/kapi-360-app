import Link from 'next/link';

type ProjectStatus = 'Activo' | 'En Pausa' | 'Finalizado' | 'Pendiente';

interface ProjectCardProps {
  id: string;
  name: string;
  status: ProjectStatus;
}

const statusClasses: { [key in ProjectStatus]: { container: string; dot: string; } } = {
  'Activo': { container: 'bg-green-900/50 text-green-300', dot: 'bg-green-500' },
  'En Pausa': { container: 'bg-yellow-900/50 text-yellow-300', dot: 'bg-yellow-500' },
  'Finalizado': { container: 'bg-gray-800/50 text-gray-400', dot: 'bg-gray-500' },
  'Pendiente': { container: 'bg-blue-900/50 text-blue-300', dot: 'bg-blue-500' },
};

export default function ProjectCard({ id, name, status }: ProjectCardProps) {
  const statusStyle = statusClasses[status] || statusClasses['Finalizado'];

  return (
    <Link 
      href={`/dashboard/proyectos/${id}`} 
      className="block p-6 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-slate-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
    >
      <h5 className="mb-3 text-xl font-bold tracking-tight text-kapi-gris-claro">{name}</h5>
      <div className="flex items-center justify-end">
        <div className={`inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full ${statusStyle.container}`}>
          <span className={`w-2 h-2 rounded-full ${statusStyle.dot}`}></span>
          <span>{status}</span>
        </div>
      </div>
    </Link>
  );
}
