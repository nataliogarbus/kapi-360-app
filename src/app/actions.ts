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
  const statusFromForm = formData.get('status') as string;

  // Define and validate the status to match the database enum
  const allowedStatuses = ["Planificación", "Activo", "En Pausa", "Completado", "Cancelado"] as const;
  type ProjectStatus = typeof allowedStatuses[number];

  if (!allowedStatuses.includes(statusFromForm as any)) {
    return { error: `Estado inválido proporcionado: ${statusFromForm}` };
  }
  const status = statusFromForm as ProjectStatus;

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

export async function sendRoiReport(data: {
  name: string;
  email: string;
  report: any;
}) {
  // 1. Validate Input
  if (!data.email || !data.name) {
    return { success: false, error: 'Nombre y Email son requeridos.' };
  }

  // 2. Check Configuration
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ADMIN_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error('SMTP Configuration missing');
    // In dev, we might pretend it worked or return error. 
    // For now, return error so the user knows they need to set it up.
    return { success: false, error: 'Error de configuración de correo (Faltan variables SMTP).' };
  }

  const nodemailer = await import('nodemailer');

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465, // true for 465, false for other ports
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  try {
    // 3. Email Content (HTML)
    const formatMoney = (val: number, currency: string) =>
      `${currency} ${val.toLocaleString()}`;

    const { traffic, leads, sales, revenue, requiredBudget, currency, mode } = data.report;

    const htmlContent = `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #111; color: #fff; padding: 30px; border-radius: 10px;">
                <h1 style="color: #00DD82; margin-bottom: 10px;">Tu Proyección de Crecimiento 🚀</h1>
                <p>Hola <strong>${data.name}</strong>,</p>
                <p>Gracias por usar la calculadora oficial de <strong>Kapi</strong>. Aquí tienes el resumen de tu simulación:</p>
                
                <div style="background: #222; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #aaa; font-size: 14px; text-transform: uppercase;">${mode === 'roi' ? 'Est. Ingresos' : 'Inv. Requerida'}</h3>
                    <p style="font-size: 36px; font-weight: bold; margin: 0; color: #00DD82;">
                        ${mode === 'roi' ? formatMoney(revenue, currency) : formatMoney(requiredBudget, currency)}
                    </p>
                </div>

                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #333;">Tráfico Est.</td>
                        <td style="padding: 10px; border-bottom: 1px solid #333; text-align: right; font-weight: bold;">~${traffic.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #333;">Leads Est.</td>
                        <td style="padding: 10px; border-bottom: 1px solid #333; text-align: right; font-weight: bold;">${leads.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #333;">Ventas Est.</td>
                        <td style="padding: 10px; border-bottom: 1px solid #333; text-align: right; font-weight: bold;">${sales.toLocaleString()}</td>
                    </tr>
                </table>

                <p style="font-size: 12px; color: #888;">
                    *Estas cifras son proyecciones basadas en promedios de la industria y no garantizan resultados exactos.
                </p>

                <div style="text-align: center; margin-top: 30px;">
                    <a href="https://kapi.com.ar" style="background: #00DD82; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                        Agendar Consultoría Gratuita
                    </a>
                </div>
            </div>
        `;

    // 4. Send Email to User
    await transporter.sendMail({
      from: `"Kapi Tools" <${SMTP_USER}>`,
      to: data.email,
      subject: '🚀 Tu Reporte de Proyección - Kapi',
      html: htmlContent,
    });

    // 5. Send Notification to Admin (Lead Capture)
    const adminHtml = `
            <h1>Nuevo Lead de Calculadora ROI</h1>
            <p><strong>Nombre:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <hr/>
            <h3>Datos de Simulación:</h3>
            <pre>${JSON.stringify(data.report, null, 2)}</pre>
        `;

    await transporter.sendMail({
      from: `"Kapi System" <${SMTP_USER}>`,
      to: ADMIN_EMAIL || 'contacto@kapi.com.ar', // Fallback
      subject: `[Lead] Nueva Simulación: ${data.name}`,
      html: adminHtml,
    });

    return { success: true };

  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: 'Hubo un error enviando el correo. ' + (error instanceof Error ? error.message : '') };
  }
}