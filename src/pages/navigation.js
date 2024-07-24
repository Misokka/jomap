import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

// Définir le token d'accès Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoibWlzb2thIiwiYSI6ImNseGhnczJweDE3bzMycnF0NHRqM3F0ZmoifQ.HHqpWObbvpH65lb6Ma14mQ';

// Définir le composant pour la page
const Navigation = {
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
                style: 'width: 100%; height: 100vh;', // Ajuster les dimensions de la carte
            },
        },
    ],
};

// Fonction pour créer un élément DOM à partir de la structure de composant
function createElement(element) {
    if (element.type === 'TEXT_NODE') {
        return document.createTextNode(element.content);
    }

    const el = document.createElement(element.type);
    Object.keys(element.props || {}).forEach(key => el.setAttribute(key, element.props[key]));
    (element.children || []).forEach(child => el.appendChild(createElement(child)));
    return el;
}

// Fonction pour initialiser la carte Mapbox
function initializeMap() {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-79.4512, 43.6568], // Coordonnées initiales
        zoom: 13,
    });

    map.addControl(
        new MapboxDirections({
            accessToken: mapboxgl.accessToken,
        }),
        'top-left'
    );
}

// Fonction pour afficher le composant Navigation et initialiser la carte
function displayNavigation() {
    const root = document.getElementById('root'); // Assurez-vous que cet ID est présent dans votre HTML
    root.innerHTML = ''; // Clear existing content
    root.appendChild(createElement(Navigation));

    initializeMap(); // Initialiser la carte après que le DOM a été mis à jour
}

// Exporter la fonction d'affichage
export default displayNavigation;
