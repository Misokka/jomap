import { performAdvancedSearch } from '../utils/searchUtils.js';

const advancedSportsOptions = ['Basket', 'Foot', 'Tir', 'Natation', 'Athletisme']; // Liste fixe de sports

const AdvancedFilterBox = {
  type: 'div',
  props: {
    class: 'advanced-filter-box',
  },
  children: [
    {
      type: 'div',
      props: {
        class: 'advanced-filter-box-header',
      },
      children: [
        {
          type: 'h2',
          props: {
            class: 'advanced-filter-box-title',
          },
          children: [
            {
              type: 'TEXT_NODE',
              content: 'Filtres avancés',
            },
          ],
        },
        {
          type: 'button',
          props: {
            class: 'advanced-filter-box-close-button',
            onclick: 'hideAdvancedFilterBox()',
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
        class: 'advanced-filter-box-content',
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
                id: 'advanced-date-from',
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
                id: 'advanced-date-to',
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
                id: 'advanced-sports-checkboxes',
                class: 'filter-options',
              },
              children: advancedSportsOptions.map(sport => ({
                type: 'label',
                children: [
                  {
                    type: 'input',
                    props: {
                      type: 'checkbox',
                      value: sport,
                      onchange: 'updateAdvancedSelectedSports()',
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
            onclick: 'applyAdvancedFilters()',
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

function getAdvancedSelectedSports() {
  const checkboxes = document.querySelectorAll('#advanced-sports-checkboxes input[type="checkbox"]');
  const selectedSports = [];
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      selectedSports.push(checkbox.value);
    }
  });
  return selectedSports;
}

window.applyAdvancedFilters = function () {
  const fromDate = document.getElementById('advanced-date-from').value;
  const toDate = document.getElementById('advanced-date-to').value;
  const selectedSports = getAdvancedSelectedSports();
  console.log('Filtres avancés appliqués:', { fromDate, toDate, selectedSports });

  performAdvancedSearch(window.events, window.map, window.markers, { fromDate, toDate, selectedSports });
};

window.showAdvancedFilterBox = function () {
  document.querySelector('.advanced-filter-box').style.display = 'block';
};

window.hideAdvancedFilterBox = function () {
  document.querySelector('.advanced-filter-box').style.display = 'none';
};

export default AdvancedFilterBox;
