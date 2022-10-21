'use strict';

// inheritance
const parent = {
    year: 1960,
    calcAge: function () {
        return 2022 - this.year;
    },
};

const child = {
    year: 2011,
    __proto__: parent,
};

console.log(child.calcAge())

// copying object
// without methods
const parentClone = JSON.parse(JSON.stringify(parent));
parentClone.year = 1970;

// with methods, not deep
const parentClone2 = Object.assign({}, parent);
parentClone2.year = 1980;
console.log(parent, parentClone, parentClone2);
