import React, { forwardRef } from 'react';

const InputField = forwardRef((props, ref) => (
  <div className="elem-useref">
    <span>{props.label}</span>
    <input
      type="text"
      id={props.id}
      ref={ref}
      onKeyPress={props.onKeyPress}
    ></input>
  </div>
));

export default InputField;
