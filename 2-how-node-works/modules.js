// console.log(arguments);
// console.log(require('module').wrapper);

// module.exports
const C = require('./test-file-1');
const calc1 = new C();
console.log(calc1.add(2, 5));
