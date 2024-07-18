import mapboxgl from 'mapbox-gl';
import { BrowserLink } from "../components/BrowserRouter.js";
import "../css/main.scss";
import SearchBar from "../components/SearchBar.js";
import Filters from "../components/Filters.js";

// Configuration du token d'accès pour Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoibWlzb2thIiwiYSI6ImNseGhnczJweDE3bzMycnF0NHRqM3F0ZmoifQ.HHqpWObbvpH65lb6Ma14mQ'; // Replace with your token

// Fonction pour récupérer les événements de l'API
async function fetchEvents() {
  try {
    const response = await fetch('https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-sites-de-competition/records?limit=100');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Data fetched from API:', data);

    // Transformation des données de l'API en une liste d'événements
    const events = data.results.map(record => {
      const longitude = parseFloat(record.point_geo.lon);
      const latitude = parseFloat(record.point_geo.lat);

      return {
        name: record.nom_site || 'Unnamed Event',
        description: `${record.sports} (${record.start_date} to ${record.end_date})` || 'No description available',
        coordinates: [longitude, latitude],
      };
    }).filter(event => event !== undefined);

    console.log('Filtered events:', events);
    return events;
  } catch (error) {
    console.error('Fetching events failed:', error);
    return [];
  }
}

// Fonction pour créer un marqueur sur la carte pour un événement donné
function createMarker(event, map) {
  if (event.coordinates && event.coordinates.length === 2) {
    console.log('Adding marker with coordinates:', event.coordinates);
    return new mapboxgl.Marker()
      .setLngLat(event.coordinates)
      .setPopup(new mapboxgl.Popup().setText(`${event.name}: ${event.description}`))
      .addTo(map);
  } else {
    console.warn('Invalid event coordinates:', event);
  }
}

// Fonction pour initialiser la carte et y ajouter les événements
async function initMap() {
  console.log("Initializing map...");
  const events = await fetchEvents();
  
  // Log si aucun événement n'a été récupéré
  if (events.length === 0) {
    console.error('No events to display on the map.');
    return;
  }

  const map = new mapboxgl.Map({
    container: 'map', // id de l'élément HTML pour la carte
    style: 'mapbox://styles/mapbox/streets-v11', // style de la carte
    center: [2.3522, 48.8566], // coordonnées du centre de la carte (Paris)
    zoom: 12, // niveau de zoom initial
    attributionControl: false // Retire les crédits
  });

  // Ajouter les événements à la carte une fois qu'elle est chargée
  map.on('load', () => {
    events.forEach(event => createMarker(event, map));
    console.log("Map initialized with events:", events);
  });
}

// Initialiser la carte une fois que le contenu de la page est chargé
document.addEventListener('DOMContentLoaded', initMap);



export default {
  type: 'div',
  children: [
    {
      type: 'div',
      props: {
        id: 'navbar',
        class: 'navbar',
      },
      children: [
        {
          type: 'h1',
          children: [
            {
              type: 'TEXT_NODE',
              content: 'PARIS 2024 - JEUX OLYMPIQUES',
            },
          ],
        },
        {
          type: 'div',
          props: {
            class: 'logo-container',
          },
          children: [
            {
              type: 'img',
              props: {
                src: '/styles/img/logojo.png', // Adjust the path to your logo
                class: 'logo',
              },
            },
          ],
        },
        {
          type: 'div', // Spacer to balance the layout
          props: {
            class: 'spacer',
          },
        },
      ],
    },
    {
      type: 'div',
      props: {
        id: 'map-container',
        class: 'map-container',
      },
      children: [
        {
          type: 'div',
          props: {
            id: 'map',
            class: 'map',
          },
        },
        {
          type: 'div',
          props: {
            class: 'search-filter-container',
          },
          children: [
            {
              type: 'button',
              props: {
                class: 'filter-button',
              },
              children: [
                {
                  type: 'TEXT_NODE',
                  content: 'Filtres',
                },
              ],
            },
            SearchBar,
            Filters,
          ],
        },
      ],
    },
    {
      type: 'div',
      props: {
        id: 'search-results',
        class: 'search-results',
      },
    },
    {
      type: 'div',
      props: {
        class: 'breadcrumb',
      },
      children: [
        BrowserLink({
          title: 'Accueil',
          to: '/page1',
        }),
        ' / ',
        BrowserLink({
          title: 'Liste événement',
          to: '/page2',
        }),
      ],
    },
  ],
};
