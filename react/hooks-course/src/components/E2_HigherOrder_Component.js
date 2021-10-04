import React from 'react';

function NameTagBase({ firstName, lastName, style }) {
  return (
    <div className="name">
      <h3 style={style}>First Name: {firstName}</h3>
      <h3 style={style}>Last Name: {lastName}</h3>
    </div>
  );
}

export default NameTagBase;
