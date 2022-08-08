import { pubSub } from "./modules/pubSub";
import { createTodo } from "./modules/createTodo";
import { todoList } from "./modules/todoList";

todoList();
pubSub.pub('todo', "data")
