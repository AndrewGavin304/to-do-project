import {
  createTodo,
  addToTodoArray,
  addToProjectArray,
  todoList,
  removeToDo,
} from "./todoController";
import { pubSub } from "./pubSub";
import { convertFormDataToObj, projectList } from "./todoController";
import { format } from "date-fns";
import { createElement, createSymbolElement } from "./components";
import { noCase, paramCase } from "change-case";
import { titleCase } from "title-case";

let priorities = ["low", "medium", "high"];

export function domListeners() {
  _subscriptions();
  _clickSubmitTodoListener();
  _clickAddTodoListener();
  _clickAddToProjectListener();
  _clickSubmitProjectListener();
  _searchbarListener();
  _projectBtnListener();
  _removeBtnListener();

  function _subscriptions() {
    pubSub.sub("todo", addListItemToDom);
    pubSub.sub("todo", addToTodoArray);
    pubSub.sub("project", addToProjectArray);
    pubSub.sub("project", addProjectInSidebar);
    pubSub.sub("project", addProjectToDropdown);
  }

  function _clickSubmitTodoListener() {
    let submit = document.getElementById("add-todo-form__submit");
    submit.addEventListener("click", function (e) {
      pubSub.pub("todo", convertFormDataToObj());
      e.preventDefault();
    });
    submit.addEventListener("click", function (e) {
      _toggleElement("add-todo-btn");
    });
    submit.addEventListener("click", function (e) {
      _toggleElement("add-todo-form");
    });
  }

  function _clickAddTodoListener() {
    let addTodoButton = document.getElementById("add-todo-btn");
    addTodoButton.addEventListener("click", function () {
      _toggleElement("add-todo-btn");
    });
    addTodoButton.addEventListener("click", function () {
      _toggleElement("add-todo-form");
    });
  }

  function _clickAddToProjectListener() {
    let addProjectButton = document.getElementById("sidebar__add-project-btn");
    addProjectButton.addEventListener("click", function () {
      _toggleElement("add-project-form");
    });
    addProjectButton.addEventListener("click", function () {
      _toggleElement("sidebar__add-project-btn");
    });
  }

  function _clickSubmitProjectListener() {
    let submit = document.getElementById("add-project-form__submit-btn");
    submit.addEventListener("click", function (e) {
      pubSub.pub("project", getProjectName());
      e.preventDefault();
    });
    submit.addEventListener("click", function (e) {
      _toggleElement("add-project-form");
    });
    submit.addEventListener("click", function (e) {
      _toggleElement("sidebar__add-project-btn");
    });
  }

  function _searchbarListener() {
    let searchbarInput = document.getElementById("searchbar__input");
    searchbarInput.addEventListener("keyup", function (event) {
      _search(searchbarInput);
    });
  }

  function _projectBtnListener() {
    let projectContainer = document.querySelector("#sidebar__project-display");
    projectContainer.addEventListener("click", (event) => {
      let target = event.target;
      if (target.nodeName === "BUTTON") {
        _search(target);
      }
    });
  }

  function _removeBtnListener() {
    let listContainer = document.querySelector("#list-container");
    listContainer.addEventListener("click", (event) => {
      let target = event.target;
      if (target.className == "list-item__remove") {
        let unparsedClassNameStr = event.target.id;
        let itemUUID = unparsedClassNameStr.replace("list-item__remove-", "");
        target.parentNode.remove();
        removeToDo(itemUUID);
      }
    });
  }
}

export function generateHomeLayout() {
  _navbar();
  _sidebar();
  _content();

  function _navbar() {
    let navbar = createElement("div", "navbar");

    let brandName = createElement("span", "navbar__brand-name");
    brandName.textContent = "TrueDo";

    let username = createElement("button", "navbar__name", "r");
    username.classList.add("btn");
    username.textContent = "Andrew Gavin";

    let searchbar = _searchbar();
    let pfp = _createProfilePicture();

    navbar.append(brandName);
    navbar.append(searchbar);
    navbar.append(username);
    navbar.append(pfp);
    document.body.append(navbar);

    function _createProfilePicture() {
      //check index.html for Jdenticon config
      let pfpButton = createElement("button", "navbar__pfp-button", "r");
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
      let searchbar = createElement("form", "searchbar");

      let searchbarInput = createElement("input", "searchbar__input", "r");
      searchbarInput.setAttribute("type", "search");
      searchbarInput.setAttribute("autocomplete", "off");
      // searchbarInput.setAttribute("onkeyup", '_search()');

      let searchbarIcon = createElement("span", "material-symbols-outlined");
      searchbarIcon.textContent = "search";

      searchbar.append(searchbarIcon);
      searchbar.append(searchbarInput);

      return searchbar;
    }
  }

  function _sidebar() {
    let sidebar = createElement("div", "sidebar", "r");
    let projectDisplay = createElement("div", "sidebar__project-display", "r");
    let showAllButton = createElement(
      "button",
      "sidebar__show-all-button",
      "sidebar__project-button_show-all"
    );
    showAllButton.innerText = "Show All";

    let addProjectButton = createSymbolElement(
      "button",
      "add",
      "Add Project",
      "sidebar__add-project-btn_show",
      "sidebar__add-project-btn"
    );

    let addProjectForm = _addProjectForm();

    projectDisplay.append(showAllButton);
    sidebar.append(projectDisplay);
    sidebar.append(addProjectButton);
    sidebar.append(addProjectForm);
    document.body.append(sidebar);
  }

  function _content() {
    //content variable must be hoisted with var declaration
    var content = createElement("div", "content");
    let todoBtn = createSymbolElement(
      "button",
      "add",
      "Add Todo",
      "add-todo-btn_show",
      "add-todo-btn"
    );
    let listContainer = createElement("div", "list-container", "r");
    let todoForm = _addTodoForm();

    content.append(listContainer);
    content.append(todoBtn);
    content.append(todoForm);
    document.body.append(content);
  }
}

function addListItemToDom(data) {
  let listContainer = document.getElementById("list-container");
  listContainer.append(_generateDomListItem(data));

  function _generateDomListItem(data) {
    let itemUUID = data.uuid;
    let itemDiv = createElement(
      "div",
      "list-item-container",
      `list-item-container-${itemUUID}`
    );

    itemDiv.append(createElement("div", "list-item-container__divider"));
    itemDiv.append(
      createSymbolElement(
        "button",
        "close",
        "",
        "list-item__remove",
        `list-item__remove-${itemUUID}`
      )
    );

    for (const [key, value] of Object.entries(data)) {
      if (key == "date") {
        if (value) {
          let unformattedDate = `${value}`;
          let formattedDate = format(new Date(unformattedDate), "MM/dd/yyyy");
          var dateAndTimeDiv = createElement(
            "div",
            "list-item-date-and-time",
            `list-item-date-and-time-${itemUUID}`
          );
          let dateDiv = _generateListElement(
            `${key}-and-time_date`,
            formattedDate,
            "calendar_month"
          );
          dateAndTimeDiv.append(dateDiv);
          itemDiv.append(dateAndTimeDiv);
        } else {
          var dateAndTimeDiv = _generateListElement(`${key}-and-time`, "");
          itemDiv.append(dateAndTimeDiv);
        }
      } else if (key == "time" && value) {
        dateAndTimeDiv.append(
          _generateListElement(`date-and-time_${key}`, `${value}`, "alarm")
        );
      } else if (key == "priority") {
        itemDiv.classList.add(`list-item-container_priority_${value}`);
      } else if (key == "project") {
        itemDiv.append(_generateListElement(`${key}`, titleCase(`${value}`)));
      } else if (key == "uuid") {
      } else if (value) {
        itemDiv.append(_generateListElement(`${key}`, `${value}`));
      }
    }

    function _generateListElement(key, value, symbol) {
      if (symbol) {
        //functions appear substantially different because createSymbolElement is superset of createElement, consider refactor
        let div = createSymbolElement(
          "div",
          `${symbol}`,
          `${value}`,
          `list-item-${key}`,
          `list-item-${key}-${itemUUID}`
        );
        return div;
      } else {
        let div = createElement(
          "div",
          `list-item-${key}`,
          `list-item-${key}-${itemUUID}`
        );
        let content = createElement("span", `list-item-${key}__text`);
        content.textContent = `${value}`;
        div.append(content);
        return div;
      }
    }

    return itemDiv;
  }
}

function _addTodoForm() {
  let form = createElement("form", "add-todo-form_hide", "add-todo-form");

  const templateTodo = createTodo();
  const { checked, uuid, ...strippedTodo } = templateTodo;

  for (const [key] of Object.entries(strippedTodo)) {
    let label = createElement("label", "add-todo-form__label");
    label.setAttribute("for", `${key}`);

    let input = createElement(
      "input",
      "add-todo-form__input",
      paramCase(`${key}`)
    );

    label.append(titleCase(noCase(`${key}`)));

    if (`${key}` == "priority") {
      form.append(label);
      let selectPrio = createElement(
        "select",
        "add-todo-form__input",
        `${key}`
      );
      selectPrio = _generateDropdownOptions(selectPrio, priorities);
      form.append(selectPrio);
      continue;
    } else if (`${key}` == "project") {
      form.append(label);
      let selectProj = createElement(
        "select",
        "add-todo-form__input",
        `${key}`
      );
      selectProj = _generateDropdownOptions(selectProj, projectList);
      form.append(selectProj);
      continue;
    } else if (`${key}` == "date") {
      input.setAttribute("type", "date");
    } else if (`${key}` == "time") {
      input.setAttribute("type", "time");
    } else {
      input.setAttribute("type", "text");
      input.setAttribute("autocomplete", "off");
    }

    form.append(label);
    form.append(input);
  }

  let submit = createSymbolElement(
    "button",
    "add",
    "Add Todo",
    "add-todo-form__submit_show",
    "add-todo-form__submit"
  );
  form.append(submit);

  return form;
}

function getProjectName() {
  const input = document.getElementById("add-project-form__input");
  const name = titleCase(input.value);

  return name;
}

function addProjectInSidebar(data) {
  let projectDisplay = document.getElementById("sidebar__project-display");
  let projectButton = createElement(
    "button",
    "sidebar__project-button",
    `sidebar__project-button_${data}`
  );
  projectButton.textContent = titleCase(`${data}`);
  projectDisplay.append(projectButton);
}

function addProjectToDropdown(data) {
  let select = document.getElementById("project");
  let option = document.createElement("option");
  option.value = paramCase(`${data}`);
  option.text = titleCase(`${data}`);

  select.append(option);
}

function _addProjectForm() {
  let form = createElement("form", "add-project-form_hide", "add-project-form");
  let input = createElement("input", "add-project-form__input", "r");
  let projectSubmit = createSymbolElement(
    "button",
    "add",
    "Add Project",
    "add-project-form__submit-btn",
    "r"
  );

  form.append(input);
  form.append(projectSubmit);
  return form;
}

function _generateDropdownOptions(select, array) {
  array.forEach((e) => {
    let option = document.createElement("option");
    option.value = `${e}`;
    option.text = `${e}`[0].toUpperCase() + `${e}`.slice(1);

    if (option.value == "medium") {
      option.setAttribute("selected", "selected");
    }
    select.append(option);
  });

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

function _search(input) {
  let textInput = "";
  let todoObjectsNodeList = document.querySelectorAll(".list-item-container");
  let todoObjectsArray = [...todoObjectsNodeList];

  if (input.tagName.toLowerCase() == "input") {
    textInput = input.value.toLowerCase();
  }
  if (input.tagName.toLowerCase() == "button") {
    textInput = input.innerText.toLowerCase();
  }

  if (textInput.toLowerCase() == "show all") {
    todoObjectsArray.forEach((div) => {
      div.style.display = "grid";
    });
  } else {
    let todoArray = todoList;

    let results = todoArray.filter((itemObject) => {
      let { checked, uuid, ...strippedItemObject } = itemObject;
      let strippedObjectValueArray = Object.values(strippedItemObject);
      let matches = strippedObjectValueArray.filter((e) => {
        if (e) {
          if (e.includes(textInput)) {
            return true;
          }
        }
      });
      if (matches.length > 0) {
        return true;
      }
    });

    todoObjectsArray.forEach((div) => {
      div.style.display = "none";
    });

    results.forEach((todoObj) => {
      let objUUID = todoObj.uuid;
      let objDisplay = document.getElementById(
        `list-item-container-${objUUID}`
      );
      objDisplay.style.display = "grid";
    });
  }
}
