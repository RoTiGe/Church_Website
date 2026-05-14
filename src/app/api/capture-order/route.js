import axios from "axios";

export async function POST(req) {
  const { orderID } = await req.json();
  const PAYPAL_CLIENT = process.env.PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const isSandbox = process.env.PAYPAL_MODE === "sandbox";
  const PAYPAL_API = isSandbox ? "https://api-m.sandbox.paypal.com" : "https://api-m.paypal.com";

  if (!orderID) {
    return new Response(JSON.stringify({ error: "Missing PayPal orderID." }), { status: 400 });
  }

  if (!PAYPAL_CLIENT || !PAYPAL_SECRET) {
    return new Response(JSON.stringify({ error: "Missing PayPal credentials." }), { status: 500 });
  }

  try {
    const tokenRes = await axios.post(
      `${PAYPAL_API}/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        auth: { username: PAYPAL_CLIENT, password: PAYPAL_SECRET },
      },
    );
    const accessToken = tokenRes.data.access_token;

    const captureRes = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`,
      {},
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );

    const capture = captureRes.data.purchase_units?.[0]?.payments?.captures?.[0];
    const status = capture?.status || captureRes.data.status;

    return new Response(JSON.stringify({ status, raw: captureRes.data }), { status: 200 });
  } catch (err) {
    const statusCode = err.response?.status || 500;
    const errorData = err.response?.data || { error: err.message };

    console.log(`PayPal Error (${statusCode}):`, errorData);

    return new Response(JSON.stringify(errorData), {
      status: statusCode
    });
  }
}
