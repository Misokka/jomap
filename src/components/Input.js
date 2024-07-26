import { Component } from "../core/MiniReact.js";

class Input extends Component {
  render() {
    if (!this.props) {
      this.props = {};
    }
    return {
      type: "input",
      props: {
        style: {
          "background-color": "red",
        },
        type: this.props.type || "text",
        value: this.props.value || "",
        placeholder: this.props.placeholder || "",
        ...this.props,
      },
      events: {
        onclick: [this.props.onclick],
        input: [this.props.onInput].filter(Boolean),
      },
    };
  }
}

export default Input;

