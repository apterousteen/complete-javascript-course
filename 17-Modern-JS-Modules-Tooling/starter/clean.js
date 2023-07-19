'strict mode';

let budget = Object.freeze([{value: 250, description: 'Sold old TV 📺', user: 'jonas'}, {
    value: -45,
    description: 'Groceries 🥑',
    user: 'jonas'
}, {value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas'}, {
    value: 300,
    description: 'Freelancing 👩‍💻',
    user: 'jonas'
}, {value: -1100, description: 'New iPhone 📱', user: 'jonas'}, {
    value: -20,
    description: 'Candy 🍭',
    user: 'matilda'
}, {value: -125, description: 'Toys 🚂', user: 'matilda'}, {value: -1800, description: 'New Laptop 💻', user: 'jonas'},]);

const spendingLimits = Object.freeze({
    jonas: 1500, matilda: 100,
});

const getLimit = (limits, user) => limits[user] ?? 0;

const addExpense = function (state, limits, value, description, user = 'jonas') {
    const cleanUser = user.toLowerCase();

    let limit = getLimit(limits, cleanUser);

    if (value <= limit) {
        return [...state, {value: -value, description, user: cleanUser}];
    }

    return state;
};
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(newBudget1, spendingLimits, 100, 'Going to movies 🍿', 'Matilda');
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');

console.log(budget);
console.log(newBudget1);
console.log(newBudget2);
console.log(newBudget3);

const checkExpenses = function (state, limits) {
    return state.map(entry => {
        const limit = getLimit(limits, entry.user);
        return entry.value < -limit
            ? {...entry, flag: 'limit'}
            : entry;
    });
};
const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget)

const logBigExpenses = function (state, bigLimit) {
    // let output = '';
    // state.forEach(entry => {
    //     if (entry.value <= -bigLimit) {
    //         output += `${entry.description.slice(-2)} / `; // Emojis are 2 chars
    //     }
    // });

    let bigExpenses = state
        .filter(entry => entry.value <= -bigLimit)
        .map(entry => entry.description.slice(-2))
        .join(' / ');

    console.log(bigExpenses);
};

logBigExpenses(finalBudget, 1000);