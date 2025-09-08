
import ReactMarkdown from 'react-markdown';

const termsText = `
# Términos y Condiciones del Servicio – Portal Kapi

**Última actualización:** 8 de septiembre de 2025

Bienvenido a Portal Kapi. Estos Términos y Condiciones ("Términos") rigen su acceso y uso de la plataforma Portal Kapi (en adelante, la "Plataforma" o el "Servicio"), propiedad de y operada por Kapi (en adelante, "Kapi", "nosotros" o "nuestro").

### 1. Aceptación de los Términos

Al acceder, registrarse o utilizar la Plataforma, usted ("el Usuario") confirma que ha leído, entendido y aceptado estar legalmente vinculado por los presentes Términos y nuestra Política de Privacidad. Si no está de acuerdo con alguna de estas condiciones, no debe utilizar el Servicio.

### 2. Descripción del Servicio

Portal Kapi es una plataforma de software como servicio (SaaS) diseñada para ofrecer a los clientes de Kapi un portal centralizado para:
*   Visualizar el estado, progreso y entregables de sus proyectos de marketing contratados.
*   Facilitar la comunicación directa con el equipo de Kapi.
*   Consultar y analizar métricas de rendimiento de sus propias campañas publicitarias en plataformas de terceros (por ejemplo, Google Ads), las cuales son importadas y mostradas a través de la Plataforma.

### 3. Cuentas de Usuario

Para acceder al Servicio, el Usuario debe registrarse y crear una cuenta. El Usuario se compromete a proporcionar información veraz, actual y completa durante el proceso de registro.

El Usuario es el único responsable de mantener la estricta confidencialidad de sus credenciales de acceso y de todas las actividades que ocurran bajo su cuenta. Deberá notificar a Kapi inmediatamente sobre cualquier uso no autorizado de su cuenta o cualquier otra violación de seguridad.

### 4. Uso Aceptable

El Usuario se compromete a utilizar el Servicio de manera responsable y lícita. Queda estrictamente prohibido:
*   Utilizar la Plataforma para cualquier propósito ilegal o no autorizado.
*   Intentar realizar ingeniería inversa, descompilar, desensamblar o tratar de descubrir el código fuente de la Plataforma.
*   Interferir o interrumpir la integridad o el rendimiento del Servicio y sus sistemas.
*   Vender, revender, alquilar o arrendar el acceso a la Plataforma.
*   Utilizar la Plataforma para almacenar o transmitir material infractor, calumnioso o ilegal.

### 5. Limitación de Responsabilidad

La Plataforma se proporciona "tal cual" y "según disponibilidad". Los datos y métricas que se muestran, especialmente aquellos importados de servicios de terceros como Google Ads, se presentan con fines informativos y de seguimiento.

Kapi no garantiza la exactitud, integridad o actualidad absoluta de dichos datos, ya que dependen de la disponibilidad y precisión de las API de terceros.

**Kapi no será responsable, bajo ninguna circunstancia, de las decisiones comerciales, estratégicas, operativas o financieras que el Usuario tome basándose en la información, los datos o las métricas presentadas en el Portal. La interpretación de los datos y las acciones consecuentes son de exclusiva responsabilidad del Usuario.**

### 6. Propiedad Intelectual

Todos los derechos, títulos e intereses sobre el Servicio, incluyendo el software, el diseño, la interfaz de usuario, los gráficos, los logotipos, el nombre "Kapi" y todo el contenido editorial (excluyendo los datos del Usuario), son y seguirán siendo propiedad exclusiva de Kapi y sus licenciantes.

Los datos del Usuario, que incluyen la información de sus proyectos y las métricas de rendimiento de sus campañas, siguen siendo en todo momento propiedad del Usuario. Kapi solo tiene derecho a utilizar estos datos para la prestación del Servicio.

### 7. Terminación

Kapi se reserva el derecho de suspender o cancelar el acceso de un Usuario a la Plataforma, sin previo aviso, si determina que ha habido un incumplimiento de estos Términos.

El Usuario puede solicitar la cancelación de su cuenta en cualquier momento, contactando al equipo de Kapi a través de los canales de soporte designados. La terminación de la cuenta resultará en la desactivación del acceso al Servicio.

### 8. Legislación Aplicable y Jurisdicción

Estos Términos y Condiciones se regirán e interpretarán de acuerdo con las leyes de la República Argentina. Cualquier disputa, controversia o reclamo que surja en relación con estos Términos será sometido a la jurisdicción exclusiva de los tribunales competentes de la Ciudad Autónoma de Buenos Aires, Argentina.

---
**Contacto:**

Si tiene alguna pregunta sobre estos Términos, por favor, contáctenos en hola@kapi.com.ar.
`;

export default function TerminosYCondicionesPage() {
  return (
    <main className="bg-gray-950 text-kapi-gris-claro min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="prose prose-invert max-w-4xl mx-auto">
          <ReactMarkdown>{termsText}</ReactMarkdown>
        </div>
      </div>
    </main>
  );
}
