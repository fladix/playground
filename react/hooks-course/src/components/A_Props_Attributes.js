import React from 'react';

function NameTag(props) {
  return (
    <div className="name">
      <h3>First Name: {props.firstName}</h3>
      <h3>Last Name: {props.lastName}</h3>
    </div>
  );
}

/**
 * We could not use an external div if we did not need it. In this case,
 * we can wrap h3 with empty tags <></> or with <Fragment></Fragment>
 */

export default NameTag;
