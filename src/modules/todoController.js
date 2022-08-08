import { pubSub }from "./pubSub"

export function todoListController() {
  const list = [];
  
  console.log("addToListArray wants to know when todo is added for addToList");
  pubSub.sub('todo', addToListArray);

  function addToListArray(data){
    console.log(`addToList received ${data}`)
    list.push(data)
    console.log(list)
  }
}