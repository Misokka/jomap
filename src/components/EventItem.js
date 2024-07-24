const EventItem = (event) => {
  const eventElement = document.createElement('div');
  eventElement.className = 'search-result-item';

  const eventItem = document.createElement('div');
  eventItem.className = 'event-item';
  eventItem.onclick = () => window.onEventItemClick(event);

  const eventDate = document.createElement('div');
  eventDate.className = 'event-date';

  const dateText = document.createElement('div');
  dateText.className = 'date-text';
  dateText.textContent = new Date(event.start_date).toLocaleDateString();

  const timeText = document.createElement('div');
  timeText.className = 'time-text';
  timeText.textContent = new Date(event.start_date).toLocaleTimeString();

  eventDate.appendChild(dateText);
  eventDate.appendChild(timeText);

  const eventDetails = document.createElement('div');
  eventDetails.className = 'event-details';

  const eventType = document.createElement('div');
  eventType.className = 'event-type';
  eventType.textContent = event.sport || 'Sport inconnu';

  const eventDescription = document.createElement('div');
  eventDescription.className = 'event-description';
  eventDescription.textContent = event.type === 'Sites de compétition' ? event.description : event.name;

  const eventLocation = document.createElement('div');
  eventLocation.className = 'event-location';

  const locationIcon = document.createElement('i');
  locationIcon.className = 'fas fa-map-marker-alt location-icon';

  const locationText = document.createElement('div');
  locationText.className = 'location-text';
  locationText.textContent = event.nom_site || 'Paris';

  eventLocation.appendChild(locationIcon);
  eventLocation.appendChild(locationText);

  eventDetails.appendChild(eventType);
  eventDetails.appendChild(eventDescription);
  eventDetails.appendChild(eventLocation);

  eventItem.appendChild(eventDate);
  eventItem.appendChild(eventDetails);

  eventElement.appendChild(eventItem);

  return eventElement;
};

export default EventItem;
