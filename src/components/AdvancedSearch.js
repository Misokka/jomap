import mapboxgl from 'mapbox-gl';
import { performAdvancedSearch } from '../utils/searchUtils.js';
import AdvancedFilterBox, { getAdvancedSelectedSports, getAdvancedSelectedSpotTypes } from './AdvancedFilterBox.js';
import { clearMarkers } from '../utils/mapConfig.js';
import iconicPlaces from '../iconic-places.json';

const AdvancedSearch = {
  type: 'div',
  props: {
    class: 'advanced-search',
  },
  children: [
    {
      type: 'div',
      props: {
        class: 'advanced-search-header',
      },
      children: [
        {
          type: 'button',
          props: {
            class: 'filter-button',
            onclick: 'showAdvancedFilterBox()',
          },
          children: [
            {
              type: 'i',
              props: {
                class: 'fas fa-filter',
              },
            },
          ],
        },
        {
          type: 'input',
          props: {
            type: 'text',
            placeholder: 'Rechercher',
            class: 'searchbar',
            oninput: "updateSearchResults()",
          },
        },
        {
          type: 'button',
          props: {
            class: 'searchbar-close-button',
            onclick: 'hideAdvancedSearch()',
          },
          children: [
            {
              type: 'TEXT_NODE',
              content: '×',
            },
          ],
        },
      ],
    },
    {
      type: 'h2',
      props: {
        class: 'advanced-search-title',
      },
      children: [
        {
          type: 'TEXT_NODE',
          content: 'RÉSULTATS',
        },
      ],
    },
    {
      type: 'div',
      props: {
        class: 'search-results',
        id: 'search-results',
      },
      children: [],
    },
    AdvancedFilterBox,
  ],
};

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

window.getAndShowNearbySpots = async function () {
  try {
    console.log('Demande de géolocalisation...');
    const position = await getUserLocation();
    const userLat = position.coords.latitude;
    const userLon = position.coords.longitude;

    const placesWithDistance = iconicPlaces.map(place => {
      const distance = calculateDistance(userLat, userLon, place.coordinates[1], place.coordinates[0]);
      return { ...place, distance };
    });

    const nearbyPlaces = placesWithDistance.filter(place => place.distance <= 30); // réglage de la distance en km
    console.log('Lieux à proximité:', nearbyPlaces);

    const searchResultsElement = document.getElementById('search-results');
    searchResultsElement.innerHTML = '';
    nearbyPlaces.forEach(place => {
      const placeElement = createElement({
        type: 'div',
        props: {
          class: 'place-item',
        },
        children: [
          {
            type: 'img',
            props: {
              src: place.image,
              alt: place.name,
            },
          },
          {
            type: 'h3',
            children: [
              {
                type: 'TEXT_NODE',
                content: place.name,
              },
            ],
          },
          {
            type: 'p',
            children: [
              {
                type: 'TEXT_NODE',
                content: `Distance: ${place.distance.toFixed(2)} km`,
              },
            ],
          },
        ],
      });
      searchResultsElement.appendChild(placeElement);
    });
  } catch (error) {
    console.error('Erreur de géolocalisation:', error);
  }
};


window.updateSearchResults = function () {
  const query = document.querySelector('.advanced-search .searchbar').value.toLowerCase();
  const selectedSports = getAdvancedSelectedSports();
  const selectedSpotTypes = getAdvancedSelectedSpotTypes();
  console.log('Search query and filters:', { query, selectedSports, selectedSpotTypes });

  const advancedSearchResultsContainer = document.getElementById('search-results');
  advancedSearchResultsContainer.innerHTML = '';

  window.markers = clearMarkers(window.markers);

  performAdvancedSearch(window.events, window.map, window.markers, { query, selectedSports, selectedSpotTypes });
};


window.updateAdvancedSelectedSports = getAdvancedSelectedSports;

window.onEventItemClick = function (event) {
  const map = window.map;
  if (map) {
    map.flyTo({ center: event.coordinates, zoom: 15 });
  }
  const advancedSearchElement = document.querySelector('.advanced-search');
  if (advancedSearchElement) {
    advancedSearchElement.style.display = 'none';
  }

  const filtersContainer = document.querySelector('.search-filter-container');
  if (filtersContainer) {
    filtersContainer.style.display = 'flex';
  }

  const popupContent = createElement(EventCard(event));
  new mapboxgl.Popup({ className: 'custom-popup' })
      .setLngLat(event.coordinates)
      .setDOMContent(popupContent)
      .addTo(map);
};

function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        resolve,
        reject,
        {
          enableHighAccuracy: true,
          maximumAge: 0
        }
      );
    } else {
      reject(new Error('La géolocalisation n\'est pas supportée par ce navigateur.'));
    }
  });
}


export default AdvancedSearch;
