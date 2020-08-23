import EventEmitter from './event';

export default class TodoListView {
  /**
   * Manages app rendering.
   * @param {EventEmitter} eventEmitter
   */
  constructor(eventEmitter) {
    TodoListView.renderInitialTemplate();

    this.eventEmitter = eventEmitter;

    this.todoInput = document.getElementById('todo-input');
    this.todoListUL = document.querySelector('.todo-list');
    this.todoAddForm = document.querySelector('.todo-form');
    this.todoFooter = document.querySelector('.app-footer');

    this.addEventListeners();
  }

  /**
   * Sets up app events.
   */
  addEventListeners() {
    const {
      eventEmitter,
      todoAddForm,
      todoListUL,
      todoFooter,
      todoInput,
    } = this;

    // addTodo event
    todoAddForm.addEventListener('submit', (event) => {
      event.preventDefault();
      eventEmitter.trigger('addTodo', todoInput.value);
      todoInput.value = '';
    });

    // toggleTodo event
    todoListUL.addEventListener('click', ({ target }) => {
      if ('toggle' === target.getAttribute('data-action')) {
        const targetID = target.parentNode.id;
        eventEmitter.trigger('toggleTodo', parseInt(targetID));
      }
    });

    // removeTodo event
    todoListUL.addEventListener('click', ({ target }) => {
      if ('delete' === target.getAttribute('data-action')) {
        const targetID = target.parentNode.id;
        eventEmitter.trigger('deleteTodo', parseInt(targetID));
      }
    });

    //editTodo event
    todoListUL.addEventListener('focusout', ({ target }) => {
      if ('edit' === target.getAttribute('data-action')) {
        const targetID = target.parentNode.id;
        eventEmitter.trigger('editTodo', parseInt(targetID), target.innerText);
      }
    });

    // toggleAll event
    todoAddForm.addEventListener('click', ({ target }) => {
      if ('toggle-all' === target.getAttribute('data-action')) {
        target.classList.toggle('active');
        eventEmitter.trigger('toggleAll');
      }
    });

    // removeCompleted event
    todoFooter.addEventListener('click', ({ target }) => {
      if ('remove-completed' === target.getAttribute('data-action')) {
        eventEmitter.trigger('removeCompleted');
      }
    });

    // filterTodos event
    todoFooter.addEventListener('click', ({ target }) => {
      if ('filter-todos' === target.getAttribute('data-action')) {
        const filterType = target.getAttribute('data-filter');
        eventEmitter.trigger('filterTodos', filterType);
      }
    });
  }

  /**
   * Renders the app.
   * @param {any[]} todos
   * @param {any[]} allTodos
   */
  render(todos, allTodos = todos) {
    this.todoListUL.innerHTML = '';
    this.todoFooter.innerHTML = '';
    this.buildTodoList(todos);

    if (allTodos.length > 0) {
      this.renderFooter(allTodos);
    } else {
      this.todoFooter.classList.add('is-hidden');
    }
  }

  /**
   * Renders the footer for the app.
   * @param {any[]} todos
   */
  renderFooter(todos) {
    const completedTodos = todos.filter((todo) => todo.complete);
    const remainingTodos = todos.length - completedTodos.length;

    this.todoFooter.classList.remove('is-hidden');
    this.todoFooter.insertAdjacentHTML(
      'beforeend',
      `
        <span>${remainingTodos} items left</span>
        <div class="filters">
          <span data-action="filter-todos" data-filter="all">All</span>
          <span data-action="filter-todos" data-filter="active">Active</span>
          <span data-action="filter-todos" data-filter="completed">Completed</span>
        </div>

        <span class="clear ${
          completedTodos.length === 0 ? 'is-invisible' : ''
        }" data-action="remove-completed">Clear completed</span>
      `
    );
  }

  /**
   * Builds a template from a list of todos.
   * @param {any[]} todos
   */
  buildTodoList(todos) {
    const todoItems = todos
      .map(
        (item) => `
      <li class="todo-item ${item.complete ? 'complete' : ''}" id=${item.id}>
        <span class="todo-item__toggler" data-action="toggle"></span>
        <span class="todo-item__text" contenteditable data-action="edit">${
          item.content
        }</span>
        <span class="todo-item__delete" data-action="delete">×</span>
      </li>
    `
      )
      .join('\n');

    this.todoListUL.insertAdjacentHTML('beforeend', todoItems);
  }

  /**
   * Renders initial app template.
   */
  static renderInitialTemplate() {
    const appTarget = document.getElementById('app');

    if (!appTarget) {
      throw new Error('App requires an HTML element with id `app` to render.');
    }

    appTarget.insertAdjacentHTML(
      'beforeend',
      `    
        <header>
          <h1 class="logo-text">todos</h1>
        </header>

        <section class="app-container">
          <form class="todo-form" autocomplete="off">
            <span class="todo-form__toggler" data-action="toggle-all">‹</span>

            <input
              type="text"
              class="todo-form__input"
              id="todo-input"
              placeholder="What needs to be done?"
            />
          </form>

          <ul class="todo-list"></ul>

          <footer class="app-footer is-hidden"></footer>
        </section>
    `
    );
  }
}
