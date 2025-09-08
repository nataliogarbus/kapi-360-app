import { NextResponse } from 'next/server';
import { GoogleAdsApi } from 'google-ads-api';

export async function GET() {
  try {
    // Extract environment variables
    const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
    const loginCustomerId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID; // This is the account we'll fetch metrics for
    const clientId = process.env.GOOGLE_ADS_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET;
    const refreshToken = process.env.GOOGLE_ADS_REFRESH_TOKEN;

    // Validate environment variables
    if (!developerToken || !clientId || !clientSecret || !refreshToken || !loginCustomerId) {
      console.error('Missing Google Ads API environment variables.');
      return NextResponse.json({ error: 'Missing Google Ads API environment variables.' }, { status: 500 });
    }

    // Instantiate the Google Ads API client
    const client = new GoogleAdsApi({
      client_id: clientId,
      client_secret: clientSecret,
      developer_token: developerToken,
    });

    // Create a customer instance using the login customer ID from env
    const customer = client.Customer({
      customer_id: loginCustomerId, 
      login_customer_id: loginCustomerId,
      refresh_token: refreshToken,
    });

    // GAQL (Google Ads Query Language) query to fetch the agreed-upon metrics
    const query = `
      SELECT
        metrics.clicks,
        metrics.impressions,
        metrics.cost_micros,
        metrics.conversions,
        metrics.ctr,
        segments.date
      FROM
        campaign
      WHERE
        segments.date DURING LAST_30_DAYS
      ORDER BY
        segments.date ASC
    `;

    const results = await customer.query(query);

    // Return the results
    return NextResponse.json(results);

  } catch (error: any) {
    console.error('Failed to fetch Google Ads metrics:', error);
    return NextResponse.json({
      error: error.message || 'Internal Server Error',
      details: error.errors || null,
    }, { status: 500 });
  }
}