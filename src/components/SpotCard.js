import SpotDetail from './SpotDetail.js';
import { createElement } from '../utils/createElement.js';

let currentSpotDetailElement = null;
let currentPopup = null;

const SpotCard = (spot) => {
    const card = document.createElement('div');
    card.className = 'spot-card';
    card.dataset.spotId = spot.id;

    const spotImage = document.createElement('img');
    spotImage.className = 'spot-card-image';
    spotImage.src = spot.image || '../images/jo.png'; 

    const spotTitle = document.createElement('h2');
    spotTitle.className = 'spot-card-title';
    spotTitle.textContent = spot.title || 'Titre inconnu';

    const spotLabel = document.createElement('div');
    spotLabel.className = 'spot-card-label';
    spotLabel.textContent = spot.label || 'Label inconnu';

    const spotSport = document.createElement('div');
    spotSport.className = 'spot-card-sport';
    spotSport.textContent = `Sport: ${spot.sport}` || 'Sport inconnu';

    const viewMoreButton = document.createElement('button');
    viewMoreButton.className = 'view-more-button';

    const buttonText = document.createElement('span');
    buttonText.textContent = 'Voir plus';

    const icon = document.createElement('i');
    icon.className = 'fas fa-plus-circle'; 

    viewMoreButton.appendChild(buttonText);
    viewMoreButton.appendChild(icon);

    viewMoreButton.onclick = () => {
        if (currentSpotDetailElement && currentSpotDetailElement.parentElement) {
            currentSpotDetailElement.style.display = 'none';
            currentSpotDetailElement.parentElement.removeChild(currentSpotDetailElement);
        }
        if (currentPopup) {
            currentPopup.remove();
            currentPopup = null;
        }
        const spotDetailElement = createElement(SpotDetail(spot));
        const mapContainer = document.getElementById('map-container');
        mapContainer.appendChild(spotDetailElement);
        spotDetailElement.style.display = 'block';
        currentSpotDetailElement = spotDetailElement;

        card.style.display = 'none';
    };

    card.appendChild(spotImage);
    card.appendChild(spotTitle);
    card.appendChild(spotLabel);
    card.appendChild(spotSport);
    card.appendChild(viewMoreButton);

    return card;
};

export default SpotCard;
