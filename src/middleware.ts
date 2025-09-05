import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Helper function to create a Supabase client
const createSupabaseClient = (request: NextRequest) => {
  let response = NextResponse.next({ request: { headers: request.headers } })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )
  return { supabase, response }
}

export async function middleware(request: NextRequest) {
  const { supabase, response } = createSupabaseClient(request)
  const { data: { session } } = await supabase.auth.getSession()
  const { pathname } = request.nextUrl

  // Rule 1: Protect all /dashboard routes
  if (!session && pathname.startsWith('/dashboard')) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/login'
    redirectUrl.searchParams.set(`redirectedFrom`, pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Rule 2: Protect /dashboard/admin routes for non-admins
  if (session && pathname.startsWith('/dashboard/admin')) {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    // If there's an error or the profile is not found, or the role is not equipo_kapi, redirect.
    if (error || !profile || profile.role !== 'equipo_kapi') {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/dashboard/proyectos' // Redirect to a safe default page
      return NextResponse.redirect(redirectUrl)
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
