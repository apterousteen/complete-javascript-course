# destructuring an array

### syntax

```javascript
let arr = [2, 3, 4];
let [a, b, c] = arr;
// now a = 2, b = 3, c = 4
```

### without second element

```javascript
// categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic']
let [main, , secondary] = restaurant.categories;
// main = Italian  
// secondary = Vegetarian
```

### switching variables

```javascript
[secondary, main] = [main, secondary];
// main = Vegetarian
// secondary = Italian 
```

### receive 2 returned values

```javascript
// starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
// mainMenu: ['Pizza', 'Pasta', 'Risotto']
let [starterDish, mainDish] = restaurant.order(0, 0);
// starterDish = Focaccia 
// mainDish = Pizza
```

### destructuring a nested array

```javascript
let nested = [2, 3, [4, 5]];
let [i, j, [k, l]] = nested;
```

### default values

```javascript
let [q = 0, w = 0, e = 0] = [1, 2];
// q = 1, w = 2, e = 0
```

# destructuring an object

### with the same names

```javascript
const {name, openingHours, categories} = restaurant;
console.log(name, openingHours, categories);

/*
Classico Italiano 
{
    thu: { 
        open: 12, 
        close: 22 
        },
    fri: { 
        open: 11, 
        close: 23 
        },
    sat: { 
        open: 0, 
        close: 24 
        }
} 
[ 'Italian', 'Pizzeria', 'Vegetarian', 'Organic' ]
*/
```

### with different names

```javascript
const {name: restaurantName, openingHours: hours, categories: menuTypes} = restaurant;
```

### default values

```javascript
const {menu = [], starterMenu: starters = []} = restaurant;
console.log(menu, starters);

/*
[]
[ 'Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad' ]
 */
```

### reassigning variables

```javascript
let number1 = 11;
let number2 = 13;
const obj = {
    number1: 42,
    number2: 24,
};
({number1, number2} = obj);
// number1 = 42, number2 = 24
```

### nested object

```javascript
const {openingHours: {fri: {open: openFr, close: closeFr}}} = restaurant;
console.log(openFr, closeFr);
// 11 23
```

```javascript
const restaurant = {
    openingHours: {
        thu: {
            open: 12,
            close: 22,
        },
        fri: {
            open: 11,
            close: 23,
        },
        sat: {
            open: 0, // Open 24 hours
            close: 24,
        },
    },
};
```

### destructuring an object in a function call

```javascript
const restaurant = {
    orderDelivery: function ({starterIndex, mainIndex, time, address}) {
        console.log(`${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered at ${time} to ${address}`);
    }
};
```

```javascript
// calling a function with an object as an argument
restaurant.orderDelivery({
    starterIndex: 2,
    mainIndex: 1,
    time: '22:00',
    address: 'Black st. 13',
})
```

# spread operator

### new array with elements of other array

```javascript
// mainMenu: ['Pizza', 'Pasta', 'Risotto'],

const newMainMenu = [...restaurant.mainMenu, 'Gnocci'];
// [ 'Pizza', 'Pasta', 'Risotto', 'Gnocci' ]
```

### shallow copy of an array

```javascript
const mainMenuCopy = [...restaurant.mainMenu];
```

### merge arrays

```javascript
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
```

### spread operator in a function call

```javascript
const restaurant = {
    orderPasta: function (ing1, ing2, ing3) {
        console.log(`Here is your pasta with ${ing1}, ${ing2}, ${ing3}`);
    },
};
```

```javascript
let ingredients = ['Tomatoes', 'Cheese', 'Basil'];

restaurant.orderPasta(...ingredients);
```

### shallow copy of an object

```javascript
const newRestaurant = {founder: 'Emilio', ...restaurant};
```

# Rest operator

## Rest for destructuring

### SPREAD, because on RIGHT side of =

```javascript
const arr = [1, 2, ...[3, 4]];
```

### REST, because on LEFT side of =

```javascript
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);
// 1 2 [ 3, 4, 5 ]
```

### rest + spread

we destructure 2 arrays, then get 1st, 3rd and the rest of the elements

```javascript
const [pizza, , risotto, ...otherFood] = [
    ...restaurant.mainMenu,
    ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

```

### objects

```javascript
openingHours = {
    thu: {
        open: 12,
        close: 22,
    },
    fri: {
        open: 11,
        close: 23,
    },
    sat: {
        open: 0, // Open 24 hours
        close: 24,
    },
}
```

we destructure an object, then get "sat" property and the rest of the properties

```javascript
const {sat, ...weekdays} = restaurant.openingHours;
console.log(weekdays);
/*
{ 
    thu: { open: 12, close: 22 },
    fri: { open: 11, close: 23 }
}
*/
```

## Rest in functions

```javascript
const add = function (...numbers) {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++)
        sum += numbers[i];
    console.log(sum);
};
```

```javascript
add(2, 3); // 5
add(5, 3, 7, 2); // 17
```

### spread first, then rest

```javascript
const x = [23, 5, 7];
add(...x);
```

### function with any amount of arguments

```javascript
const restoraunt = {
    orderPizza(mainIngredient, ...otherIngredients) {
        console.log(`main: ${mainIngredient}`);
        console.log(`others: ${otherIngredients}`);
    },
}

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');

// main: mushrooms
// others: [onion, olives, spinach]
// main: mushrooms
// others: []
```

# Short Circuiting (&& and ||) - Короткое Замыкание

## || - Returns first "truthy" value or the last one

```javascript
console.log(3 || 'Jonas'); // 3
console.log('' || 'Jonas'); // Jonas
console.log(true || 0); // ture
console.log(undefined || null); // null
console.log(undefined || 0 || '' || 'Hello' || 23 || null); // Hello - first truthy value
```

### assigning

if numGuests exists, then assign this value, else - 10  
**will not work, when numGuests === 0**

```javascript
//using ternary operator
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// using short circuiting
const guests2 = restaurant.numGuests || 10;
```

## && - Returns first "falsy" value or the last one

```javascript
console.log(0 && 'Jonas'); // 0
console.log(7 && 'Jonas'); // Jonas
console.log('Hello' && 23 && null && 'jonas'); // null
```

### Calling a method only if it exists

if orderPizza method doesn't exist (undefined = falsy value), operation stops

```javascript
// using IF
if (restaurant.orderPizza) {
    restaurant.orderPizza('mushrooms', 'spinach');
}
// using short circuiting
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');
```

# The Nullish Coalescing Operator - оператор ненулевого слияния

## && - Returns first NOT NULLISH value or the last one

Nullish: null and undefined

````javascript
const guestCorrect = restaurant.numGuests ?? 10; // first not nullish - 0
````

# Logical Assignment Operators ||=, &&=, ??=

```javascript
const rest1 = {
    name: 'Capri',
    numGuests: 20,
};

const rest2 = {
    name: 'La Piazza',
    owner: 'Giovanni Rossi',
};
```

## || assignment operator

if numGuests exists, then assign this value, else - 10  
**will not work, when numGuests === 0**

```javascript
rest1.numGuests = rest1.numGuests || 10; // 20
rest2.numGuests = rest2.numGuests || 10; // 10
rest1.numGuests ||= 10; // 20
rest2.numGuests ||= 10; // 10
```

## nullish assignment operator (null or undefined)

```javascript
rest1.numGuests ??= 10; // 0 (works with 0)
rest2.numGuests ??= 10; // 10
```

## && assignment operator

if owner exists, then assign this value, else - don't do anything

```javascript
rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>'; // <ANONYMOUS>
```

# The for-of Loop

```javascript
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) console.log(item);
```

## getting indexes in for-of

```javascript
// we destructure the item = [index, element]
for (const [i, el] of menu.entries()) {
    console.log(`${i + 1}: ${el}`);
}
```

# Enhanced object literals

## we can compute property names

```javascript
let weekends = ['sat', 'sun'];

let openingHours = {
    thu: {
        open: 12,
        close: 22,
    },
    //computed
    [`day-${2 + 3}`]: {
        open: 11,
        close: 23,
    },
    //computed
    [weekends[1]]: {
        open: 0, // Open 24 hours
        close: 24,
    },
};
```

## just add the name of outer object to set this property

```javascript
const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',

    // HERE
    openingHours,
};
```

## methods

```javascript
const restaurant = {
    // methods, old way
    order: function (starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },

    // methods, new way
    orderNew(starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },
}
```

# Optional Chaining

Operator ?. checks if property / method / element exists (not null or undefined)

## Properties

```javascript
// will try to get open only if mon property exists
// else - returns undefined
console.log(restaurant.openingHours.mon?.open); // undefined
```

```javascript
// check if restaurant is open
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
    let openHour = restaurant.openingHours[day]?.open ?? 'is closed';
    console.log(`on ${day} this restaurant ${typeof openHour === 'number' ? `opens at ${openHour}` : openHour}`);
}
```

## Methods

```javascript
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');
```

## Arrays

```javascript
const users = [{name: 'Jonas', email: 'hello@jonas.io'}];
console.log(users[0]?.name ?? 'User array empty'); // Jonas


const users = [];
console.log(users[0]?.name ?? 'User array empty'); // User array empty
```

# Looping Objects: Object Keys, Values, and Entries

## Property NAMES

```javascript
const properties = Object.keys(openingHours); // [ 'thu', 'fri', 'sat' ]
```

## Amount of properties, loop

```javascript
let openStr = `we are open ${properties.length} days a week: `;
for (const day of properties) {
    openStr += `${day}, `;
}
console.log(openStr); //we are open 3 days a week: thu, fri, sat,
```

## Property VALUES

```javascript
const values = Object.values(openingHours);
console.log(values);
/*

[
    { open: 12, close: 22 },
    { open: 11, close: 23 },
    { open: 0, close: 24 }
]

*/
```

## Entire object PROPERTIES

```javascript
const entries = Object.entries(openingHours);
console.log(entries);
/*

[
  [ 'thu', { open: 12, close: 22 } ],
  [ 'fri', { open: 11, close: 23 } ],
  [ 'sat', { open: 0, close: 24 } ]
]

 */
```

## Destructuring a whole entry AND the value object

```javascript
for (const [key, {open, close}] of entries) {
    console.log(`on ${key} we open at ${open} and close at ${close}`)
}
```

# Sets

- **a collection of unique values**

## Array as an argument

```javascript
const ordersSet = new Set([
    'Pasta',
    'Pizza',
    'Pizza',
    'Risotto',
    'Pasta',
    'Pizza',
]);
console.log(ordersSet); // Set(3) { 'Pasta', 'Pizza', 'Risotto' }
```

## String as an argument

- unique chars

```javascript
console.log(new Set('Jonassss')); // Set(5) { 'J', 'o', 'n', 'a', 's' }
```

## Set methods

```javascript
// Set(3) { 'Pasta', 'Pizza', 'Risotto' }

ordersSet.size; // 3
ordersSet.has('Pizza'); // true
ordersSet.has('Bread'); // false
ordersSet.add('Wine'); // Set(4) { 'Pasta', 'Pizza', 'Risotto', 'Wine'}
ordersSet.delete('Risotto'); // Set(3) { 'Pasta', 'Pizza', 'Wine' }
ordersSet.clear(); // Set(0) {}
```

## There's no way of retrieving values from a set

## Loop through the Set (only FOR OF or forEach)

```javascript
for (let order of ordersSet)
    console.log(order);
// Pasta
// Pizza
// Wine

ordersSet.forEach(x => console.log(x));
// Pasta
// Pizza
// Wine

for (let i = 0; i < ordersSet.size; i++) {
    console.log(ordersSet[i]);
}
// undefined
// undefined
// undefined
```

## Array without duplicates

```javascript
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)];
// [ 'Waiter', 'Chef', 'Manager' ]
```

## Amount of unique elements

```javascript
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
console.log(new Set(staff).size); // 3
```

# Maps

- **a dictionary with keys of any type**
- **in Objects the keys are always strings**

```javascript
const cafe = new Map();
cafe.set('name', 'Maido cafe');
console.log(cafe); // Map(1) { 'name' => 'Maido cafe' }
```

## Map methods

```javascript
cafe.set(1, 'Tokyo')
    .set(2, 'Hokkaido')
    .set('open', 11)
    .set('close', 23);
console.log(cafe);

/*

Map(5) {
  'name' => 'Maido cafe',
  1 => 'Tokyo',
  2 => 'Hokkaido',
  'open' => 11,
  'close' => 23
}

*/
```

```javascript
cafe.get(2); // Hokkaido
cafe.get('open'); // 11
```

```javascript
cafe.has('name'); // true
cafe.delete(2);
/*
Map(4) {
    'name' => 'Maido cafe',
    1 => 'Tokyo',
    'open' => 11,
    'close' => 23
}
*/

cafe.size; // 4
cafe.clear(); // Map(0) {}
```

## Objects as keys

```javascript
const domElements = new Map();
domElements.set(document.querySelector('h1'), 'Heading');
console.log(domElements); // Map(1) { h1 => 'Heading' }
```

## Convert Object to Map

```javascript
const hoursMap = new Map(Object.entries(openingHours));
```

## Alternative way of creating a Map (array of arrays)

```javascript
const question = new Map([
    ['question', 'What is the best programming language in the world?'],
    [1, 'C'],
    [2, 'Java'],
    [3, 'JavaScript'],
    ['correct', 3],
    [true, 'Correct 🎉'],
    [false, 'Try again!'],
]);
```

## Loop through a Map

```javascript
console.log(question.get('question'));

for (const [key, value] of question) {
    if (typeof key === 'number') {
        console.log(`${key}) ${value}`);
    }
}

/*

What is the best programming language in the world?
1) C
2) Java
3) JavaScript

*/
```

## Use case of a Boolean key

```javascript
const answer = +prompt('Type 1, 2 or 3');
alert(question.get(answer === question.get('correct')));
```

## Convert Map to Array

```javascript
console.log([...question]);
console.log([...question.keys()]);
console.log([...question.values()]);
```

# Choosing a data structure

![img_2.png](img_2.png)

# Boxing (Упаковка)

Каждый примитив имеет свой собственный «объект-обёртку», которые называются: String, Number, Boolean, Symbol и BigInt.
Они имеют разный набор методов.

```javascript
let str = "Привет";
alert(str.toUpperCase()); // ПРИВЕТ
```

1) Строка str – примитив. В момент обращения к его свойству, создаётся специальный объект
2) Метод этого объекта запускается и возвращает значение
3) Специальный объект удаляется, оставляя только примитив

МЕТОДЫ ОБЪЕКТОВ-ОБЕРТОК ВСЕГДА ВОЗВРАЩАЮТ ПРИМИТИВЫ

```javascript
// ручное оборачивание
console.log(typeof new String('jonas')); // object

console.log(typeof new String('jonas').slice(1)); // string
```

# Strings

## Methods indexOf() lastIndexOf()

```javascript
const airline = 'Ural Airlines';
const plane = 'A321';

// first occurence
airline.indexOf('r'); // 1
airline.indexOf('Airlines'); // 5
// last occurence
airline.lastIndexOf('r'); // 7

// substring start, end(NON-INCLUSIVE)
airline.slice(4); // ' Airlines'
airline.slice(4, 7);
' Ai'
```

## includes() and slice()

```javascript
const checkMiddleSeatIncludes = function (seat) {
// B and E are middle seats
    return seat.includes('B') || seat.includes('E');
}

const checkMiddleSeatSlice = function (seat) {
    return (seat.slice(-1) === 'B' || seat.slice(-1) === 'E');
}

checkMiddleSeatIncludes('13B'); // true
checkMiddleSeatIncludes('34C'); // false
checkMiddleSeatIncludes('4E'); // true
checkMiddleSeatSlice('13B'); // true
checkMiddleSeatSlice('34C'); // false
checkMiddleSeatSlice('4E'); // true

```

## toLowerCase() toUpperCase()

```javascript
// Fix capitalization in name
const passenger = 'jOnAS';
const fixName = (name) => {
    let nameLower = name.toLowerCase();
    return name[0].toUpperCase() + nameLower.slice(1);
}
console.log(fixName(passenger)); // Jonas
```

## toLowerCase() trim()

```javascript
// Comparing emails
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';
const compareEmail = (email, loginEmail) => {
    return email === loginEmail.trim().toLowerCase();
}
console.log(compareEmail(email, loginEmail)); // true
```

## replace() replaceAll()

```javascript
const announcement = 'All passengers come to boarding door 23. Boarding door 23!';

// replaces only the 1st occurrence
announcement.replace('door', 'gate');
// All passengers come to boarding gate 23. Boarding door 23!

// replaces all
announcement.replace(/door/g, 'gate');
announcement.replaceAll('door', 'gate');
// All passengers come to boarding gate 23. Boarding gate 23!
```

## startsWith() endsWith() includes()

```javascript
if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
    console.log('Part of the NEW Airbus family');
}
```

```javascript
const checkBaggage = (input) => {
    let normalizedInput = input.trim().toLowerCase();
    return normalizedInput.includes('knife') || normalizedInput.includes('gun') ? 'Not allowed' : 'Allowed';
}

checkBaggage('   I have a laptop, some Food and a pocket Knife '); // true
checkBaggage('Socks and camera.  '); // false
checkBaggage(' Got some snacks and a gun for protection '); //true

```

## split() join()

```javascript
// destructuring
let [a, b] = 'str1 str2'.split(' ');
```

```javascript
const capitalizeReplace = (name) => {
    let newName = name.split(' ').map(x => x.replace(x[0], x[0].toUpperCase())).join(' ');
    return newName;
}

const capitalizeConcat = (name) => {
    let newName = name.split(' ').map(x => x[0].toUpperCase() + x.slice(1)).join(' ');
    return newName;
}

capitalizeReplace('jessica ann davis'); // Jessica Ann Davis
capitalizeConcat('zhang duo'); // Zhang Duo
```

## padStart() padEnd()

- Дополняет строку до заданной длины

```javascript
const message = 'Hello';
message.padStart(10, '+').padEnd(15, '+');
'Hi'.padStart(10, '+').padEnd(15, '+');
// +++++Hello+++++
// ++++++++Hi+++++
```

```javascript
const maskCardNumber = (cardNumber) => {
    const normalizedCardNumber = (cardNumber + '').trim().replaceAll(' ', '');
    const last = normalizedCardNumber.slice(-4);
// add * at the beginning
// split into segments of 4 chars
// destructure the array from match method
// join elements --> new string
    return [...last.padStart(normalizedCardNumber.length, '*').match(/.{1,4}/g)].join(' ');
}

maskCardNumber(4000001234567899); // **** **** **** 7899
maskCardNumber('4000 0012 3456 7899'); // **** **** **** 7899
maskCardNumber('4000001234567899'); // **** **** **** 7899
maskCardNumber('40 0000 123456 7899'); // **** **** **** 7899
```

## repeat()

```javascript
const message2 = 'Bad weather...All Departures Delayed...';
message2.repeat(5);

// Bad weather...All Departures Delayed...Bad weather...All Departures Delayed...Bad weather...All Departures Delayed...Bad weather...All Departures Delayed...Bad weather...All Departures Delayed...
```

## Regex

```javascript
// Uppercase letters
code.toUpperCase().match(/[A-Z]/g).join('');
```

# Default parameters in functions

```javascript
const bookings = [];

const createBooking = (flightNum, numPassengers = 1, price = 100 * numPassengers) => {

    const booking = {
        flightNum,
        numPassengers,
        price,
    };

    bookings.push(booking);
    return booking;
}

createBooking('A11'); // { flightNum: 'A11', numPassengers: 1, price: 100 }
createBooking('A11', 2); // { flightNum: 'A11', numPassengers: 2, price: 200 }
createBooking('A11', undefined, 800); // { flightNum: 'A11', numPassengers: 1, price: 800 }
```

# Function parameters

- primitives are passed by value, objects are passed by reference
- actually, in JS everything is passed by VALUE, for objects the value is a reference

```javascript
const flight = 'A11';
const john = {
    fullName: 'John Doe',
    passport: 12345678,
}

const checkIn = (flightNum, passenger) => {
    flightNum = 'A99';
    passenger.fullName = 'Mr. ' + passenger.fullName;
}

checkIn(flight, john);
//console.log(flight); // A11 - didn't change
//console.log(john); // { fullName: 'Mr John Doe', passport: 12345678 } - changed!
```

# First-class functions & Higher-order functions

- в JS есть функции первого класса - те, которые трактуются как объекты первого класса (могут быть переданы в качестве
  аргументов),
- И функции высшего порядка - принимающие в качестве аргументов или возвращающие другие функции

## Higher-order function - функция высшего порядка, принимает callback-функцию

```javascript
const oneWord = function (str) {
    return str.replaceAll(' ', '').toLowerCase();
}

const upperFirstWord = function (str) {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
}

const transformer = function (str, fn) {
    console.log(`Original string: ${str}`);
    console.log(`String after ${fn.name}: ${fn(str)}`);
}

transformer('JavaScript makes me scream', upperFirstWord);
// Original string: JavaScript makes me scream
// String after upperFirstWord: JAVASCRIPT makes me scream

transformer('JavaScript makes me scream', oneWord);
// Original string: JavaScript makes me scream
// String after oneWord: javascriptmakesmescream
```

## Function returning another function

```javascript

// returns another function 
const greet = function (greeting) {
    return function (name) {
        return `${greeting}, ${name}`;
    }
}

const greetArrow = (greeting) => (name) => `${greeting}, ${name}`;

greet('Hi'); // [Function (anonymous)]

const sayHi = greet('Hi');

sayHi('Paul'); // Hi, Paul
greet('Hey')('Maria'); // Hey, Maria
greetArrow('Hi')('Tom'); // Hi, Tom
```

# Call method

- Call - вызывает функцию, подменяя this

```javascript
// авиалиния
const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    book(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
        this.bookings.push({flight: `${this.iataCode}${flightNum}`, name});
    },
};

lufthansa.book(239, 'Jonas');
//Jonas booked a seat on Lufthansa flight LH239
lufthansa.book(635, 'John');
//John booked a seat on Lufthansa flight LH635
```

```javascript
// Новая авиалиния
const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
};

// новая функция брони
const book = lufthansa.book;
```

- Не сработает, тк **this** - global

```javascript
book(23, 'Sarah Williams');
// Cannot read properties of undefined (reading 'airline')
```

- с помощью call сработает, тк вручную указывается this

```javascript
book.call(eurowings, 23, 'Sarah');
console.log(eurowings);
/*
Sarah booked a seat on Eurowings flight EW23

{
airline: 'Eurowings',
iataCode: 'EW',
bookings: [ { flight: 'EW23', name: 'Sarah' } ]
}

*/

book.call(lufthansa, 239, 'Mary');
console.log(lufthansa);
/*
Mary booked a seat on Lufthansa flight LH239

{
airline: 'Lufthansa',
iataCode: 'LH',
bookings: [
{ flight: 'LH239', name: 'Jonas' },
{ flight: 'LH635', name: 'John' },
{ flight: 'LH239', name: 'Mary Cooper' }
],
book: [Function: book]
}

*/
```

# Apply method

- делает то же, что и call, но принимает массив

```javascript
const flightData = [583, 'George'];
book.apply(swiss, flightData);
console.log(swiss);

/*
George booked a seat on Swiss Air Lines flight LX583
{
airline: 'Swiss Air Lines',
iataCode: 'LX',
bookings: [
{ flight: 'LX583', name: 'Mary' },
{ flight: 'LX583', name: 'George' }
]
}
*/
```

- нет смысла юзать apply, когда можно сделать так

```javascript
book.call(swiss, ...flightData);
```

# Bind

- создаёт "обёртку" над функцией. Поведение похоже на call и apply, но bind не вызывает функцию, а лишь возвращает "
  обёртку", которую можно вызвать позже.

```javascript
// Новые функции с подмененным this
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Williams');
//Steven Williams booked a seat on Eurowings flight EW23
```

# Partial application - частичное применение

- когда части аргументов изначально назначены какие-то значения

```javascript
// сразу установлены this и flight number
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper');
// Jonas Schmedtmann booked a seat on Eurowings flight EW23
// Martha Cooper booked a seat on Eurowings flight EW23
```

```javascript
// функция считает цену с налогом
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));
```

```javascript
// считает цену с определенным налогом (предустановлено value = 0.23)
// вместо this = null
const addVAT = addTax.bind(null, 0.23);

// то же самое как написать новую ф-цию:
// addVAT = value => value + value * 0.23;
```

```javascript
// Можно переписать без bind как функцию, которая возвращает другую
const addTaxRate = function (rate) {
    return function (value) {
        return value + value * rate;
    };
};
const addVAT2 = addTaxRate(0.23);
```

## Bind in Event Listeners

```javascript
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
    console.log(this);

    this.planes++;
    console.log(this.planes);

};

lufthansa.buyPlane();
// сработает, тк вызывается от lufthansa -> this = lufthansa

document.querySelector('.buy')
    .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
// в eventListener без bind не сработает, тк this = document.querySelector('.buy')
// не call, а bind, тк call вызывает, а нам надо передать как аргумент
```

# IIFE [ИФИ] - Immediately Invoked Function Expression

- Моментально вызываемая функция.
- Используется для создания ограниченной области видимости, но сейчас для этого есть блоки между {}

```javascript
// Оборачиваем в скобки, чтобы не было ошибки
// Вызываем с помощью ()
(function () {
    console.log('This will never run again');
    const isPrivate = 23;
})();

console.log(isPrivate);
// ReferenceError: isPrivate is not defined
```

```javascript
// Стрелочная IIFE
(() => console.log('This will ALSO never run again'))();
```

## Блоки кода

```javascript
{
    const isPrivate = 23;
    var notPrivate = 46;
}
console.log(isPrivate); // ReferenceError: isPrivate is not defined
console.log(notPrivate); // 46, тк у var нет блочной области видимости
```

# Closures - замыкания

- Функция имеет доступ к переменным области, где была создана
- Движок ищет переменную сначала в месте создания, и уже потом в цепи областей видимости

```javascript
// booker имеет доступ к passengerCount
const secureBooking = function () {
    let passengerCount = 0;

    return function () {
        passengerCount++;
        console.log(`${passengerCount} passengers`);
    };
};

const booker = secureBooking();

booker(); // 1
booker(); // 2
booker(); // 3
```

```javascript
// замыкания можно увидеть так, closure (secureBooking)
console.dir(booker);
```

![img_3.png](img_3.png)

## Замыкания с заранее созданной переменной

```javascript
// Имеет доступ к переменным там, где было присвоение функции
let f;

const g = function () {
    const a = 23;
    f = function () {
        console.log(a * 2);
    };
};

const h = function () {
    const b = 700;
    f = function () {
        console.log(b * 2);
    };
};

g();
f();
// 46

// Re-assigning f function
h();
f();
// 1400
```

## Замыкания в SetTimeout

```javascript
// Таймер
// Set timeout выполнится уже после окончания выполнения функции boardPassengers, так что тут работает замыкание
const boardPassengers = function (n, wait) {
    const perGroup = n / 3;

    setTimeout(function () {
        console.log(`We are now boarding all ${n} passengers`);
        console.log(`There are 3 groups, each with ${perGroup} passengers`);
    }, wait * 1000);

    console.log(`Will start boarding in ${wait} seconds`);
};

boardPassengers(180, 3);
```

# Array Methods

## SLICE

- подмассив без мутации исходного массива

```javascript
let arr = ['a', 'b', 'c', 'd', 'e'];

arr.slice(2); // [ 'c', 'd', 'e' ]
arr.slice(0, 2); // [ 'a', 'b' ]
arr.slice(-2); // [ 'd', 'e' ]
arr.slice(1, -1); // [ 'b', 'c', 'd' ]
```

```javascript
// В обоих случаях создается неглубокая копия массива [ 'a', 'b', 'c', 'd', 'e' ]
arr.slice();
[...arr];
```

## SPLICE

- возвращает подмассив, мутирует массив - удаляет подмассив

```javascript
arr = ['a', 'b', 'c', 'd', 'e'];
arr.splice(1, 2); // [ 'b', 'c' ]
arr; // [ 'a', 'd', 'e' ]
```

```javascript
arr.splice(-1); // [ 'e' ] - удаление последнего элемента
arr; // [ 'a', 'b', 'c', 'd' ]
```

## CONCAT

- конкатенация массивов, не мутирует массивы

```javascript
arr = ['a', 'b', 'c', 'd', 'e'];
let arr2 = ['f', 'g', 'h'];
let arr3 = arr.concat(arr2, ['1', '2']);

console.log(arr3);
// [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', '1', '2' ]
```

```javascript
// тот же самый эффект достигается spread оператором
console.log([...arr, ...arr2, ...['1', '2']]);
```

## REVERSE

- переворачивает, мутирует массив

```javascript
arr.reverse();
console.log(arr); // [ 'e', 'd', 'c', 'b', 'a' ]
```  

## JOIN

- массив --> строка с сепаратором

```javascript
console.log(arr.join(' - '))
// e - d - c - b - a
```  

## AT

```javascript
let numArr = [11, 22, 33];
console.log(numArr.at(1)); // 22

// последний элемент массива
console.log(numArr[numArr.length - 1]); // по длине
console.log(numArr.slice(-1)[0]); // новый массив с 1 элементом
console.log(numArr.at(-1)); // современный метод at
```

# for of vs forEach

## for of

```javascript
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, el] of movements.entries()) {
    if (el > 0)
        console.log(`${i + 1}: Deposited ${el}`);
    else
        console.log(`${i + 1}: Withdrew ${Math.abs(el)}`);
}
```

## forEach

- 1 параметр элемент, 2 - индекс, 3 - массив
- нельзя прервать или пропустить итерацию

```javascript
movements.forEach((el, index, array) => {
    if (el > 0)
        console.log(`${index + 1}: Deposited ${el}`);
    else
        console.log(`${index + 1}: Withdrew ${Math.abs(el)}`);
})
```

```javascript
/*
1: Deposited 200
2: Deposited 450
3: Withdrew 400
4: Deposited 3000
5: Withdrew 650
6: Withdrew 130
7: Deposited 70
8: Deposited 1300
*/
```

# for of, forEach with Maps

```javascript
const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

/* OUTPUT

USD - United States dollar
EUR - Euro
GBP - Pound sterling
*/
```

## for of with Maps

```javascript
for (const [key, val] of currencies) {
    console.log(`${key} - ${val}`);
}
```

## forEach with Maps

- 1 - значение, 2 - ключ, 3 - словарь

```javascript
currencies.forEach((value, key, map) => {
    console.log(`${key} - ${value}`);
})
```

# forEach with Sets

- 1 - значение, 2 - тоже значение (нет ключей / индексов), 3 - Set

```javascript
const uniqueCurrencies = new Set(['USD', 'EUR', 'USD', 'GBP', 'EUR']);

uniqueCurrencies.forEach((value, key, set) => {
    console.log(`${key} - ${value}`);
})

/* OUTPUT
USD - USD
EUR - EUR
GBP - GBP
 */
```

# Map, Filter, Reduce

![img_5.png](img_5.png)

# Which array method to use?

![img_6.png](img_6.png)

# Map

- (val, i, arr) => new []

```javascript
let movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
let movementDescription = movements.map((mov, i) => {
    if (mov > 0)
        return `${i + 1}: Deposited ${mov}`;
    else
        return `${i + 1}: Withdrew ${Math.abs(mov)}`;
});
console.log(movementDescription);

/*
[
  '1: Deposited 200',
  '2: Deposited 450',
  '3: Withdrew 400',
  '4: Deposited 3000',
  '5: Withdrew 650',
  '6: Withdrew 130',
  '7: Deposited 70',
  '8: Deposited 1300'
]
 */
```

# Filter

- (val, i, arr) => new []

```javascript
let deposits = movements.filter(x => x > 0);
console.log(deposits); // [ 200, 450, 3000, 70, 1300 ]

let withdrawals = movements.filter(x => x < 0);
console.log(withdrawals); // [ -400, -650, -130 ]
```

# Reduce

- (accumulator, current, i, arr) => acc + cur, initialValue

```javascript
let movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

let balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance); // 3840

// max value with Reduce
let max = movements.reduce((max, curMax) => {
    if (max < curMax)
        return curMax
    else
        return max;
}, movements[0]);
console.log(max); // 3000
```

# Find

- (val, i, arr) => val || undefined
- возвращает ПЕРВЫЙ удовлетворяющий условию

```javascript
let firstWithdrawal = movements
    .find(x => x < 0);
console.log(firstWithdrawal); // -400

const accountJD = accounts.find(x => x.owner === 'Jessica Davis');
console.log(accountJD); // вернет 1-й объект с нужным owner
```

# Findindex

- возвращает ПЕРВЫЙ индекс удовлетворяющего условию элемента ИЛИ -1
- в отличие от indexOf принимает не значение, а выражение

```javascript
let movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

let firstWithdrawalIndex = movements
    .findIndex(x => x < 0);
console.log(firstWithdrawalIndex); // 2
```

# SOME

- хотя бы 1 элемент удовлетворяет условию
- includes проверяет по значению, SOME проверяет по условию

```javascript
console.log(movements.includes(200)); // true

const anyMovementsAbove5000 = movements.some(x => x > 5000);
console.log(anyMovementsAbove5000); // false
```

# EVERY

- все элементы удовлетворяют условию

```javascript
console.log(movements.every(x => x > 0)); // false
```

# Separate callback in methods

- можно передавать отдельную функцию

```javascript
const deposit = (x) => x > 0;

movements.every(deposit); // false
movements.some(deposit); // true
movements.filter(deposit); // [200, 450, 3000, 70, 1300]
```

# flat and flatMap

- убирает вложенность массива
- принимает глубину, если неизвестна, то flat(Infinity)

```javascript
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); // [1, 2, 3, 4, 5, 6, 7, 8]

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2)); // [1, 2, 3, 4, 5, 6, 7, 8]
```

## flat

```javascript
const overalBalance = accounts
    .map(acc => acc.movements) // получаем массив массивов
    .flat() // избавляемся от вложенности
    .reduce((acc, mov) => acc + mov, 0); // считаем сумму
```

## flatMap

```javascript
const overalBalance2 = accounts
    .flatMap(acc => acc.movements) // получаем массив массивов без вложенности
    .reduce((acc, mov) => acc + mov, 0);
```

# Sort

- сортирует ВСЁ как строки - в зависимости от кода символа
- МУТИРУЕТ исходный массив

## Strings

```javascript
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort()); // [ 'Adam', 'Jonas', 'Martha', 'Zach' ]
```

## Numbers

```javascript
let movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements.sort()); // [ -130, -400, -650, 1300, 200, 3000, 450, 70 ]
```

- return < 0, A, B (keep order)
- return > 0, B, A (switch order)

```javascript
// Ascending - По возрастанию
movements.sort((a, b) => a - b);

// Descending - По убыванию
movements.sort((a, b) => b - a);
```

# Creating and filling array

## Empty array + fill

```javascript
let arr = new Array(7);
console.log(arr); // [ <7 empty items> ]

// На пустом массиве не работает заполнение через map
console.log(arr.map(() => 5)); // [ <7 empty items> ]

// fill работает как slice 2 - начальный индекс, 4 - конец, не включительно
arr.fill(1, 2, 4);
console.log(arr); // [ <2 empty items>, 1, 1, <3 empty items> ]
```

## Not empty array + fill

```javascript
let notEmptyArr = [1, 2, 3, 4, 5, 6, 7];
notEmptyArr.fill(2);
console.log(notEmptyArr); // [ 2, 2, 2, 2, 2, 2, 2 ]
```

# Array.from()

- принимает либо итерируемый объект, либо длину + map

```javascript
console.log(Array.from('ass')); // [ 'a', 's', 's' ]

// массив из 7 единиц
const y = Array.from({length: 7}, () => 1);
console.log(y);

// массив от 1 до 7
const z = Array.from({length: 7}, (_, i) => i + 1);
console.log(z);
```

# Массив из массивоподобных структур

```javascript
let balanceVal = document.querySelector('.balance__value');

balanceVal.addEventListener('click', () => {
    const movementsUI = Array.from(
        document.querySelectorAll('.movements__value'), // из чего массив
        el => +el.textContent.slice(0, -1)); // map
    console.log(movementsUI);
})

// можно сначала сделать массив, потом уже менять его с помощью map
const movementsUI = [...document.querySelectorAll('.movements__value')];
movementsUI.map(el => +el.textContent.slice(0, -1));
```

# Array methods practice

```javascript
// 1
let bankDepositTotal = accounts.flatMap(acc => acc.movements.filter(x => x > 0)).reduce((sum, x) => sum + x, 0);
// console.log(bankDepositTotal);

// 2 - how many deposits here with at least 1000
let numDeposits1000 = accounts.flatMap(acc => acc.movements.filter(x => x >= 1000)).length;
console.log(numDeposits1000)

// 2 - how many deposits here with at least 1000
// x++ внутри тернарного оператора не работает, только ++x
let numDeposits10002 = accounts.flatMap(acc => acc.movements)
    .reduce((count, x) => x >= 1000 ? ++count : count, 0);
console.log(numDeposits10002)

// 3 - sums of deposits and withdrawals
let sums = accounts
    .flatMap(acc => acc.movements)
    .reduce((sums, x) => {
        x > 0 ? sums.deposits += x : sums.withdrawals += x;
        return sums;
    }, {deposits: 0, withdrawals: 0});
console.log(sums);

let {deposits, withdrawals} = accounts
    .flatMap(acc => acc.movements)
    .reduce((sums, x) => {
        sums[x > 0 ? 'deposits' : 'withdrawals'] += x;
        return sums;
    }, {deposits: 0, withdrawals: 0});
console.log(deposits, withdrawals);

// 4 - title case?
const exceptions = ['the', 'a', 'and', 'an', 'as', 'but', 'for', 'if', 'nor', 'or', 'so', 'yet'];

const toTitleCase = (str) => {
    return str.toLowerCase().split(' ').map((word, i, arr) =>
        exceptions.includes(word) && i !== 0 && i !== arr.length - 1
            ? word
            : word[0].toUpperCase() + word.slice(1))
        .join(' ');
};
console.log(toTitleCase('this is a nice title'));
console.log(toTitleCase('this is a LONG title but not too long'));
console.log(toTitleCase('and here is another title with an EXAMPLE and'));
```