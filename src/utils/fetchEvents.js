// Fonction pour récupérer les événements en fonction du type spécifié
export async function fetchEvents(type = 'Sites de compétition') {
  // URL des API pour chaque type d'événement
  const urls = {
    'Sites de compétition': 'https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-sites-de-competition/records?limit=100',
    'Événements culturels': 'https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-evenements-olympiade-culturelle/records?limit=50',
  };

  // Vérifie si le type d'événement est valide
  if (!urls[type]) {
    throw new Error('Invalid event type');
  }

  try {
    // Effectue une requête à l'URL spécifiée
    const response = await fetch(urls[type]);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    // Traite les données et filtre les événements avec des coordonnées valides
    const events = data.results.map(record => {
      const pointGeo = record.point_geo || record.geolocation || {};
      const longitude = parseFloat(pointGeo.lon);
      const latitude = parseFloat(pointGeo.lat);

      if (isNaN(longitude) || isNaN(latitude)) {
        console.warn('Skipping record due to missing coordinates:', record);
        return undefined;
      }

      return {
        name: record.nom_site || record.name || 'Unnamed Event',
        sport: record.sports || record.discipline_principale_du_projet_c || 'Unknown Sport',
        description: record.presentation_synthetique_du_projet_c || `${record.sports} (${record.start_date} to ${record.end_date})` || 'No description available',
        coordinates: [longitude, latitude],
        start_date: new Date(record.start_date || record.date_de_debut_c),
        end_date: new Date(record.end_date || record.date_de_fin_c),
        location: record.commune || 'Paris',
        type: type || 'Unknown Type',  // Ajoute ce champ pour permettre la filtration
      };
    }).filter(event => event !== undefined);

    return events;
  } catch (error) {
    console.error('Fetching events failed:', error);
    return [];
  }
}

// Fonction pour récupérer tous les événements de toutes les catégories
export async function fetchAllEvents() {
  const urls = [
    'https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-sites-de-competition/records?limit=100',
    'https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-evenements-olympiade-culturelle/records?limit=50',
  ];

  try {
    // Effectue les requêtes en parallèle pour les deux types d'événements
    const responses = await Promise.all(urls.map(url => fetch(url)));
    const datas = await Promise.all(responses.map(response => response.json()));

    let events = [];
    // Traite les données pour chaque type d'événement
    datas.forEach((data, index) => {
      const type = index === 0 ? 'Sites de compétition' : 'Événements culturels';
      const categoryEvents = data.results.map(record => {
        const pointGeo = record.point_geo || record.geolocation || {};
        const longitude = parseFloat(pointGeo.lon);
        const latitude = parseFloat(pointGeo.lat);

        if (isNaN(longitude) || isNaN(latitude)) {
          console.warn('Skipping record due to missing coordinates:', record);
          return undefined;
        }

        return {
          name: record.nom_site || record.name || 'Unnamed Event',
          sport: record.sports || record.discipline_principale_du_projet_c || 'Unknown Sport',
          description: record.presentation_synthetique_du_projet_c || `${record.sports} (${record.start_date} to ${record.end_date})` || 'No description available',
          coordinates: [longitude, latitude],
          start_date: new Date(record.start_date || record.date_de_debut_c),
          end_date: new Date(record.end_date || record.date_de_fin_c),
          location: record.commune || 'Paris',
          type: type || 'Unknown Type',
        };
      }).filter(event => event !== undefined);

      events = events.concat(categoryEvents);
    });

    console.log('All filtered events:', events); 
    return events;
  } catch (error) {
    console.error('Fetching all events failed:', error);
    return [];
  }
}
