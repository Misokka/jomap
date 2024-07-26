let currentPopup = null;

const SpotDetail = (spot) => {
    const detail = document.createElement('div');
    detail.className = 'spot-detail';

    const closeButton = document.createElement('button');
    closeButton.className = 'spot-detail-close-button';

    const closeIcon = document.createElement('i');
    closeIcon.className = 'far fa-window-close';

    closeButton.appendChild(closeIcon);
    closeButton.onclick = () => {
        detail.style.display = 'none';
        if (detail.parentElement) {
            detail.parentElement.removeChild(detail);
        }

        const spotCard = document.querySelector(`.spot-card[data-spot-id="${spot.id}"]`);
        if (spotCard) {
            spotCard.style.display = 'block';
        }

        if (currentPopup) {
            currentPopup.remove();
            currentPopup = null;
        }
    };

    const spotImage = document.createElement('img');
    spotImage.className = 'spot-detail-image';
    spotImage.src = spot.image || '../images/jo.png'; 

    const spotTitle = document.createElement('h2');
    spotTitle.className = 'spot-detail-title';
    spotTitle.textContent = spot.title || 'Titre inconnu';

    const spotLabel = document.createElement('div');
    spotLabel.className = 'spot-detail-label';
    spotLabel.innerHTML = `<i class="fas fa-info-circle"></i> <span>${spot.label || 'Label non disponible'}</span>`;

    const spotSport = document.createElement('div');
    spotSport.className = 'spot-detail-sport';
    spotSport.innerHTML = `<i class="fas fa-dumbbell"></i> <span>${spot.sport || 'Sport non disponible'}</span>`;

    const spotDescription = document.createElement('div');
    spotDescription.className = 'spot-detail-description';
    spotDescription.innerHTML = `<i class="fas fa-align-left"></i> <span>${spot.description || 'Description non disponible'}</span>`;

    const spotAffluence = document.createElement('div');
    spotAffluence.className = 'spot-detail-affluence';
    spotAffluence.innerHTML = `<i class="fas fa-clock"></i> <span><strong>Horaires d'affluence:</strong>${Object.entries(spot.affluence || {}).map(([day, hours]) => `<div>${day}: ${hours}</div>`).join('')}</span>`;

    detail.appendChild(closeButton);
    detail.appendChild(spotImage);
    detail.appendChild(spotTitle);
    detail.appendChild(spotLabel);
    detail.appendChild(spotSport);
    detail.appendChild(spotDescription);
    detail.appendChild(spotAffluence);

    return detail;
};

export default SpotDetail;
