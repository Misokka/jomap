const SearchBar = {
    type: 'div',
    props: {
      class: 'searchbar',
    },
    children: [
      {
        type: 'input',
        props: {
          type: 'text',
          placeholder: 'Rechercher...',
          style: {
            display: 'flex',
            width: '574px',
            flexDirection: 'column',
            alignItems: 'flex-start',
          },
        },
      },
    ],
  };
  
  export default SearchBar;
  