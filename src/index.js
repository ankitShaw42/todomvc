import TodoListModel from './model';
import TodoListView from './view';
import TodoListController from './controller';

const model = new TodoListModel();
const view = new TodoListView();
new TodoListController(model, view);
