import { fetchEvents, fetchAllEvents } from './fetchEvents';
import { createMarker, clearMarkers } from './mapConfig';
import { createElement } from './createElement';
import EventItem from '../components/EventItem';
import mapboxgl from 'mapbox-gl';
import { toggleFilter } from '../components/Filters.js';  // Import correct de la fonction toggleFilter

export async function handleSearchInput(inputElement, resultsContainer, events, map, markers) {
  inputElement.addEventListener('input', () => {
    const query = inputElement.value.toLowerCase();
    const filteredEvents = events.filter(event =>
      (typeof event.nom_site === 'string' && event.nom_site.toLowerCase().includes(query)) ||
      (typeof event.sport === 'string' && event.sport.toLowerCase().includes(query)) ||
      (typeof event.name === 'string' && event.name.toLowerCase().includes(query)) ||
      (typeof event.description === 'string' && event.description.toLowerCase().includes(query))
    );

    resultsContainer.innerHTML = '';

    filteredEvents.forEach(event => {
      const eventElement = EventItem(event);
      eventElement.addEventListener('click', () => {
        window.onEventItemClick(event);
      });
      resultsContainer.appendChild(eventElement);
    });

    resultsContainer.style.display = 'block';
  });
}

export function setupFilterButtons(map, markers) {
  document.querySelectorAll('.filter-button.filter').forEach(button => {
    button.addEventListener('click', async (event) => {
      const filterType = event.target.textContent.trim();
      await toggleFilter(filterType);
    });
  });
}