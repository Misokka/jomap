const Filters = {
    type: 'div',
    props: {
      class: 'button-container',
    },
    children: [
      {
        type: 'button',
        props: {
          class: 'buttons',
        },
        children: [
          {
            type: 'TEXT_NODE',
            content: 'Sites de compétition',
          },
        ],
      },
      {
        type: 'button',
        props: {
          class: 'buttons',
        },
        children: [
          {
            type: 'TEXT_NODE',
            content: 'Événements culturels',
          },
        ],
      },
      {
        type: 'button',
        props: {
          class: 'buttons',
        },
        children: [
          {
            type: 'TEXT_NODE',
            content: 'Lieux iconiques',
          },
        ],
      },
    ],
  };
  
  export default Filters;
      