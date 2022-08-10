import "./sass/app.scss";
import { pubSub } from "./modules/pubSub";
import { createTodo } from "./modules/createTodo";
import { todoListController } from "./modules/todoController";
import { domController } from "./modules/domController";

domController.generateHomeLayout();
domController.listen();
todoListController.listen();

let addTodoButton = document.getElementById("add-todo-button");
addTodoButton.addEventListener('click', () => {
  const addTodoForm = document.getElementById('add-todo-form');

    if (addTodoForm.classList.contains('add-todo-form_hide')) {
      addTodoForm.classList.remove('add-todo-form_hide');
      addTodoForm.classList.add('add-todo-form_show');
      addTodoButton.classList.remove('add-todo-button_show');
      addTodoButton.classList.add('add-todo-button_hide');
    } 
    
    else {
      addTodoForm.classList.remove('add-todo-form_show');
      addTodoForm.classList.add('add-todo-form_hide');
      addTodoButton.classList.remove('add-todo-button_show');
      addTodoButton.classList.add('add-todo-button_hide');
    }
})
pubSub.pub('todo', createTodo({title: 'walk the dog 14 times a day', description: 'some description', notes: 'some note', dueDate: 'april 21st 1893'}))
pubSub.pub('todo', createTodo({title: 'choob', priority: 'high'}))
pubSub.pub('todo', createTodo({title: 'asdf', priority: 'high'}))