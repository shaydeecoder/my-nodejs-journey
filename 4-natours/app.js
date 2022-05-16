const express = require('express');

const app = express();

// Sending a response to the client
/* app.get('/', (req, res) => {
  res.status(200).send('Hello from the server side!');
}); */

// Sending json to client
app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Hello from the server side!', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.send('You can post to this endpoint...');
});

// Starting a server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
