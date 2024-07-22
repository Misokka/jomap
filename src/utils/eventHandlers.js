import { fetchEvents, fetchAllEvents } from './fetchEvents';
import { createMarker, clearMarkers } from './mapConfig';
import { createElement } from './createElement';
import EventItem from '../components/EventItem';
import mapboxgl from 'mapbox-gl';

// Fonction pour gérer la saisie de recherche
export async function handleSearchInput(inputElement, resultsContainer, events, map, markers) {
  inputElement.addEventListener('input', () => {
    const query = inputElement.value.toLowerCase();
    const filteredEvents = events.filter(event =>
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

    resultsContainer.innerHTML = ''; // Vider les résultats précédents

    filteredEvents.forEach(event => {
      const eventElement = EventItem(event);
      eventElement.addEventListener('click', () => {
        map.flyTo({ center: event.coordinates, zoom: 15 });
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
      // Activer le bouton cliqué et désactiver les autres
      document.querySelectorAll('.filter-button.filter').forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');

      const filterType = event.target.textContent.trim();
      let events = await fetchEvents(filterType);
      markers = clearMarkers(markers);
      markers = events.map(event => createMarker(event, map, markers));
      window.markers = markers;
      window.events = events; // Mise à jour des événements globaux

      // Mettre à jour les résultats affichés
      const resultsContainer = document.querySelector('.advanced-search .search-results');
      resultsContainer.innerHTML = ''; // Vider les résultats précédents

      events.forEach(event => {
        const eventElement = EventItem(event);
        eventElement.addEventListener('click', () => {
          map.flyTo({ center: event.coordinates, zoom: 15 });
        });
        resultsContainer.appendChild(eventElement);
      });

      resultsContainer.style.display = 'block';
    });
  });
}
