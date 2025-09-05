import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // Esto no debería ocurrir gracias al middleware, pero es una buena práctica de seguridad
    notFound();
  }

  // Obtenemos el perfil del usuario para pasarlo a la Sidebar
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, company_name')
    .eq('id', user.id)
    .single();

  return (
    <div className="flex h-screen bg-kapi-negro-suave text-kapi-gris-claro">
      <aside className="w-64 flex-shrink-0 bg-kapi-negro-suave border-r border-kapi-gris-oscuro">
        <Sidebar profile={profile} />
      </aside>
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
