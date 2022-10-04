/*
Log a string with info about Jonas

const jonas = {
    firstName: 'Jonas',
    lastName: 'Schmedtmann',
    birthYeah: 1991,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven'],
    hasDriversLicense: false,

    calcAge: function () {
        this.age = 2037 - this.birthYeah;
        return this.age;
    },
    getSummary: function () {
        return `${this.firstName} is a ${this.calcAge()}-year old ${this.job}, and he has ${this.hasDriversLicense ? 'a' : 'no'} driver's license`
    }
};
console.log(jonas.getSummary())
*/

/*
LECTURE: Looping Backwards and Loops in Loops
1. Store this array of arrays into a variable called 'listOfNeighbours'
[['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden',
'Russia']];
2. Log only the neighbouring countries to the console, one by one, not the entire
arrays.
Log a string like 'Neighbour: Canada' for each country

let listOfNeighbours = [['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden', 'Russia']];
for (let i = 0; i < listOfNeighbours.length; i++) {
    if (listOfNeighbours[i].length <= 1)
        continue;
    for (let j = 0; j < listOfNeighbours[i].length; j++) {
        console.log(listOfNeighbours[i][j], j !== listOfNeighbours[i].length - 1 ? `Neighbour: ${listOfNeighbours[i][j + 1]}` : `Neighbour: `);
    }
}
 */

let dice = Math.trunc(Math.random() * 6) + 1;

while (dice !== 6){
    dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice)
}