// console.log(arguments);
// console.log(require('module').wrapper);

// module.exports
const C = require('./test-module-1');
const calc1 = new C();
console.log(calc1.add(2, 5));

// exports
const calc2 = require('./text-module-2');
console.log(calc2.multiply(2, 5));

// Destructuring exports
const { multiply } = require('./text-module-2');
console.log(multiply(2, 5));
