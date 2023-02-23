'use strict';

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 1111,

    movementsDates: [
        "2022-11-18T21:31:17.178Z",
        "2022-12-23T07:42:02.383Z",
        "2022-12-28T09:15:04.904Z",
        '2023-01-01T14:18:46.235Z',
        '2023-01-02T16:33:06.386Z',
        '2023-01-04T14:43:26.374Z',
        '2023-01-06T18:49:59.371Z',
        '2023-01-07T12:01:20.894Z'
    ],
    currency: 'EUR',
    locale: 'pt-PT',
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,

    movementsDates: [
        "2022-11-01T13:15:33.035Z",
        "2022-11-30T09:48:16.867Z",
        "2022-12-25T06:04:23.907Z",
        '2023-01-03T14:18:46.235Z',
        '2023-01-04T16:33:06.386Z',
        '2023-01-05T14:43:26.374Z',
        '2023-01-06T18:49:59.371Z',
        '2023-01-07T12:01:20.894Z'
    ],
    currency: 'USD',
    locale: 'en-US',
};

const account3 = {
    owner: 'Ivan Ivanov',
    movements: [6000, 1200, -120, -890, -3230, -1100, 8333, -10],
    interestRate: 1.1,
    pin: 3333,

    movementsDates: [
        '2022-11-01T13:15:33.035Z',
        '2022-11-30T09:48:16.867Z',
        '2022-12-25T06:04:23.907Z',
        '2023-12-27T14:18:46.235Z',
        '2023-01-01T16:33:06.386Z',
        '2023-01-02T14:43:26.374Z',
        '2023-01-05T18:49:59.371Z',
        '2023-01-07T12:01:20.894Z',
    ],
    currency: 'RUB',
    locale: 'ru-RU',
};

const accounts = [account1, account2, account3];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelDate = document.querySelector('.date');
const labelTimer = document.querySelector('.timer');
const labelLoanHeader = document.querySelector('.operation--loan h2');
const labelTransferHeader = document.querySelector('.operation--transfer h2');
const labelDeleteHeader = document.querySelector('.operation--close h2');

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

const displayMovements = (account, sort = false) => {
    containerMovements.innerHTML = '';

    let movementsCopy = sort ? account.movements.slice().sort((a, b) => a - b) : account.movements;

    movementsCopy.forEach((mov, i) => {
        let [type, date, value] = createMovementTemplate();
        if (mov > 0) {
            type.classList.add('movements__type--deposit');
            type.textContent = `${i + 1} deposit`;
        } else {
            type.classList.add('movements__type--withdrawal');
            type.textContent = `${i + 1} withdrawal`;
        }
        date.textContent = formatMovementDate(account, i);
        value.textContent = formatCurrency(mov, account.locale, account.currency);
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
    labelBalance.textContent = formatCurrency(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = (acc) => {
    const outcomes = acc.movements
        .filter(mov => mov < 0)
        // .map(mov => mov * euroToUsd)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = formatCurrency(Math.abs(outcomes), acc.locale, acc.currency);

    const incomes = acc.movements
        .filter(mov => mov > 0)
        // .map(mov => mov * euroToUsd)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = formatCurrency(incomes, acc.locale, acc.currency);

    // сумма (процент за каждый приход) > 1
    const interest = acc.movements
        .filter(mov => mov > 0)
        .map(income => income * acc.interestRate / 100)
        .filter(x => x >= 1)
        .reduce((acc, x) => acc + x);
    labelSumInterest.textContent = formatCurrency(interest, acc.locale, acc.currency);
};

let curAccount, timer;

const updateUI = (acc) => {
    calcDisplayBalance(acc);
    calcDisplaySummary(acc);
    displayMovements(acc);
    updateLoginDate();
};

const clearInputFields = (...inputFields) => {
    inputFields.forEach(x => {
        x.value = '';
        x.blur();
    });
};

const updateLoginDate = () => {
    let now = new Date();
    const dateFormatter = new Intl.DateTimeFormat(curAccount.locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
    labelDate.textContent = `${dateFormatter.format(now)}`;
};

const calcDaysPassed = (date1, date2) => {
    return Math.round(Math.abs(date1 - date2) / (1000 * 3600 * 24));
};

const formatMovementDate = (acc, i) => {
    let movementDate;
    let daysPassed = calcDaysPassed(new Date(), new Date(acc.movementsDates[i]));
    switch (true) {
        case daysPassed === 0:
            movementDate = 'Today';
            break;
        case daysPassed === 1:
            movementDate = 'Yesterday';
            break;
        case (daysPassed <= 3):
            movementDate = `${daysPassed} days ago`;
            break;
        default:
            movementDate = new Date(acc.movementsDates[i]).toLocaleDateString(acc.locale);
            break;
    }
    return movementDate;
};

const formatCurrency = (value, locale, currency) => {
    const currencyFormatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        currencyDisplay: 'symbol',
    });

    return currencyFormatter.format(value);
};

const convertCurrency = (currentAcc, recipientAcc, amount) => {
    let fromCurrency = currentAcc.currency;
    let toCurrency = recipientAcc.currency;

    // noinspection UnnecessaryLocalVariableJS
    let promise = fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            let rate = data.rates[toCurrency];
            let total = rate * amount;
            return total;
        });
    return promise;
};

const startLogoutTimer = () => {
    let timeSeconds = 600;
    const tick = () => {
        let minutes = String(Math.floor(timeSeconds / 60)).padStart(2, '0');
        let seconds = String(timeSeconds % 60).padStart(2, '0');
        labelTimer.textContent = `${minutes}:${seconds}`;
        if (timeSeconds === 0) {
            clearInterval(intervalTimer);
            containerApp.style.opacity = '0';
            setTimeout(() => {
                containerApp.style.display = 'none';
            }, 1500);
            labelWelcome.textContent = `Log in to get started`;
        }
        timeSeconds--;
    }

    tick();
    const intervalTimer = setInterval(tick, 1000);

    return intervalTimer;
};

// Event handlers
// По дефолту кнопка в форме обновляет страницу
const checkLogin = (e) => {
    // не дает странице обновиться
    e.preventDefault();
    curAccount = accounts.find(acc => inputLoginUsername.value === acc.username) || null;
    if (!curAccount) {
        labelWelcome.textContent = `No such user. Try again`;
        containerApp.style.opacity = '0';
        setTimeout(() => {
            containerApp.style.display = 'none';
        }, 1500);
    }
    if (curAccount?.pin === +inputLoginPin.value) {
        labelWelcome.textContent = `Welcome back, ${curAccount.owner.split(' ')[0]}`;
        containerApp.style.display = 'grid';
        setTimeout(() => {
            containerApp.style.opacity = '1';
        }, 500);
        updateUI(curAccount);

        if (timer)
            clearInterval(timer);
        timer = startLogoutTimer();
    }
    clearInputFields(inputLoginUsername, inputLoginPin);
    btnLogin.blur();
}
btnLogin.addEventListener('click', checkLogin);

const transferMoney = (e) => {
    e.preventDefault();
    const recipientAcc = accounts.find(acc => acc.username === inputTransferTo.value);
    const amount = +inputTransferAmount.value;
    if (recipientAcc && recipientAcc?.username !== curAccount.username) {
        if (amount > 0 && curAccount.balance >= amount) {
            curAccount.movements.push(-amount);
            curAccount.movementsDates.push(new Date().toISOString());

            convertCurrency(curAccount, recipientAcc, amount)
                .then(result => recipientAcc.movements.push(result));
            recipientAcc.movementsDates.push(new Date().toISOString());

            labelTransferHeader.textContent = `Money transferred to ${recipientAcc.owner.split(' ')[0]}`;
            setTimeout(() => {
                labelTransferHeader.textContent = `Transfer money`;
            }, 4000);

            updateUI(curAccount);
            if (timer)
                clearInterval(timer);
            timer = startLogoutTimer();
        } else {
            labelTransferHeader.textContent = `Insufficient funds`;
            setTimeout(() => {
                labelTransferHeader.textContent = `Transfer money`;
            }, 4000);
        }
    } else {
        labelTransferHeader.textContent = `No such client`;
        setTimeout(() => {
            labelTransferHeader.textContent = `Transfer money`;
        }, 4000);
    }
    clearInputFields(inputTransferTo, inputTransferAmount);
    btnTransfer.blur();
    btnTransfer.disabled = true;
};

const unlockBtn = (btn) => {
    btn.disabled = false;
};

btnTransfer.addEventListener('click', transferMoney);
inputTransferTo.addEventListener('input', () => {
    unlockBtn(btnTransfer);
});


// хотя бы 1 начисление >= 10% запрашиваемой суммы
const getLoan = (e) => {
    e.preventDefault();
    const loanAmount = Math.floor(inputLoanAmount.value);
    labelLoanHeader.innerText = 'Please, wait for the loan approval';
    if (loanAmount > 0 && curAccount.movements.some(mov => mov >= 0.1 * loanAmount)) {
        const giveLoan = () => {
            curAccount.movements.push(loanAmount);
            curAccount.movementsDates.push(new Date().toISOString());
            updateUI(curAccount);
            labelLoanHeader.innerText = 'Your request was approved';
            setTimeout(() => {
                labelLoanHeader.innerText = 'Request loan';
            }, 4000);
        }
        setTimeout(giveLoan, 4000);

        if (timer)
            clearInterval(timer);
        timer = startLogoutTimer();
    } else {
        setTimeout(() => {
            labelLoanHeader.innerText = 'Your request was rejected';
            setTimeout(() => {
                labelLoanHeader.innerText = 'Request loan';
            }, 4000);
        }, 4000);
    }

    clearInputFields(inputLoanAmount);
    btnLoan.blur();
    btnLoan.disabled = true;
};
btnLoan.addEventListener('click', getLoan);
inputLoanAmount.addEventListener('input', () => {
    unlockBtn(btnLoan);
});

const deleteAccount = (e) => {
    e.preventDefault();
    if (inputDeleteUsername.value === curAccount.username && +inputDeletePin.value === curAccount.pin) {
        const accToDeleteIndex = accounts.findIndex(acc => acc.username === curAccount.username);
        accounts.splice(accToDeleteIndex, 1);
        containerApp.style.opacity = '0';
        setTimeout(() => {
            containerApp.style.display = 'none';
        }, 1500);
        labelWelcome.textContent = `Log in to get started`;
    } else {
        labelDeleteHeader.textContent = `Invalid username or pin`;
        setTimeout(() => {
            labelDeleteHeader.textContent = `Close account`;
        }, 4000);
    }

    if (timer)
        clearInterval(timer);
    timer = startLogoutTimer();

    clearInputFields(inputDeleteUsername, inputDeletePin);
    btnDelete.blur();
    btnDelete.disabled = true;
};
btnDelete.addEventListener('click', deleteAccount);
inputDeleteUsername.addEventListener('input', () => {
    unlockBtn(btnDelete);
});

let sorted = false;
btnSort.addEventListener('click', (e) => {
    e.preventDefault();
    displayMovements(curAccount, !sorted);
    sorted = !sorted;
});