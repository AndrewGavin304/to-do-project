import { pubSub } from "./pubSub"

export function todoList() {
  const list = [];
  function watch(){
    pubSub.sub('todoAdded', todoAdded)
  }

  function todoAdded();
}