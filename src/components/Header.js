import Menu from './Menu.js';
const Header = {
    type: 'header',
  props: {
    class: "header"
  },
  children: [
    {
        type: 'h1',
        children: [
            {
            type: 'TEXT_NODE',
            content: 'PARIS 2024 - JEUX OLYMPIQUES',
            },
        ],
    },
    {
        type: 'div',
        props: {
          class: 'logo-container',
        },
        children: [
          {
            type: 'img',
            props: {
              src: './images/logojo.png', 
              class: 'logo',
            },
          },
        ],
      },
      Menu
  ],
};
export default Header;