export default class TodoListModel {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
  }

  get activeTodos() {
    return this.todos.filter((todo) => !todo.complete);
  }

  get completedTodos() {
    return this.todos.filter((todo) => todo.complete);
  }

  isEmpty(text) {
    return '' === text.trim();
  }

  addTodo(content) {
    if (this.isEmpty(content)) {
      return;
    }

    const id =
      this.todos.length === 0 ? 1 : this.todos[this.todos.length - 1].id + 1;

    const newTodo = {
      id,
      content,
      complete: false,
    };

    this.todos = this.todos.concat(newTodo);
  }

  removeTodo(itemID) {
    this.todos = this.todos.filter((item) => item.id !== itemID);
  }

  toggleTodo(itemID) {
    this.todos = this.todos.map((todo) =>
      todo.id === itemID ? { ...todo, complete: !todo.complete } : todo
    );
  }

  editTodo(itemID, updateText) {
    if (this.isEmpty(updateText)) {
      return;
    }

    this.todos = this.todos.map((todo) =>
      todo.id === itemID ? { ...todo, content: updateText } : todo
    );
  }
}
