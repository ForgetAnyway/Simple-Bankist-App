"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: "Jonas Schmedtmann",
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: "Jessica Davis",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: "Steven Thomas Williams",
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: "Sarah Smith",
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//     ['USD', 'United States dollar'],
//     ['EUR', 'Euro'],
//     ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// /////////////////////////////////////////////////
// //  slice - do not mutate
// let arr = ['a', 'b', 'c', 'd', 'e'];

// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));

// console.log(arr.slice(-1));
// console.log(arr.slice(1, -2));
// // splice - mutate

// // console.log(arr.splice(2));
// console.log(arr);

// // reverse - mutate
// const arr2 = ['f', 'g', 'h'];
// console.log(arr2.reverse());

// // CONCAT

// let letters = arr.concat(arr2);
// console.log(letters);

// // Join
// console.log(letters.join('-'));

//

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const [i, mov] of movements.entries()) {
//     if (mov > 0) {
//         console.log(`Movement ${i + 1} ${mov} winner`);
//     } else console.log(`Movement ${i + 1} ${mov} looser`);
// }

// movements.forEach(function(mov, i, array) {
//     if (mov > 0) {
//         console.log(`Movement ${i + 1} ${mov} winner`);
//     } else console.log(`Movement ${i + 1} ${mov} looser`);
// });

// const currencies = new Map([
//     ['USD', 'United States dollar'],
//     ['EUR', 'Euro'],
//     ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function(value, key, map) {
//     console.log(`${key}: ${value}`);
// });

// const currenciesUnique = new Set(['USD', 'GBP', 'EUR', 'EUR']);
// console.log(currenciesUnique);

// currenciesUnique.forEach(function(value, key, mapy) {
//     console.log(`${key}: ${value}`);
// });

const displayMovements = function(movements, sort = false) {
    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

    containerMovements.innerHTML = "";
    movs.forEach(function(mov, i) {
        const type = mov > 0 ? "deposit" : "withdrawal";
        const html = `
  <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        
          <div class="movements__value">${mov}</div>
        </div>
        
  `;
        containerMovements.insertAdjacentHTML("afterbegin", html);
    });
};

const user = "Steven Thomas Williams";

const createUsername = function(accs) {
    accs.forEach(function(acc) {
        acc.username = acc.owner
            .toLowerCase()
            .split(" ")
            .map((name) => name[0])
            .join("");
        console.log(acc.username);
    });
};

const displaySummary = function(acc) {
    const interest = acc.movements
        .filter((mov) => mov > 0)
        .map((dep) => dep * (acc.interestRate / 100))
        .reduce((acc, int) => acc + int);

    const deposits = acc.movements
        .filter((mov) => mov > 0)
        .reduce((acc, dep) => acc + dep);

    const withdrawals = acc.movements
        .filter((mov) => mov < 0)
        .reduce((acc, dep) => acc + dep);

    labelSumIn.textContent = deposits;
    labelSumOut.textContent = withdrawals;
    labelSumInterest.textContent = interest;
};

// const accounts = [account1, account2, account3, account4];
createUsername(accounts);
console.log(accounts);

const calcPrintBalance = function(acc) {
    const balance = acc.movements.reduce(function(acc, cur) {
        return acc + cur;
    }, 0);
    acc.balance = balance;
    labelBalance.textContent = `${balance}$`;
};

const updateInterface = function(currentAccount) {
    displayMovements(currentAccount.movements);
    calcPrintBalance(currentAccount);
    displaySummary(currentAccount);
};

let currentAccount;

const login = function(e) {
    e.preventDefault();

    currentAccount = accounts.find(
        (acc) => acc.username === inputLoginUsername.value
    );

    if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {
        labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(" ")[0]
    }`;
    }
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    containerApp.style.opacity = 100;

    updateInterface(currentAccount);
};

const transfer = function(e) {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiverAccount = accounts.find(
        (acc) => acc.username === inputTransferTo.value
    );
    inputTransferAmount.value = inputTransferTo.value = "";
    if (
        amount > 0 &&
        receiverAccount &&
        amount <= currentAccount.balance &&
        receiverAccount.username !== currentAccount.username
    ) {
        currentAccount.movements.push(-amount);
        receiverAccount.movements.push(amount);
    }
    updateInterface(currentAccount);
};

const closeAccount = function(e) {
    e.preventDefault();
    // console.log("Delete");
    if (
        inputCloseUsername.value === currentAccount.username &&
        Number(inputClosePin.value) === currentAccount.pin
    ) {
        const index = accounts.findIndex(
            (acc) => acc.username === currentAccount.username
        );
        accounts.splice(index, 1);
        containerApp.style.opacity = 0;
    }
    inputCloseUsername.value = inputClosePin.value = "";
};

const takeALoan = function(e) {
    e.preventDefault();
    const amount = Number(inputLoanAmount.value);
    if (
        amount > 0 &&
        currentAccount.movements.some((mov) => mov >= amount * 0.1)
    ) {
        currentAccount.movements.push(amount);
        updateInterface(currentAccount);
        inputLoanAmount.value = "";
    }
};

const accountMovements = accounts.map((acc) => acc.movements);
const allMovements = accountMovements.flat();
const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);
console.log(allMovements);
console.log(accountMovements);

btnLogin.addEventListener("click", login);

btnTransfer.addEventListener("click", transfer);

btnClose.addEventListener("click", closeAccount);

btnLoan.addEventListener("click", takeALoan);

const movementsUI = Array.from(document.querySelectorAll(".movements__value"));
console.log(movementsUI);

labelSumIn.addEventListener("click", function() {
    const movementsUI = Array.from(
        document.querySelectorAll(".movements__value")
    );
    console.log(movementsUI);
});