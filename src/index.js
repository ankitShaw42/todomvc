import TodoListModel from './model';
import TodoListView from './view';
import TodoListController from './controller';
import EventEmitter from './event';

const eventEmitter = new EventEmitter();
const model = new TodoListModel();
const view = new TodoListView(eventEmitter);
new TodoListController(model, view, eventEmitter);
