const mongoose = require('mongoose');
const static = require('node-static');
const http = require('http');
const fs = require('fs');
const controller = require('./controllers');
require('dotenv').config();

// static file server
const fileServer = new static.Server(`${__dirname}/public`);

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

    /* API Endpoints */
    // /api/todos : GET
    if (url === '/api/todos' && method === 'GET') {
      controller.get_todos(req, res);
    }

    // /api/todo : POST
    if (url === '/api/todo' && method === 'POST') {
      controller.post_todo(req, res);
    }

    // /api/todos/:id : PATCH
    if (url.match(/\/api\/todo\/([a-z A-Z 0-9]+)/) && method === 'PATCH') {
      controller.update_todo(req, res);
    }

    // /api/todo/:id DELETE
    if (url.match(/\/api\/todo\/([a-z A-Z 0-9]+)/) && method === 'DELETE') {
      controller.delete_todo(req, res);
    }

    // /api/todos : DELETE
    if (url === '/api/todos' && method === 'DELETE') {
      controller.delete_all_todo(req, res);
    }
  });
});

mongoose
  .connect(process.env.dbURI)
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
