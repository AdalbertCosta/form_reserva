// netlify/functions/insert-demand.js
export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Método não permitido" })
      };
    }

    const data = JSON.parse(event.body);

    const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/demandas`, {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const erro = await response.text();
      console.error("Erro Supabase:", erro);
      return { statusCode: response.status, body: erro };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "✅ Solicitação enviada com sucesso!" })
    };

  } catch (err) {
    console.error("Erro inesperado:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
