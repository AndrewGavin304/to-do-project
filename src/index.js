import { pubSub } from "./modules/pubSub";
import { createTodo } from "./modules/createTodo";
import { todoListController } from "./modules/todoController";
import { domController } from "./modules/domController";

domController.generateBaseLayout();
domController.listen();
todoListController.listen();
pubSub.pub('todo', createTodo({title: 'noob'}))
pubSub.pub('todo', createTodo({title: 'choob', priority: 'high'}))