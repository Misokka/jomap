// src/utils/searchUtils.js
import { createElement } from './createElement.js';
import EventItem from '../components/EventItem.js';

// Fonction pour effectuer une recherche avancée
export function performAdvancedSearch(events, map, markers) {
  const advancedSearchBarInput = document.querySelector('.advanced-search .searchbar');
  const advancedSearchResultsContainer = document.querySelector('.advanced-search .search-results');

  if (advancedSearchBarInput) {
    advancedSearchBarInput.addEventListener('input', () => {
      const query = advancedSearchBarInput.value.toLowerCase();
      const filteredEvents = events.filter(event =>
        (typeof event.sport === 'string' && event.sport.toLowerCase().includes(query)) ||
        (typeof event.name === 'string' && event.name.toLowerCase().includes(query)) ||
        (typeof event.description === 'string' && event.description.toLowerCase().includes(query))
      );
      
      clearMarkers(markers); // Supprimer les marqueurs existants
      filteredEvents.forEach(event => createMarker(event, map, markers)); // Créer des marqueurs pour les événements filtrés

      if (filteredEvents.length > 0) {
        const bounds = new mapboxgl.LngLatBounds();
        filteredEvents.forEach(event => bounds.extend(event.coordinates));
        map.fitBounds(bounds, { padding: 50 }); // Ajuster la carte pour afficher tous les événements filtrés
      }

      advancedSearchResultsContainer.innerHTML = ''; // Vider les résultats précédents
      filteredEvents.forEach(event => {
        const eventElement = createElement(EventItem(event));
        eventElement.addEventListener('click', () => {
          map.flyTo({ center: event.coordinates, zoom: 15 }); // Centrer la carte sur l'événement sélectionné
        });
        advancedSearchResultsContainer.appendChild(eventElement); // Ajouter l'élément de l'événement aux résultats de la recherche
      });

      advancedSearchResultsContainer.style.display = 'block';
    });
  }
}

