import { createTodo } from "./todoController";
import { pubSub } from "./pubSub";
import { convertFormDataToObj } from "./todoController";
import { format } from "date-fns";

let projectList = ["default"];
let priorities = ["low", "medium", "high"];

export function domListeners() {
  _addListItemToDomListener();
  _clickSubmitTodoListener();
  _clickAddTodoListener();

  function _addListItemToDomListener() {
    console.log("addListItemToDom listener started");
    pubSub.sub("todo", addListItemToDom);
  }

  function _clickSubmitTodoListener() {
    let submit = document.getElementById("add-todo-form__submit");
    submit.addEventListener("click", function (e) {
      pubSub.pub("todo", convertFormDataToObj());
      e.preventDefault();
    });
    submit.addEventListener("click", function (e) {
      _toggleElement("add-todo-button");
    });
    submit.addEventListener("click", function (e) {
      _toggleElement("add-todo-form");
    });
  }

  function _clickAddTodoListener() {
    let addTodoButton = document.getElementById("add-todo-button");
    addTodoButton.addEventListener("click", function () {
      _toggleElement("add-todo-button");
    });
    addTodoButton.addEventListener("click", function () {
      _toggleElement("add-todo-form");
    });
  }
}

function _createElement(type, className, id) {
  let element = document.createElement(`${type}`);
  element.classList.add(`${className}`);
  if (id == "r") {
    element.setAttribute("id", `${className}`);
  } else if (id) {
    element.setAttribute("id", `${id}`);
  }

  return element;
}

export function generateHomeLayout() {
  _navbar();
  _sidebar();
  _content();

  function _navbar() {
    let navbar = _createElement("div", "navbar");
    let brandName = _createElement("span", "navbar__brand-name");
    brandName.textContent = "TrueDo";

    let username = _createElement("button", "navbar__name", "r");
    username.classList.add("btn");
    username.textContent = "Andrew Gavin";

    navbar.append(brandName);
    navbar.append(_searchbar());
    navbar.append(username);
    navbar.append(_createProfilePicture());
    document.body.append(navbar);

    function _createProfilePicture() {
      //check index.html for Jdenticon config
      let pfpButton = _createElement("button", "navbar__pfp-button", "r");
      pfpButton.classList.add("btn");

      let pfp = document.createElement("canvas");
      pfp.classList.add("navbar__profile-picture");
      pfp.setAttribute("width", "44");
      pfp.setAttribute("height", "44");
      pfp.setAttribute("data-jdenticon-value", "AndrewG");

      pfpButton.append(pfp);

      return pfpButton;
    }

    function _searchbar() {
      let searchbar = _createElement("form", "searchbar");
      let searchbarInput = _createElement("input", "searchbar__input", "r");
      searchbarInput.setAttribute("type", "search");
      searchbarInput.setAttribute("autocomplete", "off");

      let searchbarIcon = _createElement("span", "material-symbols-outlined");
      searchbarIcon.textContent = "search";

      searchbar.append(searchbarIcon);
      searchbar.append(searchbarInput);
      return searchbar;
    }
  }

  function _sidebar() {
    let sidebar = _createElement("div", "sidebar", "r");
    document.body.append(sidebar);
  }

  function _content() {
    var content = _createElement("div", "content");

    content.append(_createElement("div", "list-container", "r"));
    content.append(
      _createSymbolButton(
        "add",
        "Add Todo",
        "add-todo-button_show",
        "add-todo-button"
      )
    );
    content.append(_addTodoForm());
    document.body.append(content);
  }
}

function addListItemToDom(data) {
  let listContainer = document.getElementById("list-container");
  console.log(`addListItemToDom received ${data}`);
  listContainer.append(_generateDomListItem(data));

  function _generateDomListItem(data) {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("list-container-item");

    for (const [key, value] of Object.entries(data)) {
      if (key == "dueDate" && value) {
        let unformattedDate = `${value}`;
        let formattedDate = format(new Date(unformattedDate), "dd/mm/yyyy");
        _generateListElement(`${key}`, formattedDate);
      } else if (key == "priority") {
        itemDiv.classList.add(`list-container-item_priority_${value}`);
      } else if (key == "uuid") {
      } else if (value) {
        _generateListElement(`${key}`, `${value}`);
      }
    }

    function _generateListElement(key, value) {
      let div = document.createElement("div");
      div.classList.add(`list-container-item__${key}`);

      let span = document.createElement("span");
      span.textContent = `${value}`;
      span.classList.add(`list-container-item-${key}`);

      div.append(span);
      itemDiv.append(div);
    }

    return itemDiv;
  }
}

function _createSymbolButton(symbol, text, className, id) {
  let button = _createElement("button", `${className}`, `${id}`);
  let buttonSymbol = _createElement("span", `${className}__symbol`);
  let buttonText = _createElement("span", `${className}__text`);

  buttonSymbol.classList.add("material-symbols-outlined");
  buttonSymbol.textContent = `${symbol}`;
  buttonText.textContent = `${text}`;

  button.append(buttonSymbol);
  button.append(buttonText);

  return button;
}

function _addTodoForm() {
  let form = document.createElement("form");
  form.setAttribute("id", "add-todo-form");
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
    let keyStr = `${key}`;
    keyStr = keyStr.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1");
    keyStr = keyStr[0].toUpperCase() + keyStr.slice(1);
    label.append(keyStr);

    if (`${key}` == "priority") {
      form.append(label);
      form.append(_generateDropdownOptions(`${key}`, priorities));
      continue;
    } else if (`${key}` == "project") {
      form.append(label);
      form.append(_generateDropdownOptions(`${key}`, projectList));
      continue;
    } else if (`${key}` == "dueDate") {
      input.setAttribute("type", "datetime-local");
    } else {
      input.setAttribute("type", "text");
      input.setAttribute("autocomplete", "off");
    }

    form.append(label);
    form.append(input);
  }

  let submit = _createSymbolButton(
    "add",
    "Add Todo",
    "add-todo-form__submit_show",
    "add-todo-form__submit"
  );
  form.append(submit);

  return form;
}

function _generateDropdownOptions(key, array) {
  let select = document.createElement("select");

  array.forEach((e) => {
    let option = document.createElement("option");
    option.value = `${e}`;
    option.text = `${e}`[0].toUpperCase() + `${e}`.slice(1);

    if (option.value == "medium") {
      option.setAttribute("selected", "selected");
    }
    select.append(option);
  });

  select.setAttribute("id", `${key}`);
  select.classList.add("add-todo-form__input");
  return select;
}

function _toggleElement(id) {
  const element = document.getElementById(`${id}`);

  if (element.classList.contains(`${id}_show`)) {
    element.classList.remove(`${id}_show`);
    element.classList.add(`${id}_hide`);
  } else {
    element.classList.remove(`${id}_hide`);
    element.classList.add(`${id}_show`);
  }
}
