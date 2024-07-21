import mapboxgl from 'mapbox-gl';

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
export function createMarker(event, mapInstance, markers) {
  if (event.coordinates && event.coordinates.length === 2) {
    // Crée un marqueur à partir des coordonnées de l'événement
    const marker = new mapboxgl.Marker()
      .setLngLat(event.coordinates)
      .setPopup(new mapboxgl.Popup().setText(`${event.name}: ${event.description}: ${event.sport}`)) // Ajoute une popup avec des informations sur l'événement
      .addTo(mapInstance);
    markers.push(marker); // Ajoute le marqueur à la liste des marqueurs
    return marker;
  } else {
    console.warn('Invalid event coordinates:', event);
  }
}

// Fonction pour supprimer tous les marqueurs de la carte
export function clearMarkers(markers) {
  if (markers && Array.isArray(markers)) {
    markers.forEach(marker => marker.remove()); // Supprime chaque marqueur de la carte
    return [];
  }
  return markers;
}
