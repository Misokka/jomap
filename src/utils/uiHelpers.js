import { showAllEvents } from './searchUtils.js';
import { createElement } from './createElement.js';
import EventDetails from '../components/EventDetail.js';

// Fonction pour afficher la boîte de filtres
export function showFilterBox() {
  document.querySelector('.filter-box').style.display = 'block';
}

// Fonction pour masquer la boîte de filtres
export function hideFilterBox() {
  document.querySelector('.filter-box').style.display = 'none';
}

// Fonction pour afficher la recherche avancée
export function showAdvancedSearch() {
  const advancedSearchElement = document.querySelector('.advanced-search');
  if (advancedSearchElement) {
    advancedSearchElement.style.display = 'block';
  }
  const searchbarButton = document.querySelector('.searchbar-button');
  if (searchbarButton) {
    searchbarButton.style.display = 'none';
  }
  const filtersElement = document.querySelector('.filters');
  if (filtersElement) {
    filtersElement.style.display = 'none';
  }

  const filtersContainer = document.querySelector('.search-filter-container');
  if (filtersContainer) {
    filtersContainer.style.display = 'none';
  }

  // Afficher tous les événements dès que la recherche avancée est affichée
  showAllEvents(window.events, window.map, window.markers);
}

// Fonction pour masquer la recherche avancée
export function hideAdvancedSearch() {
  const advancedSearchElement = document.querySelector('.advanced-search');
  if (advancedSearchElement) {
    advancedSearchElement.style.display = 'none';
  }
  const searchbarButton = document.querySelector('.searchbar-button');
  if (searchbarButton) {
    searchbarButton.style.display = 'block';
  }
  const filtersElement = document.querySelector('.filters');
  if (filtersElement) {
    filtersElement.style.display = 'block';
  }
  const filtersContainer = document.querySelector('.search-filter-container');
  if (filtersContainer) {
    filtersContainer.style.display = 'flex';
  }
}

// Fonction pour afficher les détails de l'événement
export function showEventDetails(event) {
  const eventDetailsContainer = document.querySelector('.event-details-container');
  if (eventDetailsContainer) {
    eventDetailsContainer.innerHTML = '';
    const eventDetailsElement = createElement(EventDetails(event));
    eventDetailsContainer.appendChild(eventDetailsElement);
    eventDetailsContainer.style.display = 'block';
  }
}

// Fonction pour masquer les détails de l'événement
export function hideEventDetails() {
  const eventDetailsContainer = document.querySelector('.event-details-container');
  if (eventDetailsContainer) {
    eventDetailsContainer.style.display = 'none';
  }
}