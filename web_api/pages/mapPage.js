import mapboxgl from 'mapbox-gl';
import { BrowserLink } from "../components/BrowserRouter.js";
import "../styles/main.css";
import SearchBar from "../components/SearchBar.js";
import Filters from "../components/Filters.js";
import EventList from "../components/EventList.js";

mapboxgl.accessToken = 'pk.eyJ1IjoibWlzb2thIiwiYSI6ImNseGhnczJweDE3bzMycnF0NHRqM3F0ZmoifQ.HHqpWObbvpH65lb6Ma14mQ'; // Remplacez par votre token

const events = [
  {
    name: "Marathon pour tous",
    description: "42,195km sur une boucle reliant Paris et Versailles - Départ à partir de 21h à l'Hôtel de Ville de Paris - Arrivée aux Invalides",
    coordinates: [2.3522, 48.8566],
  },
  // Ajoutez d'autres événements ici
];

function initMap() {
  console.log("Initializing map...");
  const map = new mapboxgl.Map({
    container: 'map', // id de l'élément HTML pour la carte
    style: 'mapbox://styles/mapbox/streets-v11', // style de la carte
    center: [2.3522, 48.8566], // coordonnées du centre de la carte (Paris)
    zoom: 12, // niveau de zoom initial
    attributionControl: false // Supprime les crédits
  });

  // Ajoutez des marqueurs pour les événements
  events.forEach(event => {
    new mapboxgl.Marker().setLngLat(event.coordinates).addTo(map);
  });

  console.log("Map initialized.");
}

document.addEventListener('DOMContentLoaded', initMap);

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
                src: '/styles/img/logojo.png', // Changez cela en fonction du chemin de votre logo
                class: 'logo',
              },
            },
          ],
        },
        {
          type: 'div', // Espace pour équilibrer la mise en page
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
              },
              children: [
                {
                  type: 'TEXT_NODE',
                  content: 'Filtres',
                },
              ],
            },
            SearchBar,
            Filters,
          ],
        },
      ],
    },
    {
      type: 'div',
      props: {
        class: 'breadcrumb',
      },
    },
    EventList,
  ],
};
