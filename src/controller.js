import TodoListModel from './model';
import TodoListView from './view';
import EventEmitter from './event';

export default class TodoListController {
  /**
   * Manage view and model updates.
   * @param {TodoListModel} model
   * @param {TodoListView} view
   * @param {EventEmitter} eventEmitter
   */
  constructor(model, view, eventEmitter) {
    this.model = model;
    this.view = view;
    this.eventEmitter = eventEmitter;

    this.handleUpdate();
    this.handleEvents();
  }

  /**
   * Handle app events.
   */
  handleEvents() {
    const { model, view, eventEmitter, handleUpdate } = this;

    // addTodo handler
    eventEmitter.on('addTodo', (todoText) => {
      model.addTodo(todoText);
      handleUpdate();
    });

    // toggleTodo handler
    eventEmitter.on('toggleTodo', (targetID) => {
      model.toggleTodo(targetID);
      handleUpdate();
    });

    // deleteTodo handler
    eventEmitter.on('deleteTodo', (targetID) => {
      model.removeTodo(targetID);
      handleUpdate();
    });

    // editTodo handler
    eventEmitter.on('editTodo', (targetID, updateText) => {
      model.editTodo(targetID, updateText);
      handleUpdate();
    });

    // toggleAll handler
    eventEmitter.on('toggleAll', () => {
      model.toggleAllTodos();
      handleUpdate();
    });

    // removeCompleted handler
    eventEmitter.on('removeCompleted', () => {
      model.removeCompleted();
      handleUpdate();
    });

    eventEmitter.on('filterTodos', (filterType) => {
      const { todos, activeTodos, completedTodos } = model;

      switch (filterType) {
        case 'all':
          view.render(todos);
          break;
        case 'active':
          view.render(activeTodos, todos);
          break;
        case 'completed':
          view.render(completedTodos, todos);
          break;
        default:
          console.log(`${filterType} doesn't exist.`);
          return;
      }
    });
  }

  /**
   *  Update app after change.
   */
  handleUpdate = () => {
    this.view.render(this.model.todos);
    localStorage.setItem('todos', JSON.stringify(this.model.todos));
  };
}
