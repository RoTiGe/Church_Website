import axios from "axios";

export async function POST(req) {
    const { amount, currency } = await req.json();
    const formattedAmount = parseFloat(amount).toFixed(2);
    const APP_URL = process.env.APP_URL;
    const PAYPAL_CLIENT = process.env.PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
    const isSandbox = process.env.PAYPAL_MODE === "sandbox";
    const PAYPAL_API = isSandbox ? "https://api-m.sandbox.paypal.com" : "https://api-m.paypal.com";

    if (!APP_URL || !PAYPAL_CLIENT || !PAYPAL_SECRET) {
        return new Response(JSON.stringify({ error: "Missing PayPal or app configuration." }), { status: 500 });
    }

    try {
        // Get access token
        const tokenRes = await axios.post(
            `${PAYPAL_API}/v1/oauth2/token`,
            "grant_type=client_credentials",
            {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                auth: { username: PAYPAL_CLIENT, password: PAYPAL_SECRET },
            }
        );
        const accessToken = tokenRes.data.access_token;

        // Create order
        const orderRes = await axios.post(
            `${PAYPAL_API}/v2/checkout/orders`,
            {
                intent: "CAPTURE",
                purchase_units: [
                    {
                        amount: { currency_code: currency, value: formattedAmount },
                    },
                ],
                application_context: {
                    return_url: `${APP_URL}/donate/verify`,
                    cancel_url: `${APP_URL}/donate/cancel`,
                    user_action: "PAY_NOW",
                },
            },
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        return new Response(JSON.stringify(orderRes.data), { status: 200 });
    } catch (err) {
        console.log("Error creating order: ", err.message)
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}