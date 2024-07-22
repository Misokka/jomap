import EventItem from '../components/EventItem.js';
import { clearMarkers, createMarker } from './mapConfig.js';
import mapboxgl from 'mapbox-gl';

// Fonction pour effectuer une recherche avancée
export function performAdvancedSearch(events, map, markers, filters) {
  const { query, fromDate, toDate, selectedSports } = filters;

  console.log('Application des filtres:', { query, fromDate, toDate, selectedSports });

  // Filtrage des événements en fonction des filtres de date et de sport
  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.start_date);
    const isDateInRange = (!fromDate || eventDate >= new Date(fromDate)) && (!toDate || eventDate <= new Date(toDate));
    const isSportSelected = selectedSports.length === 0 || selectedSports.some(sport =>
      (typeof event.sport === 'string' && event.sport.toLowerCase().includes(sport.toLowerCase())) ||
      (typeof event.description === 'string' && event.description.toLowerCase().includes(sport.toLowerCase())) ||
      (typeof event.name === 'string' && event.name.toLowerCase().includes(sport.toLowerCase()))
    );
    const isQueryMatch = !query || (
      (typeof event.sport === 'string' && event.sport.toLowerCase().includes(query)) ||
      (typeof event.description === 'string' && event.description.toLowerCase().includes(query)) ||
      (typeof event.name === 'string' && event.name.toLowerCase().includes(query))
    );

    return isDateInRange && isSportSelected && isQueryMatch;
  });

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
    const eventElement = EventItem(event); // Utilisation de la méthode manuelle
    eventElement.addEventListener('click', () => {
      map.flyTo({ center: event.coordinates, zoom: 15 });
    });
    advancedSearchResultsContainer.appendChild(eventElement);
  });

  advancedSearchResultsContainer.style.display = 'block';
}

// Fonction pour afficher tous les événements
export function showAllEvents(events, map, markers) {
  markers = clearMarkers(markers);
  window.markers = events.map(event => createMarker(event, map, markers));

  if (events.length > 0) {
    const bounds = new mapboxgl.LngLatBounds();
    events.forEach(event => bounds.extend(event.coordinates));
    map.fitBounds(bounds, { padding: 50 });
  }

  const advancedSearchResultsContainer = document.querySelector('.advanced-search .search-results');
  advancedSearchResultsContainer.innerHTML = '';
  events.forEach(event => {
    const eventElement = EventItem(event);
    eventElement.className = 'custom-popup-content'; 
    eventElement.addEventListener('click', () => {
      map.flyTo({ center: event.coordinates, zoom: 15 });
    });
    advancedSearchResultsContainer.appendChild(eventElement);
  });

  advancedSearchResultsContainer.style.display = 'block';
}
