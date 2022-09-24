'use strict';

const btnAddTodo = document.querySelector('.todo__btn--add');
const btnClearAll = document.querySelector('.btn--clear-all');
const labelActiveTodo = document.querySelector('.todo__count--active');
const labelDate = document.querySelector('.time__date--numeric');
const labelYear = document.querySelector('.time__date--month_year');
const labelDay = document.querySelector('.time__date--day');
const todoItemsContainer = document.querySelector('.todo__items');
const containerItems = document.querySelector('.todo__items');

class Todo {
  constructor(id, item) {
    this.todo_id = id;
    this.item = item;
    this.checked = false;
  }

  async getTodos() {
    const headersList = {
      Accept: '*/*',
      'Content-Type': 'application/json',
    };

    const response = await fetch('http://localhost:3000/api/todos', {
      method: 'GET',
      headers: headersList,
    });

    const { data } = await response.json();

    return data;
  }

  async saveTodo({ todo_id, item, checked }) {
    const headersList = {
      Accept: '*/*',
      'Content-Type': 'application/json',
    };

    const bodyContent = JSON.stringify({
      todo_id,
      item,
      checked,
    });

    await fetch('http://localhost:3000/api/todo', {
      method: 'POST',
      body: bodyContent,
      headers: headersList,
    });
  }

  async markTodo(id, checked) {
    const headersList = {
      Accept: '*/*',
      'Content-Type': 'application/json',
    };

    const bodyContent = JSON.stringify({
      checked,
    });

    await fetch(`http://localhost:3000/api/todo/${id}`, {
      method: 'PATCH',
      body: bodyContent,
      headers: headersList,
    });
  }

  async deleteTodo(id) {
    const headersList = {
      Accept: '*/*',
      'Content-Type': 'application/json',
    };

    await fetch(`http://localhost:3000/api/todo/${id}`, {
      method: 'DELETE',
      headers: headersList,
    });
  }

  async deleteAllTodo() {
    const headersList = {
      Accept: '*/*',
      'Content-Type': 'application/json',
    };

    await fetch(`http://localhost:3000/api/todos`, {
      method: 'DELETE',
      headers: headersList,
    });
  }
}

/////////////////////////////////////////////
// App Achitecture

class App extends Todo {
  #id;
  #todo;
  #items = [];

  constructor() {
    super();

    // Display date on UI
    this._setDate();

    // Get todo #items from db if available
    this.getTodos().then((res) => {
      this.#items = res;
      // Update UI after getting the #items
      this._updateUI(this.#items);
    });

    // Attach event listeners
    btnAddTodo.addEventListener('click', this._newTodo.bind(this));
    btnClearAll.addEventListener('click', this._clearAll.bind(this));
    containerItems.addEventListener('change', this._checkStatus.bind(this));
    containerItems.addEventListener('click', this._removeItem.bind(this));
  }

  _setDate() {
    // prettier-ignore
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // prettier-ignore
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const currentDate = new Date();

    labelDate.textContent = currentDate.getDate();
    labelDay.textContent = `${months[currentDate.getMonth()]} ${
      currentDate.getFullYear
    }`;
    labelDay.textContent = days[currentDate.getDay()];
  }

  async _newTodo(e) {
    e.preventDefault();

    // get todo item from prompt
    const item = prompt(`Enter your todo here`);

    // Empty field if only spaces are inputed and display error msg
    if (!item.trim()) return alert('Please enter a valid todo item!');

    this.#id = this.#items.length + 1;

    // create todo object with prompt's value
    this.#todo = new Todo(this.#id, item);

    // Save new todo
    await this.saveTodo(this.#todo);

    // get latest todo record
    this.#items = await this.getTodos();

    // update UI with new record
    this._updateUI(this.#items);
  }

  _renderItem(todo) {
    const html = `
      <li class="todo__item">
        <input type="checkbox" name="todo__check-btn" id="item-${
          todo.todo_id
        }" class="todo__select" ${todo.checked ? 'checked' : ''}>
        <label for="item-${todo.todo_id}">${todo.item}</label>
        <i class="far fa-trash-alt todo__delete"></i>
      </li>
    `;

    todoItemsContainer.insertAdjacentHTML('beforeend', html);
  }

  _updateUI(arr) {
    todoItemsContainer.innerHTML = '';

    if (arr.length <= 0) {
      return todoItemsContainer.insertAdjacentHTML(
        'beforeend',
        `No todo registered yet.`
      );
    }

    arr.forEach((currentEl) => this._renderItem(currentEl));
  }

  _findTodoById(id) {
    return this.#items.find((currentTodo) => currentTodo.todo_id === id);
  }

  async _checkStatus(e) {
    const target = e.target.closest('.todo__select');
    const targetID = target.getAttribute('id').split('-')[1];

    // Find target object in items array
    const targettedTodo = this._findTodoById(targetID);

    // if target is checked, set property "checked" to true else to false
    await this.markTodo(targettedTodo._id, !targettedTodo.checked);

    // get latest todo record
    this.#items = await this.getTodos();

    // update UI with new record
    this._updateUI(this.#items);
  }

  async _removeItem(e) {
    const target = e.target.closest('.todo__delete');

    if (!target) return;

    const targetItem = target.closest('.todo__item');

    // Remove item from UI
    targetItem.classList.add('todo__items--remove');

    // Get target ID
    const targetInputID = targetItem
      .querySelector('.todo__select')
      .getAttribute('id')
      .split('-')[1];

    // Find todo by id
    const targettedTodo = this._findTodoById(targetInputID);

    // Delete todo
    await this.deleteTodo(targettedTodo._id);

    // get latest todo record
    this.#items = await this.getTodos();

    // update UI with new record
    this._updateUI(this.#items);
  }

  async _clearAll() {
    // Delete all todos from db
    await this.deleteAllTodo();

    // get latest todo record
    this.#items = await this.getTodos();

    // update UI with new record
    this._updateUI(this.#items);
  }
}

const app = new App();
