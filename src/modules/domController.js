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
        itemDiv.className = `list-container__item_priority_${value}`
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

    navbar.appendChild(_searchbar());
    navbar.appendChild(_createNameDisplay());
    navbar.appendChild(_createProfilePicture());
    // navbar.appendChild(settingsIcon);
    content.appendChild(navbar);

    function _createNameDisplay() {
      let nameButton = document.createElement("button");
      nameButton.className = "navbar__name";
      nameButton.setAttribute('id', 'navbar__name');
      nameButton.textContent = "Andrew Gavin";
      return nameButton;
    }

    function _createProfilePicture() {
      //check index.html for Jdenticon config
      let pfpButton = document.createElement("button");
      pfpButton.classList.add("navbar__profile-picture-button");
      pfpButton.setAttribute('id', "navbar__profile-picture-button");

      let pfp = document.createElement("canvas");
      pfp.className = "navbar__profile-picture";
      pfp.setAttribute('width', '44');
      pfp.setAttribute('height', '44');
      pfp.setAttribute('data-jdenticon-value', 'AndrewGavin');

      pfpButton.appendChild(pfp);

      return pfpButton;
    }

    // let settingsIcon = document.createElement("span");
    // settingsIcon.classList.add("material-symbols-outlined", "navbar__settings-icon");
    // settingsIcon.textContent = "settings";

    function _searchbar(){
    let searchbar = document.createElement("form");
    searchbar.className = "searchbar";

    let searchbarInput = document.createElement("input");
    searchbarInput.className = "searchbar__input";
    searchbarInput.setAttribute('type', 'search');
    searchbarInput.setAttribute('id', 'search');
    searchbarInput.setAttribute('autocomplete', 'off');

    let searchbarIcon = document.createElement("span");
    searchbarIcon.className = "material-symbols-outlined";
    searchbarIcon.textContent = "search";

    searchbar.appendChild(searchbarIcon);
    searchbar.appendChild(searchbarInput);
    return searchbar;
    }
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