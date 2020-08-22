export default class TodoListController {
  constructor(model, view, eventEmitter) {
    this.model = model;
    this.view = view;
    this.eventEmitter = eventEmitter;

    this.handleUpdate();
    this.addEventListeners();
  }

  addEventListeners() {
    // addTodo Listener
    this.eventEmitter.on('addTodo', (todoText) => {
      this.model.addTodo(todoText);
      this.handleUpdate();
    });

    // toggleTodo Listener
    this.eventEmitter.on('toggleTodo', (targetID) => {
      this.model.toggleTodo(targetID);
      this.handleUpdate();
    });

    // deleteTodo Listener
    this.eventEmitter.on('deleteTodo', (targetID) => {
      this.model.removeTodo(targetID);
      this.handleUpdate();
    });

    // editTodo Listener
    this.eventEmitter.on('editTodo', (targetID, updateText) => {
      this.model.editTodo(targetID, updateText);
      this.handleUpdate();
    });

    this.eventEmitter.on('toggleAll', () => {
      this.model.toggleAllTodos();
      this.handleUpdate();
    });

    this.eventEmitter.on('removeCompleted', () => {
      this.model.removeCompleted();
      this.handleUpdate();
    });
  }

  handleUpdate() {
    this.view.render(this.model.todos);
    localStorage.setItem('todos', JSON.stringify(this.model.todos));
  }
}
