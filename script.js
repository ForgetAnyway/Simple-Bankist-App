"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: "Jonas Schmedtmann",
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 2222,
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

// const accounts = [account1, account2, account3, account4];

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

const displayMovements = function(movements) {
    containerMovements.innerHTML = "";
    movements.forEach(function(mov, i) {
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

displayMovements(account1.movements);

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

const accounts = [account1, account2, account3, account4];
createUsername(accounts);
console.log(accounts);

const calcPrintBalance = function(movements) {
    const balance = movements.reduce(function(acc, cur) {
        return acc + cur;
    }, 0);
    labelBalance.textContent = `${balance}$`;
};

calcPrintBalance(movements);

const deposits = movements.filter(function(mov) {
    return mov > 0;
});

const withdrawals = movements.filter(function(mov) {
    return mov < 0;
});

console.log(deposits);
console.log(withdrawals);

const maxValue = movements.reduce(function(acc, curr) {
    if (acc > curr) {
        return acc;
    } else {
        return curr;
    }
}, movements[0]);

console.log(maxValue);

// const juliasDog = [9, 16, 6, 8, 3];
// const katesDog = [10, 5, 6, 1, 4];

// const checkDogs = function(array1, array2) {
//     array1.splice(-2, 3);
//     array1.splice(0, 1);
//     const bothDogs = array1.concat(array2);
//     console.log(bothDogs);
//     bothDogs.forEach(function(dog, index) {
//         if (dog >= 3) {
//             console.log(
//                 `Dog Number ${index + 1} is an adult and its ${dog} years old`
//             );
//         } else {
//             console.log(
//                 `Dog Number ${index + 1} is still a puppy and its ${dog} years old`
//             );
//         }
//     });
// };

// checkDogs(juliasDog, katesDog);

// Map works same as forEach but creating newArray

// Filter creating an array which elements comes from othery array if condition is true

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const euroToUSD = 1.1;

// const dollars = movements.map(mov => mov * euroToUSD);

// console.log(dollars);

// for (const mov of movements) {
//     const dollar2 = mov * euroToUSD;
//     console.log(dollar2);
// }

// const movementsDescriptions = movements.map((mov, i, arr) => {
//     if (mov > 0) {
//         return `Movement ${i + 1} ${mov} winner`;
//     } else return `Movement ${i + 1} ${mov} looser`;
// });

// console.log(movementsDescriptions);