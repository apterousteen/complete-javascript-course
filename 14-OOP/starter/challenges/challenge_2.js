'use strict'

/*
Coding Challenge #2

Your tasks:
1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
    1. A car has a 'make' and a 'speed' property.
        The 'speed' property is the current speed of the car in km/h
    2. Implement an 'accelerate' method that will increase the car's speed by 10,
        and log the new speed to the console
    3. Implement a 'brake' method that will decrease the car's speed by 5,
        and log the new speed to the console
    4. Create 2 'Car' objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them

2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide
by 1.6)
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but
converts it to km/h before storing the value, by multiplying the input by 1.6)
4. Create a new car and experiment with the 'accelerate' and 'brake'
methods, and with the getter and setter.
Test data:
§ Data car 1: 'Ford' going at 120 km/h
*/
class CarCl {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    };

    get speedUS() {
        return `${this.speed / 1.6} mi/h`;
    }

    set speedUS(speed) {
        this.speed = speed * 1.6;
    }

    accelerate() {
        this.speed += 10;
        console.log(`${this.make} is going at ${this.speed} km/h`);
    }

    brake() {
        this.speed -= 5;
        console.log(`${this.make} is going at ${this.speed} km/h`);
    }
}

const fordCar = new CarCl('Ford', 120);
fordCar.brake();
fordCar.accelerate();
fordCar.speedUS = 100;
console.log(fordCar.speedUS);
fordCar.brake();
