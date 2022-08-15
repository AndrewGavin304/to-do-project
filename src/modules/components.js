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

export function createSymbolElement(elementType, symbol, text, className, id) {
  let element = createElement(`${elementType}`, `${className}`);

  if (id == "r") {
    element.setAttribute("id", `${className}`);
  } else if (id) {
    element.setAttribute("id", `${id}`);
  }

  let elementSymbol = createElement("span", `${className}__symbol`);
  elementSymbol.classList.add("material-symbols-outlined");
  elementSymbol.textContent = `${symbol}`;

  let elementText = createElement("span", `${className}__text`);
  elementText.textContent = `${text}`;

  element.append(elementSymbol);
  element.append(elementText);

  return element;
}