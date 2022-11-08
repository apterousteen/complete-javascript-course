'use strict';

/*
Convert underscore_case to camelCase.
The input will come from a textarea inserted into the DOM
Conversion will happen when the button is pressed

// индекс _ + 1 в upperCase // 10

Test data (pasted to textarea, including spaces):
underscore_case
first_name
Some_Variable
 calculate_AGE
delayed_departure

Should produce this output (5 separate console.log outputs):
underscoreCase     ✅
firstName          ✅✅
someVariable       ✅✅✅
calculateAge       ✅✅✅✅
delayedDeparture   ✅✅✅✅✅

Hints:
§ Remember which character defines a new line in the textarea
§ The solution only needs to work for a variable made out of 2 words, like a_b
§ Start without worrying about the ✅. Tackle that only after you have the variable
name conversion working
*/
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const input = document.querySelector('textarea');
const btn = document.querySelector('button');

btn.addEventListener('click', () => {
    let inputLines = input.value.split('\n');
    for (const [i, inputLine] of inputLines.entries()) {
        let [first, second] = inputLine.trim().toLowerCase().split('_');
        let res = first + second.replace(second[0], second[0].toUpperCase());
        console.log(`${res.padEnd(20, ' ')} ${'✅'.repeat(i + 1)}`);
    }
});
