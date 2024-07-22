import { fetchEvents } from '../utils/fetchEvents.js'; 
import { clearMarkers, createMarker } from '../utils/mapConfig.js';

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
        class: 'filter-button filter', 
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
        class: 'filter-button filter', 
        onclick: () => applyFilter('Lieux iconiques'),
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

async function applyFilter(filterType) {
  const map = window.map; 
  let markers = window.markers; 

  const filteredEvents = await fetchEvents(filterType); 
  markers = clearMarkers(markers);
  markers = filteredEvents.map(event => createMarker(event, map, markers));
  window.markers = markers; 
  window.events = filteredEvents; // Mise à jour des événements globaux
}

export default Filters;
