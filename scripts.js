// variaveis de DOM
const amount = document.getElementById("amount");

// captura o evento do input amount.
amount.oninput = () => {
  // substitui o valor de letras por ' '.
  let value = amount.value.replace(/\D/g, "");

  // transforma o valor em centavos
  value = Number(value) / 100;

  //   atualiza o valor do input
  amount.value = formatCurrencyBRL(value);
};

function formatCurrencyBRL(value) {
  // formata o valor no padrao BRL
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return value;
}
