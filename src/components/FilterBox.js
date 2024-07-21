import { performAdvancedSearch } from '../utils/searchUtils.js';

const FilterBox = {
  type: 'div',
  props: {
    class: 'filter-box',
  },
  children: [
    {
      type: 'div',
      props: {
        class: 'filter-box-header',
      },
      children: [
        {
          type: 'h2',
          props: {
            class: 'filter-box-title',
          },
          children: [
            {
              type: 'TEXT_NODE',
              content: 'Filtres',
            },
          ],
        },
        {
          type: 'button',
          props: {
            class: 'filter-box-close-button',
            onclick: 'hideFilterBox()',
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
      type: 'div',
      props: {
        class: 'filter-box-content',
      },
      children: [
        {
          type: 'div',
          props: {
            class: 'filter-group',
          },
          children: [
            {
              type: 'h3',
              props: {
                class: 'filter-group-title',
              },
              children: [
                {
                  type: 'TEXT_NODE',
                  content: 'De',
                },
              ],
            },
            {
              type: 'input',
              props: {
                type: 'text',
                class: 'date-filter',
                placeholder: 'dd/mm/yyyy',
              },
            },
          ],
        },
        {
          type: 'div',
          props: {
            class: 'filter-group',
          },
          children: [
            {
              type: 'h3',
              props: {
                class: 'filter-group-title',
              },
              children: [
                {
                  type: 'TEXT_NODE',
                  content: 'A',
                },
              ],
            },
            {
              type: 'input',
              props: {
                type: 'text',
                class: 'date-filter',
                placeholder: 'dd/mm/yyyy',
              },
            },
          ],
        },
        {
          type: 'div',
          props: {
            class: 'filter-group',
          },
          children: [
            {
              type: 'h3',
              props: {
                class: 'filter-group-title',
              },
              children: [
                {
                  type: 'TEXT_NODE',
                  content: 'Sports',
                },
              ],
            },
            {
              type: 'div',
              props: {
                class: 'filter-options',
              },
              children: [
                {
                  type: 'button',
                  props: {
                    class: 'filter-option',
                  },
                  children: [
                    {
                      type: 'TEXT_NODE',
                      content: 'Natation',
                    },
                  ],
                },
                // Ajoutez d'autres options de sport ici
              ],
            },
          ],
        },
        // Ajoutez d'autres groupes de filtres ici
      ],
    },
  ],
};

export default FilterBox;
