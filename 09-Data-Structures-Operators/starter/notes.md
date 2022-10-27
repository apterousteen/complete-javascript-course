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
