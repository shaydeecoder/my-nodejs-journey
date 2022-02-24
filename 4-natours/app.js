const express = require('express');

const app = express();

// Sending a response to the client
app.get('/', (req, res) => {
  res.status(200).send('Hello from the server side!');
});

// Starting a server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
