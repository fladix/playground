import React from 'react';
import './F_Hooks_Events.css';

function Item(props) {
  return (
    <div className="item-style">
      <h3>{props.item.name}</h3>
      <h3 className="item-kcals">{props.item.kcals} Kcals</h3>
    </div>
  );
}

export default Item;
