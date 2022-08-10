import "./sass/app.scss";
import { pubSub } from "./modules/pubSub";
import { createTodo } from "./modules/createTodo";
import { generateHomeLayout } from "./modules/domManipulation";
import { listen as domListen, addTodoListener } from "./modules/domManipulation";
import { listen as listListen } from "./modules/todoController";

generateHomeLayout();
addTodoListener();
domListen();
listListen();

pubSub.pub('todo', createTodo({title: 'walk the dog 14 times a day', description: 'some description', notes: 'some note', dueDate: 'april 21st 1893'}))
pubSub.pub('todo', createTodo({title: 'choob', priority: 'high'}))
pubSub.pub('todo', createTodo({title: 'asdf', priority: 'high'}))