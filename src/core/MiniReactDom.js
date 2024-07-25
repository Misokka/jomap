import BrowserRouter from "../components/BrowserRouter.js";

const MiniReactDom = {
  render: function (rootElement, routes) {
    BrowserRouter.bind(this)(routes, rootElement);
  },
  renderStructure: function generateDom(structure) {
    if (!structure) {
      return document.createElement('div'); // Return an empty div to avoid errors
    }

    let element = this.createElement(structure);

    if (structure.props) {
      this.applyProps(element, structure.props);
    }

    if (structure.events) {
      this.applyEvents(element, structure.events);
    }

    if (structure.children) {
      this.appendChildren(element, structure.children);
    }

    return element;
  },

  createElement: function (structure) {
    if (!structure || !structure.type) {
      return document.createElement('div');
    }

    if (typeof structure.type === "string") {
      if (structure.type === "TEXT_NODE") {
        return document.createTextNode(structure.content);
      }
      return document.createElement(structure.type);
    } else if (typeof structure.type === "function") {
      // Handle custom components
      const componentInstance = new structure.type(structure.props || {});
      const componentRenderedStructure = componentInstance.render();
      return this.renderStructure(componentRenderedStructure);
    }
    return document.createElement('div');
  },

  applyProps: function (element, props) {
    for (const propName in props) {
      if (propName === "style") {
        Object.assign(element.style, props[propName]);
      } else if (propName.startsWith("data-")) {
        element.dataset[propName.replace("data-", "")] = props[propName];
      } else {
        element.setAttribute(propName, props[propName]);
      }
    }
  },

  applyEvents: function (element, events) {
    for (const eventName in events) {
      for (const eventListener of events[eventName]) {
        element.addEventListener(eventName, eventListener);
      }
    }
  },

  appendChildren: function (element, children) {
    const fragment = document.createDocumentFragment();
    for (const child of children) {
      const childNode = this.renderStructure(child);
      if (childNode) {
        fragment.appendChild(childNode);
      } else {
        console.error("Child node is null or undefined:", child);
      }
    }
    element.appendChild(fragment);
  },
};

export default MiniReactDom;


