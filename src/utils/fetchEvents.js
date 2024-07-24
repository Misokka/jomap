export async function fetchEvents(type = 'Sites de compétition') {
  const urls = {
    'Sites de compétition': 'https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-sites-de-competition/records?limit=100',
    'Événements culturels': 'https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-evenements-olympiade-culturelle/records?limit=50',
  };

  if (type === 'Lieux iconiques') {
    try {
      const response = await fetch('../iconic-places.json'); // Chemin relatif à la racine du projet
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const iconicPlaces = await response.json();

      const events = iconicPlaces.map(place => ({
        name: place.name,
        description: place.description || 'No description available',
        coordinates: place.coordinates,
        type: 'Lieux iconiques',
      }));

      return events;
    } catch (error) {
      console.error('Fetching iconic places failed:', error);
      return [];
    }
  }

  if (!urls[type]) {
    throw new Error('Invalid event type');
  }

  try {
    const response = await fetch(urls[type]);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

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
        type: type || 'Unknown Type',
      };
    }).filter(event => event !== undefined);

    return events;
  } catch (error) {
    console.error('Fetching events failed:', error);
    return [];
  }
}

export async function fetchAllEvents() {
  const urls = [
    'https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-sites-de-competition/records?limit=100',
    'https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-evenements-olympiade-culturelle/records?limit=50',
  ];

  try {
    const responses = await Promise.all(urls.map(url => fetch(url)));
    const datas = await Promise.all(responses.map(response => response.json()));

    let events = [];
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

    return events;
  } catch (error) {
    console.error('Fetching all events failed:', error);
    return [];
  }
}
