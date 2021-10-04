import React from 'react';

function Input({ placeholder, type }) {
  return <input placeholder={placeholder} type={type} />;
}

/**
 * This way we don't have to do props.placeholder and props.type
 */

export default Input;
