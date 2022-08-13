const mongoose = require('mongoose');
const static = require('node-static');
const http = require('http');
const fs = require('fs');

// static file server
const fileServer = new static.Server(`${__dirname}/public`);

//  db URI
const dbURI = 'nonsense';

const server = http.createServer((req, res) => {
  // serve static files
  fileServer.serve(req, res, (e, response) => {
    // routes
    let path = './views/';
    const { url, method } = req;

    // /api/todos : GET
    if (url === '/' && method === 'GET') {
      path += 'index.html';

      res.statusCode = 200;
      e.status = res.statusCode;
      e.message = res.statusMessage;

      // send html to browser
      fs.readFile(path, (err, data) => {
        if (err) {
          res.writeHead(400, { 'Content-type': 'text/html' });
          console.log(err);
          res.end();
        } else {
          res.writeHead(200, { 'Content-type': 'text/html' });
          res.end(data);
        }
      });
    }

    console.log('event', e);
    console.log('response', response);

    // API Routes
    // /api/todos : GET
    if (url === '/todos' && method === 'GET') {
      console.log('Fetching all todos...');
    }

    if (url === '/todos/:id' && method === 'GET') {
      console.log('Fetching selected todo...');
    }

    if (url === '/todos' && method === 'POST') {
      console.log('Posting new todo...');
    }

    if (url === 'todos/:id' && method === 'PATCH') {
      console.log('Deleting selected todo...');
    }
  });
});

mongoose
  .connect(dbURI)
  .then((res) => {
    // listen for requests
    server.listen(3000, 'localhost', () => {
      console.log(`listening for requests on port 3000...`);
      console.log('connected to db...');
    });
  })
  .catch((err) => {
    console.log('failed to connect to mongoDB:', err);
  });
