import { fetchEvents } from '../utils/fetchEvents.js'; 
import { clearMarkers, createMarker, loadIconicPlaces, clearIconicPlaces } from '../utils/mapConfig.js';

let activeFilters = [];
let iconicMarkers = []; 

const Filters = {
  type: 'div',
  props: {
    class: 'button-container',
  },
  children: [
    {
      type: 'button',
      props: {
        class: 'filter-button filter', 
        onclick: () => toggleFilter('Sites de compétition'),
      },
      children: [
        {
          type: 'TEXT_NODE',
          content: 'Sites de compétition',
        },
      ],
    },
    {
      type: 'button',
      props: {
        class: 'filter-button filter', 
        onclick: () => toggleFilter('Événements culturels'),
      },
      children: [
        {
          type: 'TEXT_NODE',
          content: 'Événements culturels',
        },
      ],
    },
    {
      type: 'button',
      props: {
        class: 'filter-button filter', 
        onclick: () => toggleFilter('Lieux iconiques'),
      },
      children: [
        {
          type: 'TEXT_NODE',
          content: 'Lieux iconiques',
        },
      ],
    },
  ],
};

async function toggleFilter(filterType) {
  const map = window.map; 
  let markers = window.markers || []; 

  const buttons = document.querySelectorAll('.filter-button.filter');
  
  buttons.forEach(button => {
    if (button.textContent.trim() === filterType) {
      if (activeFilters.includes(filterType)) {
        activeFilters = activeFilters.filter(f => f !== filterType);
        button.classList.remove('active');

        if (filterType === 'Lieux iconiques') {
          iconicMarkers = clearIconicPlaces(iconicMarkers);
        }
      } else {
        activeFilters.push(filterType);
        button.classList.add('active');

        if (filterType === 'Lieux iconiques') {
          if (iconicMarkers.length === 0) {
            (async () => {
              iconicMarkers = await loadIconicPlaces(map);
            })();
          }
        }
      }
    }
  });

  markers = await clearMarkers(markers);

  for (const filter of activeFilters) {
    if (filter !== 'Lieux iconiques') {
      const filteredEvents = await fetchEvents(filter); 
      const newMarkers = await Promise.all(filteredEvents.map(event => createMarker(event, map, markers)));
      markers = markers.concat(newMarkers.filter(Boolean));
    }
  }

  if (activeFilters.includes('Spots')) {
    const spots = await fetchEvents('Spots');
    const newMarkers = await Promise.all(spots.map(spot => createMarker(spot, map, markers)));
    markers = markers.concat(newMarkers.filter(Boolean));
  }

  window.markers = markers;
}

export default Filters;
export { toggleFilter };
