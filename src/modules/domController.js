import { pubSub } from "./pubSub";

export const domController = (function () {
  
  function listen(){
    console.log("addToDom listener started");
    pubSub.sub('todo', addToDom);
  }

  function generateDomListItem(data){
    const itemDiv = document.createElement("div");
    itemDiv.className = "list-container__item";

    for (const [key, value] of Object.entries(data)) {

      if (key == 'priority') {
        itemDiv.className = `list-container__item_${value}-priority`
      }

      else if (key == 'uuid') {
      }

      else if (value){
        let div = document.createElement("div");
        div.className = `list-container__${key}`;

        let span = document.createElement("span");
        span.textContent = `${value}`;

        div.appendChild(span);
        itemDiv.appendChild(div);
      }
    }

    return itemDiv;
  }

  function addToDom(data){
    let listContainer = document.getElementById("list-container");
    console.log(`addToDom received ${data}`)
    listContainer.appendChild(generateDomListItem(data));
  }

  function generateBaseLayout(){
    _navbar();
    _sidebar();
    _listContainer();
  }

  function _navbar(){
    let navbar = document.createElement("div");
    navbar.className = "navbar";
    navbar.setAttribute('id', 'navbar');
    content.appendChild(navbar);
  }

  function _sidebar(){
    let sidebar = document.createElement("div");
    sidebar.className = "sidebar";
    sidebar.setAttribute('id', 'sidebar');
    content.appendChild(sidebar);
  }

  function _listContainer(){
    let listContainer = document.createElement("div");
    listContainer.className = "list-container";
    listContainer.setAttribute('id', 'list-container');
    content.appendChild(listContainer);
  }

  return {
    addToDom,
    listen,
    generateBaseLayout
  }
})()