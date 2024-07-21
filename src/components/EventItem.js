const EventItem = (event) => {
    return {
      type: 'div',
      props: {
        class: 'event-item',
      },
      children: [
        {
          type: 'div',
          props: {
            class: 'event-date',
          },
          children: [
            {
              type: 'div',
              props: {
                class: 'date-text',
              },
              children: [
                {
                  type: 'TEXT_NODE',
                  content: new Date(event.start_date).toLocaleDateString(),
                },
              ],
            },
            {
              type: 'div',
              props: {
                class: 'time-text',
              },
              children: [
                {
                  type: 'TEXT_NODE',
                  content: new Date(event.start_date).toLocaleTimeString(),
                },
              ],
            },
          ],
        },
        {
          type: 'div',
          props: {
            class: 'event-details',
          },
          children: [
            {
              type: 'div',
              props: {
                class: 'event-type',
              },
              children: [
                {
                  type: 'TEXT_NODE',
                  content: event.sport,
                },
              ],
            },
            {
              type: 'div',
              props: {
                class: 'event-description',
              },
              children: [
                {
                  type: 'TEXT_NODE',
                  content: event.description,
                },
              ],
            },
            {
              type: 'div',
              props: {
                class: 'event-location',
              },
              children: [
                {
                  type: 'img',
                  props: {
                    class: 'location-icon',
                    src: '/path/to/location/icon.png', // Replace with the correct path
                  },
                },
                {
                  type: 'div',
                  props: {
                    class: 'location-text',
                  },
                  children: [
                    {
                      type: 'TEXT_NODE',
                      content: event.nom_site || 'Location Unknown',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
  };
  
  export default EventItem;
  