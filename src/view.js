import { TodoItem } from './model';

export default class TodoListView {
  constructor() {
    TodoListView.renderInitialTemplate();

    this.todoInput = document.getElementById('todo-input');
    this.todoListUL = document.querySelector('.todo-list');
    this.todoListFilter = document.getElementById('todo-filter');
    this.todoAddForm = document.querySelector('.todo-form');

    console.log(
      this.todoInput,
      this.todoListUL,
      this.todoListFilter,
      this.todoAddForm
    );
  }

  clearInput() {
    this.todoInput.value = '';
  }

  getFilter() {
    return this.todoListFilter.value.toLowerCase();
  }

  getInput() {
    const todoInputValue = this.todoInput.value.trim();
    return new TodoItem(todoInputValue);
  }

  render(todoList) {
    console.log('Updating the rendered todo list');
    this.todoListUL.innerHTML = '';

    const ul = document.createElement('ul');
    ul.setAttribute('id', 'todo-list');
    this.todoListUL.appendChild(ul);

    todoList.forEach((item) => {
      const todoItem = document.createElement('li');
      todoItem.setAttribute('class', 'todo-list-item');

      todoItem.addEventListener('click', () => {
        // `todoIt` is not in this scope
        todoIt.removeTodo(item.id);
      });

      todoItem.innerHTML = `<span>${item.content}</span>`;
      ul.appendChild(todoItem);
    });
  }

  filter() {
    const todoListHtml = document.getElementById('todo-list');

    const todoListFilterText = this.getFilter();
    todoListHtml.childNodes.forEach((item) => {
      const itemText = item.textContent;

      if (itemText !== null) {
        if (itemText.toLowerCase().indexOf(todoListFilterText) > -1) {
          item.style.display = 'list-item';
        } else {
          item.style.display = 'none';
        }
      }
    });
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

        <input type="text" id="todo-filter" />

    `
    );
  }
}
