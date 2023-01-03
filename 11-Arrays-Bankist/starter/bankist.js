'use strict';

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
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnDelete = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputDeleteUsername = document.querySelector('.form__input--user');
const inputDeletePin = document.querySelector('.form__input--pin');

// App

const createMovementTemplate = () => {
    let row = document.createElement('div');
    row.classList.add('movements__row');
    containerMovements.insertBefore(row, containerMovements.firstChild);
    let type = document.createElement('div');
    type.classList.add('movements__type');
    row.appendChild(type);
    let date = document.createElement('div');
    date.classList.add('movements__date');
    row.appendChild(date);
    let value = document.createElement('div');
    value.classList.add('movements__value');
    row.appendChild(value);

    return [type, date, value];
};

const displayMovements = (movements, sort = false) => {
    containerMovements.innerHTML = '';

    let movementsCopy = sort ? movements.slice().sort((a, b) => a - b) : movements;

    movementsCopy.forEach((mov, i) => {
        let [type, date, value] = createMovementTemplate();
        if (mov > 0) {
            type.classList.add('movements__type--deposit');
            type.textContent = `${i + 1} deposit`;
        } else {
            type.classList.add('movements__type--withdrawal');
            type.textContent = `${i + 1} withdrawal`;
        }
        date.textContent = 'n days ago';
        value.textContent = `${mov}€`;
    })
};

const displayMovementsAlt = (movements) => {
    containerMovements.innerHTML = '';

    movements.forEach((mov, i) => {
        const type = mov > 0 ? 'deposit' : 'withdrawal';

        const htmlTemplate = `
        <div class="movements__row">
            <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
            <div class="movements__value">${mov}</div>
        </div>
        `;

        containerMovements.insertAdjacentHTML('afterbegin', htmlTemplate);
    })
};

const createUsername = (accountArr) => {
    accountArr.forEach(acc =>
        acc.username = acc.owner.toLowerCase().split(' ').map(x => x.at(0)).join('')
    )
};
createUsername(accounts);

const calcDisplayBalance = (acc) => {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `${acc.balance}€`;
};

const euroToUsd = 1.1;

const calcDisplaySummary = (acc) => {
    const outcomes = acc.movements
        .filter(mov => mov < 0)
        // .map(mov => mov * euroToUsd)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = `${Math.abs(outcomes).toFixed(2)}€`

    const incomes = acc.movements
        .filter(mov => mov > 0)
        // .map(mov => mov * euroToUsd)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `${incomes.toFixed(2)}€`

    // сумма (процент за каждый приход) > 1
    const interest = acc.movements
        .filter(mov => mov > 0)
        .map(income => income * acc.interestRate / 100)
        .filter(x => x >= 1)
        .reduce((acc, x) => acc + x);
    labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

let curAccount;

const updateUI = (acc) => {
    calcDisplayBalance(acc);
    calcDisplaySummary(acc);
    displayMovements(acc.movements);
}

const clearInputFields = (...inputFields) => {
    inputFields.forEach(x => {
        x.value = '';
        x.blur();
    });
}

const checkLogin = (e) => {
    // не дает странице обновиться
    e.preventDefault();
    curAccount = accounts.find(acc => inputLoginUsername.value === acc.username) || null;
    if (!curAccount) {
        labelWelcome.textContent = `No such user. Try again`;
        containerApp.style.opacity = '0';
    }
    if (curAccount?.pin === +inputLoginPin.value) {
        labelWelcome.textContent = `Welcome back, ${curAccount.owner.split(' ')[0]}`;
        containerApp.style.opacity = '1';
        updateUI(curAccount);
    }
    clearInputFields(inputLoginUsername, inputLoginPin);
}
// По дефолту кнопка в форме обновляет страницу
btnLogin.addEventListener('click', checkLogin);

const transferMoney = (e) => {
    e.preventDefault();
    const recipientAcc = accounts.find(acc => acc.username === inputTransferTo.value);
    const amount = +inputTransferAmount.value;
    if (recipientAcc && recipientAcc?.username !== curAccount.username && amount > 0 && curAccount.balance >= amount) {
        curAccount.movements.push(-amount);
        recipientAcc.movements.push(amount);
        updateUI(curAccount);
    }
    clearInputFields(inputTransferTo, inputTransferAmount);
};
btnTransfer.addEventListener('click', transferMoney);

// хотя бы 1 начисление >= 10% запрашиваемой суммы
const getLoan = (e) => {
    e.preventDefault();
    const loanAmount = +inputLoanAmount.value;
    if (loanAmount > 0 && curAccount.movements.some(mov => mov >= 0.1 * loanAmount)) {
        curAccount.movements.push(loanAmount);
        updateUI(curAccount);
    }
    clearInputFields(inputLoanAmount);
};
btnLoan.addEventListener('click', getLoan);

const deleteAccount = (e) => {
    e.preventDefault();
    if (inputDeleteUsername.value === curAccount.username && +inputDeletePin.value === curAccount.pin) {
        const accToDeleteIndex = accounts.findIndex(acc => acc.username === curAccount.username);
        accounts.splice(accToDeleteIndex, 1);
        containerApp.style.opacity = '0';
    }
    clearInputFields(inputDeleteUsername, inputDeletePin);
};
btnDelete.addEventListener('click', deleteAccount);

let sorted = false;
btnSort.addEventListener('click', (e) => {
    e.preventDefault();
    displayMovements(curAccount.movements, !sorted);
    sorted = !sorted;
});