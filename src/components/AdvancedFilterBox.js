import { performAdvancedSearch } from '../utils/searchUtils.js';

const sportsOptions = ['Athlétisme', 'Aviron', 'Badminton', 'Basketball', 'Basketball 3x3', 'Boxe', 'Canoë', 'Canoë sprint', 'Cyclisme', 'Cyclisme sur piste', 'VTT (Mountain Bike)', 'BMX (Freestyle et Racing)', 'Équitation', 'Escrime', 'Football', 'Golf', 'Gymnastique', 'Gymnastique rythmique', 'Trampoline', 'Haltérophilie', 'Handball', 'Hockey sur gazon', 'Judo', 'Lutte', 'Natation', 'Natation artistique', 'Natation en eau libre', 'Plongeon', 'Pentathlon moderne', 'Rugby', 'Taekwondo', 'Tennis', 'Tennis de table', 'Tir', 'Tir à l’arc', 'Triathlon', 'Voile', 'Volley', 'Breaking'];

const spotTypesOptions = ['bar', 'hotel', 'entrance', 'resto', 'shop'];

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
                  content: 'À',
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
          type: 'button',
          props: {
            class: 'selection-button',
            onclick: 'toggleAdvancedSportsBox()',
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
            onclick: 'toggleAdvancedSpotsBox()',
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
    {
      type: 'div',
      props: {
        class: 'selection-box',
        id: 'advanced-sports-selection-box',
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
                onclick: 'toggleAdvancedSportsBox()',
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
              onclick: `toggleAdvancedSportSelection('${sport}')`,
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
            onclick: 'toggleAdvancedSportsBox()',
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
        id: 'advanced-spots-selection-box',
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
                onclick: 'toggleAdvancedSpotsBox()',
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
              onclick: `toggleAdvancedSpotTypeSelection('${type}')`,
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
            onclick: 'toggleAdvancedSpotsBox()',
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

let advancedSelectedSports = [];
let advancedSelectedSpotTypes = [];

window.toggleAdvancedSportSelection = function (sport) {
  const index = advancedSelectedSports.indexOf(sport);
  if (index > -1) {
    advancedSelectedSports.splice(index, 1);
  } else {
    advancedSelectedSports.push(sport);
  }
  updateAdvancedSportButtons();
};

window.toggleAdvancedSpotTypeSelection = function (type) {
  const index = advancedSelectedSpotTypes.indexOf(type);
  if (index > -1) {
    advancedSelectedSpotTypes.splice(index, 1);
  } else {
    advancedSelectedSpotTypes.push(type);
  }
  updateAdvancedSpotTypeButtons();
};

function updateAdvancedSportButtons() {
  const buttons = document.querySelectorAll('#advanced-sports-selection-box .filter-option');
  buttons.forEach(button => {
    if (advancedSelectedSports.includes(button.textContent)) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

function updateAdvancedSpotTypeButtons() {
  const buttons = document.querySelectorAll('#advanced-spots-selection-box .filter-option');
  buttons.forEach(button => {
    if (advancedSelectedSpotTypes.includes(button.textContent)) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

function getAdvancedSelectedSports() {
  return advancedSelectedSports;
}

function getAdvancedSelectedSpotTypes() {
  return advancedSelectedSpotTypes;
}

function resetAdvancedFilters() {
  document.querySelectorAll('.filter-button.filter').forEach(button => button.classList.remove('active'));
}

window.applyAdvancedFilters = async function () {
  const fromDate = document.getElementById('advanced-date-from').value;
  const toDate = document.getElementById('advanced-date-to').value;
  const selectedSports = getAdvancedSelectedSports();
  const selectedSpotTypes = getAdvancedSelectedSpotTypes();
  console.log('Filtres avancés appliqués:', { fromDate, toDate, selectedSports, selectedSpotTypes });

  resetAdvancedFilters();

  window.markers = clearMarkers(window.markers);

  await performAdvancedSearch(window.events, window.map, window.markers, { fromDate, toDate, selectedSports, selectedSpotTypes });
};

window.toggleAdvancedSportsBox = function () {
  const sportsBox = document.getElementById('advanced-sports-selection-box');
  if (sportsBox) {
    sportsBox.classList.toggle('show');
  }
};

window.toggleAdvancedSpotsBox = function () {
  const spotsBox = document.getElementById('advanced-spots-selection-box');
  if (spotsBox) {
    spotsBox.classList.toggle('show');
  }
};

window.showAdvancedFilterBox = function () {
  const advancedFilterBox = document.querySelector('.advanced-filter-box');
  if (advancedFilterBox) {
    advancedFilterBox.style.display = 'block';
  }
};

window.hideAdvancedFilterBox = function () {
  const advancedFilterBox = document.querySelector('.advanced-filter-box');
  if (advancedFilterBox) {
    advancedFilterBox.style.display = 'none';
  }
};

window.resetAdvancedFilters = function () {
    document.getElementById('advanced-date-from').value = '';
    document.getElementById('advanced-date-to').value = '';
    advancedSelectedSports = [];
    advancedSelectedSpotTypes = [];
    updateAdvancedSportButtons();
    updateAdvancedSpotTypeButtons();
    resetAdvancedFilters();
    window.markers = clearMarkers(window.markers);
    performAdvancedSearch(window.events, window.map, window.markers, { fromDate: '', toDate: '', selectedSports: [], selectedSpotTypes: [] });
  };

export { getAdvancedSelectedSports, getAdvancedSelectedSpotTypes };
export default AdvancedFilterBox;
