import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl text-kapi-gris-claro">
      <h1 className="text-4xl font-bold mb-6 text-white">Política de Privacidad de Portal Kapi</h1>
      <p className="text-sm text-gray-400 mb-8">**Fecha de entrada en vigor:** 4 de septiembre de 2025</p>

      <p className="mb-4">
        En Portal Kapi, valoramos y respetamos la privacidad de los datos de nuestros clientes. Esta Política de Privacidad describe cómo recopilamos, utilizamos y protegemos la información obtenida a través de nuestra herramienta "Portal Kapi", diseñada para proporcionar informes de rendimiento de campañas publicitarias.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4 text-white">1. Información que Recopilamos</h2>
      <p className="mb-4">
        Portal Kapi se conecta a la API de Google Ads (Application Programming Interface) para acceder y recopilar datos de rendimiento de las cuentas publicitarias de nuestros clientes. La información que recopilamos se limita estrictamente a datos relacionados con el rendimiento de las campañas, incluyendo, pero no limitado a:
      </p>
      <ul className="list-disc list-inside mb-4 ml-4">
        <li><strong>Métricas de rendimiento:</strong> Clics, impresiones, costo, conversiones, costo por conversión, y otras métricas relevantes para la evaluación de campañas publicitarias.</li>
        <li><strong>Datos de configuración de campañas:</strong> Nombres de campañas, grupos de anuncios, palabras clave, etc., necesarios para estructurar los informes.</li>
      </ul>
      <p className="mb-4">
        <strong>Importante:</strong> Portal Kapi no recopila ni procesa datos personales de los usuarios finales (por ejemplo, visitantes de sitios web) a través de la API de Google Ads. La información obtenida se refiere exclusivamente al rendimiento agregado de las campañas publicitarias.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4 text-white">2. Uso de la Información</h2>
      <p className="mb-4">
        La información recopilada a través de la API de Google Ads se utiliza con el único y exclusivo propósito de:
      </p>
      <ul className="list-disc list-inside mb-4 ml-4">
        <li><strong>Generar y mostrar informes de rendimiento:</strong> Proporcionar a nuestros clientes una visión clara y detallada del desempeño de sus campañas publicitarias.</li>
        <li><strong>Análisis interno:</strong> Realizar análisis para mejorar la calidad y la relevancia de los informes ofrecidos a nuestros clientes.</li>
        <li><strong>Cumplimiento contractual:</strong> Cumplir con las obligaciones contractuales y de servicio acordadas con nuestros clientes.</li>
      </ul>
      <p className="mb-4">
        <strong>Portal Kapi no utiliza esta información para fines publicitarios, de marketing directo, ni para la creación de perfiles de usuario.</strong>
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4 text-white">3. Compartición y Divulgación de la Información</h2>
      <p className="mb-4">
        En Portal Kapi, nos comprometemos a no compartir, vender, alquilar ni divulgar la información de rendimiento de Google Ads de nuestros clientes a terceros no autorizados.
      </p>
      <ul className="list-disc list-inside mb-4 ml-4">
        <li><strong>Con el Cliente:</strong> La información es accesible únicamente por el cliente titular de la cuenta de Google Ads y por el personal autorizado de nuestra agencia, estrictamente para los fines de reporte y análisis acordados.</li>
        <li><strong>Proveedores de Servicios:</strong> Podemos utilizar proveedores de servicios externos que nos ayuden en la operación de la herramienta (ej. servicios de alojamiento web), quienes estarán sujetos a estrictas obligaciones de confidencialidad y seguridad de datos.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-4 text-white">4. Seguridad de los Datos</h2>
      <p className="mb-4">
        Implementamos medidas de seguridad técnicas y organizativas robustas para proteger la información recopilada contra el acceso no autorizado, la alteración, la divulgación o la destrucción. Estas medidas incluyen:
      </p>
      <ul className="list-disc list-inside mb-4 ml-4">
        <li><strong>Conexiones Seguras:</strong> Todas las comunicaciones con la API de Google Ads se realizan a través de conexiones cifradas (HTTPS/SSL).</li>
        <li><strong>Control de Acceso:</strong> El acceso a los datos está restringido únicamente al personal autorizado que lo necesita para cumplir con sus funciones.</li>
        <li><strong>Almacenamiento Seguro:</strong> Los datos se almacenan en entornos seguros con medidas de protección adecuadas.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-4 text-white">5. Retención de Datos</h2>
      <p className="mb-4">
        Retenemos la información de rendimiento de Google Ads durante el tiempo que sea necesario para cumplir con los fines para los que fue recopilada, para cumplir con nuestras obligaciones legales y contractuales, o según lo requiera la ley aplicable.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4 text-white">6. Derechos del Cliente</h2>
      <p className="mb-4">
        Como titular de los datos de rendimiento de Google Ads, usted tiene derecho a:
      </p>
      <ul className="list-disc list-inside mb-4 ml-4">
        <li>Acceder a sus datos.</li>
        <li>Solicitar la corrección de datos inexactos.</li>
        <li>Solicitar la eliminación de sus datos, sujeto a nuestras obligaciones legales y contractuales.</li>
      </ul>
      <p className="mb-4">
        Para ejercer estos derechos, por favor, póngase en contacto con nosotros a través de la información de contacto proporcionada al final de esta política.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4 text-white">7. Cambios en esta Política de Privacidad</h2>
      <p className="mb-4">
        Podemos actualizar esta Política de Privacidad periódicamente para reflejar cambios en nuestras prácticas de datos o en la legislación aplicable. Notificaremos a nuestros clientes sobre cualquier cambio significativo publicando la política actualizada en nuestra página web.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4 text-white">8. Contacto</h2>
      <p className="mb-4">
        Si tiene alguna pregunta sobre esta Política de Privacidad o sobre nuestras prácticas de datos, por favor, póngase en contacto con nosotros en:
      </p>
      <ul className="list-disc list-inside mb-4 ml-4">
        <li>[Dirección de correo electrónico de contacto]</li>
        <li>[Dirección física (opcional)]</li>
        <li>[Número de teléfono (opcional)]</li>
      </ul>
    </div>
  );
};

export default PrivacyPolicyPage;
