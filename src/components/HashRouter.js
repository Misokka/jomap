// Définition de la fonction HashRouter qui prend en entrée des routes et un élément racine
const HashRouter = function (routes, rootElement) {
  const generatePage = () => {
    const path = location.hash.slice(1); // Récupérer le chemin après le hash (#)
    if (rootElement.childNodes.length) {
      rootElement.replaceChild(
        this.renderStructure(routes[path]),
        rootElement.childNodes[0]
      );
    } else {
      // Sinon, ajouter la nouvelle structure à l'élément racine
      rootElement.appendChild(this.renderStructure(routes[path]));
    }
  };
  generatePage(); 

  // Appeler generatePage lorsque l'événement hashchange est déclenché (par exemple, lorsqu'on change le hash dans l'URL)
  window.onhashchange = generatePage;
};

// Définition de la fonction HashLink pour créer des liens de navigation interne basés sur les hash
export const HashLink = function (props) {
  return {
    type: "a", 
    props: {
      href: "#" + props.to, 
    },
    children: [
      {
        type: "TEXT_NODE", 
        content: props.title,
      },
    ],
  };
};

export default HashRouter;
