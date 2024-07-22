import { performAdvancedSearch } from '../utils/searchUtils.js';

const sportsOptions = ['Basket', 'Foot', 'Tir', 'Natation', 'Athletisme']; // Liste fixe de sports

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
                type: 'date',
                class: 'date-filter',
                id: 'date-from',
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
                type: 'date',
                class: 'date-filter',
                id: 'date-to',
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
                id: 'sports-checkboxes',
                class: 'filter-options',
              },
              children: sportsOptions.map(sport => ({
                type: 'label',
                children: [
                  {
                    type: 'input',
                    props: {
                      type: 'checkbox',
                      value: sport,
                      onchange: 'updateSelectedSports()',
                    },
                  },
                  {
                    type: 'TEXT_NODE',
                    content: sport,
                  },
                ],
              })),
            },
          ],
        },
        {
          type: 'button',
          props: {
            class: 'apply-filters-button',
            onclick: 'applyFilters()',
          },
          children: [
            {
              type: 'TEXT_NODE',
              content: 'Appliquer les filtres',
            },
          ],
        },
      ],
    },
  ],
};

function getSelectedSports() {
  const checkboxes = document.querySelectorAll('#sports-checkboxes input[type="checkbox"]');
  const selectedSports = [];
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      selectedSports.push(checkbox.value);
    }
  });
  return selectedSports;
}

window.applyFilters = function () {
  const fromDate = document.getElementById('date-from').value;
  const toDate = document.getElementById('date-to').value;
  const selectedSports = getSelectedSports();
  console.log('Filters applied:', { fromDate, toDate, selectedSports });
  performAdvancedSearch(window.events, window.map, window.markers, { fromDate, toDate, selectedSports });
};

export default FilterBox;
