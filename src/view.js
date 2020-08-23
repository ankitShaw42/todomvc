export default class TodoListView {
  constructor(eventEmitter) {
    TodoListView.renderInitialTemplate();

    this.eventEmitter = eventEmitter;
    this.todoInput = document.getElementById('todo-input');
    this.todoListUL = document.querySelector('.todo-list');
    this.todoAddForm = document.querySelector('.todo-form');
    this.todoFooter = document.querySelector('.app-footer');

    this.handleEvents();
  }

  handleEvents() {
    // addTodo event
    this.todoAddForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.eventEmitter.trigger('addTodo', this.todoInput.value);
      this.todoInput.value = '';
    });

    // toggleTodo event
    this.todoListUL.addEventListener('click', (event) => {
      if ('toggle' === event.target.getAttribute('data-action')) {
        const targetID = event.target.parentNode.id;
        this.eventEmitter.trigger('toggleTodo', parseInt(targetID));
      }
    });

    // removeTodo event
    this.todoListUL.addEventListener('click', (event) => {
      if ('delete' === event.target.getAttribute('data-action')) {
        const targetID = event.target.parentNode.id;
        this.eventEmitter.trigger('deleteTodo', parseInt(targetID));
      }
    });

    //editTodo event
    this.todoListUL.addEventListener('focusout', (event) => {
      if ('edit' === event.target.getAttribute('data-action')) {
        const targetID = event.target.parentNode.id;
        this.eventEmitter.trigger(
          'editTodo',
          parseInt(targetID),
          event.target.innerText
        );
      }
    });

    // toggleAll event
    this.todoAddForm.addEventListener('click', (event) => {
      if ('toggle-all' === event.target.getAttribute('data-action')) {
        event.target.classList.toggle('active');
        this.eventEmitter.trigger('toggleAll');
      }
    });

    // removeCompleted event
    this.todoFooter.addEventListener('click', (event) => {
      if ('remove-completed' === event.target.getAttribute('data-action')) {
        this.eventEmitter.trigger('removeCompleted');
      }
    });

    // filterTodos event
    this.todoFooter.addEventListener('click', (event) => {
      if ('filter-todos' === event.target.getAttribute('data-action')) {
        const filterType = event.target.getAttribute('data-filter');
        this.eventEmitter.trigger('filterTodos', filterType);
      }
    });
  }

  // todos are the rendered todos
  // whereas allTodos is the list of all todos in app
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
