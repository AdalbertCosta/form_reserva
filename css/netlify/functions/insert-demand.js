// netlify/functions/insert-demand.js
export async function handler(event) {
  try {
    const data = JSON.parse(event.body);

    const response = await fetch(`${process.env.VITE_SUPABASE_URL}/rest/v1/demandas`, {
      method: "POST",
      headers: {
        apikey: process.env.VITE_SUPABASE_KEY,
        Authorization: `Bearer ${process.env.VITE_SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const erro = await response.text();
      return { statusCode: response.status, body: erro };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "✅ Solicitação enviada com sucesso!" })
    };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
