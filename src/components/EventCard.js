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
    eventImage.src = event.image || '../images/jo.png'; 

    const eventSport = document.createElement('h2');
    eventSport.className = 'event-card-title';
    eventSport.textContent = event.sport || event.name || 'Sport inconnu';

    const eventLocation = document.createElement('div');
    eventLocation.className = 'event-card-location';
    eventLocation.textContent = event.name || 'Adresse inconnue';

    const viewMoreButton = document.createElement('button');
    viewMoreButton.className = 'view-more-button';

    const buttonText = document.createElement('span');
    buttonText.textContent = 'Voir plus';

    const icon = document.createElement('i');
    icon.className = 'fas fa-plus-circle';

    viewMoreButton.appendChild(buttonText);
    viewMoreButton.appendChild(icon);

    viewMoreButton.onclick = async () => {
        if (currentEventDetailElement && currentEventDetailElement.parentElement) {
            currentEventDetailElement.style.display = 'none';
            currentEventDetailElement.parentElement.removeChild(currentEventDetailElement);
        }
        if (currentPopup) {
            currentPopup.remove();
            currentPopup = null;
        }
        const eventDetailElement = await EventDetail(event);
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

// const apiKey = 'u8ytiBWB-koGoQaLSS3xf1-DTOZPdMwaUM741dwpUPE'; 
// const requestLimit = 25; // Définir une limite sur le nombre de requêtes
// let requestCount = 0; // Compteur de requêtes

// async function fetchSportImage(sportName) {
//     if (requestCount >= requestLimit) {
//         console.warn('Request limit reached, using default image');
//         return null; // Retourner null pour utiliser l'image par défaut
//     }

//     try {
//         const response = await fetch(`https://api.unsplash.com/search/photos?query=${sportName}&client_id=${apiKey}`);
//         if (response.status === 403) {
//             console.warn('Rate limit exceeded or invalid API key');
//             return null;
//         }
//         const data = await response.json();
//         if (data.results && data.results.length > 0) {
//             requestCount++; // Incrémenter le compteur de requêtes
//             return data.results[0].urls.regular;
//         } else {
//             console.warn(`No image found for sport: ${sportName}`);
//             return null;
//         }
//     } catch (error) {
//         console.error('Error fetching image from Unsplash:', error);
//         return null;
//     }
// }

export default EventCard;
