import TodoListModel from './model';
import TodoListView from './view';
import TodoListController from './controller';
import eventEmitter from './event';

const model = new TodoListModel();
const view = new TodoListView(eventEmitter);
new TodoListController(model, view, eventEmitter);
