// Définition de la fonction BrowserRouter qui prend en entrée des routes et un élément racine
const BrowserRouter = function (routes, rootElement) {
  // Fonction pour générer la page en fonction du chemin actuel
  const generatePage = () => {
    const path = location.pathname;
    // Sélection de la structure de la page en fonction du chemin ou de la route par défaut (*)
    const structure = routes[path] ?? routes["*"];
    // Si l'élément racine a des nœuds enfants, remplacer le premier nœud enfant par la nouvelle structure
    if (rootElement.childNodes.length) {
      rootElement.replaceChild(
        this.renderStructure(structure),
        rootElement.childNodes[0]
      );
    } else {
      // Sinon, ajouter la nouvelle structure à l'élément racine
      rootElement.appendChild(this.renderStructure(structure));
    }
  };
  generatePage(); // Générer la page initiale

  // Redéfinition de la méthode pushState de l'historique pour gérer les changements d'état de l'historique
  const oldPushState = history.pushState;
  history.pushState = function (state, title, url) {
    oldPushState.call(history, state, title, url);
    window.dispatchEvent(new Event("popstate"));
  };
  // Appeler generatePage lorsque l'événement popstate est déclenché (par exemple, lorsqu'on utilise les boutons de navigation du navigateur)
  window.onpopstate = generatePage;
};

// Définition de la fonction BrowserLink pour créer des liens de navigation interne
export const BrowserLink = function (props) {
  return {
    type: "a", // Type d'élément HTML (un lien)
    props: {
      href: props.to, // URL de destination
    },
    events: {
      // Définir l'événement click pour empêcher le comportement par défaut et utiliser l'historique pour la navigation
      click: [
        function (event) {
          event.preventDefault();
          history.pushState(null, null, props.to);
        },
      ],
    },
    children: [
      {
        type: "TEXT_NODE", // Créer un nœud de texte pour le titre du lien
        content: props.title,
      },
    ],
  };
};

export default BrowserRouter;
