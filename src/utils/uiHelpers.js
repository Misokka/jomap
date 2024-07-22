import { showAllEvents } from './searchUtils.js';

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
}
