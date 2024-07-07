import Page1 from "./views/Page1.js";
import Page404 from "./views/Page404.js";

export default {
  "/page1": Page1,
  "*": Page404,
};