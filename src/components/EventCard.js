const EventCard = (event) => {
    const card = document.createElement('div');
    card.className = 'event-card';

    const eventImage = document.createElement('img');
    eventImage.className = 'event-card-image';
    eventImage.src = event.image || 'image.jpg'; 

    const eventSport = document.createElement('h2');
    eventSport.className = 'event-card-title';
    eventSport.textContent = event.sport || event.name || 'Sport inconnu';

    const eventLocation = document.createElement('div');
    eventLocation.className = 'event-card-location';
    eventLocation.textContent = event.nom_site || 'Adresse inconnue';

    const viewMoreButton = document.createElement('button');
    viewMoreButton.className = 'view-more-button';
    viewMoreButton.textContent = 'Voir plus';
    viewMoreButton.onclick = () => {
        // Action pour le bouton "Voir plus"
    };

    card.appendChild(eventImage);
    card.appendChild(eventSport);
    card.appendChild(eventLocation);
    card.appendChild(viewMoreButton);

    return card;
};

export default EventCard;
