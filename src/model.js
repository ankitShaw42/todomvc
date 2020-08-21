export class TodoItem {
  static ITEM_COUNT = 1;

  constructor(_content) {
    this.id = TodoItem.ITEM_COUNT;
    this.complete = false;
    this.content = _content;
    TodoItem.ITEM_COUNT += 1;
  }

  toggle() {
    this.complete = !this.complete;
  }
}

export default class TodoListModel {
  constructor() {
    this._todoList = [
      new TodoItem('Learn Javascript'),
      new TodoItem('Learn React'),
    ];
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
    if ('' === todoItem.content.trim()) {
      return;
    }

    this._todoList = this._todoList.concat(todoItem);
  }

  removeTodo(itemId) {
    this._todoList = this._todoList.filter((item) => item.id !== itemId);
  }

  toggleTodo(itemId) {
    const targetItem = this._todoList.find((item) => item.id === itemId);
    console.log(targetItem);

    targetItem.toggle();
  }
}
