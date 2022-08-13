const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    todo_id: {
      type: String,
      required: true,
    },
    item: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
