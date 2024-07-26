import { Component } from "../core/MiniReact.js";

class Input extends Component {
  render() {
    if (!this.props) {
      this.props = {};
    }
    return {
      type: "input",
      props: {
        class: "",
        type: this.props.type || "text",
        value: this.props.value || "",
        placeholder: this.props.placeholder || "",
        ...this.props,
      },
    };
  }
}

export default Input;
