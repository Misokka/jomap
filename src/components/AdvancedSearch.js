import { performAdvancedSearch } from '../utils/searchUtils.js';

const AdvancedSearch = {
  type: 'div',
  props: {
    class: 'advanced-search',
  },
  children: [
    {
      type: 'div',
      props: {
        class: 'advanced-search-header',
      },
      children: [
        {
          type: 'button',
          props: {
            class: 'filter-button',
            onclick: 'showFilterBox()',
          },
          children: [
            {
              type: 'i',
              props: {
                class: 'fas fa-filter',
              },
            },
          ],
        },
        {
          type: 'input',
          props: {
            type: 'text',
            placeholder: 'Rechercher',
            class: 'searchbar',
            oninput: () => performAdvancedSearch(window.events, window.map, window.markers),
          },
        },
        {
          type: 'button',
          props: {
            class: 'searchbar-close-button',
            onclick: 'hideAdvancedSearch()',
          },
          children: [
            {
              type: 'TEXT_NODE',
              content: '×',
            },
          ],
        },
      ],
    },
    {
      type: 'h2',
      props: {
        class: 'advanced-search-title',
      },
      children: [
        {
          type: 'TEXT_NODE',
          content: 'RÉSULTATS',
        },
      ],
    },
    {
      type: 'div',
      props: {
        class: 'search-results',
      },
      children: [],
    },
  ],
};

export default AdvancedSearch;
