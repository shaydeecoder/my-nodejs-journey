const Todo = require('../models');
const { sendResponse, collectData } = require('../utilities');

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

      const data = {
        message: 'Oops! Todo was unable to be added, please try again!',
        success: false,
      };

      sendResponse(res, data, 404, {
        'Content-Type': 'application/json',
      });
    }
  });
};

const delete_todo = async (req, res) => {
  try {
    const id = req.url.split('/')[3];

    const todo = await Todo.findByIdAndDelete(id);
    const data = {
      data: todo,
      message: 'Todo successfully deleted',
      success: true,
    };

    sendResponse(res, data, 200, {
      'Content-Type': 'application/json',
    });
  } catch (err) {
    console.log(err);

    const data = { message: 'Todo does not exist!', success: false };

    sendResponse(res, data, 404, {
      'Content-Type': 'application/json',
    });
  }
};

const update_todo = (req, res) => {
  collectData(req, async (updatedData) => {
    try {
      const id = req.url.split('/')[3];
      const todo = await Todo.findOneAndUpdate({ _id: id }, updatedData, {
        new: true,
        upsert: false, // Don't make this update into an upsert
      });

      const data = {
        data: todo,
        message: 'Congratulations on completing this task!',
        success: true,
      };

      sendResponse(res, data, 200, {
        'Content-Type': 'application/json',
      });
    } catch (err) {
      console.log(err);

      const data = {
        message: 'Failed to mark todo, please try again!',
        success: false,
      };

      sendResponse(res, data, 404, {
        'Content-Type': 'application/json',
      });
    }
  });
};

module.exports = { get_todos, post_todo, delete_todo, update_todo };
