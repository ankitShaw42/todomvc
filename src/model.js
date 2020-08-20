export class TodoItem {
  static ITEM_COUNT = 1;

  constructor(_content) {
    this._id = TodoItem.ITEM_COUNT;
    this._complete = false;
    TodoItem.ITEM_COUNT += 1;
  }

  get id() {
    return this._id;
  }

  get content() {
    return this._content;
  }

  get complete() {
    return this._complete;
  }

  toggle() {
    this._complete = !this._complete;
  }
}

export default class TodoListModel {
  constructor() {
    this._todoList = [];
  }

  get todoList() {
    return this._todoList;
  }

  get activeTodos() {
    return this._todoList.filter((todo) => !todo.complete);
  }

  get completedTodos() {
    return this._todoList.filter((todo) => todo.complete);
  }

  addTodo(todoItem) {
    if (!todoItem) {
      return;
    }

    this._todoList = this._todoList.concat(todoItem);
  }

  removeTodo(itemId) {
    if (!itemId) {
      return;
    }

    this._todoList = this._todoList.filter((item) => item.id !== itemId);
  }

  toggleTodo(itemId) {
    if (!itemId) {
      return;
    }

    const targetItem = this._todoList.find((item) => item.id === itemId);

    if (!targetItem) {
      return;
    }

    targetItem.toggle();
  }
}
