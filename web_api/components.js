import { BrowserLink } from "./components/BrowserRouter.js";
import { createElement, createTextNode } from "./utils.js";

export const Button = ({ text, onClick, style }) => createElement(
  "button",
  {
    style: {
      padding: '10px',
      backgroundColor: 'black',
      color: 'white',
      borderRadius: '5px',
      ...style,
    },
    events: {
      click: [onClick],
    },
  },
  createTextNode(text)
);

export const Breadcrumb = ({ links }) => createElement(
  "div",
  { style: { padding: '10px', backgroundColor: '#f8f8f8' } },
  ...links.map((link, index) => [
    BrowserLink(link),
    index < links.length - 1 ? createTextNode(" / ") : null,
  ]).flat()
);

export const EventCard = ({ event }) => createElement(
  "div",
  {
    style: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '10px',
      margin: '10px 0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
  },
  createElement("p", {}, createTextNode(event.name)),
  createElement("p", {}, createTextNode(event.description)),
  Button({ text: "Voir plus", onClick: () => console.log("Voir plus clicked") })
);
