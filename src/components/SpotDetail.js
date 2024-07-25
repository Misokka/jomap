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
    spotImage.src = spot.image || '../images/pont.jpg'; 

    const spotTitle = document.createElement('h2');
    spotTitle.className = 'spot-detail-title';
    spotTitle.textContent = spot.title || 'Titre inconnu';

    const spotLabel = document.createElement('div');
    spotLabel.className = 'spot-detail-label';
    spotLabel.innerHTML = `<i class="fas fa-info-circle"></i> ${spot.label || 'Label non disponible'}`;

    const spotSport = document.createElement('div');
    spotSport.className = 'spot-detail-sport';
    spotSport.innerHTML = `<i class="fas fa-dumbbell"></i> ${spot.sport || 'Sport non disponible'}`;

    detail.appendChild(closeButton);
    detail.appendChild(spotImage);
    detail.appendChild(spotTitle);
    detail.appendChild(spotLabel);
    detail.appendChild(spotSport);

    return detail;
};

export default SpotDetail;
