export default class TodoListController {
  constructor(_todoListModel, _todoListView) {
    this._todoListModel = _todoListModel;
    this._todoListView = _todoListView;
  }

  reRender() {
    this._todoListView.render(this._todoListModel.todoList);
  }

  addTodo() {
    const newTodo = this._todoListView.getInput();

    if ('' === newTodo.content.trim()) {
      return;
    }

    this._todoListModel.addTodo(newTodo);

    this._todoListView.clearInput();

    this.reRender();

    this.filterTodoList();
  }

  filterTodoList() {
    this._todoListView.filter();
  }

  removeTodo(id) {
    if (!id) {
      return;
    }

    this._todoListModel.removeTodo(id);
    this._todoListView.render(this._todoListModel.todoList);
    this.filterTodoList();
  }
}
