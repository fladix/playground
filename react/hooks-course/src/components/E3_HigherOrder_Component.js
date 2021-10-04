import React from 'react';

/**
 * Concretely, a higher-order component is a function
 * that takes a component and returns a new component.
 */

// We usually write the HoC with lowerCamel
const cleanStyle = (BaseComponent) => (props) => {
  const newProps = { ...props }; // Do not change the BaseComponent props
  delete newProps.style;
  return <BaseComponent {...newProps} />;
};

export default cleanStyle;
