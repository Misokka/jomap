import EventDetail from './EventDetail.js';
import { createElement } from '../utils/createElement.js';

let currentEventDetailElement = null;
let currentPopup = null;

const EventCard = (event) => {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.dataset.eventId = event.id;

    const eventImage = document.createElement('img');
    eventImage.className = 'event-card-image';
    eventImage.src = event.image || '../images/marathon.png'; 

    const eventSport = document.createElement('h2');
    eventSport.className = 'event-card-title';
    eventSport.textContent = event.sport || event.name || 'Sport inconnu';

    const eventLocation = document.createElement('div');
    eventLocation.className = 'event-card-location';
    eventLocation.textContent = event.name || 'Adresse inconnue';

    const viewMoreButton = document.createElement('button');
    viewMoreButton.className = 'view-more-button';
    viewMoreButton.textContent = 'Voir plus';
    viewMoreButton.onclick = () => {
        // Fermer le détail précédent s'il est ouvert
        if (currentEventDetailElement && currentEventDetailElement.parentElement) {
            currentEventDetailElement.style.display = 'none';
            currentEventDetailElement.parentElement.removeChild(currentEventDetailElement);
        }
        // Fermer la popup actuelle s'il y en a une
        if (currentPopup) {
            currentPopup.remove();
            currentPopup = null;
        }
        // Créer et afficher le nouveau détail
        const eventDetailElement = createElement(EventDetail(event));
        const mapContainer = document.getElementById('map-container');
        mapContainer.appendChild(eventDetailElement);
        eventDetailElement.style.display = 'block';
        currentEventDetailElement = eventDetailElement;
        card.style.display = 'none';
    };

    card.appendChild(eventImage);
    card.appendChild(eventSport);
    card.appendChild(eventLocation);
    card.appendChild(viewMoreButton);

    return card;
};

export default EventCard;
