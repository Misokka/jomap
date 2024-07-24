import { fetchEvents } from '../utils/fetchEvents.js'; 
import { clearMarkers, createMarker, loadIconicPlaces, clearIconicPlaces } from '../utils/mapConfig.js';

let activeFilters = [];
let iconicMarkers = []; // Variable pour stocker les marqueurs des lieux iconiques

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
  let markers = window.markers; 

  // Sélectionner tous les boutons de filtre
  const buttons = document.querySelectorAll('.filter-button.filter');
  
  buttons.forEach(button => {
    if (button.textContent.trim() === filterType) {
      if (activeFilters.includes(filterType)) {
        // Désactiver le filtre
        activeFilters = activeFilters.filter(f => f !== filterType);
        button.classList.remove('active');

        if (filterType === 'Lieux iconiques') {
          iconicMarkers = clearIconicPlaces(iconicMarkers);
        }
      } else {
        // Activer le filtre
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

  // Réinitialiser les marqueurs sauf pour les lieux iconiques
  markers = clearMarkers(markers);
  window.markers = markers;

  // Charger les événements pour tous les filtres actifs sauf pour les lieux iconiques
  for (const filter of activeFilters) {
    if (filter !== 'Lieux iconiques') {
      const filteredEvents = await fetchEvents(filter); 
      markers = markers.concat(filteredEvents.map(event => createMarker(event, map, markers)));
    }
  }

  window.markers = markers;
}

export default Filters;
export { toggleFilter };
