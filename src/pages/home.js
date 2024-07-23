import { BrowserLink } from "../components/BrowserRouter.js";
import Header from "../components/Header.js";
import svg from "../../svg/xl_right_icon.svg"

export default {
    type: "div",
    children: [
        Header,
        {
            type: "main",
            props: {
                class: "relative"
            },
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
                    type: 'div',
                    props: {
                        class: "home-title"
                    },
                    children: [
                        {
                            type: 'h3',
                            children: [
                                {
                                    type: 'TEXT_NODE',
                                    content: "Découvrez les meilleurs lieux",
                                },
                                {
                                    type: 'br',
                                },
                                {
                                    type: 'TEXT_NODE',
                                    content: "des jeux olympiques 2024",
                                },
                                {
                                    type: 'br',
                                },
                                {
                                    type: 'TEXT_NODE',
                                    content: "paris",
                                }
                            ],
                        },
                        {
                            type: "div",
                            props: {
                                class: "btn-map"
                            },
                            children: [
                                BrowserLink({
                                    title: 'CARTE',
                                    to: '/map',
                                  }),
                                  {
                                    type: 'i',
                                    props: {
                                      class: "fa-solid fa-angle-right",
                                    },
                                  },
                            ]
                        } 
                    ]
                },
            ],
        },
    ],
}
