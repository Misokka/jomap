import mapboxgl from 'mapbox-gl';
import { performAdvancedSearch } from '../utils/searchUtils.js';
import AdvancedFilterBox from './AdvancedFilterBox.js';
import EventCard from './EventCard.js';
import { createElement } from '../utils/createElement.js';
import EventItem from './EventItem.js';

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
            onclick: 'showAdvancedFilterBox()',
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
            oninput: "updateSearchResults()",
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
        id: 'search-results',
      },
      children: [],
    },
    AdvancedFilterBox,
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

window.updateSearchResults = function () {
  const query = document.querySelector('.advanced-search .searchbar').value.toLowerCase();
  const selectedSports = getAdvancedSelectedSports();

  performAdvancedSearch(window.events, window.map, window.markers, { query, selectedSports });
};

window.updateAdvancedSelectedSports = getAdvancedSelectedSports;

window.onEventItemClick = function (event) {
  const map = window.map;
  if (map) {
    map.flyTo({ center: event.coordinates, zoom: 15 });
  }
  const advancedSearchElement = document.querySelector('.advanced-search');
  if (advancedSearchElement) {
    advancedSearchElement.style.display = 'none';
  }

  const popupContent = createElement(EventCard(event));
  new mapboxgl.Popup({ className: 'custom-popup' })
      .setLngLat(event.coordinates)
      .setDOMContent(popupContent)
      .addTo(map);
};

export default AdvancedSearch;
