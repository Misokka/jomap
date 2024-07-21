export const createElement = (component) => {
  // Création de l'élément DOM en fonction du type spécifié dans le composant
  const element = document.createElement(component.type);

  // Gestion des propriétés du composant
  if (component.props) {
    Object.keys(component.props).forEach(propName => {
      if (propName === 'style') {
        Object.assign(element.style, component.props[propName]);
      } 
      else if (propName.startsWith('on') && typeof component.props[propName] === 'function') {
        element.addEventListener(propName.substring(2).toLowerCase(), component.props[propName]);
      } 
      else {
        element[propName] = component.props[propName];
      }
    });
  }

  // Gestion des enfants du composant
  if (component.children) {
    component.children.forEach(child => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } 
      else if (child.type === 'TEXT_NODE') {
        element.appendChild(document.createTextNode(child.content));
      } 
      else {
        element.appendChild(createElement(child));
      }
    });
  }

  return element;
};
