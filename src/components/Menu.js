import { BrowserLink } from "./BrowserRouter";
const Menu = {
    type: 'navbar',
    props: {},
    children: [
        BrowserLink({
            title: "",
            to: "/home",
        }),
        BrowserLink({
            title: "",  
            to: "/map",
        }),
    ],
};
export default Menu;