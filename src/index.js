import { pubSub } from "./modules/pubSub";
import { createTodo } from "./modules/createTodo";
import { todoListController } from "./modules/todoController";
import { domController } from "./modules/domController";

domController.createListContainer();
todoListController();
console.log("addToDom wants to know when todo is added for todoAdded");
pubSub.sub('todo', domController.addToDom);
pubSub.pub('todo', createTodo({title: 'noob'}))
pubSub.pub('todo', createTodo({title: 'choob', priority: 'high'}))