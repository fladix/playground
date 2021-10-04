import React from 'react';
import './F_Hooks_Events.css';

function Item({ item, editable, onClick, onDoubleClick, onKeyPress, index }) {
  return (
    <div className="item-style">
      {editable ? (
        <input
          defaultValue={item.name}
          onKeyPress={(e) => onKeyPress(e, index)}
        ></input>
      ) : (
        <h3 onDoubleClick={onDoubleClick}>{item.name}</h3>
      )}
      <h3 className="item-kcals">{item.kcals} Kcals</h3>
      <button name={item.name} className="button-remove" onClick={onClick}>
        Remove
      </button>
    </div>
  );
}

export default Item;
