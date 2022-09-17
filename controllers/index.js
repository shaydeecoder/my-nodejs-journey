const Todo = require('../models');

const sendResponse = (response, data, statusCode, headers) => {
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};

const collectData = (request, callback) => {
  var data = '';
  request.on('data', (chunk) => {
    data += chunk;
  });

  request.on('end', () => {
    callback(JSON.parse(data));
  });
};

const get_todos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    const data = {
      data: todos,
      message: 'Todos successfully fetched',
      success: true,
    };

    sendResponse(res, data, 200, {
      'Content-Type': 'application/json',
    });
  } catch (err) {
    console.log(err);
  }
};

const post_todo = (req, res) => {
  collectData(req, async (formattedData) => {
    try {
      const todo = new Todo(formattedData);
      await todo.save();
      const data = {
        data: todo,
        message: 'Todo successfully added',
        success: true,
      };

      sendResponse(res, data, 200, {
        'Content-Type': 'application/json',
      });
    } catch (err) {
      console.log(err);
    }
  });
};

const remove_todo = async (req, res) => {
  try {
    const id = req.url.split('/')[3];

    const todo = await Blog.findByIdAndDelete(id);
    const data = {
      data: todo,
      message: 'Todo successfully deleted',
      success: true,
    };

    sendResponse(res, data, 200, {
      'Content-Type': 'application/json',
    });
  } catch (err) {
    const data = { data: '', message: 'Todo does not exist!', success: false };

    sendResponse(res, data, 404, {
      'Content-Type': 'application/json',
    });
  }
};

const check_todo = async () => {
  try {
    console.log('Checking selected todo...');
  } catch (err) {
    console.log(err);
  }
};

module.exports = { get_todos, post_todo, remove_todo, check_todo };
