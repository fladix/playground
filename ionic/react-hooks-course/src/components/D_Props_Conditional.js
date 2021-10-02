import React from 'react';

function NameTagCond(props) {
  if (!props.firstName && !props.lastName) {
    return (
      <div className="name">
        <h3>Invalid name!</h3>
      </div>
    );
  }

  return (
    <div className="name">
      <h3>First Name: {props.firstName}</h3>
      <h3>Last Name: {props.lastName}</h3>
      {props.firstName === 'John' && <div style={{ color: 'green' }}>VIP</div>}
    </div>
  );
}

export default NameTagCond;
