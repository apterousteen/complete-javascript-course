/*
Use the BMI example from Challenge #1, and the code you already wrote, and
improve it.
    Your tasks:
    1. Print a nice output to the console, saying who has the higher BMI. The message
is either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
    2. Use a template literal to include the BMI values in the outputs.
    Example: "Mark's BMI (28.3) is higher than John's (23.9)!"
*/

let massMark1 = 78;
const heightMark1 = 1.69;
let massJohn1 = 92;
const heightJohn1 = 1.95;

let massMark2 = 95;
const heightMark2 = 1.88;
let massJohn2 = 85;
const heightJohn2 = 1.76;

const bmi = (mass, height) => {
    return mass / height ** 2;
}

let markHigherBMI1 = bmi(massMark1, heightMark1) > bmi(massJohn1, heightJohn1);
let markHigherBMI2 = bmi(massMark2, heightMark2) > bmi(massJohn2, heightJohn2);

if (markHigherBMI1) {
    console.log(`Mark's BMI (${bmi(massMark1, heightMark1)}) is higher than John's (${bmi(massJohn1, heightJohn1)})!`)
}
else {
    console.log(`John's BMI (${bmi(massJohn1, heightJohn1)}) is higher than Mark's (${bmi(massMark1, heightMark1)})!`)
}

if (markHigherBMI2) {
    console.log(`Mark's BMI (${bmi(massMark2, heightMark2)}) is higher than John's (${bmi(massJohn2, heightJohn2)})!`)
}
else {
    console.log(`John's BMI (${bmi(massJohn2, heightJohn2)}) is higher than Mark's (${bmi(massMark2, heightMark2)})!`)
}


