import mapboxgl from 'mapbox-gl';
import "../css/main.scss";
import Filters from "../components/Filters.js";
import AdvancedSearch from "../components/AdvancedSearch.js";
import FilterBox from "../components/FilterBox.js";
import EventCard from "../components/EventCard.js";
import { fetchAllEvents } from "../utils/fetchEvents.js";
import { initializeMap, createMarker, clearMarkers } from "../utils/mapConfig.js";
import { handleSearchInput, setupFilterButtons } from "../utils/eventHandlers.js";
import { showAdvancedSearch, hideAdvancedSearch, showFilterBox, hideFilterBox } from "../utils/uiHelpers.js";
import { createElement } from "../utils/createElement.js";
import { showAllEvents } from '../utils/searchUtils.js';

mapboxgl.accessToken = 'pk.eyJ1IjoibWlzb2thIiwiYSI6ImNseGhnczJweDE3bzMycnF0NHRqM3F0ZmoifQ.HHqpWObbvpH65lb6Ma14mQ';

let map;
let markers = [];
let events = [];

async function initMap() {
    const fetchedEvents = await fetchAllEvents();
    events = Array.isArray(fetchedEvents) ? fetchedEvents : [];

    if (events.length === 0) {
        console.error('Aucun événement à afficher sur la carte.');
        return;
    }

    map = initializeMap([2.3522, 48.8566], 12);
    window.map = map;
    map.on('load', () => {
        markers = events.map(event => createMarker(event, map, markers));
        window.markers = markers;
    });

    const searchBarInput = document.querySelector('.advanced-search .searchbar input');
    const searchResultsContainer = document.getElementById('search-results');

    if (searchBarInput) {
        handleSearchInput(searchBarInput, searchResultsContainer, events, map, markers);
    }

    const advancedSearchBarInput = document.querySelector('.advanced-search .searchbar');
    const advancedSearchResultsContainer = document.querySelector('.advanced-search .search-results');

    if (advancedSearchBarInput) {
        handleSearchInput(advancedSearchBarInput, advancedSearchResultsContainer, events, map, markers);
    }

    // Configuration des boutons de filtre
    setupFilterButtons(map, markers);
    window.selectedSports = [];
    window.events = events;

    window.showAdvancedSearch = showAdvancedSearch;
    window.hideAdvancedSearch = hideAdvancedSearch;
    window.showFilterBox = showFilterBox;
    window.hideFilterBox = hideFilterBox;
}
export { initMap };

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
                        Filters,
                        AdvancedSearch,
                    ],
                },
            ],
        },
    ],
};