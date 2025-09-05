import { NextRequest, NextResponse } from 'next/server';
import { GoogleAdsApi } from 'google-ads-api';

export async function GET(request: NextRequest) {
  try {
    const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
    const loginCustomerId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID;
    const clientId = process.env.GOOGLE_ADS_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET;
    const refreshToken = process.env.GOOGLE_ADS_REFRESH_TOKEN;

    // --- VERIFICACIÓN EXPLÍCITA DE VARIABLES DE ENTORNO ---
    console.log('--- Auditoría de Variables de Entorno de Google Ads API ---');
    console.log('GOOGLE_ADS_DEVELOPER_TOKEN:', developerToken ? `${developerToken.substring(0, 4)}...${developerToken.substring(developerToken.length - 4)}` : 'NO_DEFINIDA');
    console.log('GOOGLE_ADS_LOGIN_CUSTOMER_ID:', loginCustomerId ? `${loginCustomerId.substring(0, 3)}...${loginCustomerId.substring(loginCustomerId.length - 3)}` : 'NO_DEFINIDA');
    console.log('GOOGLE_ADS_CLIENT_ID:', clientId ? `${clientId.substring(0, 4)}...${clientId.substring(clientId.length - 4)}` : 'NO_DEFINIDA');
    console.log('GOOGLE_ADS_CLIENT_SECRET:', clientSecret ? `${clientSecret.substring(0, 4)}...${clientSecret.substring(clientSecret.length - 4)}` : 'NO_DEFINIDA');
    console.log('GOOGLE_ADS_REFRESH_TOKEN:', refreshToken ? `${refreshToken.substring(0, 4)}...${refreshToken.substring(refreshToken.length - 4)}` : 'NO_DEFINIDA');
    console.log('----------------------------------------------------');
    // --- FIN VERIFICACIÓN EXPLÍCITA ---

    // Validación de variables de entorno
    if (!developerToken || !loginCustomerId || !clientId || !clientSecret || !refreshToken) {
      console.error('ERROR: Faltan una o más variables de entorno de Google Ads API.');
      return NextResponse.json({
        error: 'Faltan una o más variables de entorno de Google Ads API.',
        details: {
          developerToken: !!developerToken,
          loginCustomerId: !!loginCustomerId,
          clientId: !!clientId,
          clientSecret: !!clientSecret,
          refreshToken: !!refreshToken,
        }
      }, { status: 500 });
    }

    // --- RECONSTRUCCIÓN DEL OBJETO CLIENTE ---
    const client = new GoogleAdsApi({
      developer_token: developerToken,
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      login_customer_id: loginCustomerId,
    });
    // --- FIN RECONSTRUCCIÓN ---

    // Llamada a la API
    const accessibleCustomers = await client.listAccessibleCustomers();

    return NextResponse.json({
      message: 'Conexión con Google Ads API exitosa y clientes accesibles listados.',
      accessibleCustomers: accessibleCustomers,
    });

  } catch (error: any) {
    // --- MANEJO DE ERRORES DETALLADO ---
    console.error('--- ERROR EN LA LLAMADA A GOOGLE ADS API ---');
    console.error(error); // Imprime el objeto de error completo
    console.error('Mensaje de error:', error.message);
    if (error.errors) { // Para errores específicos de la API de Google Ads
      console.error('Errores de la API:', JSON.stringify(error.errors, null, 2));
    }
    console.error('------------------------------------------');
    // --- FIN MANEJO DE ERRORES DETALLADO ---

    return NextResponse.json({
      error: error.message || 'Error interno del servidor al conectar con Google Ads API.',
      api_error_details: error.errors ? error.errors : undefined, // Incluir detalles de la API si existen
    }, { status: 500 });
  }
}