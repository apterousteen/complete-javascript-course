'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = (data, className = '') => {

    document.querySelectorAll('.error').forEach(x => x.remove());

    const html = `
            <article class="country ${className}">
                <img class="country__img" src="${data.flags.png}"/>
                <div class="country__data">
                    <h3 class="country__name">${data.name.common}</h3>
                    <h4 class="country__region">${data.region}</h4>
                    <p class="country__row"><span>👫</span>${Math.round(+data.population / 1e6)}M people</p>
                    <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
                    <p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name}, ${Object.values(data.currencies)[0].symbol}</p>
                </div>
            </article>`

    countriesContainer.insertAdjacentHTML('beforeend', html);
    console.log(data);
}


const renderError = (msg) => {
    const html = `<div class="error">${msg}</div>`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
};

/*
// XMLHttpRequest
const getCountryAndNeighbours = (countryName) => {
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${countryName}`);
    request.send();
    request.addEventListener('load', () => {
        const [data] = JSON.parse(request.responseText);
        console.log(data);

        renderCountry(data);

        const neighbour = data.borders?.at(0) || null;
        if (!neighbour) return;

        // get neighbour
        const request2 = new XMLHttpRequest();
        request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
        request2.send();
        request2.addEventListener('load', () => {
            const [data] = JSON.parse(request2.responseText);
            console.log(data);

            renderCountry(data, 'neighbour');
        });
    });
};
getCountryAndNeighbours('usa');

// Promises
// Код без разделения на функции
const getCountryDataSimple = (countryName) => {
    // Country 1
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => {
            console.log(response);

            if (!response.ok)
                throw new Error(`Country not found (${response.status})`);

            return response.json();
        })
        .then(data => {
            renderCountry(data[0]);
            const neighbour = data[0].borders?.at(0) || null;
            if (!neighbour) return;

            // Country 2
            return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
        })
        .then(response => response.json())
        .then(dataNeighbour => renderCountry(dataNeighbour[0], 'neighbour'))
        .catch(err => {
            console.error(`❗ ${err}`);
            renderError(`❗Something went wrong: ${err.message}. Try again!`);
        })
        .finally(() => countriesContainer.style.opacity = '1')
    ;
};

*/
// С разделением
const getJSON = (url, errMsg) => {
    return fetch(url)
        .then(response => {
            if (!response.ok)
                throw new Error(`${errMsg} (${response.status})`);

            return response.json();
        });
};
/*
const getCountryDataSimple = (countryName) => {
    // Country 1
    getJSON(`https://restcountries.com/v3.1/name/${countryName}`, 'Country not found')
        .then(data => {
            renderCountry(data[0]);
            const neighbour = data[0].borders?.at(0) || null;

            if (!neighbour)
                throw new Error('No neighbour found');

            // Country 2
            return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`, 'Country not found');
        })
        .then(dataNeighbour => renderCountry(dataNeighbour[0], 'neighbour'))
        .catch(err => {
            console.error(`❗${err}`);
            renderError(`❗Something went wrong: ${err.message}. Try again!`);
        })
        .finally(() => countriesContainer.style.opacity = '1')
    ;
};

btn.addEventListener('click', function () {
    getCountryDataSimple('italy');
});
 */


// Building a Simple Promise
// Лоторея с промисами
// const lotteryPromise = new Promise((resolve, reject) => {
//     console.log('Lottery draw is happening 🔮');
//     setTimeout(() => {
//         if (Math.random() >= 0.5) {
//             resolve('You WIN 💰');
//         } else {
//             reject(new Error('You lost your money 💩'));
//         }
//     }, 2000);
// });
//
// lotteryPromise
//     .then(res => console.log(res))
//     .catch(err => console.error(err));
//
// // Таймер с помощью промисификации setTimeout
// const sleep = (seconds) => {
//     return new Promise((resolve) => {
//         setTimeout(resolve, seconds * 1000);
//     });
// };
//
// sleep(5)
//     .then(() => {
//         // сюда код после ожидания в 5 секунд
//         console.log('5 seconds passed');
//
//         // можно остановиться, а можно еще один таймер запустить
//         return sleep(2);
//     })
//     .then(() => {
//         // сюда код после ожидания в 5 + 2 секунды
//         console.log('7 seconds passed')
//     });

// то же самое с помощью вложенных таймаутов
/*
setTimeout(() => {
// сюда код после ожидания в 5 секунд
    console.log('5 seconds passed');

    // можно остановиться, а можно еще один таймер запустить
    setTimeout(() => {
        // сюда код после ожидания в 5 + 2 секунды
        console.log('7 seconds passed')
    }, 2000)
}, 5000)
*/


// таймер в цикле с помощью async/await
/*
const sleep2 = (sec) => new Promise(resolve => setTimeout(resolve, sec * 1000))

async function loopTimer() {
    for (let i = 0; i < 3; i++) {
        console.log(i);
        await sleep2(3000);
    }
}

loopTimer();
*/

// Моментально исполняющиеся промисы
// Promise.resolve('abc').then((res) => console.log(res));
// Promise.reject(new Error('abc')).catch((err) => console.error(err));

// Промисификация Geolocation API

const getGeolocationCallbacks = () => {
    return navigator.geolocation.getCurrentPosition(
        position => console.log(position),
        error => console.error(error)
    );
};

const getGeolocationPromise = () => {
    return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(
            position => resolve(position),
            error => reject(error)
        )
    )
};

// в getCurrentPosition 1 коллбек автоматически принимает объект геопозиции, 2 - ошибку,
// так что можно просто вызвать resolve, reject, в них передадутся нужные значения
const getGeolocationPromiseSimple = () => {
    return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject));
};

//
// getGeolocationPromiseSimple()
//     .then(res => console.log(res))
//     .catch(err => console.error(err));

// async/await
//
// синтаксический сахар для классического .then
//
// async делает функцию асинхронной, те функция будет работать на фоне, а когда исполнение закончится, вернет промис
// await пишется перед промисом внутри async ф-ции, и он ждет результат этого промиса
// блокирует выполнение кода ВНУТРИ асинхронной ф-ции, так что основной поток тормозиться не будет
const whereAmI = async function () {
    try {
        // Geolocation
        const position = await getGeolocationPromiseSimple();
        let {latitude, longitude} = position.coords;

        // Reverse geocoding
        const responseGeo = await fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json&auth=566423760144526357706x56778`);

        if (!responseGeo.ok)
            throw new Error(`Geo API Error (${responseGeo.status})`);

        const dataGeo = await responseGeo.json();

        // Country Data
        const responseCountry = await fetch(`https://restcountries.com/v3.1/name/${dataGeo.country}`);

        if (!responseCountry.ok)
            throw new Error(`Country API Error (${responseCountry.status})`);

        const dataCountry = await responseCountry.json();
        renderCountry(dataCountry[0]);
        console.log('Rest Countries API');
        console.log(responseCountry);
        console.log(dataCountry[0]);
    } catch (e) {
        console.log(e.message);
        renderError(`❗Something went wrong: ${e.message}.`);
    } finally {
        countriesContainer.style.opacity = '1';
    }
};

btn.addEventListener('click', whereAmI);

const get3Capitals = async function (c1, c2, c3) {
    try {
        // запросы идут друг за другом
        // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`, 'Country API Error');
        // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`, 'Country API Error');
        // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`, 'Country API Error');

        // console.log([data1.capital[0], data2.capital[0], data3.capital[0]]);

        // запросы идут одновременно
        // разрешится, когда все промисы вернутся
        // Promise.all принимается iterable
        const data = await Promise.all([
            getJSON(`https://restcountries.com/v3.1/name/${c1}`, 'Country API Error'),
            getJSON(`https://restcountries.com/v3.1/name/${c2}`, 'Country API Error'),
            getJSON(`https://restcountries.com/v3.1/name/${c3}`, 'Country API Error'),
        ]);

        console.log(data.map(d => d[0].capital[0]));

    } catch (e) {
        console.error(e.message);
    }
};

// get3Capitals('USA', 'Thailand', 'Russia');

// Promise.race
// возвращает первый завершенный промис
// принимает iterable
// одновременно

(async function (c1, c2, c3) {
    const data = await Promise.race([
        getJSON(`https://restcountries.com/v3.1/name/${c1}`, 'Country API Error'),
        getJSON(`https://restcountries.com/v3.1/name/${c2}`, 'Country API Error'),
        getJSON(`https://restcountries.com/v3.1/name/${c3}`, 'Country API Error'),
    ]);

    console.log(data[0].capital[0]);
})('USA', 'Thailand', 'Russia');

// Полезен для того, чтобы задать таймаут
const timeout = (seconds) => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error('Timeout Error'));
        }, seconds * 1000)
    });
};

Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/italy`, 'Country API Error'),
    getJSON(`https://restcountries.com/v3.1/name/japan`, 'Country API Error'),
    getJSON(`https://restcountries.com/v3.1/name/poland`, 'Country API Error'),
    timeout(1),
])
    .then(res => console.log(res[0].capital[0]))
    .catch(err => console.error(err.message));


// В отличие от Promise.all, не останавливается, если какой-то промис отклонен
Promise.allSettled([
    Promise.resolve('Success'),
    Promise.reject('Error'),
    Promise.resolve('Success'),
])
    .then(res => console.log(res)) // res - массив результатов промисов
    .catch(err => console.error(err.message));

// Promise.any - возвращает первый положительный результат
Promise.any([
    Promise.reject('Error'),
    Promise.resolve('Success1'),
    Promise.resolve('Success2'),
])
    .then(res => console.log(res));
