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
  if (event.coordinates && event.coordinates.length === 2) {
    // Détermine l'icône à utiliser en fonction du type d'événement
    const markerIcon = event.type === 'Sites de compétition' 
      ? '../images/marker_red.png' 
      : '../images/marker_blue.png';

    // Crée un élément HTML pour le marqueur
    const el = document.createElement('div');
    el.className = 'marker';
    el.innerHTML = `<img src="${markerIcon}" class="marker" />`;

    // Crée un marqueur à partir des coordonnées de l'événement
    const marker = new mapboxgl.Marker(el)
      .setLngLat(event.coordinates)
      .setPopup(new mapboxgl.Popup({ className: 'custom-popup' }) 
        .setDOMContent(EventCard(event))) 
      .addTo(mapInstance);
    markers.push(marker); 
    return marker;
  } else {
    console.warn('Invalid event coordinates:', event);
  }
}

// Fonction pour supprimer tous les marqueurs de la carte
export function clearMarkers(markers) {
  if (markers && Array.isArray(markers)) {
    markers.forEach(marker => marker.remove()); 
    return [];
  }
  return markers;
}
