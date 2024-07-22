export async function fetchEvents(type = 'Sites de compétition') {
  // Définition des URLs pour les différents types d'événements
  const urls = {
    'Sites de compétition': 'https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-sites-de-competition/records?limit=100',
    'Événements culturels': 'https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-evenements-olympiade-culturelle/records?limit=50',
  };

  // Vérification si le type d'événement est valide
  if (!urls[type]) {
    throw new Error('Type d\'événement invalide');
  }

  try {
    // Requête pour récupérer les données depuis l'URL correspondante
    const response = await fetch(urls[type]);
    if (!response.ok) {
      throw new Error('La réponse du réseau n\'était pas correcte');
    }
    const data = await response.json();
    console.log('Données récupérées pour', type, data);

    // Transformation des données en une liste d'événements
    const events = data.results.map(record => {
      const pointGeo = record.point_geo || record.geolocation || {};
      const longitude = parseFloat(pointGeo.lon);
      const latitude = parseFloat(pointGeo.lat);

      if (isNaN(longitude) || isNaN(latitude)) {
        console.warn('Enregistrement ignoré en raison de coordonnées manquantes:', record);
        return undefined;
      }

      return {
        name: record.nom_site || record.name || 'Événement sans nom',
        sport: record.sports || record.discipline_principale_du_projet_c || 'Sport inconnu',
        description: record.presentation_synthetique_du_projet_c || `${record.sports} (${record.start_date} to ${record.end_date})` || 'Pas de description disponible',
        coordinates: [longitude, latitude],
        start_date: new Date(record.start_date || record.date_de_debut_c),
        end_date: new Date(record.end_date || record.date_de_fin_c),
        location: record.commune || 'Paris',
        type: type || 'Type inconnu',
      };
    }).filter(event => event !== undefined);

    console.log('Événements traités pour', type, events);
    return events;
  } catch (error) {
    console.error('Échec de la récupération des événements:', error);
    return [];
  }
}

export async function fetchAllEvents() {
  // Définition des URLs pour tous les types d'événements
  const urls = [
    'https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-sites-de-competition/records?limit=100',
    'https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-evenements-olympiade-culturelle/records?limit=50',
  ];

  try {
    // Requêtes pour récupérer les données de toutes les URLs
    const responses = await Promise.all(urls.map(url => fetch(url)));
    const datas = await Promise.all(responses.map(response => response.json()));

    let events = [];
    // Traitement des données pour chaque type d'événement
    datas.forEach((data, index) => {
      const type = index === 0 ? 'Sites de compétition' : 'Événements culturels';
      const categoryEvents = data.results.map(record => {
        const pointGeo = record.point_geo || record.geolocation || {};
        const longitude = parseFloat(pointGeo.lon);
        const latitude = parseFloat(pointGeo.lat);

        if (isNaN(longitude) || isNaN(latitude)) {
          console.warn('Enregistrement ignoré en raison de coordonnées manquantes:', record);
          return undefined;
        }

        return {
          name: record.nom_site || record.name || 'Événement sans nom',
          sport: record.sports || record.discipline_principale_du_projet_c || 'Sport inconnu',
          description: record.presentation_synthetique_du_projet_c || `${record.sports} (${record.start_date} to ${record.end_date})` || 'Pas de description disponible',
          coordinates: [longitude, latitude],
          start_date: new Date(record.start_date || record.date_de_debut_c),
          end_date: new Date(record.end_date || record.date_de_fin_c),
          location: record.commune || 'Paris',
          type: type || 'Type inconnu',
        };
      }).filter(event => event !== undefined);

      // Ajout des événements de la catégorie aux événements globaux
      events = events.concat(categoryEvents);
    });

    console.log('Tous les événements filtrés:', events);
    return events;
  } catch (error) {
    console.error('Échec de la récupération de tous les événements:', error);
    return [];
  }
}
