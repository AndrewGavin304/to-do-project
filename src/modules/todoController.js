import { pubSub }from "./pubSub"
import { v4 as uuidv4 } from 'uuid';

const list = [];
export const createTodo = ({
  title = 'Todo Item',
  description = undefined,
  dueDate = undefined,
  priority = 'medium',
  notes = undefined,
  checked = false,
  project = undefined,
  uuid = uuidv4()
} = {}) => ({
  title,
  description,
  dueDate,
  priority,
  notes,
  checked,
  project,
  uuid
})
  
export function listen(){
  console.log("todoListener started");
  pubSub.sub('todo', addToListArray);
}

function addToListArray(data){
  console.log(`addToList received ${data}`)
  list.push(data)
  console.log(list)
}

export function convertFormDataToObj(){
  const inputs = document.querySelectorAll('#add-todo-form input');
  let todoObj = createTodo();

  inputs.forEach(input => {
    if (input.value){
    todoObj[input.id] = input.value;
    }
  })

  return todoObj;
}
