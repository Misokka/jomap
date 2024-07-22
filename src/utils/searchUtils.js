import { createElement } from './createElement.js';
import EventItem from '../components/EventItem.js';
import { clearMarkers, createMarker } from './mapConfig.js';
import mapboxgl from 'mapbox-gl';

// Fonction pour effectuer une recherche avancée
export function performAdvancedSearch(events, map, markers, filters) {
  const { fromDate, toDate, selectedSports } = filters;

  console.log('Application des filtres:', { fromDate, toDate, selectedSports });

  // Filtrage des événements en fonction des filtres de date et de sport
  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.start_date);
    const isDateInRange = (!fromDate || eventDate >= new Date(fromDate)) && (!toDate || eventDate <= new Date(toDate));
    const isSportSelected = selectedSports.length === 0 || selectedSports.some(sport => 
      (typeof event.sport === 'string' && event.sport.toLowerCase().includes(sport.toLowerCase())) ||
      (typeof event.description === 'string' && event.description.toLowerCase().includes(sport.toLowerCase())) ||
      (typeof event.name === 'string' && event.name.toLowerCase().includes(sport.toLowerCase()))
    );

    return isDateInRange && isSportSelected;
  });

  console.log('Événements filtrés:', filteredEvents);

  // Suppression des marqueurs existants
  markers = clearMarkers(markers);
  window.markers = filteredEvents.map(event => createMarker(event, map, markers));

  // Ajustement de la carte pour afficher tous les événements filtrés
  if (filteredEvents.length > 0) {
    const bounds = new mapboxgl.LngLatBounds();
    filteredEvents.forEach(event => bounds.extend(event.coordinates));
    map.fitBounds(bounds, { padding: 50 });
  }

  // Mise à jour des résultats de la recherche avancée
  const advancedSearchResultsContainer = document.querySelector('.advanced-search .search-results');
  advancedSearchResultsContainer.innerHTML = ''; // Vider les résultats précédents
  filteredEvents.forEach(event => {
    const eventElement = createElement(EventItem(event));
    eventElement.addEventListener('click', () => {
      map.flyTo({ center: event.coordinates, zoom: 15 });
    });
    advancedSearchResultsContainer.appendChild(eventElement);
  });

  advancedSearchResultsContainer.style.display = 'block';
}

// Fonction pour afficher tous les événements
export function showAllEvents(events, map, markers) {
  console.log('Affichage de tous les événements');

  // Suppression des marqueurs existants
  markers = clearMarkers(markers);
  window.markers = events.map(event => createMarker(event, map, markers));

  // Ajustement de la carte pour afficher tous les événements
  if (events.length > 0) {
    const bounds = new mapboxgl.LngLatBounds();
    events.forEach(event => bounds.extend(event.coordinates));
    map.fitBounds(bounds, { padding: 50 });
  }

  // Mise à jour des résultats de la recherche avancée
  const advancedSearchResultsContainer = document.querySelector('.advanced-search .search-results');
  advancedSearchResultsContainer.innerHTML = ''; // Vider les résultats précédents
  events.forEach(event => {
    const eventElement = document.createElement('div');
    eventElement.className = 'search-result-item';

    const eventDate = new Date(event.start_date);
    const formattedDate = !isNaN(eventDate.getTime()) ? eventDate.toLocaleDateString() : "Date invalide";
    const formattedTime = !isNaN(eventDate.getTime()) ? eventDate.toLocaleTimeString() : "indéfini";

    eventElement.innerHTML = `
      <div class="event-item">
        <div class="event-date">
          <div class="date-text">${formattedDate}</div>
          <div class="time-text">${formattedTime}</div>
        </div>
        <div class="event-details">
          <div class="event-type">${event.sport || 'Sport inconnu'}</div>
          <div class="event-description">${event.description}</div>
          <div class="event-location">
            <img class="location-icon" src="/path/to/location/icon.png" alt="localisation">
            <div class="location-text">${event.nom_site || 'Paris'}</div>
          </div>
        </div>
      </div>`;
    eventElement.addEventListener('click', () => {
      map.flyTo({ center: event.coordinates, zoom: 15 });
    });
    advancedSearchResultsContainer.appendChild(eventElement);
  });

  advancedSearchResultsContainer.style.display = 'block';
}
