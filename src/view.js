import { TodoItem } from './model';

export default class TodoListView {
  constructor(eventEmitter) {
    this.eventEmitter = eventEmitter;

    TodoListView.renderInitialTemplate();

    this.todoInput = document.getElementById('todo-input');
    this.todoListUL = document.querySelector('.todo-list');
    this.todoAddForm = document.querySelector('.todo-form');

    this.handleEvents();
  }

  handleEvents() {
    // addTodo event
    this.todoAddForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.eventEmitter.trigger('addTodo');
    });

    // toggleTodo event
    this.todoListUL.addEventListener('click', (event) => {
      if ('toggle' === event.target.getAttribute('data-action')) {
        const targetID = event.target.parentNode.id;
        this.eventEmitter.trigger('toggleTodo', parseInt(targetID));
      }
    });
  }

  clearInput() {
    this.todoInput.value = '';
  }

  getInput() {
    const todoInputValue = this.todoInput.value.trim();
    return new TodoItem(todoInputValue);
  }

  render(todoList) {
    console.log('Updating the rendered todo list');
    this.todoListUL.innerHTML = '';

    this.buildTodoList(todoList);
  }

  buildTodoList(todoList) {
    const ul = document.createElement('ul');
    ul.setAttribute('id', 'todo-list');
    this.todoListUL.appendChild(ul);

    const todoItems = todoList
      .map(
        (item) => `
      <li class="todo-item ${item.complete ? 'complete' : ''}" id=${item.id}>
        <span class="todo-item__toggler" data-action="toggle"></span>
        <span class="todo-item__text" contenteditable>${item.content}</span>
        <span class="todo-item__delete">×</span>
      </li>
    `
      )
      .join('\n');

    ul.insertAdjacentHTML('beforeend', todoItems);
  }

  static renderInitialTemplate() {
    let appTarget = document.getElementById('app');
    if (!appTarget) {
      appTarget = document.createElement('main');
      document.body.appendChild(appTarget);
    }

    appTarget.insertAdjacentHTML(
      'beforeend',
      `    
        <header>
          <h1 class="logo-text">todos</h1>
        </header>

        <section class="app-container">
          <form class="todo-form">
            <span class="todo-form__toggler">‹</span>

            <input
              type="text"
              class="todo-form__input"
              id="todo-input"
              placeholder="What needs to be done?"
            />
          </form>

          <ul class="todo-list"></ul>

          <footer class="app-footer" style="display: none;"></footer>
        </section>
    `
    );
  }
}
