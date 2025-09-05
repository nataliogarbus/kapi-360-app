'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import type { Database } from '@/lib/database.types';

export async function deleteProject(projectId: string) {
  if (!projectId) {
    return { error: 'ID de proyecto inválido.' };
  }

  const cookieStore = cookies();
  const supabase = createClient();

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', projectId);

  if (error) {
    console.error('Error deleting project:', error);
    return { error: 'Error al eliminar el proyecto.' };
  }

  revalidatePath('/dashboard/admin');
  return { success: true };
}

export async function signOut() {
  const cookieStore = cookies();
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect('/login');
}

export async function updateProject(formData: FormData) {
  const projectId = formData.get('projectId') as string;
  const name = formData.get('name') as string;
  const statusFromForm = formData.get('status') as string;
  const assignedUserIds = formData.getAll('userIds') as string[];

  // Define and validate the status to match the database enum
  const allowedStatuses = ["Planificación", "Activo", "En Pausa", "Completado", "Cancelado"] as const;
  type ProjectStatus = typeof allowedStatuses[number];

  if (!allowedStatuses.includes(statusFromForm as any)) {
    return { error: `Estado inválido proporcionado: ${statusFromForm}` };
  }
  const status = statusFromForm as ProjectStatus;

  const cookieStore = cookies();
  const supabase = createClient();

  // 1. Update project details
  const updateData: Database['public']['Tables']['projects']['Update'] = { name, status };
  const { error: projectError } = await supabase
    .from('projects')
    .update(updateData)
    .eq('id', projectId);

  if (projectError) {
    console.error('Error updating project:', projectError);
    return { error: 'Error al actualizar el proyecto.' };
  }

  // 2. Get current user assignments for this project
  const { data: currentAssignments, error: fetchError } = await supabase
    .from('project_users')
    .select('user_id')
    .eq('project_id', projectId);

  if (fetchError) {
    console.error('Error fetching current assignments:', fetchError);
    return { error: 'Error al obtener asignaciones actuales.' };
  }

  const currentAssignedIds = currentAssignments.map(a => a.user_id);

  // 3. Determine users to add and remove
  const usersToAdd = assignedUserIds.filter(id => !currentAssignedIds.includes(id));
  const usersToRemove = currentAssignedIds.filter(id => !assignedUserIds.includes(id));

  // 4. Add new assignments
  if (usersToAdd.length > 0) {
    const newAssignments = usersToAdd.map(userId => ({ project_id: projectId, user_id: userId }));
    const { error: addError } = await supabase.from('project_users').insert(newAssignments);
    if (addError) {
      console.error('Error adding users:', addError);
      return { error: 'Error al asignar nuevos usuarios.' };
    }
  }

  // 5. Remove old assignments
  if (usersToRemove.length > 0) {
    const { error: removeError } = await supabase
      .from('project_users')
      .delete()
      .eq('project_id', projectId)
      .in('user_id', usersToRemove);
    if (removeError) {
      console.error('Error removing users:', removeError);
      return { error: 'Error al quitar asignaciones de usuarios.' };
    }
  }

  revalidatePath('/dashboard/admin');
  revalidatePath(`/dashboard/proyectos/${projectId}`);
}

export async function createProject(formData: FormData) {
  const name = formData.get('name') as string;
  const status = formData.get('status') as string;

  if (!name || !status) {
    return { error: 'Nombre y estado son requeridos.' };
  }

  const cookieStore = cookies();
  const supabase = createClient();

  const { data, error } = await supabase
    .from('projects')
    .insert([{ name, status }])
    .select()
    .single();

  if (error) {
    console.error('Error creating project:', error);
    return { error: 'No se pudo crear el proyecto.' };
  }

  revalidatePath('/dashboard/admin');
  // We will redirect in the component after getting a success response
}

// This is a new, more robust action for adding messages.
export async function addMessageToProject(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const content = formData.get('content');
  const projectId = formData.get('project_id');

  if (typeof content !== 'string' || content.trim() === '') {
    return { success: false, error: 'El contenido no puede estar vacío.' };
  }

  if (typeof projectId !== 'string') {
    console.error('Project ID is missing or not a string');
    return { success: false, error: 'Falta el ID del proyecto.' };
  }

  const cookieStore = cookies();
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'Usuario no autenticado.' };
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    console.error('Could not retrieve user profile:', profileError);
    return { success: false, error: 'No se pudo verificar el perfil del usuario.' };
  }

  const { error } = await supabase.from('messages').insert({
    project_id: projectId,
    content: content,
    user_id: user.id,
    author_role: profile.role,
  });

  if (error) {
    console.error('Error inserting message:', error);
    return { success: false, error: 'No se pudo guardar el mensaje en la base de datos.' };
  }

  // Revalidate path so the new message appears on page reload for non-JS users
  // or on first load. Realtime handles the instant update.
  revalidatePath(`/dashboard/proyectos/${projectId}`);

  return { success: true };
}


export async function addMessage(projectId: string, formData: FormData) {
  const content = formData.get('content')

  if (typeof content !== 'string' || content.trim() === '') {
    return { error: 'El contenido del mensaje no puede estar vacío.' };
  }

  const cookieStore = cookies();
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Debes iniciar sesión para enviar un mensaje.' };
  }

  const { error } = await supabase.from('messages').insert({
    project_id: projectId,
    content: content,
    sender_id: user.id,
  });

  if (error) {
    console.error('Error inserting message:', error);
    return { error: 'No se pudo enviar el mensaje.' };
  }

  // Refresca la página para mostrar el nuevo mensaje
  revalidatePath(`/dashboard/proyectos/${projectId}`);
  
  return { success: true };
}

export async function updateProfile(formData: FormData) {
  const fullName = formData.get('fullName') as string;
  const companyName = formData.get('companyName') as string;

  const cookieStore = cookies();
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Debes iniciar sesión para actualizar tu perfil.' };
  }

  const { error } = await supabase.from('profiles').update({
    full_name: fullName,
    company_name: companyName,
    updated_at: new Date().toISOString(),
  }).eq('id', user.id);

  if (error) {
    console.error('Error updating profile:', error);
    return { error: 'No se pudo actualizar el perfil.' };
  }

  // Revalida el path del perfil y el layout del dashboard para que la sidebar se actualice
  revalidatePath('/dashboard/perfil');
  revalidatePath('/dashboard');

  return { success: true, message: 'Perfil actualizado correctamente.' };
}

export async function signUp(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const fullName = formData.get('fullName') as string;
  const companyName = formData.get('companyName') as string;

  const cookieStore = cookies();
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // Pasamos los datos adicionales aquí. El trigger se encargará del resto.
      data: {
        full_name: fullName,
        company_name: companyName,
      },
    },
  });

  if (error) {
    console.error('Sign Up Error:', error);
    return { error: `No se pudo crear la cuenta: ${error.message}` };
  }

  return { success: true, message: '¡Cuenta creada! Revisa tu correo para verificar tu cuenta.' };
}