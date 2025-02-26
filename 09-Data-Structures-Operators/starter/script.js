'use strict';

const flights = '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const getAirport = (code) => {
    return code.toUpperCase().match(/[A-Z]/g).join('');
}

let flightsArray = flights.split('+');
for (const flight of flightsArray) {
    let [type, from, to, time] = flight.split(';')
    if (type.includes('Delayed'))
        type = 'X' + type;
    let resultStr = `${type.replaceAll('_', ' ')} from ${getAirport(from)} to ${getAirport(to)} (${time.replace(':', 'h')})`.padStart(45);
    console.log(resultStr);
}