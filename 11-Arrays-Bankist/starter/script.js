/*
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
let movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// MAP method
let movementsEuroToUsd = movements.map(mov => mov * 1.2);

let movementDescription = movements.map((mov, i) => {
    if (mov > 0)
        return `${i + 1}: Deposited ${mov}`;
    else
        return `${i + 1}: Withdrew ${Math.abs(mov)}`;
});

// console.log(movementDescription);

// FILTER method
let deposits = movements.filter(x => x > 0);
// console.log(deposits);

let withdrawals = movements.filter(x => x < 0);
// console.log(withdrawals);

// REDUCE method (accumulator, current, index, array) => acc + cur, initialValue
let balance = movements.reduce((acc, cur, i, arr) => acc + cur, 0);
// console.log(balance);

// max value
let max = movements.reduce((max, curMax) => {
    if (max < curMax)
        return curMax
    else
        return max;
}, movements[0]);
// console.log(max);


// take deposits, convert to USD, calc balance
let totalDeposits = movements
    .filter(mov => mov > 0)
    .map(mov => mov * 1.2)
    .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDeposits);

// FIND method
// возвращает ПЕРВЫЙ удовлетворяющий условию
let firstWithdrawal = movements
    .find(x => x < 0);
// console.log(firstWithdrawal);

const accountJD = accounts.find(x => x.owner === 'Jessica Davis');
// console.log(accountJD);

// FINDINDEX
// возвращает ПЕРВЫЙ индекс удовлетворяющего условию элемента ИЛИ -1
// в отличие от indexOf принимает не значение, а выражение
let firstWithdrawalIndex = movements
    .findIndex(x => x < 0);
// console.log(firstWithdrawalIndex);

// SOME ans EVERY
// includes проверяет по значению, SOME проверяет по условию
// console.log(movements);
// console.log(movements.includes(200)); // true

const anyMovementsAbove5000 = movements.some(x => x > 5000);
// console.log(anyMovementsAbove5000); // false

// EVERY возвращает true только если все элементы удовлетворяют условию
// console.log(movements.every(x => x > 0)); // false

// Separate Callback
const deposit = (x) => x > 0;

movements.every(deposit); // false
movements.some(deposit); // true
movements.filter(deposit); // [200, 450, 3000, 70, 1300]

// flat and flatMap
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat()); // [1, 2, 3, 4, 5, 6, 7, 8]

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeep.flat(2)); // [1, 2, 3, 4, 5, 6, 7, 8]

// flat
const overalBalance = accounts
    .map(acc => acc.movements)
    .flat()
    .reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance);

// flatMap
const overalBalance2 = accounts
    .flatMap(acc => acc.movements)
    .reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance2);

// Sorting Arrays

// Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners.sort());
// console.log(owners);

// Numbers - sort сортирует всё как строки, то есть в зависимости от кода символа
// console.log(`movs ${movements}`);
// movements.sort();

// return < 0, A, B (keep order)
// return > 0, B, A (switch order)

// Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
account1.movements.sort((a, b) => a - b);
// console.log(account1.movements);

// Descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });
account1.movements.sort((a, b) => b - a);
// console.log(account1.movements);
*/

// Creating and filling array

/*
// Empty arrays + fill
let arr = new Array(7);
console.log(arr);
// На таком массиве не работает заполнение через map
// console.log(arr.map(() => 5));
// Работает как слайс 3 - начальный индекс, 5 - конец, не включительно
arr.fill(1, 2, 4);
console.log(arr);

// Not empty array + fill
let notEmptyArr = [1, 2, 3, 4, 5, 6, 7];
notEmptyArr.fill(2);
console.log(notEmptyArr);

// Array.from()
console.log(Array.from('ass'));

// массив из 7 единиц
const y = Array.from({length: 7}, () => 1);
console.log(y);

// массив от 1 до 7
const z = Array.from({length: 7}, (_, i) => i + 1);
console.log(z);

// массив из массивоподобных структур
let balanceVal = document.querySelector('.balance__value');
balanceVal.addEventListener('click', () => {
    const movementsUI = Array.from(document.querySelectorAll('.movements__value'),
        el => +el.textContent.slice(0, -1));
    console.log(movementsUI);
})

// можно сначала сделать массив, потом уже менять его с помощью map
const movementsUI = [...document.querySelectorAll('.movements__value')];
movementsUI.map(el => +el.textContent.slice(0, -1));
*/

