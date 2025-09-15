<?php
// Dados do formulário
$nome       = $_POST['nome'];
$sobrenome  = $_POST['sobrenome'];
$cpf        = $_POST['cpf'];
$email      = $_POST['email'];
$cep        = $_POST['cep'];
$numero     = $_POST['numero'];
$logradouro = $_POST['logradouro'];
$bairro     = $_POST['bairro'];
$cidade     = $_POST['cidade'];
$estado     = $_POST['estado'];
$produto    = $_POST['produto'];
$areas      = isset($_POST['areas']) ? $_POST['areas'] : [];
$areasSelecionadas = implode(",", $areas);

// Monta payload JSON
$data = [
  "nome" => $nome,
  "sobrenome" => $sobrenome,
  "cpf" => $cpf,
  "email" => $email,
  "cep" => $cep,
  "numero" => $numero,
  "logradouro" => $logradouro,
  "bairro" => $bairro,
  "cidade" => $cidade,
  "estado" => $estado,
  "plano" => $produto,
  "areas" => $areasSelecionadas
];

$jsonData = json_encode($data);

// Chamada para Supabase
$ch = curl_init("https://SEU-PROJETO.supabase.co/rest/v1/prestadores");
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  "Content-Type: application/json",
  "apikey: SUA_API_KEY",
  "Authorization: Bearer SUA_API_KEY",
  "Prefer: return=minimal"
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);

$response = curl_exec($ch);
curl_close($ch);

if ($response === false) {
  echo "Erro ao salvar no banco.";
} else {
  echo "Cadastro realizado com sucesso!";
}
?>
