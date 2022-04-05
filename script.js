'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

function displayMovements(movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (movement, index) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
    <div class="movements__value">${movement}€</div>
  </div>
  `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

function calcDisplayBalance(account) {
  account.balance = account.movements.reduce(function (acc, movement) {
    return acc + movement;
  }, 0);
  labelBalance.textContent = `${account.balance}€`;
}

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outs = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outs)}€`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(int => int >= 1) //only returns interest >= 1 on each deposit
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${interest}€`;
};

function createUserNames(accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
}

function updateUI(account) {
  //display movements
  displayMovements(account.movements);

  //display balance
  calcDisplayBalance(account);

  //display summary
  calcDisplaySummary(account);
}

createUserNames(accounts);

//event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); //prevents form from submitting
  currentAccount = accounts.find(
    account => account.username === inputLoginUsername.value
  );
  // console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //display UI and welcome message
    labelWelcome.textContent = `
    Welcome back ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    //clear input fields and focus
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

//transfer handler
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAccount = accounts.find(
    account => account.username === inputTransferTo.value
  );
  // console.log(recieverAccount, amount);
  //checking if valid transfer
  if (
    amount > 0 &&
    recieverAccount &&
    currentAccount.balance >= amount &&
    recieverAccount?.username !== currentAccount.username
  ) {
    //actual transfer
    currentAccount.movements.push(-amount);
    recieverAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  //clear transfer inputs
  inputTransferAmount.value = inputTransferTo.value = '';
});

//close handler
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    inputClosePin.value === currentAccount.pin
  ) {
    console.log('closed');
  }
});

///////////////////////////////////
///// CODING CHALLENGE 3 /////////
//////////////////////////////////
// function calcHumanAge(ages) {
//   const humanAges = ages
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
//   console.log(humanAges);
// }
// calcHumanAge([5, 2, 4, 1, 15, 8, 3]);

///////////////////////////////////
///// CODING CHALLENGE 2 /////////
//////////////////////////////////
// function calcHumanAge(ages) {
//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   const adults = humanAges.filter(age => age >= 18);

//   const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;

//   return average;
// }
// const avg1 = calcHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1, avg2);

/////////////////////////////////////
//// CODING CHALLENGE 1    //////////
/////////////////////////////////////

// const dogsJuliaArr = [3, 5, 2, 12, 7];
// const dogsdJuliaCorrected = dogsJuliaArr.slice(1, -2);
// const dogsKateArr = [4, 1, 15, 8, 3];
// // console.log(dogsdJuliaCorrected);

// function checkDogs(dogsJulia, dogsKate) {
//   dogsJulia.forEach(function (dogAgeJulia, index) {
//     const dogAge1 = dogAgeJulia >= 3 ? 'an adult' : 'a puppy';
//     console.log(
//       `Dog number ${index + 1} is ${dogAge1} and is ${dogAgeJulia} years old.`
//     );
//   });

//   dogsKate.forEach(function (dogAgeKate, index) {
//     const dogAge2 = dogAgeKate >= 3 ? 'an adult' : 'a puppy';
//     console.log(
//       `Dog number ${index + 1} is ${dogAge2} and is ${dogAgeKate} years old.`
//     );
//   });
// }

// checkDogs(dogsdJuliaCorrected, dogsKateArr);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
//////////////////////

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

///////// the find method //////////////
//returns only the first value that satifies the condition (and not a whole array). also works on objects

// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(firstWithdrawal);

// const account = accounts.find(account => account.owner === 'Jessica Davis');
// console.log(account);

////////// chaining methods ///////////
// const euroToUSD = 1.1;
// const totalDepositsUSD = movements.filter(mov => mov > 0); //returns array
// .map(mov => mov * euroToUSD) //returns array
// .reduce((acc, mov) => acc + mov); //returns value
// console.log(totalDepositsUSD);

////// Reduce method ////////////
//returns one value

// const balance = movements.reduce(function (acc, current, index, arr) {
//   return acc + current;
// }, 0); //inital accumulator value

// console.log(balance);

/////// filter method //////////

// const deposits = movements.filter(function (movement) {
//   return movement > 0;
// });

// const withdrawals = movements.filter(movement => movement < 0);

// console.log(deposits);
// console.log(withdrawals);

///map method//////
//returns new array and does not mutate original array.
// const euroToUSD = 1.1;
// const movementsUSD = movements.map(function (movement) {
//   return movement * euroToUSD;
// });

// const movementDescriptions = movements.map((movement, index) => {
//   if (movement > 0) {
//     return `Movement ${index + 1}: You deposited ${movement}`;
//   } else {
//     return `Movement ${index + 1}: You withdrew ${Math.abs(movement)}`;
//   }
// });
// console.log(movementsUSD);
// console.log(movementDescriptions);

/////////////////////////////////////////////////

//SLICE (doesn't mutate the original array)
// let arr = ['a', 'b', 'c', 'd', 'e'];
// console.log(arr.slice(2)); //starting index
// console.log(arr.slice(2, 4)); //a starting and end index
// console.log(arr.slice(-1)); //gets last element of array

// //SPLICE (DOES mutate the original array)
// console.log(arr.splice(2)); //mutates arr array
// console.log(arr); //returns only ['a','b']

//REVERSE (DOES mutate original array)
// const arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];

// console.log(arr2.reverse());
// console.log(arr2);

// //CONCAT
// const letters = arr.concat(arr2);
// console.log(letters);

// //JOIN
// console.log(letters.join(' - ')); //returns string

//////////////////////////

// AT method (new es2022)
// const arr = [23, 11, 64];
// console.log(arr[0]); //returns 23
// console.log(arr.at(0)); //returns 23

/////////////////

// const movements1 = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements1) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// }
////// forEach method -- same as above
// movements1.forEach(function (movement, index, array) {
//   if (movement > 0) {
//     console.log(`Movement ${index + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// });

////////// looping maps/sets //////////////
//map
// const currencies1 = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies1.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

//SET
// const currencies2 = new Set([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies2.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });
