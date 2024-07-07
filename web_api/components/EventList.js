// const events = [
//     {
//       name: "Marathon pour tous",
//       description: "42,195km sur une boucle reliant Paris et Versailles - Départ à partir de 21h à l'Hôtel de Ville de Paris - Arrivée aux Invalides",
//       coordinates: [2.3522, 48.8566],
//     },
//     // Ajoutez d'autres événements ici
//   ];
  
//   const EventList = {
//     type: 'div',
//     props: {
//       class: 'events',
//     },
//     children: [
//       {
//         type: 'h2',
//         children: [
//           {
//             type: 'TEXT_NODE',
//             content: 'Liste des événements',
//           },
//         ],
//       },
//       ...events.map(event => ({
//         type: 'div',
//         props: {
//           class: 'event',
//         },
//         children: [
//           {
//             type: 'p',
//             children: [
//               {
//                 type: 'TEXT_NODE',
//                 content: event.name,
//               },
//             ],
//           },
//           {
//             type: 'p',
//             children: [
//               {
//                 type: 'TEXT_NODE',
//                 content: event.description,
//               },
//             ],
//           },
//           {
//             type: 'button',
//             props: {
//               class: 'buttons',
//             },
//             children: [
//               {
//                 type: 'TEXT_NODE',
//                 content: 'Voir plus',
//               },
//             ],
//           },
//         ],
//       })),
//     ],
//   };
  
//   export default EventList;
  