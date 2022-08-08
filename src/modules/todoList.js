import { pubSub }from "./pubSub"
import { createTodo } from "./createTodo";

export function todoList() {
  const list = [];
  
  console.log("todoList wants to know when todo is added");
  pubSub.sub('todo', todoAdded);

  function todoAdded(data){
    console.log(data + "fff")
  }
}