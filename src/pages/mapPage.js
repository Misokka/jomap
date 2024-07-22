import mapboxgl from 'mapbox-gl';
import { BrowserLink } from "../components/BrowserRouter.js";
import "../css/main.scss";
import SearchBar from "../components/SearchBar.js";
import Filters from "../components/Filters.js";
import AdvancedSearch from "../components/AdvancedSearch.js";
import FilterBox from "../components/FilterBox.js";
import { fetchAllEvents } from "../utils/fetchEvents.js";
import { initializeMap, createMarker, clearMarkers } from "../utils/mapConfig.js";
import { handleSearchInput, setupFilterButtons, setupResetFiltersButton } from "../utils/eventHandlers.js";
import { showAdvancedSearch, hideAdvancedSearch, showFilterBox, hideFilterBox } from "../utils/uiHelpers.js";
import { createElement } from "../utils/createElement.js";
import { showAllEvents } from '../utils/searchUtils.js';

// Configuration du token d'accès pour Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoibWlzb2thIiwiYSI6ImNseGhnczJweDE3bzMycnF0NHRqM3F0ZmoifQ.HHqpWObbvpH65lb6Ma14mQ';

let map;
let markers = [];
let events = [];

async function initMap() {
  console.log("Initialisation de la carte...");
  try {
    // Récupération des événements via l'API
    const fetchedEvents = await fetchAllEvents();
    events = Array.isArray(fetchedEvents) ? fetchedEvents : [];
    console.log("Événements récupérés :", events);

    if (events.length === 0) {
      console.error('Aucun événement à afficher sur la carte.');
      return;
    }

    // Initialisation de la carte avec Mapbox
    map = initializeMap([2.3522, 48.8566], 12);
    window.map = map;

    map.on('load', () => {
      // Création des marqueurs pour chaque événement
      markers = events.map(event => createMarker(event, map, markers));
      window.markers = markers;
      console.log("Carte initialisée avec les événements :", events);
    });

    // Gestion de la recherche dans la barre de recherche avancée
    const searchBarInput = document.querySelector('.advanced-search .searchbar input');
    const searchResultsContainer = document.getElementById('search-results');

    if (searchBarInput) {
      handleSearchInput(searchBarInput, searchResultsContainer, events, map, markers);
    }

    // Gestion de la recherche avancée dans la boîte avancée
    const advancedSearchBarInput = document.querySelector('.advanced-search .searchbar');
    const advancedSearchResultsContainer = document.querySelector('.advanced-search .search-results');

    if (advancedSearchBarInput) {
      handleSearchInput(advancedSearchBarInput, advancedSearchResultsContainer, events, map, markers);
    }

    // Configuration des boutons de filtre et de réinitialisation des filtres
    setupFilterButtons(map, markers);
    setupResetFiltersButton(map, markers);
    window.selectedSports = [];
    window.events = events;

  } catch (error) {
    console.error('Erreur lors de la récupération des événements :', error);
  }
}

document.addEventListener('DOMContentLoaded', initMap);

// Ajout du composant de recherche avancée à l'initialisation de la page
document.body.appendChild(createElement(AdvancedSearch));

// Rendre les fonctions globales pour une utilisation dans les éléments HTML
window.showAdvancedSearch = showAdvancedSearch;
window.hideAdvancedSearch = hideAdvancedSearch;
window.showFilterBox = showFilterBox;
window.hideFilterBox = hideFilterBox;

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
                src: '/images/logojo.png',
                class: 'logo',
              },
            },
          ],
        },
        {
          type: 'div',
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
            SearchBar,
            Filters,
            AdvancedSearch,
          ],
        },
      ],
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
