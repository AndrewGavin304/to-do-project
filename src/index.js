import "./sass/app.scss";
import { pubSub } from "./modules/pubSub";
import { createTodo } from "./modules/createTodo";
import { todoListController } from "./modules/todoController";
import { domController } from "./modules/domController";

domController.generateBaseLayout();
domController.listen();
todoListController.listen();

let pfpButton = document.getElementById("navbar__profile-picture-button");
pfpButton.addEventListener('click', () => {
  console.log("i'm a dumb button")

})
// pubSub.pub('todo', createTodo({title: 'noob'}))
// pubSub.pub('todo', createTodo({title: 'choob', priority: 'high'}))