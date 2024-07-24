import EventItem from '../components/EventItem.js';
import EventDetails from '../components/EventDetail.js'; // Correct import
import { clearMarkers, createMarker } from './mapConfig.js';
import mapboxgl from 'mapbox-gl';
import { hideAdvancedSearch, showEventDetails } from './uiHelpers.js'; // Correct import

// Fonction pour effectuer une recherche avancée
export function performAdvancedSearch(events, map, markers, filters) {
  const { query, fromDate, toDate, selectedSports } = filters;

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

  markers = clearMarkers(markers);
  window.markers = filteredEvents.map(event => createMarker(event, map, markers));

  if (filteredEvents.length > 0) {
    const bounds = new mapboxgl.LngLatBounds();
    filteredEvents.forEach(event => bounds.extend(event.coordinates));
    map.fitBounds(bounds, { padding: 50 });
  }

  const advancedSearchResultsContainer = document.querySelector('.advanced-search .search-results');
  advancedSearchResultsContainer.innerHTML = '';
  filteredEvents.forEach(event => {
    const eventElement = EventItem(event);
    eventElement.addEventListener('click', () => {
      hideAdvancedSearch();
      showEventDetails(event);
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
