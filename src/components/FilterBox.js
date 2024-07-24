import { performAdvancedSearch } from '../utils/searchUtils.js';

const sportsOptions = ['Athlétisme',
  'Aviron',
  // 'Badminton',
  'Basketball',
  // 'Basketball 3x3',
  'Boxe',
  // 'Canoë',
  // 'Canoë sprint',
  'Cyclisme',
  // 'Cyclisme sur piste',
  // 'VTT (Mountain Bike)',
  // 'BMX (Freestyle et Racing)',
  'Équitation',
  'Escrime',
  'Football',
  'Golf',
  'Gymnastique',
  // 'Gymnastique rythmique',
  // 'Trampoline',
  // 'Haltérophilie',
  'Handball',
  // 'Hockey sur gazon',
  'Judo',
  'Lutte',
  'Natation',
  // 'Natation artistique',
  // 'Natation en eau libre',
  'Plongeon',
  // 'Pentathlon moderne',
  // 'Rugby',
  // 'Taekwondo',
  'Tennis',
  // 'Tennis de table',
  'Tir',
  // 'Tir à l’arc',
  'Triathlon',
  'Voile',
  'Volley',
  'Breaking'];  // Liste fixe de sports

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

function resetQuickFilters() {
  document.querySelectorAll('.filter-button.filter').forEach(button => button.classList.remove('active'));
}

window.applyFilters = function () {
  const fromDate = document.getElementById('date-from').value;
  const toDate = document.getElementById('date-to').value;
  const selectedSports = getSelectedSports();
  console.log('Filters applied:', { fromDate, toDate, selectedSports });

  // Réinitialiser les filtres rapides
  resetQuickFilters();

  // Appliquer la recherche avancée
  performAdvancedSearch(window.events, window.map, window.markers, { fromDate, toDate, selectedSports });
};

export default FilterBox;
