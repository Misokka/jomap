// EventCard.js
const EventCard = (event) => {
    const card = document.createElement('div');
    card.className = 'event-card';

    const closeButton = document.createElement('button');
    closeButton.className = 'event-card-close-button';
    closeButton.textContent = '×';
    closeButton.onclick = () => card.remove();

    const eventSport = document.createElement('h2');
    eventSport.className = 'event-card-title';
    eventSport.textContent = event.sport || 'Sport inconnu';

    const eventDate = document.createElement('div');
    eventDate.className = 'event-card-date';
    eventDate.textContent = `Du ${new Date(event.start_date).toLocaleDateString()} au ${new Date(event.end_date).toLocaleDateString()}`;

    const eventTime = document.createElement('div');
    eventTime.className = 'event-card-time';
    const startTime = new Date(event.start_date).toLocaleTimeString();
    const endTime = new Date(event.end_date).toLocaleTimeString();
    eventTime.textContent = `${startTime} - ${endTime}`;

    const eventLocation = document.createElement('div');
    eventLocation.className = 'event-card-location';
    const locationIcon = document.createElement('img');
    locationIcon.className = 'location-icon';
    locationIcon.src = '/path/to/location/icon.png';
    locationIcon.alt = 'localisation';
    const locationText = document.createElement('div');
    locationText.className = 'location-text';
    locationText.textContent = event.nom_site || 'Paris';
    eventLocation.appendChild(locationIcon);
    eventLocation.appendChild(locationText);

    const viewMoreButton = document.createElement('button');
    viewMoreButton.className = 'view-more-button';
    viewMoreButton.textContent = 'Voir plus';
    viewMoreButton.onclick = () => {
        
    };

    card.appendChild(closeButton);
    card.appendChild(eventSport);
    card.appendChild(eventDate);
    card.appendChild(eventTime);
    card.appendChild(eventLocation);
    card.appendChild(viewMoreButton);

    return card;
};

export default EventCard;
// src/components/EventCard.js