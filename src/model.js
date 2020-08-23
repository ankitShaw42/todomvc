export default class TodoListModel {
  /**
   * Manages the todos and operations on them.
   */
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
  }

  /**
   * Returns a list of active todos.
   */
  get activeTodos() {
    return this.todos.filter((todo) => !todo.complete);
  }

  /**
   * Returns a list of completed todos.
   */
  get completedTodos() {
    return this.todos.filter((todo) => todo.complete);
  }

  /**
   *  Checks whether the string is empty.
   * @param {String} text
   */
  isEmpty(text) {
    return '' === text.trim();
  }

  /**
   * Adds a todo provided the content.
   * @param {String} content
   */
  addTodo(content) {
    if (this.isEmpty(content)) {
      return;
    }

    // get the last item's id + 1 or 1 if there are no items
    const id =
      this.todos.length === 0 ? 1 : this.todos[this.todos.length - 1].id + 1;

    const newTodo = {
      id,
      content,
      complete: false,
    };

    this.todos = this.todos.concat(newTodo);
  }

  /**
   * Removes a todo provided it's id
   * @param {Number} itemID
   */
  removeTodo(itemID) {
    this.todos = this.todos.filter((item) => item.id !== itemID);
  }

  /**
   * Toggles a todo's status provided it's id
   * @param {Number} itemID
   */
  toggleTodo(itemID) {
    this.todos = this.todos.map((todo) =>
      todo.id === itemID ? { ...todo, complete: !todo.complete } : todo
    );
  }

  /**
   * Toggles the status of all the todos
   * @param {Number} itemID
   */
  toggleAllTodos() {
    const allComplete = this.todos.every((todo) => todo.complete);

    if (allComplete) {
      this.todos = this.todos.map((todo) => ({ ...todo, complete: false }));
    } else {
      this.todos = this.todos.map((todo) => ({ ...todo, complete: true }));
    }
  }

  /**
   * Removes the completed todos.
   */
  removeCompleted() {
    this.todos = this.todos.filter((todo) => !todo.complete);
  }

  /**
   * Updates a todo's content provided it's id and updated text.
   * @param {Number} itemID
   * @param {String} updateText
   */
  editTodo(itemID, updateText) {
    if (this.isEmpty(updateText)) {
      return;
    }

    this.todos = this.todos.map((todo) =>
      todo.id === itemID ? { ...todo, content: updateText } : todo
    );
  }
}
