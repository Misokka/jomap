import { fetchEvents, fetchAllEvents } from './fetchEvents';
import { createMarker, clearMarkers } from './mapConfig';
import { createElement } from './createElement';
import EventItem from '../components/EventItem';
import mapboxgl from 'mapbox-gl';
import { toggleFilter } from '../components/Filters.js';  // Import correct de la fonction toggleFilter

// Fonction pour gérer la saisie de recherche
export async function handleSearchInput(inputElement, resultsContainer, events, map, markers) {
  inputElement.addEventListener('input', () => {
    const query = inputElement.value.toLowerCase();
    const filteredEvents = events.filter(event =>
      (typeof event.nom_site === 'string' && event.nom_site.toLowerCase().includes(query)) ||
      (typeof event.sport === 'string' && event.sport.toLowerCase().includes(query)) ||
      (typeof event.name === 'string' && event.name.toLowerCase().includes(query)) ||
      (typeof event.description === 'string' && event.description.toLowerCase().includes(query))
    );

    markers = clearMarkers(markers);
    markers = filteredEvents.map(event => createMarker(event, map, markers));

    if (filteredEvents.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      filteredEvents.forEach(event => bounds.extend(event.coordinates));
      map.fitBounds(bounds, { padding: 50 });
    }

    resultsContainer.innerHTML = '';

    filteredEvents.forEach(event => {
      const eventElement = EventItem(event);
      eventElement.addEventListener('click', () => {
        window.showEventDetail(event);
      });
      resultsContainer.appendChild(eventElement);
    });

    resultsContainer.style.display = 'block';
  });
}

// Fonction pour configurer les boutons de filtre
export function setupFilterButtons(map, markers) {
  document.querySelectorAll('.filter-button.filter').forEach(button => {
    button.addEventListener('click', async (event) => {
      // Activer ou désactiver le bouton cliqué
      const filterType = event.target.textContent.trim();
      await toggleFilter(filterType);
    });
  });
}
