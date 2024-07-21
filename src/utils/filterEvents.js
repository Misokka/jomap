// Fonction pour filtrer les événements en fonction du type spécifié
export function filterEvents(events, filterType) {
  return events.filter(event => event.type === filterType);
}
