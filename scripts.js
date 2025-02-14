// variaveis de DOM
const form = document.querySelector("form");
const expenseList = document.querySelector("ul");
const expenseQuantity = document.querySelector("aside header p span");
const expenseTotal = document.querySelector("aside header h2");
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

// adiciona um novo item na lista
function expenseAdd(newExpense) {
  try {
    // cria o elemento de li
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    // cria o icone da categoria
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", `${newExpense.category_name}`);

    // cria a info da despesa
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    // cria o nome da despesa
    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    // cria a categoria da despesa;
    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    // adiciona nome e categoria na div de info de despesas
    expenseInfo.append(expenseName, expenseCategory);

    // cria o valor da despesa
    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<span><small>R$</small>${newExpense.amount
      .toUpperCase()
      .replace("R$", "")}</span>`;

    // cria o icone de remover
    const expenseRemove = document.createElement("img");
    expenseRemove.classList.add("remove-icon");
    expenseRemove.setAttribute("src", "img/remove.svg");
    expenseRemove.setAttribute("alt", "remove icon");

    // adiciona as informações no item;
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, expenseRemove);

    // adiciona o item na lista
    expenseList.append(expenseItem);

    // limpa o formulário
    formClear();

    // atualiza os totais
    updateTotals();

    // alerta um erro
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas");
    console.log(error);
  }
}

// atualiza os totais
function updateTotals() {
  try {
    // recuperar a quantidade de items li
    const items = expenseList.children;

    // atualiza a quantidade de items da lista
    expenseQuantity.textContent = `${items.length} ${
      items.length > 1 ? "despesas" : "despesa"
    }`;

    // var pra incrementar o total
    let total = 0;

    // percorre cada li
    for (let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector(".expense-amount");

      // remove caracteres não numericos e substitue ',' por '.'
      let value = itemAmount.textContent
        .replace(/[^\d,]/g, "")
        .replace(",", ".");

      // converte o valor para float
      value = parseFloat(value);

      // verifica se é um numero valido
      if (isNaN(value)) {
        return alert(
          "Não foi possível calcular o total. O valor não parece ser um número."
        );
      }

      // incrementar o valor total
      total += Number(value);
    }

    const symbolBRL = document.createElement("small");
    symbolBRL.textContent = "R$";

    // formata o valor e remove o R$, para mostrar apenas o do small.
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "");

    // adiciona o simbolo da moeda do small e o valor formatado
    expenseTotal.innerHTML = "";
    expenseTotal.append(symbolBRL, total);
    // alerta um erro
  } catch (error) {
    alert("Não foi possível atualizar os valores totais!");
  }
}

// evento para capturar os cliques na lista
expenseList.addEventListener("click", (event) => {
  // verifica se o evento clicado é o item de remover
  if (event.target.classList.contains("remove-icon")) {
    // obtem a li pai do elemento clicado
    const item = event.target.closest(".expense");
    // remove o item da lista
    item.remove();
  }

  updateTotals();
});

function formClear() {
  // limpa os valores do input
  expense.value = "";
  category.value = "";
  amount.value = "";

  // coloca o foco no input de amount
  expense.focus();
}
