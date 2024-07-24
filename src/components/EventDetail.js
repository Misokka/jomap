import currentEventDetailElement from './EventCard.js';

const EventDetail = (event) => {
    const detail = document.createElement('div');
    detail.className = 'event-detail';

    const closeButton = document.createElement('button');
    closeButton.className = 'event-detail-close-button';
    closeButton.textContent = '×';
    closeButton.onclick = () => {
        detail.style.display = 'none';
        if (detail.parentElement) {
            detail.parentElement.removeChild(detail);
        }
        currentEventDetailElement = null;
    };

    const eventImage = document.createElement('img');
    eventImage.className = 'event-detail-image';
    eventImage.src = event.image || 'image.jpg'; 

    const eventTitle = document.createElement('h2');
    eventTitle.className = 'event-detail-title';
    eventTitle.textContent = event.sport || event.name || 'Sport inconnu';

    const eventLocation = document.createElement('div');
    eventLocation.className = 'event-detail-location';
    eventLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${event.name || 'Adresse inconnue'}`;

    const eventDescription = document.createElement('p');
    eventDescription.className = 'event-detail-description';
    eventDescription.innerHTML = `<i class="fas fa-info-circle"></i> ${event.description || 'Description non disponible'}`;

    const eventDate = document.createElement('div');
    eventDate.className = 'event-detail-date';
    eventDate.innerHTML = `<i class="fas fa-calendar-alt"></i> Du ${event.start_date} au ${event.end_date}`;

    detail.appendChild(closeButton);
    detail.appendChild(eventImage);
    detail.appendChild(eventTitle);
    detail.appendChild(eventLocation);
    detail.appendChild(eventDescription);
    detail.appendChild(eventDate);

    return detail;
};

export default EventDetail;
