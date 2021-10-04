import React from 'react';

/**
 * Concretely, a higher-order component is a function
 * that takes a component and returns a new component.
 */

// We usually write the HoC with lowerCamel
const makeGreen = (BaseComponent) => (props) => {
  const addGreen = {
    style: {
      color: 'green',
    },
  };

  const newProps = {
    ...props,
    ...addGreen,
  };

  return <BaseComponent {...newProps} />;
};

export default makeGreen;
