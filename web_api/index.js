import MiniReactDom from "./core/MiniReactDom.js";
import routes from "./routes.js";

const root = document.getElementById("root");

MiniReactDom.render(root, routes);
