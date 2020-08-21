export default class TodoListController {
  constructor(model, view, eventEmitter) {
    this.model = model;
    this.view = view;
    this.eventEmitter = eventEmitter;

    this.onUpdate();
    this.addEventListeners();
  }

  addEventListeners() {
    // addTodo Listener
    this.eventEmitter.on('addTodo', (todoText) => {
      this.model.addTodo(todoText);
      this.onUpdate();
    });

    // toggleTodo Listener
    this.eventEmitter.on('toggleTodo', (targetID) => {
      this.model.toggleTodo(targetID);
      this.onUpdate();
    });

    // deleteTodo Listener
    this.eventEmitter.on('deleteTodo', (targetID) => {
      this.model.removeTodo(targetID);
      this.onUpdate();
    });

    // editTodo Listener
    this.eventEmitter.on('editTodo', (targetID, updateText) => {
      this.model.editTodo(targetID, updateText);
      this.onUpdate();
    });
  }

  onUpdate() {
    this.view.render(this.model.todos);
    localStorage.setItem('todos', JSON.stringify(this.model.todos));
  }
}
