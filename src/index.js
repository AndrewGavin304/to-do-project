import "./sass/app.scss";
import { pubSub } from "./modules/pubSub";
import { createTodo } from "./modules/todoController";
import { addListItemToDomListener as domListen, clickAddTodoListener, generateHomeLayout, clickSubmitTodoListener} from "./modules/domManipulation";
import { listen as listListen } from "./modules/todoController";

generateHomeLayout();
clickAddTodoListener();
clickSubmitTodoListener();
domListen();
listListen();

pubSub.pub('todo', createTodo({title: 'do the thing', description: 'some description', notes: 'some note', dueDate: '2022-02-03T16:16'}))
pubSub.pub('todo', createTodo({title: 'do something else', description: 'laurem', notes: 'please dont make these long', dueDate: '2022-02-03T16:16'}))