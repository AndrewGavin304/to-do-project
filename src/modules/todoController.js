import { pubSub }from "./pubSub"


export const todoListController = (function () {
  const list = [];
  
  function listen(){
    console.log("todoListener started");
    pubSub.sub('todo', addToListArray);
  }

  function addToListArray(data){
    console.log(`addToList received ${data}`)
    list.push(data)
    console.log(list)
  }

  return {listen}
})()