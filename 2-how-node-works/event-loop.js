const fs = require('fs');

setTimeout(() => console.log('Time 1 finished'), 0);
setImmediate(() => console.log('Immediate 1 finished'));

fs.readFile('test-file.txt', () => {
  console.log('I/O finished');
  console.log('--------------------');

  setTimeout(() => console.log('Time 2 finished'), 0);
  setTimeout(() => console.log('Time 3 finished'), 3000);
  setImmediate(() => console.log('Immediate 2 finished'));

  process.nextTick(() => console.log('Process.nextTick'));
});

console.log('Hello from the top-level code');
