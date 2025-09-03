import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// 🔑 Coloque suas credenciais
const SUPABASE_URL = "https://nztpvwwoadamjpzbfegs.supabase.co";
const SUPABASE_KEY = "SUA-ANON-KEY";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const formulario = document.querySelector("form");
const msgStatus = document.createElement("div");
msgStatus.style.marginTop = "1rem";
formulario.appendChild(msgStatus);

formulario.addEventListener("submit", async (event) => {
  event.preventDefault();

  const botao = document.querySelector("form button");
  botao.disabled = true;
  botao.innerText = "Enviando...";

  const dados = {
    nome: document.getElementById("nome").value,
    telefone: document.getElementById("telefone").value,
    email: document.getElementById("email").value,
    servico: document.getElementById("servico").value,
    mensagem: document.getElementById("mensagem").value,
  };

  const { error } = await supabase.from("tabela_contato").insert([dados]);

  if (error) {
    msgStatus.innerHTML = `<p style="color:#E00000; background:#F7F7F7; padding:1rem; border-radius:4px;">
      ❌ Erro no envio: ${error.message}
    </p>`;
  } else {
    msgStatus.innerHTML = `<p style="color:#317A00; background:#F7F7F7; padding:1rem; border-radius:4px;">
      ✅ Mensagem enviada! Em breve entraremos em contato. Respondemos em até 24h.
    </p>`;
    formulario.reset();
  }

  botao.disabled = false;
  botao.innerText = "Enviar Mensagem";
});
