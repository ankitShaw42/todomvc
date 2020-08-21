export default class TodoListController {
  constructor(model, view, eventEmitter) {
    this.model = model;
    this.view = view;
    this.eventEmitter = eventEmitter;

    this.render();
    this.addEventListeners();
  }

  addEventListeners() {
    // addTodo Listener
    this.eventEmitter.on('addTodo', () => {
      this.addTodo();
    });

    this.eventEmitter.on('toggleTodo', (targetID) => {
      console.log(targetID);
      this.model.toggleTodo(targetID);
      this.render();
    });
  }

  render() {
    this.view.render(this.model.todoList);
  }

  addTodo() {
    const newTodo = this.view.getInput();
    console.log(newTodo);

    if ('' === newTodo.content.trim()) {
      return;
    }

    this.model.addTodo(newTodo);

    this.view.clearInput();

    this.render();
  }

  removeTodo(id) {
    this.model.removeTodo(id);
    this.view.render(this.model.todoList);
    this.filterTodoList();
  }
}
