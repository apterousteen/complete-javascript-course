'use strict';

// Функции-конструкторы и прототипное наследование

// Constructor Functions and the new Operator

// Функция-конструктор всегда начинается с большой буквы
// Стрелочная функция не может быть конструктором из-за отсутствия this

const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;

    // Нельзя создавать методы в функции-конструкторе, тк при создании экземпляров они будут копироваться в каждый из них
    // this.calcAge = function () {
    //   console.log(2037 - this.birthYear);
    // };
}
// При вызове функции через new:
// 1. создается новый пустой {}
// 2. функция вызывается, this = {}
// 3. {} привязывается к прототипу (Person), создаются поля, присваиваются значения
// 4. возвращается созданный объект (instance)

const jonas = new Person('Jonas', 1991);
const matilda = new Person('Matilda', 1995);
console.log(jonas);
/*
Person {
    firstName: 'Jonas',
    birthYear: 1991
}
*/
console.log(jonas instanceof Person); // true

// prototype - это просто свойство функции-конструктора - по факту, контейнер для хранения свойств и методов,
// которые мы хотим наследовать созданным объектам

Person.prototype.calcAge = function () {
    let now = new Date();
    return now.getFullYear() - this.birthYear;
}

// теперь метод может использоваться всеми экземплярами, но при этом он не будет храниться в самих объектах

console.log(jonas.calcAge()); // 32
console.log(matilda.calcAge()); // 28

// свойство __proto__ это указатель на объект, в котором будет искаться свойство, если оно не найдено в текущем объекте
// указывает на Конструктор.prototype

console.log(jonas.__proto__); // Person.prototype
console.log(jonas.__proto__ === Person.prototype); // true
console.log(Person.__proto__ === Function.prototype); // true, тк Person - это функция

// Проверяем, является ли объект прототипом другого
console.log(Person.prototype.isPrototypeOf(jonas)); // true

// Хранение свойств в .prototype
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species); // Homo Sapiens Homo Sapiens

// Однако это свойство species будет принадлежать не самим экземплярам, оно хранится в свойстве prototype функции Person
console.log(jonas.hasOwnProperty('species')); //false

// Прототипное наследование в строенных объектах
// JS построен на прототипном наследовании, поэтому примитивы имеют доступ к методам объектов-оберток

console.log(jonas.__proto__); // Person.prototype
// Object.prototype (top of prototype chain)
console.log(jonas.__proto__.__proto__); // Object.prototype
console.log(jonas.__proto__.__proto__.__proto__); // null

console.dir(Person.prototype.constructor); // Person

const arr = [3, 6, 6, 5, 6, 9, 9]; // new Array === []
console.log(arr.__proto__); // Array.prototype
console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__.__proto__); // Object.prototype


// Можно добавить новый метод к объекту-обертке, но делать это нежелательно
Array.prototype.unique = function () {
    return [...new Set(this)];
};
console.log(arr.unique());


// Классы в JS - это синтаксический сахар над функциями-конструкторами
// Класс - это особый вид функции, typeOf будет функция

// 1. Классы НЕ всплывают, в отличие от функций
// 2. Классы могут передаваться как аргументы и возвращаться функциями
// 3. Все, что внутри класса, запускается в строгом режиме

// Class expression
// const PersonCl = class {}

// Class declaration
class PersonCl {
    // В классе должен быть конструктор
    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    // Геттеры удобны для формирования "виртуальных" свойств
    get description() {
        return `${this._fullName} was born in ${this.birthYear}`;
    }

    // Сеттеры удобны для валидации данных
    // чтобы не было Maximum call stack size exceeded, есть конвенция ставить _ перед свойством, которое уже есть в конструкторе
    set fullName(value) {
        if (value.trim().includes(' '))
            this._fullName = value;
        else
            console.error(`${value} is not a full name`);
    }

    // При это обязательно нужен геттер, иначе будет возвращаться undefined
    get fullname() {
        return this._fullName;
    }

    // Статические методы относятся к самому классу, экземпляры не имеют к ним доступ, тк он не хранится в .prototype
    // Примеры: Array.from(), Number.parseInt()
    // При вызове this - это сам класс или ф-ция конструктор
    static hey() {
        console.log(`Hey from the Person Class`);
    }

    // Методы будут добавлены в свойство .prototype
    calcAge() {
        console.log(2037 - this.birthYear);
    }

    greet() {
        console.log(`Hey ${this._fullName}`);
    }
}

// методы класса можно явно добавлять в .prototype
// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };

const jessica = new PersonCl('Jessica Davis', 1996);
jessica.fullName = 'Jessica Davis';
jessica.calcAge();
jessica.greet();

console.log(jessica.__proto__ === PersonCl.prototype); // true

console.log(jessica.description); // Jessica Davis was born in 1996
//jessica.description = 'smth' // Error

const walter = new PersonCl('Walter', 1965); // alert

PersonCl.hey();

console.log('----------------------')


// Геттеры и сеттеры в объектах
// есть свойства-данные (owner, movements)
// есть свойства-аксессоры (latest)
const account = {
    owner: 'Jason',
    movements: [100, -200, 243, -33],

    get latest() {
        return this.movements.slice(-1).pop();
    },

    //в сеттерах должен быть ровно 1 параметр
    set latest(mov) {
        return this.movements.push(mov);
    },
};

// Снаружи свойство-аксессор выглядит как обычное свойство. В этом и заключается смысл свойств-аксессоров.
console.log(account.latest); // -33
account.latest = 4; // [100, -200, 243, -33, 4]

// Object.create() создает объект с заданным прототипом, используется для реализации наследования классов

// объект-прототип
const PersonProto = {
    calcAge() {
        console.log(2037 - this.birthYear);
    },

    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
};

// новый объект на основе другого
const steven = Object.create(PersonProto);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__ === PersonProto); // true, при этом указывает прямо на объект-родитель, а не на .prototype

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979); // свойства лучше задавать в функции
sarah.calcAge();


// Наследование на функциях-конструкторах
// "Класс"-родитель
const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
};

// Дочерний "класс"
const Student = function (firstName, birthYear, course) {
    // вызываем конструктор с this = Student
    Person.call(this, firstName, birthYear);
    this.course = course;
};

// Задаем прототип, нельзя просто присвоить .__proto__, тк это указатель?
Student.prototype = Object.create(Person.prototype);

// ЗАТЕМ добавляем метод класса Student
Student.prototype.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

// свойство конструктор должно указывать на ф-цию конструктор, сейчас тут Person
Student.prototype.constructor = Student;

const mike = new Student('Mike', 2020, 'Computer Science');

mike.introduce(); // из Student.prototype
mike.calcAge(); // из Person.prototype

console.log(mike.__proto__); // Student.prototype, но в консоли будет Person
console.log(mike.__proto__.__proto__); // Person.prototype

console.log(mike instanceof Student); // true
console.log(mike instanceof Person); // true
console.log(mike instanceof Object); // true


// Наследование на классах
// Родительский класс
class PersonCl {
    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    get age() {
        return 2037 - this.birthYear;
    }

    get fullName() {
        return this._fullName;
    }

    set fullName(name) {
        if (name.includes(' '))
            this._fullName = name;
        else
            alert(`${name} is not a full name!`);
    }

    // Static method
    static hey() {
        console.log('Hey there 👋');
    }

    // Instance methods
    calcAge() {
        console.log(2037 - this.birthYear);
    }

    greet() {
        console.log(`Hey ${this.fullName}`);
    }
}

// Дочерний класс создается с помощью extends
class StudentCl extends PersonCl {
    constructor(fullName, birthYear, course) {
        // Always needs to happen first!
        // super - это функция-конструктор родительского класса, вызывается для привязки this
        super(fullName, birthYear);
        this.course = course;
    }

    // метод дочернего класса
    introduce() {
        console.log(`My name is ${this.fullName} and I study ${this.course}`);
    }

    // метод дочернего, переопределяющий метод родительского
    calcAge() {
        console.log(
            `I'm ${
                2037 - this.birthYear
            } years old, but as a student I feel more like ${
                2037 - this.birthYear + 10
            }`
        );
    }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge(); // будет вызван новый метод из дочернего класса

// Наследование через Object.create()
const PersonProto = {
    calcAge() {
        console.log(2037 - this.birthYear);
    },

    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
};

// просто чел
const steven = Object.create(PersonProto);

// добавляем Student в цепь прототипов, теперь Person - это прототип Student
const StudentProto = Object.create(PersonProto);

// init функция для новых свойств
StudentProto.init = function (firstName, birthYear, course) {
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;
};

// метод дочернего класса
StudentProto.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge();


// Еще пример с классами (банк)

// В новом JS появятся новые типы полей и методов, но сейчас они поддерживаются только в хроме
// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// (there is also the static version)
class Account {
    //поля пишутся вне конструктора
    // 1) Public fields (instances)
    locale = navigator.language;

    // 2) Private fields (instances)
    // Разница между static и # - статические доступны вне класса
    #movements = [];
    #pin;

    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        // protected property, _ означает, что это защищенное (на уровне соглашения) поле класса
        // this._pin = pin;
        this.#pin = pin;
    }

    // 3) Public methods
    // Public interface
    // можно было использовать геттер
    getMovements() {
        return this.#movements;
    }

    deposit(val) {
        this.#movements.push(val);
        return this;
    }

    withdraw(val) {
        this.deposit(-val);
        return this;
    }

    // внутренний интерфейс
    _approveLoan(val) {
        return true;
    }

    // 4) Private methods
    // #approveLoan(val) {} - приватные методы вообще нигде не работают

    requestLoan(val) {
        if (this._approveLoan(val)) {
            this.deposit(val);
            console.log(`Loan approved`);
        }

        return this;
    }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
// лучше не взаимодействовать со свойствами напрямую
// acc1.movements.push(100);
// acc1.movements.push(-100);
// а создать внешние интерфейсы
acc1.deposit(100);
acc1.withdraw(100);
acc1.requestLoan(1000);

// console.log(acc1.#movements); // Error

// Method chaining in Classes
// Чтобы использовать методы друг за другом, нужно каждый раз возвращать в них this или другое значение
// Логично использовать такое в методах-сеттерах
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements()); // [100, -100, 1000, 300, 500, -35, 25000, -4000]



