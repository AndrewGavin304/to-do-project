import "./sass/app.scss";
import { pubSub } from "./modules/pubSub";
import { createTodo } from "./modules/todoController";
import { domListeners, generateHomeLayout} from "./modules/domManipulation";
import { arrayListen } from "./modules/todoController";

generateHomeLayout();
domListeners();
// arrayListen();

pubSub.pub('todo', createTodo({title: 'do the thing', description: 'some description', notes: 'some note', date: '2022-02-03T16:16', project: "something else"}))
pubSub.pub('todo', createTodo({title: 'do something else with a very very unnecessarily long title because thats how you roll', description: 'laurem', notes: 'please dont make these long', date: '2022-02-03T16:16', time: "7:52", project: 'default'}))