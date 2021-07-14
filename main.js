const balance = document.querySelector(".total-left");
const income = document.querySelector(".total-income");
const expenses = document.querySelector(".total-expenses");
const expenseDisplay = document.querySelector(".expense-list");
const form = document.getElementById("form");
const budget = document.querySelector(".text");
const budgetAmount = document.querySelector(".budget-amount");


const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));

let transactions = localStorage.getItem("transactions") !== null ? localStorageTransactions : [];


function addTransaction(e) {
    e.preventDefault();
    let textBudget = budget.value.trim();
    let amountBudget = budgetAmount.value.trim();
    if(textBudget === "" || amountBudget === "") {
        alert("enter a subject and it's corresponding amount")
    } else {
        const transaction = {
            id: generateID(),
            text: textBudget,
            amount: +amountBudget
        }
        addTransactionDom(transaction);
        transactions.push(transaction);
        updateLocalstorage();
        updateValues();
    }
}


// creating function to add transaction to DOM
function addTransactionDom(transaction) {
    const sign = transaction.amount < 0 ? "" : "+";

    const li = document.createElement("li");
    li.className = transaction.amount > 0 ? "money plus": "money minus"
    li.innerHTML = `
    <span>${transaction.text}</span>
    <span class="plus">${sign} ${transaction.amount}</span>
    <button class="delete" onclick="removeTransaction(${transaction.id})">X</button>
    `
    expenseDisplay.appendChild(li);
    budget.value = "";
    budgetAmount.value = "";
}

// function to update values;
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount)
    
    const totalBalance = amounts.reduce((total,amount) => {
        total += amount;
        return total;
    },0)
    
    const incomeTotal = amounts.filter((amount) => amount > 0).reduce((total,amount) => {
        total += amount;
        return total;
    },0)
   
    const expensesTotal = amounts.filter((amount) => amount < 0).reduce((total,amount) => {
        total += amount;
        return total;
    },0)

    balance.textContent = `$ ${totalBalance}`;
    income.textContent = `$ ${incomeTotal}`;
    expenses.textContent = ` $ ${expensesTotal}`;
}
// funtion to generate id
function generateID() {
    return Math.floor(Math.random() * 10000000000);
}


// setting up the local storage
function updateLocalstorage() {
    localStorage.setItem("transactions",JSON.stringify(transactions));
}

// remove transactions
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalstorage();
    init();
}

function init() {
    expenseDisplay.innerHTML = ""
  transactions.forEach(transaction => addTransactionDom(transaction));
  updateValues();
}
init();
// function to upload transactions to the dom
form.addEventListener("submit",addTransaction)