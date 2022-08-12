import { createTodo } from "./todoController";
import { pubSub } from "./pubSub";
import { convertFormDataToObj } from "./todoController";
import { format } from 'date-fns'

let projectList = ['default']
let priorities = ['low', 'medium', 'high']

export function addListItemToDomListener(){
  console.log("addListItemToDom listener started");
  pubSub.sub('todo', addListItemToDom);
}

export function clickSubmitTodoListener() {
  let submit = document.getElementById("add-todo-form__submit");
  submit.addEventListener('click', function(e) {pubSub.pub('todo', convertFormDataToObj()); e.preventDefault();});
  submit.addEventListener('click', function(e) {_toggleAddTodoButton()})
  submit.addEventListener('click', function(e) {_toggleAddTodoForm()})
}

export function clickAddTodoListener(){
  let addTodoButton = document.getElementById("add-todo-button");
  addTodoButton.addEventListener('click', function() {_toggleAddTodoButton()})
  addTodoButton.addEventListener('click', function() {_toggleAddTodoForm()})
}

export function generateHomeLayout(){
  _navbar();
  _sidebar();
  _content();

  function _navbar(){
    let navbar = document.createElement("div");
    navbar.classList.add("navbar");
    navbar.setAttribute('id', 'navbar');
  
    navbar.append(_brandText('navbar'));
    navbar.append(_searchbar());
    navbar.append(_createNameDisplay());
    navbar.append(_createProfilePicture());
    // navbar.append(settingsIcon);
    document.body.append(navbar);
  
    function _createNameDisplay() {
      let nameButton = document.createElement("button");
      nameButton.classList.add("navbar__name", "btn");
      nameButton.setAttribute('id', 'navbar__name');
      nameButton.textContent = "Andrew Gavin";
      return nameButton;
    }
  
    function _createProfilePicture() {
      //check index.html for Jdenticon config
      let pfpButton = document.createElement("button");
      pfpButton.classList.add("navbar__profile-picture-button", "btn");
      pfpButton.setAttribute('id', "navbar__profile-picture-button");
  
      let pfp = document.createElement("canvas");
      pfp.classList.add("navbar__profile-picture");
      pfp.setAttribute('width', '44');
      pfp.setAttribute('height', '44');
      pfp.setAttribute('data-jdenticon-value', 'AndrewG');
  
      pfpButton.append(pfp);
  
      return pfpButton;
    }
  
    function _searchbar(){
    let searchbar = document.createElement("form");
    searchbar.classList.add("searchbar");
  
    let searchbarInput = document.createElement("input");
    searchbarInput.classList.add("searchbar__input");
    searchbarInput.setAttribute('type', 'search');
    searchbarInput.setAttribute('id', 'search');
    searchbarInput.setAttribute('autocomplete', 'off');
  
    let searchbarIcon = document.createElement("span");
    searchbarIcon.classList.add("material-symbols-outlined");
    searchbarIcon.textContent = "search";
  
    searchbar.append(searchbarIcon);
    searchbar.append(searchbarInput);
    return searchbar;
    }
  }

  function _sidebar(){
    let sidebar = document.createElement("div");
    sidebar.classList.add("sidebar");
    sidebar.setAttribute('id', 'sidebar');
    document.body.append(sidebar);
  }

  function _content(){
    var content = document.createElement("div");
    content.classList.add("content");
  
    content.append(_listContainer());
    content.append(_addTodoButton('add-todo-button'));
    content.append(_addTodoForm());
    document.body.append(content);

    function _listContainer(){
      let listContainer = document.createElement("div");
      listContainer.classList.add("list-container");
      listContainer.setAttribute('id', 'list-container');
      return listContainer;
    }
  }
}
 
function addListItemToDom(data){
  let listContainer = document.getElementById("list-container");
  console.log(`addListItemToDom received ${data}`)
  listContainer.append(_generateDomListItem(data));

  function _generateDomListItem(data){
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("list-container-item");
  
    for (const [key, value] of Object.entries(data)) {
  
      if ((key == 'dueDate') && (value)) {
        let unformattedDate = `${value}`
        let formattedDate = format(new Date(unformattedDate), 'dd/mm/yyyy');
        _generateListElement(`${key}`, formattedDate)
      }
  
      else if (key == 'priority') {
        itemDiv.classList.add(`list-container-item_priority_${value}`)
      }
  
      else if (key == 'uuid') {
      }
  
      else if (value){
        _generateListElement(`${key}`, `${value}`)
      }
    }
  
    function _generateListElement(key, value){
      let div = document.createElement("div");
      div.classList.add(`list-container-item__${key}`);
  
      let span = document.createElement("span");
      span.textContent = `${value}`;
      span.classList.add(`list-container-item-${key}`)
  
      div.append(span);
      itemDiv.append(div);
    }
  
    return itemDiv;
  }
}

function _addTodoButton(id){
  let addTodoButton = document.createElement("button");
  let addTodoButtonIcon = document.createElement("span");
  let addTodoButtonText = document.createElement("span");

  addTodoButton.classList.add(`${id}_show`, "btn");
  addTodoButton.setAttribute('id', `${id}`);

  addTodoButtonIcon.classList.add("material-symbols-outlined", `${id}__icon`);
  addTodoButtonIcon.append("add");

  addTodoButtonText.textContent = "Add Todo";
  addTodoButtonText.classList.add(`${id}__text`)

  addTodoButton.append(addTodoButtonIcon);
  addTodoButton.append(addTodoButtonText);

  return addTodoButton;
}

function _addTodoForm(){
  let form = document.createElement("form");
  form.setAttribute('id', 'add-todo-form');
  form.classList.add("add-todo-form_hide");

  //used to generate form
  const templateTodo = createTodo();
  const { checked, uuid, ...strippedTodo } = templateTodo;

  for (const [key] of Object.entries(strippedTodo)) {
    let label = document.createElement("label");
    let input = document.createElement("input");
    label.setAttribute("for", `${key}`);
    label.classList.add("add-todo-form__label");
    input.setAttribute("id", `${key}`);
    input.classList.add("add-todo-form__input");
    //replaces key camelCase to Title Case (eg dueDate to Due Date)
    let keyStr = `${key}`
    keyStr = keyStr.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1");
    keyStr = keyStr[0].toUpperCase() + keyStr.slice(1);
    label.append(keyStr);
    
    if (`${key}` == 'priority'){
      form.append(label);
      form.append(_generateDropdownOptions(`${key}`, priorities));
      continue;
    }

    else if (`${key}` == 'project'){
      form.append(label);
      form.append(_generateDropdownOptions(`${key}`, projectList));
      continue;
    }

    else if (`${key}` == 'dueDate'){
      input.setAttribute('type', 'datetime-local');
    }

    else {
      input.setAttribute("type", "text");
      input.setAttribute('autocomplete', 'off');
    }

    form.append(label);
    form.append(input);
  }

  let submit = _addTodoButton('add-todo-form__submit');
  form.append(submit);

  return form;
}

function _generateDropdownOptions(key, array){
  let select = document.createElement('select');

  array.forEach(e => {
    let option = document.createElement('option');
    option.value = `${e}`
    option.text = `${e}`[0].toUpperCase() + `${e}`.slice(1);

    if (option.value == 'medium'){
      option.setAttribute('selected', 'selected');
    }
    select.append(option);
  });

  select.setAttribute("id", `${key}`)
  select.classList.add("add-todo-form__input")
  return select;
}

function _toggleAddTodoButton(){
  const addTodoButton = document.getElementById("add-todo-button");
  
  if (addTodoButton.classList.contains("add-todo-button_show")){
    addTodoButton.classList.remove('add-todo-button_show');
    addTodoButton.classList.add('add-todo-button_hide');
  }

  else{
    addTodoButton.classList.remove('add-todo-button_hide');
    addTodoButton.classList.add('add-todo-button_show');
  }

}

function _toggleAddTodoForm(){
  const addTodoForm = document.getElementById('add-todo-form');

  if (addTodoForm.classList.contains('add-todo-form_hide')){
    addTodoForm.classList.remove('add-todo-form_hide');
    addTodoForm.classList.add('add-todo-form_show');
  } 
    
  else {
    addTodoForm.classList.remove('add-todo-form_show');
    addTodoForm.classList.add('add-todo-form_hide');
  }
}

function _brandText(parentClass){
  let span = document.createElement("span");
  span.classList.add(`${parentClass}__brand-name`);
  span.innerText = "TrueDo";

  return span;
}
