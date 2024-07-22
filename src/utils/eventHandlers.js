import { fetchEvents, fetchAllEvents } from './fetchEvents';
import { createMarker, clearMarkers } from './mapConfig';
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

    // Réinitialisation des marqueurs
    markers = clearMarkers(markers);
    markers = filteredEvents.map(event => createMarker(event, map, markers));

    // Ajustement de la vue de la carte pour inclure tous les événements filtrés
    if (filteredEvents.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      filteredEvents.forEach(event => bounds.extend(event.coordinates));
      map.fitBounds(bounds, { padding: 50 });
    }

    resultsContainer.innerHTML = ''; // Vider les résultats précédents

    // Affichage des événements filtrés
    filteredEvents.forEach(event => {
      const eventElement = document.createElement('div');
      eventElement.className = 'search-result-item';

      const eventDate = new Date(event.start_date);
      const formattedDate = !isNaN(eventDate.getTime()) ? eventDate.toLocaleDateString() : "Invalid Date";
      const formattedTime = !isNaN(eventDate.getTime()) ? eventDate.toLocaleTimeString() : "undefined";

      eventElement.innerHTML = `
        <div class="event-item">
          <div class="event-date">
            <div class="date-text">${formattedDate}</div>
            <div class="time-text">${formattedTime}</div>
          </div>
          <div class="event-details">
            <div class="event-type">${event.sport || 'Unknown Sport'}</div>
            <div class="event-description">${event.description}</div>
            <div class="event-location">
              <img class="location-icon" src="/path/to/location/icon.png" alt="location">
              <div class="location-text">${event.nom_site || 'Paris'}</div>
            </div>
          </div>
        </div>`;
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
  document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', async (event) => {
      const filterType = event.target.textContent.trim();
      let events = await fetchEvents(filterType); // Récupérer les événements en fonction du filtre
      markers = clearMarkers(markers);
      markers = events.map(event => createMarker(event, map, markers));
      window.markers = markers;
      window.events = events; // Mise à jour des événements globaux
    });
  });
}

// Fonction pour configurer le bouton de réinitialisation des filtres
export function setupResetFiltersButton(map, markers) {
  const resetFiltersButton = document.querySelector('.reset-filters-button');
  if (resetFiltersButton) {
    resetFiltersButton.addEventListener('click', async () => {
      let events = await fetchAllEvents(); // Réinitialiser les événements par défaut
      markers = clearMarkers(markers);
      markers = events.map(event => createMarker(event, map, markers));
      window.markers = markers;
      window.events = events; // Mise à jour des événements globaux
    });
  }
}
