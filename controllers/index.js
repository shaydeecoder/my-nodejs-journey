const Todo = require('../models');

const get_todos = async (req, res) => {
  try {
    const data = await Todo.find().sort({ createdAt: -1 });
    const response = [{ data }];

    res.writeHead(200, { 'Content-Type': 'Application/json' });
    res.end(JSON.stringify(response));
  } catch (err) {
    console.log(err);
  }
};

const post_todo = async (req, res) => {
  console.log('Posting todo...');
  try {
    console.log('Posting todo...');
  } catch (err) {
    console.log(err);
  }
};

const remove_todo = async () => {
  console.log('Removing selected todo...');
};

const check_todo = async () => {
  console.log('Checking selected todo...');
};

module.exports = { get_todos, post_todo, remove_todo, check_todo };
