export const createElement = function(type, props, ...children) {
    return { type, props: { ...props, children } };
  };
  
  export class Component {
    constructor(props) {
      this.props = props;
    }
  
    setState(state) {
      this.state = { ...this.state, ...state };
      this.update();
    }
  
    update() {
      const oldNode = this._dom;
      const newNode = this.render();
      oldNode.parentNode.replaceChild(this._miniReactDom.renderStructure(newNode), oldNode);
    }
  
    componentDidMount() {}
  }
  