import { performAdvancedSearch } from '../utils/searchUtils.js';
import { clearMarkers } from '../utils/mapConfig.js';

const sportsOptions = ['Athlétisme', 'Aviron', 'Badminton', 'Basketball', 'Basketball 3x3', 'Boxe', 'Canoë', 'Canoë sprint', 'Cyclisme', 'Cyclisme sur piste', 'VTT (Mountain Bike)', 'BMX (Freestyle et Racing)', 'Équitation', 'Escrime', 'Football', 'Golf', 'Gymnastique', 'Gymnastique rythmique', 'Trampoline', 'Haltérophilie', 'Handball', 'Hockey sur gazon', 'Judo', 'Lutte', 'Natation', 'Natation artistique', 'Natation en eau libre', 'Plongeon', 'Pentathlon moderne', 'Rugby', 'Taekwondo', 'Tennis', 'Tennis de table', 'Tir', 'Tir à l’arc', 'Triathlon', 'Voile', 'Volley', 'Breaking'];

const spotTypesOptions = ['bar', 'hotel', 'entrance', 'resto', 'shop'];

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
                  content: 'À',
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
          type: 'button',
          props: {
            class: 'selection-button',
            onclick: 'toggleSportsBox()',
          },
          children: [
            {
              type: 'TEXT_NODE',
              content: 'Sélectionner les sports',
            },
          ],
        },
        {
          type: 'button',
          props: {
            class: 'selection-button',
            onclick: 'toggleSpotsBox()',
          },
          children: [
            {
              type: 'TEXT_NODE',
              content: 'Sélectionner les types de spots',
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
        {
          type: 'button',
          props: {
            class: 'reset-filters-button',
            onclick: 'resetFilters()',
          },
          children: [
            {
              type: 'TEXT_NODE',
              content: 'Réinitialiser les filtres',
            },
          ],
        },
      ],
    },
    {
      type: 'div',
      props: {
        class: 'selection-box',
        id: 'sports-selection-box',
      },
      children: [
        {
          type: 'div',
          props: {
            class: 'selection-box-header',
          },
          children: [
            {
              type: 'h2',
              props: {
                class: 'selection-box-title',
              },
              children: [
                {
                  type: 'TEXT_NODE',
                  content: 'Sélectionner les sports',
                },
              ],
            },
            {
              type: 'button',
              props: {
                class: 'selection-box-close-button',
                onclick: 'toggleSportsBox()',
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
            class: 'selection-box-content',
          },
          children: sportsOptions.map(sport => ({
            type: 'button',
            props: {
              class: 'filter-option',
              onclick: `toggleSportSelection('${sport}')`,
            },
            children: [
              {
                type: 'TEXT_NODE',
                content: sport,
              },
            ],
          })),
        },
        {
          type: 'button',
          props: {
            class: 'validate-selection-button',
            onclick: 'toggleSportsBox()',
          },
          children: [
            {
              type: 'TEXT_NODE',
              content: 'Valider',
            },
          ],
        },
      ],
    },
    {
      type: 'div',
      props: {
        class: 'selection-box',
        id: 'spots-selection-box',
      },
      children: [
        {
          type: 'div',
          props: {
            class: 'selection-box-header',
          },
          children: [
            {
              type: 'h2',
              props: {
                class: 'selection-box-title',
              },
              children: [
                {
                  type: 'TEXT_NODE',
                  content: 'Sélectionner les types de spots',
                },
              ],
            },
            {
              type: 'button',
              props: {
                class: 'selection-box-close-button',
                onclick: 'toggleSpotsBox()',
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
            class: 'selection-box-content',
          },
          children: spotTypesOptions.map(type => ({
            type: 'button',
            props: {
              class: 'filter-option',
              onclick: `toggleSpotTypeSelection('${type}')`,
            },
            children: [
              {
                type: 'TEXT_NODE',
                content: type,
              },
            ],
          })),
        },
        {
          type: 'button',
          props: {
            class: 'validate-selection-button',
            onclick: 'toggleSpotsBox()',
          },
          children: [
            {
              type: 'TEXT_NODE',
              content: 'Valider',
            },
          ],
        },
      ],
    },
  ],
};

let selectedSports = [];
let selectedSpotTypes = [];

window.toggleSportSelection = function (sport) {
  const index = selectedSports.indexOf(sport);
  if (index > -1) {
    selectedSports.splice(index, 1);
  } else {
    selectedSports.push(sport);
  }
  updateSportButtons();
};

window.toggleSpotTypeSelection = function (type) {
  const index = selectedSpotTypes.indexOf(type);
  if (index > -1) {
    selectedSpotTypes.splice(index, 1);
  } else {
    selectedSpotTypes.push(type);
  }
  updateSpotTypeButtons();
};

function updateSportButtons() {
  const buttons = document.querySelectorAll('#sports-selection-box .filter-option');
  buttons.forEach(button => {
    if (selectedSports.includes(button.textContent)) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

function updateSpotTypeButtons() {
  const buttons = document.querySelectorAll('#spots-selection-box .filter-option');
  buttons.forEach(button => {
    if (selectedSpotTypes.includes(button.textContent)) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

function getSelectedSports() {
  return selectedSports;
}

function getSelectedSpotTypes() {
  return selectedSpotTypes;
}

function resetQuickFilters() {
  document.querySelectorAll('.filter-button.filter').forEach(button => button.classList.remove('active'));
}

window.applyFilters = async function () {
  const fromDate = document.getElementById('date-from').value;
  const toDate = document.getElementById('date-to').value;
  const selectedSports = getSelectedSports();
  const selectedSpotTypes = getSelectedSpotTypes();

  resetQuickFilters();

  window.markers = clearMarkers(window.markers);

  await performAdvancedSearch(window.events, window.map, window.markers, { fromDate, toDate, selectedSports, selectedSpotTypes });
};






window.toggleSportsBox = function () {
  const sportsBox = document.getElementById('sports-selection-box');
  if (sportsBox) {
    sportsBox.classList.toggle('show');
  }
};

window.toggleSpotsBox = function () {
  const spotsBox = document.getElementById('spots-selection-box');
  if (spotsBox) {
    spotsBox.classList.toggle('show');
  }
};

window.resetFilters = function () {
  document.getElementById('date-from').value = '';
  document.getElementById('date-to').value = '';
  selectedSports = [];
  selectedSpotTypes = [];
  updateSportButtons();
  updateSpotTypeButtons();
  resetQuickFilters();
  window.markers = clearMarkers(window.markers);
  performAdvancedSearch(window.events, window.map, window.markers, { fromDate: '', toDate: '', selectedSports: [], selectedSpotTypes: [] });
};

export default FilterBox;
