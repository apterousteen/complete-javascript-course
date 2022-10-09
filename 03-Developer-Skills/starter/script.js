'use strict';

const measureKelvin = function () {
    const measurement = {
        type: 'temp',
        unit: 'celsius',
        value: prompt(),
    };

    return console.log(+measurement.value + 273);
}

measureKelvin();