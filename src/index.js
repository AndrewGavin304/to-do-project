import "./sass/app.scss";
import { pubSub } from "./modules/pubSub";
import { createTodo } from "./modules/todoController";
import { domListeners, generateHomeLayout} from "./modules/domManipulation";
import { listen as listListen } from "./modules/todoController";

generateHomeLayout();
domListeners();
listListen();

pubSub.pub('todo', createTodo({title: 'do the thing', description: 'some description', notes: 'some note', date: '2022-02-03T16:16'}))
pubSub.pub('todo', createTodo({title: 'do something else', description: 'laurem', notes: 'please dont make these long', date: '2022-02-03T16:16'}))