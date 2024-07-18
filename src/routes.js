import page1 from "./pages/page1.js";
import page2 from "./pages/page2.js";
import MapPage from "./pages/mapPage.js";

export default {
  "*": page1,
  "/page1": page1,
  "/page2": page2,
  "/page3": MapPage,
};
