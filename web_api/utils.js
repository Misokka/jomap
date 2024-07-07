export const createElement = (type, props = {}, ...children) => ({
    type,
    props: {
      ...props,
      children,
    },
  });
  
  export const createTextNode = content => ({
    type: "TEXT_NODE",
    content,
  });
  