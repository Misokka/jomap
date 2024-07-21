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

// Clé d'accès Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoibWlzb2thIiwiYSI6ImNseGhnczJweDE3bzMycnF0NHRqM3F0ZmoifQ.HHqpWObbvpH65lb6Ma14mQ';

let map;
let markers = []; // Tableau pour stocker les marqueurs
let events = []; // Tableau pour stocker les événements

// Fonction asynchrone pour initialiser la carte
async function initMap() {
  console.log("Initializing map...");
  try {
    // Récupération de tous les événements
    events = await fetchAllEvents(); 

    // Vérification si des événements sont disponibles
    if (events.length === 0) {
      console.error('No events to display on the map.');
      return;
    }

    // Initialisation de la carte
    map = initializeMap([2.3522, 48.8566], 12);
    window.map = map;

    // Ajout des marqueurs à la carte lorsque celle-ci est chargée
    map.on('load', () => {
      markers = events.map(event => createMarker(event, map, markers));
      window.markers = markers;
      console.log("Map initialized with events:", events);
    });

    // Sélection des éléments de la barre de recherche avancée
    const searchBarInput = document.querySelector('.advanced-search .searchbar input'); 
    const searchResultsContainer = document.getElementById('search-results');

    // Configuration de la recherche si l'élément est disponible
    if (searchBarInput) {
      handleSearchInput(searchBarInput, searchResultsContainer, events, map, markers);
    }

    // Sélection des éléments pour la recherche avancée
    const advancedSearchBarInput = document.querySelector('.advanced-search .searchbar');
    const advancedSearchResultsContainer = document.querySelector('.advanced-search .search-results');

    // Configuration de la recherche avancée si l'élément est disponible
    if (advancedSearchBarInput) {
      handleSearchInput(advancedSearchBarInput, advancedSearchResultsContainer, events, map, markers);
    }

    // Configuration des boutons de filtre
    setupFilterButtons(events, map, markers);
    // Configuration du bouton de réinitialisation des filtres
    setupResetFiltersButton(map, markers);

  } catch (error) {
    console.error('Error fetching events:', error);
  }
}

// Initialisation de la carte après le chargement du contenu du document
document.addEventListener('DOMContentLoaded', initMap);

// Ajout de l'élément de recherche avancée au document
document.body.appendChild(createElement(AdvancedSearch));

// Fonctions pour afficher et masquer les éléments de l'interface utilisateur
window.showAdvancedSearch = showAdvancedSearch;
window.hideAdvancedSearch = hideAdvancedSearch;
window.showFilterBox = showFilterBox;
window.hideFilterBox = hideFilterBox;

// Structure de la page exportée par défaut
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
