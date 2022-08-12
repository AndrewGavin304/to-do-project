export function createElement(type, className, id) {
  let element = document.createElement(`${type}`);
  element.classList.add(`${className}`);
  if (id == "r") {
    element.setAttribute("id", `${className}`);
  } else if (id) {
    element.setAttribute("id", `${id}`);
  }

  return element;
}

export function createSymbolButton(symbol, text, className, id) {
  let button = createElement("button", `${className}`, `${id}`);

  let buttonSymbol = createElement("span", `${className}__symbol`);
  buttonSymbol.classList.add("material-symbols-outlined");
  buttonSymbol.textContent = `${symbol}`;

  let buttonText = createElement("span", `${className}__text`);
  buttonText.textContent = `${text}`;

  button.append(buttonSymbol);
  button.append(buttonText);

  return button;
}