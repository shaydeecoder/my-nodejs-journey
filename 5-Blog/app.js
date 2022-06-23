const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// express app
const app = express();

// connect to db
const dbURI =
  'mongodb+srv://shaydeecoder:RTN4kgFx89Qix9jH@blogninja.zceehny.mongodb.net/blog-ninja?retryWrites=true&w=majority';

mongoose
  .connect(dbURI)
  .then((result) => {
    // listen for requests
    app.listen(3000);
    console.log('connected to db');
  })
  .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middlewares & static files
/* app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
}); */

// static files
app.use(express.static('public'));

// logger middleware
app.use(morgan('dev'));

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog 2',
    snippet: 'about my new blog',
    body: 'more about my new blog',
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/single-blog', (req, res) => {
  Blog.findById('62b42205d247522bbfb3c7ef')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// routing with express
app.get('/', (req, res) => {
  // res.send('<p>home page</p>');
  // res.sendFile('./views/index.html', { root: __dirname });

  const blogs = [
    {
      title: 'Yoshi finds eggs',
      snippet: 'Lorem ipsum dolor sit amet consectetur',
    },
    {
      title: 'Yoshi finds stars',
      snippet: 'Lorem ipsum dolor sit amet consectetur',
    },
    {
      title: 'How to defeat bowser',
      snippet: 'Lorem ipsum dolor sit amet consectetur',
    },
  ];

  // render view
  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

// redirects
app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
