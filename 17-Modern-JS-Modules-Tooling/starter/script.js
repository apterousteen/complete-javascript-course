// // Importing module
import * as ShoppingCart from './shoppingCart.js';
import cloneDeep from 'lodash-es';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

console.log('Importing Module');
ShoppingCart.addToCart('apple', 2);
console.log(ShoppingCart.tq, ShoppingCart.totalPrice);

let state = {
    cart: [
        {product: 'apple', quantity: 5},
        {product: 'milk', quantity: 3},
    ],
    user: {
        loggedIn: true,
        name: 'Jonas',
    },
}

const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(state); // тут loggedIn: false
console.log(stateDeepClone.__wrapped__); // тут loggedIn: true

console.log('string' ?? null);
Promise.resolve('res').then(x => console.log(x));


