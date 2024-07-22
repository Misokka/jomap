import { fetchEvents } from '../utils/fetchEvents.js'; // Importer la fonction fetchEvents
import { clearMarkers, createMarker } from '../utils/mapConfig.js';
import { setupResetFiltersButton } from '../utils/eventHandlers.js';

const Filters = {
  type: 'div',
  props: {
    class: 'button-container',
  },
  children: [
    {
      type: 'button',
      props: {
        class: 'filter-button',
        onclick: () => applyFilter('Sites de compétition'),
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
        class: 'filter-button',
        onclick: () => applyFilter('Événements culturels'),
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
        class: 'filter-button',
        onclick: () => applyFilter('Lieux iconiques'),
      },
      children: [
        {
          type: 'TEXT_NODE',
          content: 'Lieux iconiques',
        },
      ],
    },
    {
      type: 'button',
      props: {
        class: 'filter-button reset-filters-button', // Ajout de filter-button ici
      },
      children: [
        {
          type: 'TEXT_NODE',
          content: 'Réinitialiser les filtres',
        },
      ],
    },
  ],
};

async function applyFilter(filterType) {
  const map = window.map; 
  let markers = window.markers; 

  const filteredEvents = await fetchEvents(filterType); 
  markers = clearMarkers(markers);
  markers = filteredEvents.map(event => createMarker(event, map, markers));
  window.markers = markers; 
  window.events = filteredEvents; // Mise à jour des événements globaux
}

function resetFilters() {
  window.location.reload(); 
}

export default Filters;
