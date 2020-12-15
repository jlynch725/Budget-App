const balance = document.getElementById("balance");
const inflow = document.getElementById("income");
const outflow = document.getElementById("expense");
const list = document.getElementById("list");
const text = document.getElementById("text");
const form= document.getElementById("form");
const amount = document.getElementById("amount");

//get transactionsfrom local storage//

const localStorageTransactions = JSON.parse(
    localStorage.getItem("transactions")
);

let transactions =
    localStorage.getItem("transactions") !== null ?
    localStorageTransactions : [];

//Add transactions //

function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === "" || amount.value.trim() === "")
    {
        document.getElementById("error_msg").innerHTML = 
        "<span >Error: Please enter description and amount!</ span>";
    setTimeout(
        () => (document.getElementById("error_msg").innerHTML = 
        ""),
        5000
    );
    }else {
    const transaction = {
        id: generateID(),
        text: text.value,
        amount: +amount.value,
    };

    transactions.push(transaction);

    addTransactionDOM(transaction); 


    updateValues();

    updateLocalStorage();

    text.value = "";
    amount.value = "";
    }
}

//Generate Random ID//

function generateID() {
    return Math.floor(Math.random() * 1000000000);
}

//Transactions history//

function addTransactionDOM(transaction) {
    //Get Sign
    const sign = transaction.amount < 0 ? "-" : "+";

    const item = document.createElement("li");


    //Add class based on value
    item.classList.add(transaction.amount < 0 ? "minus" :
    "plus");

    item.innerHTML = `
        ${transactions.text} ${sign}${Math.abs(
        transaction.amount 
    )} <button class="delete-btn" onclick="removeTransaction(${
        transaction.id
    })">x</button>
    `;

    list.appendChild(item);
}

//update the balance, inflow, and outflow//

function updateValues() {
    const amounts = transactions.map((transaction) =>
    transaction.amount);

    const total = amounts.reduce((bal, value) => (bal += value), 0).toFixed(2);

    const income = amounts
        .filter((value) => value > 0)
        .reduce((bal, value) => (bal += value), 0)
        .toFixed(2);

    const expense =
        amounts
            .filter((value) => value < 0)
            .reduce((bal, value) => (bal += value), 0) * -(1).
            toFixed(2);

    balance.innerText = `$${total}`;
    inflow.innerText = `$${income}`;
    outflow.innerText = `$${expense}`;
}


//Remove transactions by ID//
function removeTransaction(id) {
    transactions = transactions.filter((transaction) => transaction.id !== id);

    updateLocalStorage();

    start();
}


//update local storage transaction

function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

//Start app

function start() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}

start();

form.addEventListener("submit", addTransaction);
        
        
       
       
       
        
    
