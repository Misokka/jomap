import { BrowserLink } from "../components/BrowserRouter.js";
import Header from "../components/Header.js";

export default {
    type: "div",
    children: [
        Header,
        {
            type: "main",
            props: {},
            children: [
                {
                    type: "img",
                    props: {
                        src: "./images/home.png",
                        alt: "Image d'accueil",
                        class: "home-img",
                    },
                },
                {
                    type: "div",
                    children: [
                        BrowserLink({
                            title: 'Carte',
                            to: '/map',
                          }),
                          {
                            type: "img",
                            props: {
                                src: "./svg/xl_right_icon.svg",
                                alt: "icon"
                            }
                          }
                    ]
                }
            ],
        },
    ],
}
