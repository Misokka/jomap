// web_api/components/Button.js
import { Component } from "../core/MiniReact.js";
import "../styles/components/_button.scss";

class Button extends Component {
  render() {
    return {
      type: "button",
      props: {
        className: "button",
        ...this.props,
      },
      events: {
        click: [this.props.onClick],
      },
      children: [
        {
          type: "TEXT_NODE",
          content: this.props.title,
        },
      ],
    };
  }
}

export default Button;
