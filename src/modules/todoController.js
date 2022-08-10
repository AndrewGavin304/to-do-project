import { pubSub }from "./pubSub"
const list = [];
  
export function listen(){
  console.log("todoListener started");
  pubSub.sub('todo', addToListArray);
}

function addToListArray(data){
  console.log(`addToList received ${data}`)
  list.push(data)
  console.log(list)
}
