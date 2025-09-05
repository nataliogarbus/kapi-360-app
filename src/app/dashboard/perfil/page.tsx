'use client';

import { createClient } from '@/lib/supabase/client';
import ProfileForm from '@/components/ProfileForm';
import useSWR from 'swr';

const supabase = createClient();

const fetcher = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('full_name, company_name')
    .eq('id', user.id)
    .single();

  if (error) {
    throw error;
  }
  if (!profile) {
    return { full_name: '', company_name: '' };
  }

  return profile;
};

export default function ProfilePage() {
  const { data: profile, error, isLoading } = useSWR('user-profile', fetcher);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-kapi-gris-claro">Mi Perfil</h1>
      <div className="max-w-xl">
        {isLoading && (
          <div className="animate-pulse space-y-6">
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded w-1/4"></div>
              <div className="h-10 bg-gray-700 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded w-1/4"></div>
              <div className="h-10 bg-gray-700 rounded"></div>
            </div>
            <div className="flex justify-end">
              <div className="h-12 bg-gray-600 rounded w-1/3"></div>
            </div>
          </div>
        )}
        {error && (
          <p className="text-red-400">Error al cargar el perfil: {error.message}</p>
        )}
        {profile && (
          <ProfileForm profile={profile} />
        )}
      </div>
    </div>
  );
}