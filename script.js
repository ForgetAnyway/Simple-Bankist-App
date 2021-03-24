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
    movementsDates: [
        "2019-11-18T21:31:17.178Z",
        "2019-12-23T07:42:02.383Z",
        "2020-01-28T09:15:04.904Z",
        "2020-04-01T10:17:24.185Z",
        "2020-05-08T14:11:59.604Z",
        "2021-03-23T17:01:17.194Z",
        "2021-03-24T23:36:17.929Z",
        "2021-03-22T10:51:36.790Z",
    ],
    currency: "EUR",
    locale: "pt-PT",
};

const account2 = {
    owner: "Jessica Davis",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
    movementsDates: [
        "2019-11-18T21:31:17.178Z",
        "2019-12-23T07:42:02.383Z",
        "2020-01-28T09:15:04.904Z",
        "2020-04-01T10:17:24.185Z",
        "2020-05-08T14:11:59.604Z",
        "2020-05-27T17:01:17.194Z",
        "2020-07-11T23:36:17.929Z",
        "2020-07-12T10:51:36.790Z",
    ],
    currency: "USD",
    locale: "en-us",
};

const account3 = {
    owner: "Steven Thomas Williams",
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
    movementsDates: [
        "2019-11-18T21:31:17.178Z",
        "2019-12-23T07:42:02.383Z",
        "2020-01-28T09:15:04.904Z",
        "2020-04-01T10:17:24.185Z",
        "2020-05-08T14:11:59.604Z",
        "2021-03-19T17:01:17.194Z",
        "2021-03-23T23:36:17.929Z",
        "2021-03-23T10:51:36.790Z",
    ],
    currency: "PLN",
    locale: "pl",
};

const account4 = {
    owner: "Sarah Smith",
    movements: [430, 1000, 700, 50, 90, -60, -53, -75],
    interestRate: 1,
    pin: 4444,
    movementsDates: [
        "2019-11-18T21:31:17.178Z",
        "2019-12-23T07:42:02.383Z",
        "2020-01-28T09:15:04.904Z",
        "2020-04-01T10:17:24.185Z",
        "2020-05-08T14:11:59.604Z",
        "2020-05-27T17:01:17.194Z",
        "2020-07-11T23:36:17.929Z",
        "2020-07-12T10:51:36.790Z",
    ],
    currency: "CAD",
    locale: "fr-FR",
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

const formatMovementDates = function(date, locale) {
    const calcDaysPassed = (date1, date2) =>
        Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
    const daysPassed = calcDaysPassed(new Date(), date);
    if (daysPassed === 0) return `Today`;
    if (daysPassed === 1) return `Yesterday`;
    if (daysPassed <= 7) return ` ${daysPassed} days ago`;

    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    return new Intl.DateTimeFormat(locale).format(date);
};
const displayMovements = function(acc, sort = false) {
    const movs = sort ?
        acc.movements.slice().sort((a, b) => a - b) :
        acc.movements;

    containerMovements.innerHTML = "";
    movs.forEach(function(mov, i) {
        const type = mov > 0 ? "deposit" : "withdrawal";
        const date = new Date(acc.movementsDates[i]);
        const displayDate = formatMovementDates(date, acc.locale);
        const formattedMov = new Intl.NumberFormat(acc.locale, {
            style: "currency",
            currency: acc.currency,
        }).format(mov);

        const html = `
  <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div><div class="movements__date">${displayDate}</div>
        
          <div class="movements__value">${formattedMov}</div>
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

    labelSumIn.textContent = new Intl.NumberFormat(acc.locale, {
        style: "currency",
        currency: acc.currency,
    }).format(deposits);
    labelSumOut.textContent = new Intl.NumberFormat(acc.locale, {
        style: "currency",
        currency: acc.currency,
    }).format(withdrawals);
    labelSumInterest.textContent = new Intl.NumberFormat(acc.locale, {
        style: "currency",
        currency: acc.currency,
    }).format(interest);
};

// const accounts = [account1, account2, account3, account4];
createUsername(accounts);
console.log(accounts);

const calcPrintBalance = function(acc) {
    const balance = acc.movements.reduce(function(acc, cur) {
        return acc + cur;
    }, 0);
    acc.balance = balance;
    labelBalance.textContent = new Intl.NumberFormat(acc.locale, {
        style: "currency",
        currency: acc.currency,
    }).format(balance);
};

const updateInterface = function(currentAccount) {
    displayMovements(currentAccount);
    calcPrintBalance(currentAccount);
    displaySummary(currentAccount);
};

let currentAccount;
// currentAccount = account1;
// updateInterface(currentAccount);
// containerApp.style.opacity = 100;

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

    const now = new Date();
    const options = {
        hour: "numeric",
        minute: "numeric",
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "short",
    };
    // const locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(
        currentAccount.locale,
        options
    ).format(now);

    updateInterface(currentAccount);
};

const transfer = function(e) {
    e.preventDefault();
    const amount = +inputTransferAmount.value;
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
        receiverAccount.movementsDates.push(new Date().toISOString());
    }
    currentAccount.movementsDates.push(new Date().toISOString());

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
    const amount = Number(Math.floor(inputLoanAmount.value));
    if (
        amount > 0 &&
        currentAccount.movements.some((mov) => mov >= amount * 0.1)
    ) {
        setTimeout(function() {
            currentAccount.movements.push(amount);
            currentAccount.movementsDates.push(new Date().toISOString());
            updateInterface(currentAccount);
            inputLoanAmount.value = "";
        }, 3000);
    }
};

let sorted = false;
btnSort.addEventListener("click", function(e) {
    e.preventDefault();
    displayMovements(currentAccount, !sorted);
    sorted = !sorted;
});

//

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

const num = 388854654.23;

console.log(new Intl.NumberFormat("pl-PL").format(num));

const ingridients = ["olives", "spinache"];
const pizzaTimer = setTimeout(
    (ing1, ing2) => console.log(`Here is your Pizza with ${ing1} and ${ing2}`),
    3000,
    ...ingridients
);

console.log("Waiting...");

if (ingridients.includes("spinache")) clearTimeout(pizzaTimer);

// Set Timeout
setInterval(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    console.log(`${hours}:${minutes}:${seconds}`);
}, 1000);