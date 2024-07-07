// web_api/pages/simplePage.js
import { Component } from "../core/MiniReact.js";

class SimplePage extends Component {
  render() {
    return {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '70vh',
          backgroundColor: 'lightblue',
        },
      },
      children: [
        {
          type: "TEXT_NODE",
          content: "Simple Page Content",
        },
      ],
    };
  }
}

export default SimplePage;
