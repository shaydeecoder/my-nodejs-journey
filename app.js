const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  // routes
  let path = './views/';

  if (req.url === '/') {
    path += 'index.html';
    res.statusCode = 200;
  }
});

server.listen(3000, 'localhost', () => {
  console.log(`Listening for requests on port 3000`);
});
