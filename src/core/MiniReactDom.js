import BrowserRouter from "../components/BrowserRouter.js";

const MiniReactDom = {
  render: function (rootElement, routes) {
    BrowserRouter.bind(this)(routes, rootElement);
  },
  renderStructure: function generateDom(structure) {
    let element;

    if (!structure) {
      return document.createElement('div'); // Return an empty div to avoid errors
    }

    if (typeof structure.type === "string") {
      if (structure.type === "TEXT_NODE") {
        return document.createTextNode(structure.content);
      }
      element = document.createElement(structure.type);
    } else if (typeof structure.type === "function") {
      // Handle custom components
      const componentInstance = new structure.type(structure.props);
      const componentRenderedStructure = componentInstance.render();
      element = this.renderStructure(componentRenderedStructure);
    }

    if (!element) {
      element = document.createElement('div');
    }

    if (structure.props) {
      for (const propName in structure.props) {
        if (propName === "style") {
          Object.assign(element.style, structure.props[propName]);
        } else if (propName.startsWith("data-")) {
          element.dataset[propName.replace("data-", "")] = structure.props[propName];
        } else {
          element.setAttribute(propName, structure.props[propName]);
        }
      }
    }
    if (structure.events) {
      for (const eventName in structure.events) {
        for (const eventListeners of structure.events[eventName]) {
          element.addEventListener(eventName, eventListeners);
        }
      }
    }
    if (structure.children) {
      for (const child of structure.children) {
        const childNode = this.renderStructure(child);
        if (childNode) {
          element.appendChild(childNode);
        } else {
          console.error("Child node is null or undefined:", child);
        }
      }
    }

    return element;
  },
};

export default MiniReactDom;
