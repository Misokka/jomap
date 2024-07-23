import page1 from "./pages/page1.js";
import home from "./pages/home.js";
import MapPage from "./pages/mapPage.js";

export default {
  "*": home,
  "/page1": page1,
  "/map": MapPage,
};
