import mapboxgl from 'mapbox-gl';
import { BrowserLink } from "../components/BrowserRouter.js";
import "../css/main.scss";
import Filters from "../components/Filters.js";
import AdvancedSearch from "../components/AdvancedSearch.js";
import FilterBox from "../components/FilterBox.js";
import { fetchAllEvents } from "../utils/fetchEvents.js";
import { initializeMap, createMarker, clearMarkers } from "../utils/mapConfig.js";
import { handleSearchInput, setupFilterButtons } from "../utils/eventHandlers.js";
import { showAdvancedSearch, hideAdvancedSearch, showFilterBox, hideFilterBox } from "../utils/uiHelpers.js";
import { createElement } from "../utils/createElement.js";
import { showAllEvents } from '../utils/searchUtils.js';
import Header from '../components/Header.js';

// Clé d'accès pour Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoibWlzb2thIiwiYSI6ImNseGhnczJweDE3bzMycnF0NHRqM3F0ZmoifQ.HHqpWObbvpH65lb6Ma14mQ';

let map;
let markers = [];
let events = [];

// Fonction pour initialiser la carte
async function initMap() {
  console.log("Initialisation de la carte...");

  // Récupération des événements
  const fetchedEvents = await fetchAllEvents();
  events = Array.isArray(fetchedEvents) ? fetchedEvents : [];
  console.log("Événements récupérés :", events);

  if (events.length === 0) {
    console.error('Aucun événement à afficher sur la carte.');
    return;
  }

  // Initialisation de la carte centré sur Paris
  map = initializeMap([2.3522, 48.8566], 12);
  window.map = map;

  map.on('load', () => {
    // Création des marqueurs pour chaque événement
    markers = events.map(event => createMarker(event, map, markers));
    window.markers = markers;
    console.log("Carte initialisée avec les événements :", events);
  });

  // Configuration de la barre de recherche
  const searchBarInput = document.querySelector('.advanced-search .searchbar input');
  const searchResultsContainer = document.getElementById('search-results');

  if (searchBarInput) {
    handleSearchInput(searchBarInput, searchResultsContainer, events, map, markers);
  }

  // Configuration de la recherche avancée
  const advancedSearchBarInput = document.querySelector('.advanced-search .searchbar');
  const advancedSearchResultsContainer = document.querySelector('.advanced-search .search-results');

  if (advancedSearchBarInput) {
    handleSearchInput(advancedSearchBarInput, advancedSearchResultsContainer, events, map, markers);
  }

  // Configuration des boutons de filtre
  setupFilterButtons(map, markers);
  window.selectedSports = [];
  window.events = events;
}

// Initialisation de la carte au chargement du document
document.addEventListener('DOMContentLoaded', initMap);

// Exposition des fonctions pour montrer/cacher les boîtes de recherche et de filtre
window.showAdvancedSearch = showAdvancedSearch;
window.hideAdvancedSearch = hideAdvancedSearch;
window.showFilterBox = showFilterBox;
window.hideFilterBox = hideFilterBox;

export default {
  type: 'div',
  children: [
    Header,
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
                onclick: 'showFilterBox()',
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
              type: 'button',
              props: {
                class: 'filter-button',
                onclick: 'showAdvancedSearch()',
              },
              children: [
                {
                  type: 'TEXT_NODE',
                  content: 'Rechercher ',
                },
                {
                  type: 'i',
                  props: {
                    class: 'fas fa-search',
                  },
                },
              ],
            },
            FilterBox,
            Filters,
            AdvancedSearch,
          ],
        },
      ],
    },
  ],
};
