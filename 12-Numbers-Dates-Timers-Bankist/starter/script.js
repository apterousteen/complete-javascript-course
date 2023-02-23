'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
// сейчас в локальной зоне
const now = new Date;
console.log(now);

// new Date(short month(Sep, Dec) dd yyyy hh:mm:ss)
console.log(new Date('Aug 02 2020 18:05:41'));

// new Date(full month dd, yyyy)
console.log(new Date('December 24, 2015'));
// console.log(new Date(account1.movementsDates[0])); // 2019-11-18T21:31:17.178Z - from JS

// new Date(yyyy, m, d, h, min, sec, ms)
// Месяцы начинаются с нуля
// Создает дату в локальной зоне
// Первые 3 аргумента обязательны
console.log(new Date(2037, 10, 1, 15, 23, 5));
console.log(new Date(2037, 10, 31));

// new Date(timestamp) - целое число, представляющее собой количество миллисекунд, прошедших с 1 янв 1970 года
console.log(new Date(0));
// 3 дня * 24 часа * 60 минут * 60 сек * 1к миллисекунд
console.log(new Date(3 * 24 * 60 * 60 * 1000));

// Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear()); // 2037
console.log(future.getMonth()); // 10 - november
console.log(future.getDate()); // 19
console.log(future.getDay()); // день недели, НАЧИНАЯ С НУЛЯ, С ВОСКРЕСЕНЬЯ, 4 - четверг
console.log(future.getHours()); // 15
console.log(future.getMinutes()); // 23
console.log(future.getSeconds()); // 0
console.log(future.toISOString()); // 2037-11-19T10:23:00.000Z - генерация js
console.log(`ss ${future.getTime()}`); // 2142238980000 - timestamp from date

console.log(new Date(2142256980000)); // 2037-11-19T15:23:00.000Z - new date from timestamp

console.log(Date.now()); // 1672951057986 - timestamp now

future.setFullYear(2040);
console.log(future); // 2040-11-19T10:23:00.000Z - year: 2037 -> 2040


const newDate = new Date(2020, 6, 11, 23, 36, 17);

// кол-во дней между датами
// 1000 мс -> cек
// 3600 сек -> часы
// 24 часы -> дни
const calcDaysPassed = (date1, date2) => {
    return Math.round(Math.abs(date1 - date2) / (1000 * 3600 * 24));
};

const calcWeeksPassed = (date1, date2) => {
    return Math.floor(Math.abs(date1 - date2) / (1000 * 3600 * 24 * 7));
};

console.log(calcDaysPassed(new Date(2023, 0, 7), new Date(2023, 1, 11)));
console.log(calcWeeksPassed(new Date(2023, 0, 7), new Date(2023, 1, 11)));

// интернационализация даты
// получить локаль из браузера
const locale = navigator.language;
console.log(locale);

// форматирование даты с помощью Intl.DateTimeFormat(locale, {options})
const now = new Date();
const formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
});
console.log(formatter.format(now));


// форматирование даты с помощью date.toLocaleDateString(locale)
let someDate = new Date(2023, 0, 1);
let formattedDate = someDate.toLocaleDateString('ru-RU');
const hours = someDate.getHours().toString().padStart(2, '0'); // чтобы не было времени типа 2:1
const minutes = someDate.getMinutes().toString().padStart(2, '0');
console.log(`${formattedDate}, ${hours}:${minutes}`);

// форматирование чисел
const num = 234.56;
const formattedNum = new Intl.NumberFormat('ru').format(num); // 234,56
console.log(formattedNum);
const formattedNum1 = new Intl.NumberFormat('en-US').format(num); // 234.56
console.log(formattedNum1);
// console.log(new Intl.NumberFormat(navigator.language).format(num)); // 234,56

// если style: 'currency', то обязательно свойство currency
let options = {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'symbol',
};

console.log(new Intl.NumberFormat('ru', options).format(num)); // 234,56 $
console.log(new Intl.NumberFormat('en-US', options).format(num)); // $234.56

let fromCurrency = 'USD';
let toCurrency = 'RUB';
let amount = 1;

fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        let rate = data.rates[toCurrency];
        let total = rate * amount;
        console.log(`${amount} ${fromCurrency} = ${total} ${toCurrency}`)
    });


// Timers - таймеры
// Выполнение кода не прекращается на таймаутах
// аргументы в setTimeout передаются после времени

const ingredients = ['olives', 'tomatoes'];

const pizzaTimer = setTimeout((...ing) => {
        console.log(`Pizza with: ${ing}`); // Pizza with: olives,tomatoes
    },
    2000,
    ingredients);
console.log('waiting...')

// отмена выполнения таймера
if (ingredients.includes('olives')) {
    clearTimeout(pizzaTimer);
    console.log('Order was canceled');
}


const clock = setInterval(() => {
    let now = new Date();
    const formatter = Intl.DateTimeFormat('ru',
        {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    console.log(formatter.format(now));
}, 1000);
*/
/*

// Как передать аргумент в eventListener
btn.addEventListener("click", () => {
    changeContent(newContent);
});

// чтобы таймер не запаздывал, надо сделать отдельную функцию, вызвать ее, уже затем вызывать в setInterval
const startLogoutTimer = () => {
    let timeSeconds = 10;
    const tick = () => {
        let minutes = String(Math.floor(timeSeconds / 60)).padStart(2, '0');
        let seconds = String(timeSeconds % 60).padStart(2, '0');
        labelTimer.textContent = `${minutes}:${seconds}`;
        timeSeconds--;

        if (timeSeconds === 0) {
            clearInterval(timer);
            containerApp.style.opacity = '0';
            labelWelcome.textContent = `Log in to get started`;
        }
    }

    tick(); // вызвали сразу же
    const timer = setInterval(tick, 1000);
};
*/
