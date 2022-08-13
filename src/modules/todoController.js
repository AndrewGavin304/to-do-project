import { pubSub } from "./pubSub";
import { v4 as uuidv4 } from "uuid";

const todoList = [];
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

function addToTodoArray(data) {
  todoList.push(data);
  console.log(todoList);
}

function addToProjectArray(data) {
  projectList.push(data);
}

export function convertFormDataToObj() {
  const inputs = document.querySelectorAll("#add-todo-form input");
  let todoObj = createTodo();

  inputs.forEach((input) => {
    if (input.value) {
      todoObj[input.id] = input.value;
    }
  });

  return todoObj;
}
