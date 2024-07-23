import { BrowserLink } from "./BrowserRouter";
const Menu = {
    type: 'navbar',
    props: {},
    children: [
        BrowserLink({
            title: "Home",
            to: "/home",
        }),
        BrowserLink({
            title: "Map",
            to: "/map",
        }),
    ],
};
export default Menu;