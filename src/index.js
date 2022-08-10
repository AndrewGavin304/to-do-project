import "./sass/app.scss";
import { pubSub } from "./modules/pubSub";
import { createTodo } from "./modules/createTodo";
import { listen as domListen, clickAddTodoListener, generateHomeLayout, clickSubmitTodoListener} from "./modules/domManipulation";
import { listen as listListen } from "./modules/todoController";

generateHomeLayout();
clickAddTodoListener();
clickSubmitTodoListener();
domListen();
listListen();

pubSub.pub('todo', createTodo({title: 'do the thing', description: 'some description', notes: 'some note', dueDate: 'april 21st 1893'}))
