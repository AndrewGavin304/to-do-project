import { pubSub } from "./pubSub";
import { v4 as uuidv4 } from "uuid";

export const todoList = [];
export const projectList = ["default"];

export const createTodo = ({
  title = "Todo Item",
  description = undefined,
  date = undefined,
  time = undefined,
  priority = "medium",
  notes = undefined,
  checked = false,
  project = undefined,
  uuid = uuidv4(),
} = {}) => ({
  title,
  description,
  date,
  time,
  priority,
  notes,
  checked,
  project,
  uuid,
});

export function arrayListen() {
  pubSub.sub("todo", addToTodoArray);
  pubSub.sub("project", addToProjectArray);
}

export function addToTodoArray(data) {
  todoList.push(data);
  console.log(todoList);
  return todoList;
}

function addToProjectArray(data) {
  console.log(projectList)
  projectList.push(data);
}

export function convertFormDataToObj() {
  const inputs = document.querySelectorAll("#add-todo-form input");
  const selects = document.querySelectorAll("#add-todo-form select");

  let todoObj = createTodo();

  inputs.forEach((input) => {
    console.log(input);
    if (input.value) {
      if (input.key == 'date') {
        todoObj[input.id] = format(new Date(input.value), "MM/dd/yyyy");
      }
      else {
        todoObj[input.id] = input.value;
      }
    }
  });

  selects.forEach((select) => {
    let chosenOption = select.options[select.selectedIndex].value;
    console.log(chosenOption);
    if (chosenOption) {
      console.log(todoObj[select.id]);
      todoObj[select.id] = chosenOption;
    }
  });

  return todoObj;
}
