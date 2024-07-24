import mapboxgl from 'mapbox-gl';
import EventCard from '../components/EventCard.js'; 

// Clé d'accès Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoibWlzb2thIiwiYSI6ImNseGhnczJweDE3bzMycnF0NHRqM3F0ZmoifQ.HHqpWObbvpH65lb6Ma14mQ';

// Fonction pour initialiser la carte Mapbox
export const initializeMap = (center, zoom) => {
  return new mapboxgl.Map({
    container: 'map', // ID de l'élément conteneur pour la carte
    style: 'mapbox://styles/mapbox/streets-v11', // Style de la carte
    center, // Centre de la carte
    zoom, // Niveau de zoom initial
    attributionControl: false // Désactive le contrôle d'attribution par défaut
  });
};

// Fonction pour créer un marqueur sur la carte
export function createMarker(event, mapInstance, markers, onMarkerClick) {
  if (event.coordinates && event.coordinates.length === 2 && event.type !== 'Lieux iconiques') {
    // Détermine l'icône à utiliser en fonction du type d'événement
    const markerColor = event.type === 'Sites de compétition' ? '#FF0000' : '#0000FF'; // Rouge pour Sites de compétition, Bleu pour Événements culturels

    // Crée un élément HTML pour le marqueur
    const el = document.createElement('div');
    el.className = 'marker';
    el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="${markerColor}"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;

    // Crée un marqueur à partir des coordonnées de l'événement
    const marker = new mapboxgl.Marker(el)
      .setLngLat(event.coordinates)
      .setPopup(new mapboxgl.Popup({ className: 'custom-popup' })
        .setDOMContent(EventCard(event)))
      .addTo(mapInstance);
    markers.push(marker);
    return marker;
  } else {
    console.warn('Invalid event coordinates or type:', event);
  }
}

// Fonction pour supprimer tous les marqueurs de la carte
export function clearMarkers(markers) {
  if (markers && Array.isArray(markers)) {
    markers.forEach(marker => {
      if (marker) {
        marker.remove();
      }
    });
    return [];
  }
  return markers;
}

// Fonction pour charger et afficher les lieux iconiques
export async function loadIconicPlaces(mapInstance) {
  try {
    const response = await fetch('../iconic-places.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const iconicPlaces = await response.json();

    const iconicMarkers = iconicPlaces.map(place => {
      const el = document.createElement('div');
      el.className = 'iconic-marker';
      el.style.backgroundImage = `url(${place.image})`;
      el.setAttribute('data-name', place.name);

      const marker = new mapboxgl.Marker(el)
        .setLngLat(place.coordinates)
        .addTo(mapInstance);

      el.addEventListener('mouseover', () => {
        const popup = new mapboxgl.Popup({ className: 'custom-popup' })
          .setLngLat(place.coordinates)
          .addTo(mapInstance);
        el.popup = popup;
      });
      el.addEventListener('mouseout', () => {
        if (el.popup) {
          el.popup.remove();
          el.popup = null;
        }
      });

      return marker;
    });

    return iconicMarkers;
  } catch (error) {
    console.error('Failed to load iconic places:', error);
    return [];
  }
}

// Fonction pour supprimer les marqueurs des lieux iconiques
export function clearIconicPlaces(iconicMarkers) {
  if (iconicMarkers && Array.isArray(iconicMarkers)) {
    iconicMarkers.forEach(marker => {
      if (marker) {
        marker.remove();
      }
    });
    return [];
  }
  return iconicMarkers;
}
