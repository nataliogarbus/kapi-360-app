
# Hoja de Ruta y Estado Actual del Proyecto - Portal Kapi

**Fecha:** 8 de septiembre de 2025

## Resumen del Estado Actual

El MVP inicial del Portal Kapi ha sido completamente depurado de errores de tipos que impedían su despliegue. La aplicación ahora se compila y despliega exitosamente en Vercel.

El próximo gran objetivo es completar la **verificación de la aplicación en la Consola de Google Cloud** para poder utilizar la API de Google Ads sin restricciones y con usuarios reales. Para lograrlo, es necesario grabar un video de demostración que muestre el flujo de consentimiento de OAuth.

## Planes de Desarrollo Evaluados

A continuación se detallan los dos próximos módulos de funcionalidades planificados y su evaluación técnica.

### Plan A: Implementación de Inicio de Sesión Social con Google (Autenticación)

- **Objetivo Estratégico:** Mejorar la experiencia de usuario y la seguridad, permitiendo que los clientes accedan al portal utilizando sus cuentas de Google existentes, eliminando la necesidad de recordar una nueva contraseña.

- **Fases de Implementación:**
  - **Configuración en Supabase (Backend):**
    - **Acción:** Habilitar Google como un proveedor de autenticación OAuth.
    - **Pasos:** Navegar a Authentication > Providers en Supabase, activar Google, y configurar con el Client ID/Secret de Google Cloud, asegurando que el URI de redireccionamiento de Supabase esté autorizado en las credenciales de Google.
  - **Implementación en Next.js (Frontend):**
    - **Acción:** Modificar la página de inicio de sesión para incluir la nueva opción.
    - **Prompt para Gemini:** "Implementa la funcionalidad de 'Inicio de Sesión con Google' en la página de login (`/app/login/page.tsx`). Añade un botón 'Iniciar Sesión con Google' que llame a `supabase.auth.signInWithOAuth()` con 'google' como proveedor, manejando la redirección."

- **Evaluación:** Este plan es técnicamente sólido, sigue las mejores prácticas de Supabase y es altamente recomendado para mejorar la UX. Su implementación es valiosa pero no es un bloqueante para la verificación de Google Ads.

### Plan B: Implementación de Autorización OAuth del Cliente (Conexión de Cuentas de Google Ads)

- **Objetivo Estratégico:** Automatizar y escalar el proceso de obtención de métricas, permitiendo que los clientes conecten de forma segura sus propias cuentas de Google Ads directamente desde el dashboard. Esto elimina la gestión manual de Refresh Tokens.

- **Fases de Implementación:**
  - **Creación del Flujo de Conexión (Frontend):**
    - **Acción:** Crear la interfaz y la lógica para que el usuario inicie el proceso de conexión.
    - **Prompt para Gemini:** "Crea el flujo para que un cliente conecte su cuenta de Google Ads. En una nueva página (`/dashboard/settings`), añade un botón 'Conectar con Google Ads' que redirija al usuario a la URL de consentimiento de Google, incluyendo `client_id`, `scope=adwords`, `response_type=code`, `access_type=offline` y `prompt=consent`."
  - **Manejo del Callback (Backend):**
    - **Acción:** Crear el endpoint de API que recibirá la respuesta de Google después de que el usuario conceda el permiso.
    - **Prompt para Gemini:** "Crea la ruta de API en `/app/api/oauth/google/callback/route.ts`. Esta ruta debe extraer el `code` de la URL, intercambiarlo por un `access_token` y un `refresh_token` haciendo un POST a `https://oauth2.googleapis.com/token`, y guardar de forma segura el `refresh_token` en la base de datos, asociándolo al perfil del cliente."

- **Evaluación:** Este plan es impecable. Describe el flujo técnico correcto y seguro para la autorización de datos de terceros (OAuth 2.0 Authorization Code Flow). **Es el requisito fundamental e indispensable para la verificación de Google.**

---

## Recomendación Estratégica y Prioridad

Para alcanzar el objetivo inmediato de **verificar la aplicación en Google**, es imperativo ejecutar el **Plan B** primero. El flujo de autorización descrito en el Plan B es exactamente lo que se debe grabar en el video de demostración para Google.

El Plan A puede ejecutarse en cualquier momento posterior para mejorar la experiencia de inicio de sesión.

## Próximo Paso Inmediato

Comenzar la implementación del **Plan B**, iniciando con la creación de la interfaz de usuario (frontend) para el flujo de conexión.

- **Acción Concreta:** Crear una nueva página en `/app/dashboard/settings/page.tsx` que contenga una sección de "Conexiones de Datos" y un botón de "Conectar con Google Ads".
