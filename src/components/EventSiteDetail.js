import { createElement } from '../utils/createElement.js';

export function showEpreuvesForSite(siteName) {
    let epreuvesContainer = document.querySelector('.eventsitedetail-container');
    if (!epreuvesContainer) {
        epreuvesContainer = document.createElement('div');
        epreuvesContainer.className = 'eventsitedetail-container';
        document.body.appendChild(epreuvesContainer);
        epreuvesContainer.style.display = 'block';
    } else {
        epreuvesContainer.innerHTML = '';
        epreuvesContainer.style.display = 'block';
    }

    const epreuves = window.epreuves.find(epreuve => epreuve.nom_site === siteName);

    if (!epreuves) {
        const noEpreuvesMessage = document.createElement('div');
        noEpreuvesMessage.className = 'no-epreuves-message';
        noEpreuvesMessage.textContent = 'Aucune épreuve trouvée pour ce site.';
        epreuvesContainer.appendChild(noEpreuvesMessage);

        setTimeout(() => {
            noEpreuvesMessage.style.display = 'none';
            epreuvesContainer.style.display = 'none';
        }, 3000);

        return;
    }

    const closeButton = document.createElement('button');
    closeButton.className = 'eventsitedetail-close-button';

    const closeIcon = document.createElement('i');
    closeIcon.className = 'far fa-window-close';

    closeButton.appendChild(closeIcon);
    closeButton.onclick = () => {
        epreuvesContainer.style.display = 'none';
    };

    epreuvesContainer.appendChild(closeButton);

    epreuves.sports.forEach(sport => {
        const sportTitle = document.createElement('h2');
        sportTitle.className = 'eventsitedetail-title';
        sportTitle.textContent = sport.sport;
        epreuvesContainer.appendChild(sportTitle);

        sport.events.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.className = 'epreuve-item';
            eventElement.innerHTML = `
                <strong>${event.event}</strong><br>
                Date: ${event.date}<br>
                Heure: ${event.time}<br>
                Genre: ${event.gender}<br>
                Type: ${event.type}<br>
            `;
            epreuvesContainer.appendChild(eventElement);
        });
    });
}
