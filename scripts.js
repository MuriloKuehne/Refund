// variaveis de DOM
const form = document.querySelector("form");
const expenseList = document.querySelector("ul");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

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

form.onsubmit = (event) => {
  event.preventDefault();

  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    create_at: new Date(),
  };
  expenseAdd(newExpense);
};

function expenseAdd(newExpense) {
  try {
    // cria o elemento de li
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    // cria o icone da categoria
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", `${newExpense.category_name}`);

    // adiciona as informações no item;
    expenseItem.append(expenseIcon);
    expenseList.append(expenseItem);
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas");
    console.log(error);
  }
}
