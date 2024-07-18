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
        placeholder: 'Rechercher',
      },
    },
  ],
};

export default SearchBar;
